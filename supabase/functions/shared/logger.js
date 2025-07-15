// supabase/functions/shared/logger.js
export class Logger {
  static async log(level, message, data = {}, functionName = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message,
      data,
      function_name: functionName || Deno.env.get('FUNCTION_NAME') || 'unknown'
    };

    // Log no console do Supabase Dashboard
    console.log(`[${logEntry.level}] ${logEntry.message}`, logEntry.data);

    // Salvar no banco de dados
    try {
      const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
      
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL'),
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
      );

      const { error } = await supabase.from('system_logs').insert({
        level: logEntry.level,
        message: logEntry.message,
        data: logEntry.data,
        function_name: logEntry.function_name,
        created_at: logEntry.timestamp
      });

      if (error) {
        console.error('❌ Erro ao salvar log no banco:', error);
      }
    } catch (error) {
      console.error('❌ Erro crítico no logger:', error);
    }
  }

  static async info(message, data = {}, functionName = null) {
    await this.log('INFO', message, data, functionName);
  }

  static async warning(message, data = {}, functionName = null) {
    await this.log('WARNING', message, data, functionName);
  }

  static async error(message, data = {}, functionName = null) {
    await this.log('ERROR', message, data, functionName);
  }

  static async debug(message, data = {}, functionName = null) {
    await this.log('DEBUG', message, data, functionName);
  }
}