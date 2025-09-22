# 🔒 Deploy com HTTPS - Cartão de Visita Anajô

## 📋 Visão Geral

Este guia explica como fazer deploy do cartão de visita digital da Anajô com HTTPS habilitado em diferentes provedores de hospedagem.

## 🚀 Build para Produção

### 1. Gerar Build
```bash
# Executar o build do site (inclui /cartao)
npm run build
```

### 2. Arquivos Gerados
Após o build, a pasta `dist/` conterá os arquivos do site (inclui a rota `/cartao`).

## 🌐 Provedores de Hospedagem

### 🔵 Netlify (Recomendado)

#### Deploy Automático
1. Conecte seu repositório GitHub ao Netlify
2. Configure as seguintes opções:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Branch**: `main`

#### Deploy Manual
1. Execute `npm run build`
2. Faça upload da pasta `dist/` no Netlify

#### Domínio Personalizado
```
# No painel do Netlify:
1. Domain settings > Add custom domain
2. Configure DNS: CNAME cartao.anajo.org.br -> seu-site.netlify.app
3. SSL será configurado automaticamente (Let's Encrypt)
```

### 🟢 Vercel

#### Deploy via CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Build e deploy
npm run build
cd dist
vercel --prod
```

#### Configuração vercel.json
Crie `vercel.json` na raiz do projeto (opcional):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "/$1",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}
```

### 🟣 GitHub Pages

#### Configuração
1. Crie branch `gh-pages`
2. Configure GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Build
      run: npm run build
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

#### HTTPS no GitHub Pages
- HTTPS é automático para domínios `.github.io`
- Para domínio personalizado: Configure DNS e habilite HTTPS nas configurações

### 🔴 Servidor Apache

#### Upload de Arquivos
1. Execute `node build-cartao.cjs`
2. Faça upload da pasta `dist/` para o servidor
3. O arquivo `.htaccess` configurará automaticamente:
   - Redirecionamento HTTP → HTTPS
   - Headers de segurança
   - Cache control

#### Configuração SSL
```apache
# No VirtualHost do Apache
<VirtualHost *:443>
    ServerName cartao.anajo.org.br
    DocumentRoot /var/www/cartao
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    SSLCertificateChainFile /path/to/ca_bundle.crt
</VirtualHost>

# Redirecionamento HTTP para HTTPS
<VirtualHost *:80>
    ServerName cartao.anajo.org.br
    Redirect permanent / https://cartao.anajo.org.br/
</VirtualHost>
```

### 🟡 Nginx

#### Configuração do Site
```nginx
# /etc/nginx/sites-available/cartao-anajo
server {
    listen 80;
    server_name cartao.anajo.org.br;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name cartao.anajo.org.br;
    
    root /var/www/cartao;
    index index.html;
    
    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    
    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    
    # Cache Control
    location ~* \.(css|js|png|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔐 Certificados SSL

### Let's Encrypt (Gratuito)

#### Certbot para Apache
```bash
# Instalar certbot
sudo apt install certbot python3-certbot-apache

# Obter certificado
sudo certbot --apache -d cartao.anajo.org.br
```

#### Certbot para Nginx
```bash
# Instalar certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d cartao.anajo.org.br
```

### Cloudflare (Gratuito)
1. Adicione seu domínio ao Cloudflare
2. Configure DNS para apontar para seu servidor
3. Habilite SSL/TLS no painel do Cloudflare
4. Configure modo "Full (strict)" para máxima segurança

## 🧪 Teste do HTTPS

### Verificações Essenciais
```bash
# Testar redirecionamento HTTP → HTTPS
curl -I http://cartao.anajo.org.br

# Verificar certificado SSL
openssl s_client -connect cartao.anajo.org.br:443 -servername cartao.anajo.org.br

# Testar headers de segurança
curl -I https://cartao.anajo.org.br
```

### Ferramentas Online
- [SSL Labs Test](https://www.ssllabs.com/ssltest/)
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)

## 📱 PWA e HTTPS

O cartão está configurado como PWA e requer HTTPS para:
- Service Workers
- Notificações push
- Geolocalização
- Câmera/microfone
- Instalação como app

## 🔧 Troubleshooting

### Erro: "Mixed Content"
- Verifique se todos os recursos (CSS, JS, imagens) usam HTTPS
- O build automaticamente converte HTTP → HTTPS

### Erro: "Certificate Invalid"
- Verifique se o certificado inclui o domínio correto
- Confirme se o certificado não expirou
- Teste com diferentes navegadores

### Erro: "HSTS Preload"
- Aguarde propagação DNS (até 48h)
- Limpe cache do navegador
- Teste em modo incógnito

## 📞 Suporte

Para dúvidas sobre deploy com HTTPS:
- 📧 Email: suporte@anajo.org.br
- 📱 WhatsApp: (11) 99999-9999
- 🌐 Site: https://anajo.org.br

---

**✅ Checklist de Deploy:**
- [ ] Build executado com sucesso
- [ ] Arquivos enviados para servidor
- [ ] HTTPS configurado e funcionando
- [ ] Redirecionamento HTTP → HTTPS ativo
- [ ] Headers de segurança configurados
- [ ] Teste SSL aprovado (A+ no SSL Labs)
- [ ] PWA funcionando corretamente