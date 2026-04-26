# 🔍 Revisão Técnica Completa - Pré-Deploy

## ✅ 1. VARIÁVEIS DE AMBIENTE

### Frontend
**Variáveis usadas no código:**
- ✅ `VITE_API_URL` - Usado em `frontend/src/utils/api.js`
  - Fallback: `/api` (perfeito para produção)
  - Não precisa configurar na Vercel se usar o fallback

**⚠️ ATENÇÃO:** Você mencionou ter configurado na Vercel:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_KEY`
- `VITE_JWT_SECRET`

**PROBLEMA:** O frontend **NÃO está usando** essas variáveis! 
- O frontend só faz chamadas HTTP para o backend via `/api`
- O Supabase é usado **apenas no backend**
- Essas variáveis podem ser **removidas** da Vercel (frontend)

### Backend
**Variáveis OBRIGATÓRIAS na Vercel:**
- ✅ `SUPABASE_URL`
- ✅ `SUPABASE_ANON_KEY` (chave pública)
- ✅ `SUPABASE_SERVICE_ROLE_KEY` ⚠️ **CORRIGIDO** (era SERVICE_KEY)
- ✅ `JWT_SECRET`
- ✅ `TELEGRAM_BOT_TOKEN`
- ✅ `NODE_ENV=production`
- ✅ `FRONTEND_URL` (URL do seu site na Vercel)

**🔧 CORREÇÃO APLICADA:**
- Mudei `SUPABASE_SERVICE_KEY` → `SUPABASE_SERVICE_ROLE_KEY` no código
- Atualizei `backend/.env.example` com os nomes corretos

---

## ✅ 2. CAMINHO DA API

**Status:** ✅ PERFEITO

```javascript
// frontend/src/utils/api.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',  // ✅ Relativo!
  timeout: 15000,
});
```

- ✅ Usa caminho relativo `/api`
- ✅ Nenhuma referência a `localhost` encontrada no código
- ✅ Funciona tanto em dev quanto em produção

---

## ✅ 3. CONFIGURAÇÃO DO SUPABASE

**Status:** ✅ CORRIGIDO

### Antes (ERRADO):
```javascript
process.env.SUPABASE_SERVICE_KEY  // ❌ Nome errado
```

### Depois (CORRETO):
```javascript
process.env.SUPABASE_SERVICE_ROLE_KEY  // ✅ Nome padrão do Supabase
```

**Arquivo corrigido:** `backend/config/supabase.js`

---

## ✅ 4. ESTRUTURA DE PASTAS E BUILD

**Status:** ✅ CORRIGIDO

### vercel.json ajustado:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/dist"  // ✅ Caminho completo
      }
    },
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/$1"  // ✅ Caminho completo
    }
  ]
}
```

**Confirmações:**
- ✅ Root Directory na Vercel: **vazio** (raiz do projeto)
- ✅ O build vai entrar automaticamente na pasta `frontend/`
- ✅ Script `vercel-build` adicionado ao `frontend/package.json`
- ✅ Rotas configuradas corretamente

---

## 📋 CHECKLIST FINAL ANTES DO COMMIT

### Na Vercel Dashboard:

1. **Root Directory:** 
   - ✅ Deixar **vazio** ou `.` (raiz)

2. **Build Command:**
   - ✅ Deixar vazio (o vercel.json cuida disso)

3. **Output Directory:**
   - ✅ Deixar vazio (o vercel.json cuida disso)

4. **Variáveis de Ambiente - REMOVER do Frontend:**
   - ❌ `VITE_SUPABASE_URL` (não é usado)
   - ❌ `VITE_SUPABASE_KEY` (não é usado)
   - ❌ `VITE_JWT_SECRET` (não é usado)

5. **Variáveis de Ambiente - ADICIONAR/VERIFICAR no Backend:**
   - ✅ `SUPABASE_URL`
   - ✅ `SUPABASE_ANON_KEY`
   - ⚠️ `SUPABASE_SERVICE_ROLE_KEY` (verificar se o nome está correto)
   - ✅ `JWT_SECRET`
   - ✅ `TELEGRAM_BOT_TOKEN`
   - ✅ `ADMIN_CHAT_ID` (se usar notificações)
   - ✅ `NODE_ENV=production`
   - ✅ `FRONTEND_URL=https://seu-projeto.vercel.app`

### Arquivos modificados para commit:
```bash
git add vercel.json
git add frontend/package.json
git add backend/config/supabase.js
git add backend/.env.example
git commit -m "fix: Configurar vercel.json e corrigir variáveis Supabase"
git push
```

---

## 🧪 TESTES PÓS-DEPLOY

### 1. Testar Backend:
```bash
curl https://seu-projeto.vercel.app/api/health
# Esperado: {"status":"ok","timestamp":"..."}
```

### 2. Testar Frontend:
```
https://seu-projeto.vercel.app
# Esperado: Página inicial carrega
```

### 3. Testar Autenticação:
```bash
curl -X POST https://seu-projeto.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"@silva.93","password":"sua-senha"}'
# Esperado: {"token":"...","username":"@silva.93"}
```

### 4. Testar Produtos:
```
https://seu-projeto.vercel.app/api/products
# Esperado: Lista de produtos ou []
```

---

## 🚨 PROBLEMAS IDENTIFICADOS E CORRIGIDOS

1. ✅ **SUPABASE_SERVICE_KEY → SUPABASE_SERVICE_ROLE_KEY**
   - Corrigido em `backend/config/supabase.js`
   - Atualizado em `backend/.env.example`

2. ✅ **vercel.json com caminhos incorretos**
   - `distDir: "dist"` → `distDir: "frontend/dist"`
   - `dest: "frontend/$1"` → `dest: "frontend/dist/$1"`

3. ✅ **Variáveis desnecessárias no frontend**
   - Frontend não usa Supabase diretamente
   - Pode remover `VITE_SUPABASE_*` da Vercel

---

## ✅ CONCLUSÃO

Todos os pontos foram revisados e corrigidos:
- ✅ Variáveis de ambiente alinhadas
- ✅ Caminhos da API usando rotas relativas
- ✅ Supabase configurado corretamente
- ✅ Estrutura de pastas e build otimizada

**Pode fazer o commit com segurança!** 🚀
