# Configuração Vercel - Frontend + Backend

## ✅ O que foi configurado

### 1. Arquivo `vercel.json` na raiz
Criado um arquivo de configuração que:
- **Build do Frontend**: Compila o React/Vite da pasta `frontend/`
- **Build do Backend**: Configura o Node.js da pasta `backend/`
- **Rotas**:
  - `/api/*` → Direciona para o backend (server.js)
  - `/*` → Direciona para o frontend (arquivos estáticos)

### 2. Script `vercel-build` no frontend
Adicionado ao `frontend/package.json` para a Vercel saber como buildar o projeto.

## 🚀 Próximos passos na Vercel

### Opção 1: Deploy via Git (Recomendado)
1. Faça commit e push das alterações:
   ```bash
   git add vercel.json frontend/package.json
   git commit -m "Configurar vercel.json para frontend + backend"
   git push
   ```

2. A Vercel vai detectar automaticamente e fazer o redeploy

### Opção 2: Deploy manual via CLI
```bash
vercel --prod
```

## 🔧 Configurações na Vercel Dashboard

**NÃO ALTERE** o Root Directory - deixe como `.` (raiz)

### Variáveis de ambiente necessárias:
Certifique-se de que estas variáveis estão configuradas:

**Backend:**
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `TELEGRAM_BOT_TOKEN`
- `NODE_ENV=production`

**Frontend:**
- `VITE_API_URL` (URL do seu projeto Vercel, ex: `https://seu-projeto.vercel.app`)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🧪 Testando após deploy

1. Teste o backend:
   ```
   https://seu-projeto.vercel.app/api/health
   ```
   Deve retornar: `{"status":"ok","timestamp":"..."}`

2. Teste o frontend:
   ```
   https://seu-projeto.vercel.app
   ```
   Deve carregar a página inicial

3. Teste uma rota da API:
   ```
   https://seu-projeto.vercel.app/api/products
   ```

## ⚠️ Problemas comuns

### Se ainda der 404 nas rotas /api:
1. Verifique se o `vercel.json` está na **raiz** do projeto
2. Confirme que o Root Directory está como `.` (raiz)
3. Verifique os logs de build na Vercel
4. Certifique-se de que não há outro `vercel.json` conflitante

### Se o frontend não carregar:
1. Verifique se o build do Vite foi bem-sucedido
2. Confirme que a pasta `frontend/dist` foi gerada
3. Verifique as variáveis de ambiente `VITE_*`

## 📝 Estrutura final

```
/
├── vercel.json              ← Configuração principal
├── frontend/
│   ├── package.json         ← Com script vercel-build
│   └── dist/                ← Gerado no build
└── backend/
    └── server.js            ← API serverless
```
