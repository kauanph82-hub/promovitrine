# 📸 Configurar Storage de Imagens no Supabase

## Por que isso é necessário?

O código agora faz upload de imagens diretamente para o Supabase Storage. Você precisa criar o bucket (pasta) onde as imagens serão armazenadas.

## Passo a Passo (2 minutos)

### 1️⃣ Acesse o Supabase Storage

1. Vá em: https://supabase.com/dashboard
2. Entre no seu projeto
3. Clique em **Storage** no menu lateral

### 2️⃣ Crie o Bucket

1. Clique em **New bucket**
2. Preencha:
   - **Name:** `product-images`
   - **Public bucket:** ✅ **MARQUE ESTA OPÇÃO** (para as imagens serem acessíveis publicamente)
3. Clique em **Create bucket**

### 3️⃣ Configure as Políticas de Acesso (RLS)

Por padrão, o Supabase bloqueia uploads. Você precisa permitir:

1. Clique no bucket `product-images` que você acabou de criar
2. Clique em **Policies** (ou **Políticas**)
3. Clique em **New policy**

**Política 1: Permitir Upload (para admins autenticados)**
```sql
-- Nome: Allow authenticated uploads
-- Operation: INSERT
-- Policy definition:
(auth.role() = 'authenticated')
```

**Política 2: Permitir Leitura Pública**
```sql
-- Nome: Allow public read
-- Operation: SELECT
-- Policy definition:
true
```

**Política 3: Permitir Delete (para admins autenticados)**
```sql
-- Nome: Allow authenticated delete
-- Operation: DELETE
-- Policy definition:
(auth.role() = 'authenticated')
```

### 4️⃣ Alternativa Rápida (Desabilitar RLS temporariamente)

Se você quiser testar rapidamente sem configurar políticas:

1. Vá em **Storage** → `product-images`
2. Clique em **Configuration**
3. **Desabilite** o RLS (Row Level Security)

⚠️ **Atenção:** Isso permite que qualquer pessoa faça upload. Use apenas para testes!

## ✅ Pronto!

Agora você pode fazer upload de imagens no painel admin. As imagens serão armazenadas no Supabase e ficarão acessíveis publicamente.

---

**Dica:** Se der erro de permissão ao fazer upload, verifique se:
1. O bucket `product-images` existe
2. O bucket está marcado como **público**
3. As políticas de RLS estão configuradas (ou RLS está desabilitado)
