# 🎯 Cartão de Visita Digital - Guia de Hospedagem

## 📋 Visão Geral

O cartão de visita digital foi criado como uma aplicação **standalone** (independente) que pode ser hospedada separadamente do site principal da Associação Anajô.

## 🚀 Configuração Atual

### **Site Principal:**
- **Porta**: 3000
- **URL**: `http://localhost:3000/`
- **Rota do cartão**: `http://localhost:3000/cartao`

### **Cartão Standalone:**
- **Porta**: 3001
- **URL**: `http://localhost:3001/`
- **Arquivos**: `dist-cartao/` (pronto para hospedagem)

## 🛠️ Comandos Disponíveis

### **Desenvolvimento:**
```bash
# Site principal
npm run dev

# Cartão standalone (após build)
npm run serve:cartao
```

### **Build:**
```bash
# Site principal
npm run build

# Cartão standalone
npm run build:cartao
```

## 📁 Estrutura de Arquivos

```
projeto/
├── dist/                    # Build do site principal
├── dist-cartao/            # Build do cartão standalone
│   ├── index.html          # Página principal do cartão
│   ├── logoanajo.png       # Logo da associação
│   └── profile-placeholder.svg  # Avatar placeholder
├── public/
│   └── cartao-standalone.html  # Template standalone
├── src/
│   └── pages/
│       └── CartaoVisita.tsx    # Componente React
└── build-cartao.cjs        # Script de build
```

## 🌐 Opções de Hospedagem

### **1. Hospedagem Separada (Recomendado)**

#### **Vantagens:**
- ✅ **Independência total** do site principal
- ✅ **URLs diferentes** (ex: `cartao.anajo.org.br`)
- ✅ **Deploy independente**
- ✅ **Sem conflitos** de dependências

#### **Como hospedar:**
1. **Fazer build:**
   ```bash
   npm run build:cartao
   ```

2. **Upload da pasta `dist-cartao/`:**
   - Upload para servidor web
   - Configurar domínio/subdomínio
   - Exemplo: `https://cartao.anajo.org.br/`

### **2. Hospedagem no Mesmo Domínio**

#### **Opção A: Subpasta**
```
https://anajo.org.br/cartao/
```
- Upload `dist-cartao/` para pasta `/cartao/` no servidor

#### **Opção B: Subdomínio**
```
https://cartao.anajo.org.br/
```
- Configurar subdomínio apontando para `dist-cartao/`

### **3. Hospedagem Gratuita**

#### **GitHub Pages:**
1. Criar repositório `anajo-cartao`
2. Upload dos arquivos `dist-cartao/`
3. Ativar GitHub Pages
4. URL: `https://username.github.io/anajo-cartao/`

#### **Netlify:**
1. Conectar repositório GitHub
2. Configurar pasta de build: `dist-cartao`
3. Deploy automático
4. URL personalizada: `https://cartao-anajo.netlify.app`

#### **Vercel:**
1. Importar projeto
2. Configurar pasta: `dist-cartao`
3. Deploy
4. URL: `https://cartao-anajo.vercel.app`

## 🔧 Personalização

### **Alterar Dados do Cartão:**
Editar arquivo `public/cartao-standalone.html`:

```html
<!-- Dados pessoais -->
<h1>Seu Nome</h1>
<p>Seu Cargo</p>
<p>Sua Organização</p>

<!-- Contato -->
<button onclick="openWhatsApp()">+55 (83) 99999-9999</button>
<button onclick="openEmail()">seu@email.com</button>

<!-- Redes sociais -->
<button onclick="openSocial('https://instagram.com/seu_perfil')">
```

### **Alterar Cores:**
```css
/* Cores principais */
.bg-blue-600 { background-color: #sua-cor; }
.text-blue-600 { color: #sua-cor; }
```

## 📱 Funcionalidades

### **✅ Implementadas:**
- 📱 **Design responsivo** (mobile, tablet, desktop)
- 📞 **Botão WhatsApp** (abre conversa direta)
- 📧 **E-mail clicável** (abre cliente de email)
- 🌐 **Redes sociais** (Instagram, Facebook, LinkedIn)
- 📄 **Download PDF** (gera cartão em PDF)
- 🎨 **Identidade visual** consistente

### **🔧 Tecnologias:**
- **HTML5** + **CSS3** + **JavaScript**
- **Tailwind CSS** (via CDN)
- **Lucide Icons** (via CDN)
- **jsPDF** + **html2canvas** (via CDN)

## 🚀 Deploy Rápido

### **1. Build:**
```bash
npm run build:cartao
```

### **2. Teste Local:**
```bash
npm run serve:cartao
# Acesse: http://localhost:3001/
```

### **3. Upload:**
- Compactar pasta `dist-cartao/`
- Upload para servidor web
- Configurar domínio

## 📞 Suporte

Para dúvidas ou problemas:
- 📧 **E-mail**: contato@anajo.org.br
- 📱 **WhatsApp**: +55 (83) 99999-9999
- 🌐 **Site**: https://anajo.org.br

---

**Desenvolvido com ❤️ para a Associação Anajô**
