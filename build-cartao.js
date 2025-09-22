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

// Função para criar o index.html do cartão
function createCartaoIndex() {
    const cartaoContent = fs.readFileSync(path.join(__dirname, 'public', 'cartao-standalone.html'), 'utf8');
    const indexContent = cartaoContent.replace('src="/logoanajo.png"', 'src="./logoanajo.png"')
                                    .replace('src="/profile-placeholder.svg"', 'src="./profile-placeholder.svg"');
    
    const distPath = path.join(__dirname, 'dist-cartao', 'index.html');
    fs.writeFileSync(distPath, indexContent);
    console.log('✅ Criado: index.html do cartão');
}

// Criar diretório de distribuição
if (!fs.existsSync('dist-cartao')) {
    fs.mkdirSync('dist-cartao');
}

console.log('🚀 Iniciando build do cartão de visita standalone...\n');

// Copiar arquivos necessários
copyFile('public/logoanajo.png', 'logoanajo.png');
copyFile('public/profile-placeholder.svg', 'profile-placeholder.svg');

// Criar index.html
createCartaoIndex();

console.log('\n✅ Build do cartão de visita concluído!');
console.log('📁 Arquivos gerados em: dist-cartao/');
console.log('🌐 Para hospedar: faça upload da pasta dist-cartao/ para seu servidor web');
console.log('🔗 URL de acesso: https://seudominio.com/ (ou subpasta)');
