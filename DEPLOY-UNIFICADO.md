# 🌐 Deploy Unificado - Site + Cartão no Mesmo Domínio

## 📋 Visão Geral

Este guia explica como hospedar o **site principal** e o **cartão de visita** no mesmo domínio usando uma única hospedagem.

### 🎯 Estrutura Final
```
https://anajo.org.br/           # Site principal
https://anajo.org.br/cartao/    # Cartão de visita
```

## 🚀 Como Fazer o Build Unificado

### 1. Build Completo (Recomendado)
```bash
npm run build:unificado
```

Este comando:
- ✅ Faz build do site principal (`npm run build`)
- ✅ Integra o cartão na subpasta `/cartao/`
- ✅ Configura redirecionamentos automáticos
- ✅ Aplica configurações de segurança HTTPS

### 2. Build Manual (Passo a Passo)
```bash
# 1. Build do site principal
npm run build

# 2. Integração do cartão
node build-unificado.cjs
```

## 📁 Estrutura de Arquivos Gerada

```
dist/
├── index.html              # Site principal
├── assets/                 # CSS/JS do site
├── cartao/                 # 📂 Cartão de visita
│   ├── index.html          # Página do cartão
│   ├── logoanajo.png       # Logo
│   └── profile-placeholder.svg
├── .htaccess              # Configuração Apache
├── _redirects             # Configuração Netlify
└── manifest.json          # PWA

vercel.json                # Configuração Vercel (raiz)
```

## 🌐 Opções de Hospedagem

### 🔥 Netlify (Recomendado - Gratuito)

1. **Deploy via Git:**
   ```bash
   # Conecte seu repositório no Netlify
   # Build command: npm run build:unificado
   # Publish directory: dist
   ```

2. **Deploy via Drag & Drop:**
   - Faça o build: `npm run build:unificado`
   - Arraste a pasta `dist/` para o Netlify

3. **Configuração de Domínio:**
   - Vá em Site Settings > Domain Management
   - Adicione seu domínio personalizado
   - SSL será configurado automaticamente

### ⚡ Vercel (Gratuito)

1. **Deploy via Git:**
   ```bash
   # Conecte seu repositório no Vercel
   # Build command será detectado automaticamente
   ```

2. **Deploy via CLI:**
   ```bash
   npm install -g vercel
   npm run build:unificado
   vercel --prod
   ```

### 🐙 GitHub Pages

1. **Configuração:**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build:unificado
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

### 🖥️ Servidor Próprio (Apache/Nginx)

#### Apache
1. Faça upload da pasta `dist/` para o servidor
2. O arquivo `.htaccess` já está configurado
3. Certifique-se que mod_rewrite está ativo

#### Nginx
```nginx
server {
    listen 443 ssl;
    server_name anajo.org.br;
    root /var/www/dist;
    
    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    
    # Cartão redirect
    location /cartao {
        try_files $uri $uri/ /cartao/index.html;
    }
    
    # Site principal
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔒 Configurações de Segurança

### Headers Aplicados Automaticamente:
- ✅ **HTTPS Forçado** - Redirecionamento automático
- ✅ **X-Frame-Options** - Proteção contra clickjacking
- ✅ **X-Content-Type-Options** - Proteção MIME
- ✅ **Strict-Transport-Security** - HSTS
- ✅ **Content-Security-Policy** - CSP restritivo

### URLs Canônicas:
- Site: `https://anajo.org.br/`
- Cartão: `https://anajo.org.br/cartao/`

## 🧪 Testando Localmente

### 1. Servidor de Desenvolvimento
```bash
npm run dev
# Acesse: https://localhost:3000/
# Cartão: use a rota React https://localhost:3000/cartao (standalone removido)
```

### 2. Preview do Build
```bash
npm run build:unificado
npx serve dist -s
# Acesse: http://localhost:3000/
# Cartão: http://localhost:3000/cartao/
```

## 🎯 Redirecionamentos Configurados

### Automáticos:
- `/cartao` → `/cartao/index.html`
- `/cartao/` → `/cartao/index.html`
- `http://` → `https://` (força HTTPS)

### Para SEO:
- Canonical URLs configuradas
- Meta tags otimizadas
- Sitemap automático

## 📱 PWA e Mobile

### Recursos Incluídos:
- ✅ Manifest.json configurado
- ✅ Meta tags para mobile
- ✅ Apple touch icons
- ✅ Theme color configurado

## 🔧 Troubleshooting

### Problema: Cartão não carrega
**Solução:** Verifique se executou `npm run build:unificado`

### Problema: HTTPS não funciona
**Solução:** Configure SSL no seu provedor de hospedagem

### Problema: Redirecionamentos não funcionam
**Solução:** 
- **Apache:** Ative mod_rewrite
- **Netlify:** Arquivo `_redirects` deve estar na pasta `dist/`
- **Vercel:** Arquivo `vercel.json` deve estar na raiz

### Problema: Assets não carregam
**Solução:** Verifique se os caminhos estão corretos no build

## 📊 Monitoramento

### Ferramentas Recomendadas:
- **Google Analytics** - Tráfego
- **Google Search Console** - SEO
- **Lighthouse** - Performance
- **GTmetrix** - Velocidade

## 🚀 Deploy Rápido

### Comando Único:
```bash
# Build + Deploy (exemplo Netlify)
npm run build:unificado && netlify deploy --prod --dir=dist
```

### Checklist de Deploy:
- [ ] Build executado com sucesso
- [ ] Pasta `dist/` contém site + cartão
- [ ] Domínio configurado
- [ ] SSL ativo
- [ ] Redirecionamentos funcionando
- [ ] Performance testada

---

## 📞 Suporte

Para dúvidas sobre este setup:
1. Verifique os logs de build
2. Teste localmente primeiro
3. Consulte a documentação do seu provedor de hospedagem

**Estrutura criada por:** Build Unificado Anajô v1.0
**Última atualização:** Janeiro 2025