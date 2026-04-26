# 🤖 Bot do Telegram - Guia de Uso

## ✅ O que foi feito

O bot do Telegram foi **preservado** e agora está na raiz do projeto como `bot.js`.

## 📦 Estrutura

```
/
├── bot.js                    ← Bot do Telegram (roda separado)
├── src/                      ← Frontend React
├── package.json              ← Dependências compartilhadas
└── .env                      ← Variáveis de ambiente
```

## 🔧 Configuração

### 1. Variáveis de Ambiente

Edite o arquivo `.env` na raiz:

```env
# Frontend (site)
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica-aqui

# Bot do Telegram
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
TELEGRAM_BOT_TOKEN=seu-token-do-bot-aqui
ADMIN_CHAT_ID=seu-chat-id-aqui
```

### 2. Instalar Dependências

```bash
npm install
```

## 🚀 Como Rodar

### Frontend (Site):
```bash
npm run dev
```
Acessa: `http://localhost:5173`

### Bot do Telegram:
```bash
npm run bot
```

## 💡 Como Funciona

### Frontend + Bot são INDEPENDENTES:

1. **Frontend (Site):**
   - Roda com Vite
   - Usa Supabase Auth para login
   - Lê produtos do banco de dados
   - Deploy na Vercel

2. **Bot do Telegram:**
   - Roda separado (Node.js puro)
   - Recebe links da Shopee
   - Salva produtos no Supabase
   - Roda na sua máquina ou servidor separado

## 🔄 Fluxo de Trabalho

```
Bot (Telegram) → Supabase (Banco) ← Frontend (Site)
```

1. Você envia link da Shopee no Telegram
2. Bot salva o produto no Supabase
3. Site lê os produtos do Supabase e exibe

## 📱 Comandos do Bot

- `/start` - Instruções
- `/p [link] [preço] [descrição]` - Postar produto manualmente
- Ou simplesmente envie um link da Shopee (modo automático)

## 🌐 Deploy

### Frontend (Vercel):
```bash
git add .
git commit -m "Frontend simplificado"
git push
```

A Vercel faz deploy automático do site.

### Bot (Rodar Local ou VPS):

**Opção 1: Rodar na sua máquina**
```bash
npm run bot
```
Deixe rodando em segundo plano.

**Opção 2: Rodar em servidor (VPS/Railway/Heroku)**
- Faça deploy do `bot.js` em um servidor Node.js
- Configure as variáveis de ambiente
- Rode: `node bot.js`

**Opção 3: Rodar com PM2 (recomendado para produção)**
```bash
npm install -g pm2
pm2 start bot.js --name "promovitrine-bot"
pm2 save
pm2 startup
```

## ⚠️ Importante

- O **frontend NÃO precisa do bot** para funcionar
- O **bot NÃO precisa do frontend** para funcionar
- Ambos usam o **mesmo banco de dados** (Supabase)
- Você pode rodar só o frontend se não quiser usar o bot

## 🧪 Testando

### 1. Teste o Frontend:
```bash
npm run dev
```
Acesse: `http://localhost:5173/silva-admin/login`

### 2. Teste o Bot:
```bash
npm run bot
```
Envie `/start` no Telegram para o seu bot.

## 📋 Checklist

- [ ] Configurar `.env` com as chaves do Supabase
- [ ] Configurar token do bot do Telegram
- [ ] Instalar dependências: `npm install`
- [ ] Testar frontend: `npm run dev`
- [ ] Testar bot: `npm run bot`
- [ ] Deploy do frontend na Vercel
- [ ] Rodar bot em servidor separado (opcional)

---

**Resumo:** Frontend e Bot são independentes. Frontend vai para a Vercel, Bot roda separado na sua máquina ou servidor. 🚀
