require('dotenv').config(); // PRIMEIRA LINHA - OBRIGATÓRIO
const { createClient } = require('@supabase/supabase-js');

console.log('🔧 Configurando Supabase...');
console.log('URL:', process.env.SUPABASE_URL);
console.log('Service Role Key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Configurada ✅' : '❌ NÃO ENCONTRADA');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // service role key para operações administrativas no backend
);

module.exports = supabase;
