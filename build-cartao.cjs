const fs = require('fs');
const path = require('path');

// Função para copiar arquivos necessários
function copyFile(src, dest) {
    const srcPath = path.join(__dirname, src);
    const destPath = path.join(__dirname, 'dist-cartao', dest);
    
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

// Função para criar o index.html do cartão com HTTPS
function createCartaoIndex() {
    let cartaoContent = fs.readFileSync(path.join(__dirname, 'public', 'cartao-standalone.html'), 'utf8');
    
    // Atualizar caminhos das imagens
    cartaoContent = cartaoContent.replace('src="/logoanajo.png"', 'src="./logoanajo.png"')
                                .replace('src="/profile-placeholder.svg"', 'src="./profile-placeholder.svg"');
    
    // Adicionar meta tags de segurança para HTTPS
    const securityMetas = `
    <!-- 🔒 Security Headers para HTTPS -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' https:; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="X-XSS-Protection" content="1; mode=block">
    <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains">
    
    <!-- 🌐 Canonical URL para SEO -->
    <link rel="canonical" href="https://cartao.anajo.org.br/">
    
    <!-- 📱 PWA Meta Tags -->
    <meta name="theme-color" content="#2563eb">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Cartão Anajô">`;
    
    // Inserir as meta tags após o viewport
    cartaoContent = cartaoContent.replace(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">' + securityMetas
    );
    
    // Forçar HTTPS nos links externos
    cartaoContent = cartaoContent.replace(/http:\/\//g, 'https://');
    
    const distPath = path.join(__dirname, 'dist-cartao', 'index.html');
    fs.writeFileSync(distPath, cartaoContent);
    console.log('✅ Criado: index.html do cartão com HTTPS');
}

// Função para criar arquivo .htaccess para Apache
function createHtaccess() {
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
</IfModule>`;

    const htaccessPath = path.join(__dirname, 'dist-cartao', '.htaccess');
    fs.writeFileSync(htaccessPath, htaccessContent);
    console.log('✅ Criado: .htaccess para Apache com HTTPS');
}

// Função para criar arquivo _redirects para Netlify
function createNetlifyRedirects() {
    const redirectsContent = `# 🔒 Force HTTPS
http://cartao-anajo.netlify.app/* https://cartao-anajo.netlify.app/:splat 301!
http://www.cartao-anajo.netlify.app/* https://cartao-anajo.netlify.app/:splat 301!

# 🛡️ Headers para segurança
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self' https:; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;`;

    const redirectsPath = path.join(__dirname, 'dist-cartao', '_redirects');
    fs.writeFileSync(redirectsPath, redirectsContent);
    console.log('✅ Criado: _redirects para Netlify com HTTPS');
}

// Criar diretório de distribuição
if (!fs.existsSync('dist-cartao')) {
    fs.mkdirSync('dist-cartao');
}

console.log('🚀 Iniciando build do cartão de visita standalone com HTTPS...\n');

// Copiar arquivos necessários
copyFile('public/logoanajo.png', 'logoanajo.png');
copyFile('public/profile-placeholder.svg', 'profile-placeholder.svg');

// Criar arquivos
createCartaoIndex();
createHtaccess();
createNetlifyRedirects();

console.log('\n✅ Build do cartão de visita com HTTPS concluído!');
console.log('📁 Arquivos gerados em: dist-cartao/');
console.log('🔒 Configurações HTTPS incluídas:');
console.log('   - Meta tags de segurança');
console.log('   - .htaccess para Apache');
console.log('   - _redirects para Netlify');
console.log('🌐 Para hospedar: faça upload da pasta dist-cartao/ para seu servidor web');
console.log('🔗 URL de acesso: https://seudominio.com/ (HTTPS obrigatório)');
