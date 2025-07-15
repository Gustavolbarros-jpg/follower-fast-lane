// deno run --allow-net --allow-env webhook-cakto.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Logger } from '../shared/logger.js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-requested-with',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
  'Access-Control-Max-Age': '86400'
}

function extractCustomerIdentifier (checkoutUrl: string | undefined) {
  if (!checkoutUrl) return null
  try {
    const url = new URL(checkoutUrl)
    return url.searchParams.get('customer_identifier')
  } catch (err) {
    console.error('Erro ao extrair customer_identifier:', err)
    return null
  }
}

// ---------- CONFIGURÁVEL ----------
const TABLE = 'pedidos'           // troque se a sua tabela tiver outro nome
const STATUS_PENDENTE = 'pendente'
const STATUS_PAGO = 'pago'
// ----------------------------------

serve(async req => {
  // Pré‑flight CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 })
  }

  try {
    await Logger.info('🔥 Webhook da Cakto recebido!', {
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString()
    })

    // Health‑check GET
    if (req.method === 'GET') {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Webhook está funcionando! Use POST para enviar dados.',
          timestamp: new Date().toISOString()
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Use POST para webhook!' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 405 }
      )
    }

    // ---------- Lê body ----------
    const rawBody = await req.text()
    if (!rawBody.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Body vazio' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    let payload: any
    try {
      payload = JSON.parse(rawBody)
    } catch (e) {
      return new Response(
        JSON.stringify({ success: false, error: 'JSON inválido' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const data = payload.data ?? payload
    const instagramUser =
      extractCustomerIdentifier(data.checkoutUrl) ||
      data.customer_identifier ||
      payload.customer_identifier

    const paymentStatus = (data.status || payload.status || '').toLowerCase()
    const orderId = data.id || data.order_id || data.payment_id || payload.id
    const eventType = payload.event

    if (!instagramUser) {
      return new Response(
        JSON.stringify({ success: false, error: 'Usuario Instagram não encontrado' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    if (!paymentStatus) {
      return new Response(
        JSON.stringify({ success: false, error: 'Status de pagamento não encontrado' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // ---------- Configura Supabase ----------
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!supabaseUrl || !serviceRole) {
      throw new Error('Variáveis de ambiente SUPABASE_URL ou SERVICE_ROLE faltando')
    }
    const supabase = createClient(supabaseUrl, serviceRole)

    // ---------- Se PIX gerado / pagamento pendente ----------
    if (eventType === 'pix_gerado' || paymentStatus === 'waiting_payment') {
      const updates: Record<string, any> = {
        status: STATUS_PENDENTE,
        updated_at: new Date().toISOString()
      }
      if (orderId) updates.id_pagamento_externo = String(orderId)

      await supabase
        .from(TABLE)
        .update(updates)
        .eq('usuario_instagram', instagramUser)
        .throwOnError()
    }

    // ---------- Se pago / aprovado / completado ----------
    if (['paid', 'approved', 'completed', 'payment_approved'].includes(paymentStatus)) {

      const updates: Record<string, any> = {
        status: STATUS_PAGO,
        updated_at: new Date().toISOString()
      }
      if (orderId) updates.id_pagamento_externo = String(orderId)

      const { data: rows } = await supabase
        .from(TABLE)
        .update(updates)
        .eq('usuario_instagram', instagramUser)
        .eq('status', STATUS_PENDENTE) // só se estava pendente
        .select()
        .throwOnError()

      // Nenhuma linha encontrada
      if (!rows?.length) {
        await Logger.warning('⚠️ Nenhum registro pendente encontrado para atualizar', {
          instagramUser
        })
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: '🚀 Webhook processado com sucesso!',
        received_data: { status: paymentStatus, user: instagramUser, order_id: orderId, event: eventType }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Erro interno:', err)
    await Logger.error('💥 ERRO GERAL', { error: err.message, stack: err.stack })
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Erro interno' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
