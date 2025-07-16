// supabase/functions/criar-checkout/index.ts - VERSÃO CORRIGIDA

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-requested-with, ngrok-skip-browser-warning',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
  'Access-Control-Max-Age': '86400',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 })
  }

  try {
    console.log("🛒 Criando checkout...")
    console.log("Method:", req.method)
    console.log("Headers:", Object.fromEntries(req.headers.entries()))

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Use POST apenas!' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      })
    }

    // Pegar dados do request com mais validação
    let requestBody
    try {
      const bodyText = await req.text()
      console.log("📦 Body recebido:", bodyText)
      requestBody = JSON.parse(bodyText)
    } catch (parseError) {
      console.error("💥 Erro ao parsear JSON:", parseError)
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'JSON inválido: ' + parseError.message 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const { usuario_instagram, plano, preco, quantidade_seguidores } = requestBody

    console.log("📋 Dados extraídos:", { 
      usuario_instagram, 
      plano, 
      preco: typeof preco, 
      quantidade_seguidores: typeof quantidade_seguidores 
    })

    // Validações mais detalhadas
    if (!usuario_instagram || !plano || preco === undefined || preco === null || !quantidade_seguidores) {
      console.log("❌ Dados obrigatórios faltando:", {
        usuario_instagram: !!usuario_instagram,
        plano: !!plano,
        preco: preco !== undefined && preco !== null,
        quantidade_seguidores: !!quantidade_seguidores
      })
      
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Dados obrigatórios faltando',
        received: { usuario_instagram, plano, preco, quantidade_seguidores }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Conectar com Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    console.log("🔑 Variáveis de ambiente:", {
      supabaseUrl: !!supabaseUrl,
      serviceRoleKey: !!serviceRoleKey
    })
    
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Variáveis de ambiente do Supabase não configuradas")
    }
    
    const supabase = createClient(supabaseUrl, serviceRoleKey)

    // 🔥 OBJETO PARA INSERIR (com tipos corretos)
    const pedidoData = {
      usuario_instagram: usuario_instagram,
      plano: plano,
      preco: Number(preco), // Garantir que é número
      quantidade_seguidores: Number(quantidade_seguidores), // Garantir que é número
      status: 'pendente',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    console.log("💾 Dados para inserir:", pedidoData)

    // Inserir no banco
    const { data, error } = await supabase
      .from('pedidos')
      .insert([pedidoData])
      .select()
      .single()

    if (error) {
      console.error("💥 Erro ao criar pedido:", error)
      console.error("Detalhes do erro:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Erro no banco: ${error.message}`,
        error_details: error.details,
        error_hint: error.hint,
        sent_data: pedidoData
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }

    console.log("✅ Pedido criado com sucesso:", data)

    // Verificar se realmente foi inserido
    const { data: verificacao, error: errorVerificacao } = await supabase
      .from('pedidos')
      .select('*')
      .eq('id', data.id)
      .single()

    if (errorVerificacao) {
      console.error("⚠️ Erro na verificação:", errorVerificacao)
    } else {
      console.log("🔍 Verificação - Pedido existe:", verificacao)
    }

    return new Response(JSON.stringify({ 
      success: true, 
      pedido: data,
      pedido_id: data.id,
      message: "Pedido criado com sucesso!",
      verificacao: verificacao
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("💥 ERRO GERAL:", error)
    console.error("Stack trace:", error.stack)
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || "Erro interno do servidor",
      timestamp: new Date().toISOString(),
      stack: error.stack
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})