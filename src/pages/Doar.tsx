import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Heart, Smartphone, Copy, Check, Shield, Gift } from 'lucide-react';
import QRCode from 'qrcode';
import { useTranslation } from 'react-i18next';

const Doar = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');

  const pixKey = '08594979000185';

  useEffect(() => {
    // Função CRC16 CCITT personalizada
    const crc16ccitt = (data) => {
      let crc = 0xFFFF;
      for (let i = 0; i < data.length; i++) {
        crc ^= data.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
          if (crc & 0x8000) {
            crc = (crc << 1) ^ 0x1021;
          } else {
            crc = crc << 1;
          }
        }
      }
      return crc & 0xFFFF;
    };

    const gerarPayload = (chave, nome, cidade, id = "***") => {
      // Merchant Account Information (26)
      const merchantInfo = "0014BR.GOV.BCB.PIX01" + String(chave.length).padStart(2, "0") + chave;
      const merchantLength = String(merchantInfo.length).padStart(2, "0");
      
      // Transaction ID (62)
      const transactionId = "05" + String(id.length).padStart(2, "0") + id;
      const transactionLength = String(transactionId.length).padStart(2, "0");
      
      const payload =
        "000201" +                                                    // Payload Format Indicator
        "010212" +                                                    // Point of Initiation Method
        "26" + merchantLength + merchantInfo +                       // Merchant Account Information
        "52040000" +                                                  // Merchant Category Code
        "5303986" +                                                   // Transaction Currency (BRL)
        "59" + String(nome.length).padStart(2, "0") + nome +        // Merchant Name
        "60" + String(cidade.length).padStart(2, "0") + cidade +    // Merchant City
        "62" + transactionLength + transactionId +                   // Additional Data Field
        "6304";                                                      // CRC16 placeholder

      // Calcula CRC16
      const crc16 = crc16ccitt(payload).toString(16).toUpperCase().padStart(4, "0");
      return payload + crc16;
    };

    const chave = pixKey; // Chave PIX da associação
    const nome = "ASSOCIACAO ANAJO"; // Nome da associação
    const cidade = "GUARABIRA"; // Cidade da associação

    const payload = gerarPayload(chave, nome, cidade);

    QRCode.toDataURL(payload, { width: 300 }, (err, url) => {
      if (!err) setQrCodeDataURL(url);
    });
  }, []);

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar PIX:', err);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section - Compacto */}
        <section className="py-12 gradient-hero text-white">
          <div className="container-custom text-center">
            <h1 className="text-3xl font-bold mb-4">{t('donate.title')}</h1>
            <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
              {t('donate.subtitle')}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>{t('donate.security.secure')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>{t('donate.security.transparent')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Form - Mais próximo do topo */}
        <section className="py-8">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna Principal - QR Code e PIX */}
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-foreground mb-6 text-center">{t('donate.pix.title')}</h2>
                  
                  {/* QR Code - Destaque */}
                  <div className="text-center mb-6">
                    <div className="bg-white p-6 rounded-xl border-2 border-primary/20 shadow-lg inline-block">
                      {qrCodeDataURL ? (
                        <img 
                          src={qrCodeDataURL} 
                          alt={t('donate.pix.qrCodeAlt')} 
                          className="w-56 h-56 mx-auto"
                        />
                      ) : (
                        <div className="w-56 h-56 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl mb-2">⏳</div>
                            <div className="text-sm text-muted-foreground">{t('donate.pix.loadingQR')}</div>
                          </div>
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground mt-3 font-medium">{t('donate.pix.scanInstruction')}</div>
                    </div>
                  </div>

                  {/* PIX Key - Mais compacto */}
                  <div className="border border-border rounded-xl p-6 bg-gradient-to-br from-white to-gray-50">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center justify-center space-x-2">
                      <Smartphone className="w-5 h-5 text-primary" />
                      <span>{t('donate.pix.keyLabel')}</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <code className="bg-muted px-4 py-3 rounded-lg text-base flex-1 text-center font-mono border">
                          {pixKey}
                        </code>
                        <button
                          onClick={copyPixKey}
                          className="btn-primary px-4 py-3 inline-flex items-center space-x-2 whitespace-nowrap"
                          title={t('donate.pix.copyKey')}
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span>{copied ? t('donate.pix.keyCopied') : t('donate.pix.copyKey')}</span>
                        </button>
                      </div>

                      <div className="text-sm text-muted-foreground bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="mb-2 font-medium text-blue-800">{t('donate.pix.howToDonate')}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div>{t('donate.pix.step1')}</div>
                          <div>{t('donate.pix.step2')}</div>
                          <div>{t('donate.pix.step3')}</div>
                          <div>{t('donate.pix.step4')}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="mt-4 text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground bg-green-50 py-2 px-4 rounded-full border border-green-200">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-green-700 font-medium">{t('donate.security.notice')}</span>
                    </div>
                  </div>

                  {/* Bank Deposit Section */}
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6 text-center">{t('donate.bankDeposit.title')}</h2>
                    <p className="text-center text-muted-foreground mb-6">{t('donate.bankDeposit.description')}</p>
                    
                    <div className="bg-white p-6 rounded-xl border-2 border-primary/20 shadow-lg">
                      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">{t('donate.bankDeposit.accountInfo')}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="text-sm text-muted-foreground mb-1">{t('donate.bankDeposit.bank')}</div>
                          <div className="font-bold text-blue-800">Bradesco</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-sm text-muted-foreground mb-1">{t('donate.bankDeposit.agency')}</div>
                          <div className="font-bold text-green-800">2007</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="text-sm text-muted-foreground mb-1">{t('donate.bankDeposit.account')}</div>
                          <div className="font-bold text-purple-800">22568-1</div>
                        </div>
                      </div>

                      <div className="text-center">
                        <button
                          onClick={() => {
                            const bankData = `Banco: Bradesco\nAgência: 2007\nConta Corrente: 22568-1`;
                            navigator.clipboard.writeText(bankData);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
                        >
                          <span>{copied ? t('donate.bankDeposit.dataCopied') : t('donate.bankDeposit.copyData')}</span>
                        </button>
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="mb-3 font-medium text-blue-800">{t('donate.bankDeposit.instructions')}</p>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div>{t('donate.bankDeposit.step1')}</div>
                          <div>{t('donate.bankDeposit.step2')}</div>
                          <div>{t('donate.bankDeposit.step3')}</div>
                          <div>{t('donate.bankDeposit.step4')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coluna Lateral - Info Compacta */}
                <div className="lg:col-span-1">
                  <div className="space-y-6">
                    {/* Impact Stats - Compacto */}
                    <div className="card-elegant">
                      <h3 className="text-base font-semibold text-foreground mb-4">
                        💰 {t('donate.transparency.title')}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">{t('donate.transparency.socialProjects')}</span>
                          <span className="font-bold text-accent">85%</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">{t('donate.transparency.administration')}</span>
                          <span className="font-bold text-foreground">15%</span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Achievements - Compacto */}
                    <div className="card-elegant">
                      <h3 className="text-base font-semibold text-foreground mb-4">
                        🎯 {t('donate.impact.title')}
                      </h3>
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">
                          ✅ {t('donate.impact.childrenServed')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ✅ {t('donate.impact.gradeImprovement')}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Doar;