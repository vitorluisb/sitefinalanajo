// 🔒 Configuração HTTPS para Produção
// Este arquivo contém configurações para diferentes provedores de hospedagem

const httpsConfig = {
  // 🌐 Configurações gerais
  general: {
    forceHttps: true,
    hstsEnabled: true,
    hstsMaxAge: 31536000, // 1 ano
    redirectHttpToHttps: true
  },

  // 🚀 Netlify
  netlify: {
    // Arquivo: _redirects (criar na pasta dist-cartao)
    redirects: `
# Force HTTPS
http://cartao-anajo.netlify.app/* https://cartao-anajo.netlify.app/:splat 301!
http://www.cartao-anajo.netlify.app/* https://cartao-anajo.netlify.app/:splat 301!

# Headers para segurança
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self' https:; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;
`,
    
    // Arquivo: netlify.toml (criar na raiz do projeto)
    toml: `
[build]
  publish = "dist-cartao"
  
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
    Content-Security-Policy = "default-src 'self' https:; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;"

[[redirects]]
  from = "http://cartao-anajo.netlify.app/*"
  to = "https://cartao-anajo.netlify.app/:splat"
  status = 301
  force = true
`
  },

  // ▲ Vercel
  vercel: {
    // Arquivo: vercel.json (criar na raiz do projeto)
    json: `
{
  "version": 2,
  "builds": [
    {
      "src": "dist-cartao/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/dist-cartao/$1"
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
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self' https:; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "http://cartao-anajo.vercel.app/(.*)",
      "destination": "https://cartao-anajo.vercel.app/$1",
      "permanent": true
    }
  ]
}
`
  },

  // 🐙 GitHub Pages
  githubPages: {
    // Arquivo: .github/workflows/deploy.yml
    workflow: `
name: Deploy to GitHub Pages with HTTPS

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build cartão
      run: npm run build:cartao
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: \${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist-cartao
        force_orphan: true
        cname: cartao.anajo.org.br  # Seu domínio personalizado
`
  },

  // 🌍 Servidor Apache (.htaccess)
  apache: {
    htaccess: `
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Security Headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;"

# Cache Control
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
`
  },

  // 🌍 Servidor Nginx
  nginx: {
    config: `
server {
    listen 80;
    server_name cartao.anajo.org.br www.cartao.anajo.org.br;
    return 301 https://cartao.anajo.org.br$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.cartao.anajo.org.br;
    return 301 https://cartao.anajo.org.br$request_uri;
}

server {
    listen 443 ssl http2;
    server_name cartao.anajo.org.br;
    
    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/cartao.anajo.org.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cartao.anajo.org.br/privkey.pem;
    
    # SSL Security
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    add_header Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;";
    
    # Document Root
    root /var/www/cartao.anajo.org.br;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Cache Control
    location ~* \.(css|js|png|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
`
  }
};

module.exports = httpsConfig;