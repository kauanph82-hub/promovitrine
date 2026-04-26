# ✅ Migração Completa para Supabase

## O que foi feito?

### 🗑️ Removido
- ❌ `src/utils/api.js` (código antigo com Axios e chamadas para /api)
- ❌ Todas as referências a `localStorage.getItem('admin_token')`
- ❌ Todas as chamadas `api.get()`, `api.post()`, `api.put()`, `api.delete()`

### ✅ Migrado para Supabase

Todos os arquivos agora usam **Supabase diretamente**:

#### Páginas Admin
- ✅ `src/pages/admin/AdminLogin.jsx` - Login com `supabase.auth.signInWithPassword()`
- ✅ `src/pages/admin/AdminDashboard.jsx` - Lista produtos do Supabase
- ✅ `src/pages/admin/AdminProductForm.jsx` - CRUD de produtos + upload de imagens
- ✅ `src/pages/admin/AdminCategories.jsx` - CRUD de categorias

#### Páginas Públicas
- ✅ `src/pages/Home.jsx` - Lista produtos com filtros
- ✅ `src/pages/CategoryPage.jsx` - Produtos por categoria
- ✅ `src/pages/ProductDetail.jsx` - Detalhes do produto

#### Hooks
- ✅ `src/hooks/useAuth.jsx` - Autenticação com Supabase Auth

## 📋 Checklist de Configuração

### 1. Configurar Variáveis de Ambiente

**Arquivo `.env` (local):**
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica-aqui
```

**Vercel (produção):**
- Vá em Settings → Environment Variables
- Adicione as mesmas variáveis acima

### 2. Criar Usuário Admin no Supabase

1. Painel Supabase → **Authentication** → **Users**
2. **Add user** → **Create new user**
3. Email: `admin@exemplo.com` (ou qualquer email)
4. Password: sua senha
5. ✅ Marque **Auto Confirm User**

### 3. Configurar Storage de Imagens

Siga o guia: `CONFIGURAR_STORAGE_SUPABASE.md`

Resumo:
1. Criar bucket `product-images` (público)
2. Configurar políticas de RLS ou desabilitar RLS para testes

### 4. Estrutura do Banco de Dados

Certifique-se de que as tabelas existem:

```sql
-- Tabela de categorias
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de produtos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  original_price DECIMAL(10,2),
  promo_price DECIMAL(10,2),
  affiliate_link TEXT NOT NULL,
  platform TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  tags TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de imagens
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de cupons
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  description TEXT,
  discount TEXT,
  expires_at DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🚀 Como Testar

### Local
```bash
npm install
npm run dev
```

Acesse:
- Site: http://localhost:5173
- Admin: http://localhost:5173/silva.admin/login

### Deploy
```bash
git add .
git commit -m "feat: migração completa para Supabase"
git push origin main
```

## 🐛 Troubleshooting

### Erro: "Missing environment variables"
- Verifique se o `.env` tem as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- Na Vercel, configure as mesmas variáveis

### Erro: "Invalid login credentials"
- Verifique se o usuário foi criado no Supabase Auth
- Certifique-se de que marcou "Auto Confirm User"

### Erro ao fazer upload de imagens
- Verifique se o bucket `product-images` existe
- Verifique se o bucket está marcado como público
- Verifique as políticas de RLS

### Produtos não aparecem
- Verifique se as tabelas existem no Supabase
- Verifique se há produtos com `active = true`
- Abra o console do navegador (F12) para ver erros

## 📝 Próximos Passos

1. Configure as variáveis de ambiente
2. Crie o usuário admin
3. Configure o storage
4. Teste localmente
5. Faça o deploy na Vercel

---

**Tudo pronto!** Agora seu site está 100% no Supabase, sem backend separado. 🎉
