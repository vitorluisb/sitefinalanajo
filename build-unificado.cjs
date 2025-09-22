const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build unificado - Site + Cartão no mesmo domínio...\n');

// Função para copiar arquivos
function copyFile(src, dest) {
    const srcPath = path.join(__dirname, src);
    const destPath = path.join(__dirname, dest);
    
    // Criar diretório de destino se não existir
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Copiado: ${src} -> ${dest}`);
    } else {
        console.log(`⚠️  Arquivo não encontrado: ${src}`);
    }
}

// Função para copiar diretório recursivamente
function copyDirectory(src, dest) {
    const srcPath = path.join(__dirname, src);
    const destPath = path.join(__dirname, dest);
    
    if (!fs.existsSync(srcPath)) {
        console.log(`⚠️  Diretório não encontrado: ${src}`);
        return;
    }
    
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
    }
    
    const items = fs.readdirSync(srcPath);
    
    items.forEach(item => {
        const srcItem = path.join(srcPath, item);
        const destItem = path.join(destPath, item);
        
        if (fs.statSync(srcItem).isDirectory()) {
            copyDirectory(path.relative(__dirname, srcItem), path.relative(__dirname, destItem));
        } else {
            fs.copyFileSync(srcItem, destItem);
        }
    });
    
    console.log(`✅ Copiado diretório: ${src} -> ${dest}`);
}

// Função para criar o cartão integrado
function createCartaoIntegrado() {
    // O cartão React já está incluído no build principal
    // A rota /cartao será servida pelo React Router
    console.log('✅ Cartão React disponível em /cartao via React Router');
}

// Função para criar arquivo .htaccess unificado
function createUnifiedHtaccess() {
    const htaccessContent = `# 🔒 Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 🛡️ Security Headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;"

# 📦 Cache Control
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# 🎯 React Router - todas as rotas vão para index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# 📱 PWA Support
<Files "manifest.json">
    Header set Content-Type "application/manifest+json"
</Files>`;

    const htaccessPath = path.join(__dirname, 'dist', '.htaccess');
    fs.writeFileSync(htaccessPath, htaccessContent);
    console.log('✅ Criado: .htaccess unificado com redirecionamentos');
}

// Função para criar arquivo _redirects para Netlify
function createUnifiedNetlifyRedirects() {
    const redirectsContent = `# 🔒 Force HTTPS
http://anajo.org.br/* https://anajo.org.br/:splat 301!
http://www.anajo.org.br/* https://anajo.org.br/:splat 301!

# 🎯 React Router - todas as rotas vão para index.html
/* /index.html 200

# 🛡️ Headers para segurança
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self' https:; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;

# 📱 PWA Headers
/manifest.json
  Content-Type: application/manifest+json`;

    const redirectsPath = path.join(__dirname, 'dist', '_redirects');
    fs.writeFileSync(redirectsPath, redirectsContent);
    console.log('✅ Criado: _redirects unificado para Netlify');
}

// Função para criar vercel.json unificado
function createUnifiedVercelConfig() {
    const vercelConfig = {
        "buildCommand": "npm run build && node build-unificado.cjs",
        "outputDirectory": "dist",
        "rewrites": [
            {
                "source": "/(.*)",
                "destination": "/index.html"
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
    };

    const vercelPath = path.join(__dirname, 'vercel.json');
    fs.writeFileSync(vercelPath, JSON.stringify(vercelConfig, null, 2));
    console.log('✅ Criado: vercel.json unificado');
}

// Verificar se o build do site principal existe
if (!fs.existsSync('dist')) {
    console.log('❌ Pasta dist/ não encontrada. Execute primeiro: npm run build');
    process.exit(1);
}

console.log('📁 Integrando cartão ao site principal...\n');

// Criar subpasta do cartão
createCartaoIntegrado();

// Copiar assets do cartão
copyFile('public/logoanajo.png', 'dist/cartao/logoanajo.png');
copyFile('public/profile-placeholder.svg', 'dist/cartao/profile-placeholder.svg');

// Criar arquivos de configuração
createUnifiedHtaccess();
createUnifiedNetlifyRedirects();
createUnifiedVercelConfig();

console.log('\n✅ Build unificado concluído!');
console.log('📁 Estrutura criada:');
console.log('   dist/                    # Site principal');
console.log('   dist/cartao/             # Cartão de visita');
console.log('   dist/.htaccess           # Configuração Apache');
console.log('   dist/_redirects          # Configuração Netlify');
console.log('   vercel.json              # Configuração Vercel');
console.log('');
console.log('🌐 URLs de acesso:');
console.log('   https://anajo.org.br/           # Site principal');
console.log('   https://anajo.org.br/cartao     # Cartão de visita');
console.log('');
console.log('🚀 Para hospedar: faça upload da pasta dist/ para seu servidor web');
console.log('🔒 HTTPS será configurado automaticamente');