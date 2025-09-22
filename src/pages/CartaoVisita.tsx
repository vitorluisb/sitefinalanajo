import { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Phone, Mail, MapPin, ExternalLink, Heart, QrCode, Sparkles, Users, Globe, MessageCircle, Instagram, Facebook, Share2, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import CartaoLayout from '@/components/layout/CartaoLayout';

const CartaoVisita = () => {
  const { t } = useTranslation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Dados do cartão de visita
  const cardData = {
    name: 'Associação Anajô',
    title: 'Transformando Vidas Através da Educação e Esporte',
    organization: 'ONG - Desenvolvimento Social e Cultural',
    area: '',
    phone: '+55 83 8856-7721',
    emails: ['hail.capoeira@hotmail.com', 'anajogba@yahoo.com.br'],
    address: 'Parque do Encontro - Nordeste, Guarabira - PB, 58200-000',
    bio: '',
    social: {
      instagram: 'https://www.instagram.com/associacaoanajo/',
      facebook: 'https://facebook.com/anajo.ong',
      website: 'https://anajo.site',
      whatsapp: 'https://wa.me/5583885677721'
    }
  };

  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;
    
    setIsDownloading(true);
    
    try {
      // Capturar o cartão como imagem
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Criar PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calcular dimensões para centralizar o cartão
      const imgWidth = 190; // Largura máxima no A4
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const x = (210 - imgWidth) / 2; // Centralizar horizontalmente
      const y = (297 - imgHeight) / 2; // Centralizar verticalmente
      
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      
      // Adicionar informações extras no PDF
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Cartão de Visita Digital - Associação Anajô', 15, 20);
      pdf.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 15, 25);
      
      // Salvar PDF
      pdf.save('cartao-visita-associacao-anajo.pdf');
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleWhatsApp = () => {
    window.open(cardData.social.whatsapp, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${cardData.emails[0]}`;
  };

  const handlePhone = () => {
    window.location.href = `tel:${cardData.phone}`;
  };

  const handleAddress = () => {
    window.open('https://maps.app.goo.gl/Et9LaUpViqh8g4Q78', '_blank');
  };

  const handleSocial = (url: string) => {
    window.open(url, '_blank');
  };

  const handleShowQRCode = async () => {
    // Gerar QR Code com link compartilhável do cartão
    const shareUrl = 'https://anajo.site/cartao'
    const qrData = shareUrl

    try {
      const dataUrl = await QRCode.toDataURL(qrData, {
        width: 240,
        margin: 2,
        errorCorrectionLevel: 'M',
        color: {
          dark: '#2563eb',
          light: '#ffffff'
        }
      });
      setQrDataUrl(dataUrl);
      setIsQrOpen(true);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      alert('Erro ao gerar QR Code. Tente novamente.');
    }
  };

  return (
    <CartaoLayout>
        {/* Cartão Principal */}
        <div className="max-w-5xl mx-auto">
          <div ref={cardRef} className="bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/30 overflow-hidden animate-fade-in relative group">
            {/* Efeito de brilho */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Header do Cartão */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 md:p-12 text-center relative overflow-hidden">
              {/* Padrão decorativo clean */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6 md:mb-8">
                  <img 
                    src="/logoanajo.png" 
                    alt="Logo ANAJÔ"
                    className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain drop-shadow-2xl"
                  />
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white">
                  {cardData.name}
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-3 font-semibold">{cardData.title}</p>
                <p className="text-lg md:text-xl text-blue-200/90 max-w-2xl mx-auto leading-relaxed">{cardData.organization}</p>
                
                {/* Badge de destaque */}
                <div className="inline-flex items-center space-x-2 mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <Sparkles className="w-4 h-4 text-blue-200" />
                  <span className="text-white font-medium">Transformando Vidas</span>
                </div>
              </div>
            </div>

            {/* Conteúdo do Cartão */}
            <div className="p-8 md:p-12">

              {/* Informações de Contato */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {/* Telefone */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-blue-200/50">
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wide">Telefone</p>
                        <button 
                          onClick={handlePhone}
                          className="text-blue-800 font-semibold hover:text-blue-900 flex items-center text-lg group-hover:underline transition-colors duration-300"
                        >
                          {cardData.phone}
                          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-blue-200/50">
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wide">E-mail</p>
                        <div className="space-y-1">
                          {cardData.emails.map((email, index) => (
                            <button 
                              key={index}
                              onClick={() => window.location.href = `mailto:${email}`}
                              className="text-blue-800 font-semibold hover:text-blue-900 flex items-center text-lg group-hover:underline transition-colors duration-300 block w-full text-left"
                            >
                              {email}
                              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-blue-200/50 md:col-span-2">
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wide">Endereço</p>
                        <button 
                          onClick={handleAddress}
                          className="text-blue-800 font-semibold hover:text-blue-900 flex items-center text-lg group-hover:underline transition-colors duration-300 text-left"
                        >
                          {cardData.address}
                          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="mb-10">
                <div className="text-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-blue-600">
                    Conecte-se Conosco
                  </h3>
                  <p className="text-base text-gray-600">Siga-nos e faça parte da nossa comunidade</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => handleSocial(cardData.social.instagram)}
                    className="group relative overflow-hidden bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Instagram className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-sm">Instagram</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSocial(cardData.social.facebook)}
                    className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Facebook className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-sm">Facebook</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSocial(cardData.social.website)}
                    className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Globe className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-sm">Site Oficial</span>
                    </div>
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-sm">WhatsApp</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="text-center space-y-6">
                {/* QR Code */}
                <div>
                  <button
                    onClick={handleShowQRCode}
                    className="group relative overflow-hidden inline-flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300 rounded-2xl hover:from-gray-200 hover:to-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-lg text-base font-semibold w-full sm:w-auto"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center">
                      <QrCode className="w-4 h-4 text-white" />
                    </div>
                    <span className="truncate">Ver QR Code do Cartão</span>
                  </button>
                </div>
                <Dialog open={isQrOpen} onOpenChange={setIsQrOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>QR Code - Associação Anajô</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center gap-3 py-2">
                      {qrDataUrl ? (
                        <img src={qrDataUrl} alt="QR Code do Cartão" className="w-60 h-60" />
                      ) : (
                        <div className="text-sm text-gray-500">Gerando QR Code...</div>
                      )}
                      <p className="text-sm text-gray-600">Escaneie para abrir o cartão</p>
                    </div>
                  </DialogContent>
                </Dialog>
                
                {/* Download PDF */}
                <div>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="group relative overflow-hidden inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <span className="truncate">
                      {isDownloading ? 'Gerando PDF...' : 'Baixar Cartão em PDF'}
                    </span>
                    {isDownloading && (
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
                  </button>
                  <p className="text-sm text-gray-600 mt-3 font-medium">
                    💡 Salve este cartão no seu dispositivo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer do Cartão */}
          <div className="text-center mt-8 text-gray-600">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-lg">
              <p className="text-base font-semibold mb-2">
                🎯 Cartão de visita digital gerado pela <span className="text-blue-600 font-bold">Associação Anajô</span>
              </p>
              <p className="text-xs opacity-75">
                📅 Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
    </CartaoLayout>
  );
};

export default CartaoVisita;
