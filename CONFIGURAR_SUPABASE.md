# 🔥 Configuração Final do Supabase

## O que está faltando?

Seu código está **100% correto**, mas as variáveis de ambiente estão com valores de exemplo. Você precisa substituir pelos valores reais do seu projeto Supabase.

## Passo a Passo (5 minutos)

### 1️⃣ Acesse seu projeto no Supabase
- Vá em: https://supabase.com/dashboard
- Entre no seu projeto

### 2️⃣ Pegue as credenciais
- Clique em **Settings** (⚙️) no menu lateral
- Clique em **API**
- Copie:
  - **Project URL** (algo como: `https://xyzabc123.supabase.co`)
  - **anon/public key** (uma chave longa começando com `eyJ...`)

### 3️⃣ Atualize o arquivo `.env` na RAIZ do projeto

Substitua estas linhas:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica-aqui
```

Por:

```env
VITE_SUPABASE_URL=https://xyzabc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4️⃣ Configure na Vercel também

No painel da Vercel:
1. Vá em **Settings** → **Environment Variables**
2. Adicione:
   - `VITE_SUPABASE_URL` = sua URL
   - `VITE_SUPABASE_ANON_KEY` = sua chave pública

### 5️⃣ Crie o usuário admin no Supabase

No painel do Supabase:
1. Vá em **Authentication** → **Users**
2. Clique em **Add user** → **Create new user**
3. Crie com:
   - Email: `@silva.93` (ou qualquer email válido)
   - Password: sua senha
   - ✅ Marque "Auto Confirm User"

## 🚀 Depois disso

```bash
# Teste local
npm run dev

# Faça o deploy
git add .
git commit -m "fix: configuração final do Supabase"
git push origin main
```

## ✅ Como saber se funcionou?

- O site vai carregar sem tela branca
- O login vai funcionar com o email/senha que você criou
- Não vai mais aparecer erro 404

---

**Dica:** Se ainda der erro, me manda um print do console do navegador (F12) que eu te ajudo!
