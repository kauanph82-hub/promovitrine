# ✅ PRONTO! Bot + Frontend Simplificado

## 🎉 O que você tem agora:

### 1. **Frontend (Site React)**
- ✅ Na raiz do projeto
- ✅ Login com Supabase Auth direto
- ✅ Sem servidor Node.js/Express
- ✅ Deploy simples na Vercel
- ✅ Interface visual 100% preservada

### 2. **Bot do Telegram**
- ✅ Arquivo `bot.js` na raiz
- ✅ Funciona independente do frontend
- ✅ Salva produtos no Supabase
- ✅ Roda separado com `npm run bot`

## 📦 Estrutura Final

```
/
├── src/                      ← Frontend React
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   │   └── useAuth.jsx      ← Usa Supabase Auth
│   ├── lib/
│   │   └── supabase.js      ← Cliente Supabase
│   └── utils/
├── bot.js                    ← Bot do Telegram
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .env                      ← Configure aqui!
```

## 🚀 Como Usar

### 1. Configure o .env:
```env
# Frontend
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica-aqui

# Bot
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
TELEGRAM_BOT_TOKEN=seu-token-do-bot-aqui
ADMIN_CHAT_ID=seu-chat-id-aqui
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Rode o Frontend:
```bash
npm run dev
```
Acesse: `http://localhost:5173`

### 4. Rode o Bot (em outro terminal):
```bash
npm run bot
```

## 🌐 Deploy

### Frontend na Vercel:
```bash
git add .
git commit -m "Frontend simplificado + Bot separado"
git push
```

**Configuração na Vercel:**
- Framework: Vite (detectado automaticamente)
- Build Command: `npm run build`
- Output Directory: `dist`
- Variáveis de ambiente:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

### Bot (rodar local ou em servidor):
- **Local:** `npm run bot` (deixe rodando)
- **Servidor:** Deploy em VPS/Railway/Heroku com `node bot.js`
- **PM2:** `pm2 start bot.js --name "bot"`

## 🔐 Login no Site

1. Crie um usuário no Supabase:
   - Dashboard → Authentication → Users → Add User
   - Email: `silva@exemplo.com`
   - Password: sua senha
   - Marque "Auto Confirm User"

2. Acesse: `http://localhost:5173/silva.admin/login`

3. Use o email e senha que você criou

## 📱 Bot do Telegram

1. Envie `/start` para o bot
2. Envie um link da Shopee
3. O bot salva no banco
4. O site exibe automaticamente

## ✅ Checklist Final

- [ ] Configurar `.env` com suas chaves
- [ ] Instalar dependências: `npm install`
- [ ] Criar usuário no Supabase Authentication
- [ ] Testar frontend: `npm run dev`
- [ ] Testar login: `/silva.admin/login`
- [ ] Testar bot: `npm run bot`
- [ ] Fazer commit e push
- [ ] Deploy na Vercel

## 🎯 Resultado

- ✅ Frontend funciona sozinho (sem backend)
- ✅ Bot funciona sozinho (sem frontend)
- ✅ Ambos usam o mesmo banco (Supabase)
- ✅ Deploy super simples
- ✅ Sem erro 404
- ✅ Interface preservada

---

**ESTÁ PRONTO PARA USAR!** 🚀

Leia `BOT_TELEGRAM.md` para mais detalhes sobre o bot.
