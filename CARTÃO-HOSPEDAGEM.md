# 🎯 Cartão de Visita Digital - Guia de Hospedagem

## 📋 Visão Geral

Agora o cartão de visita é servido apenas pelo site React na rota `/cartao`.

## 🚀 Configuração Atual

### **Site Principal:**
- **Porta**: 3000
- **URL**: `http://localhost:3000/`
- **Rota do cartão**: `http://localhost:3000/cartao`

### **Cartão Standalone:**
Removido para simplificar o deploy. Use a rota `/cartao` do site.

## 🛠️ Comandos Disponíveis

### **Desenvolvimento:**
```bash
# Site principal
npm run dev

# (Standalone removido)
```

### **Build:**
```bash
# Site principal
npm run build

# (Standalone removido)
```

## 📁 Estrutura de Arquivos

```
projeto/
├── dist/                    # Build do site principal
├── (sem dist-cartao)
├── public/
│   └── (standalone removido)
├── src/
│   └── pages/
│       └── CartaoVisita.tsx    # Componente React
└── (script standalone removido)
```

## 🌐 Opções de Hospedagem

### **1. Hospedagem do Site (Recomendado)**

#### **Vantagens:**
- ✅ Deploy único (site + cartão)
- ✅ Menos arquivos e menos manutenção

#### **Como hospedar:**
1. **Fazer build:**
   ```bash
   npm run build
   ```

2. **Upload da pasta `dist/`:**
   - Upload para servidor web
   - Acessar via: `https://seu-dominio/cartao`

### **2. Hospedagem no Mesmo Domínio**

#### **Opção A: Subpasta**
```
https://anajo.org.br/cartao
```
- Publicar `dist/` no servidor

#### **Opção B: Subdomínio**
```
https://cartao.anajo.org.br/
```
- Configurar subdomínio apontando para `dist/` (rota `/cartao`)

### **3. Hospedagem Gratuita**

#### **GitHub Pages:**
1. Usar repositório do site
2. Upload dos arquivos `dist/`
3. Ativar GitHub Pages
4. URL: `https://username.github.io/anajo-cartao/`

#### **Netlify:**
1. Conectar repositório GitHub
2. Configurar pasta de build: `dist`
3. Deploy automático
4. URL personalizada: `https://cartao-anajo.netlify.app`

#### **Vercel:**
1. Importar projeto
2. Configurar pasta: `dist`
3. Deploy
4. URL: `https://cartao-anajo.vercel.app`

## 🔧 Personalização

### **Alterar Dados do Cartão:**
Edite `src/pages/CartaoVisita.tsx` para alterar dados do cartão:

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
npm run build
```

### **2. Teste Local:**
```bash
npm run preview
# Acesse: http://localhost:4173/cartao
```

### **3. Upload:**
- Compactar pasta `dist/`
- Upload para servidor web
- Configurar domínio

## 📞 Suporte

Para dúvidas ou problemas:
- 📧 **E-mail**: contato@anajo.org.br
- 📱 **WhatsApp**: +55 (83) 99999-9999
- 🌐 **Site**: https://anajo.org.br

---

**Desenvolvido com ❤️ para a Associação Anajô**
