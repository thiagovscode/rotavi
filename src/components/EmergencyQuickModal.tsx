import React from 'react';
import { ShieldAlert, PhoneCall, X, ExternalLink, Volume2, AlertTriangle } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export const EmergencyQuickModal: React.FC = () => {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, setActiveSection } = useTrip();

  const speakFrench = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'fr-FR';
      utter.rate = 0.92;
      window.speechSynthesis.speak(utter);
    }
  };

  if (!isEmergencyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-editorial-lg border border-red-200 overflow-hidden">
        <div className="bg-red-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-gold-300" />
            <div>
              <h3 className="font-serif font-bold text-lg">Acesso Rápido de Emergência</h3>
              <p className="text-xs text-red-100">França & Bélgica • Números Oficiais Verificados</p>
            </div>
          </div>
          <button
            onClick={() => setIsEmergencyModalOpen(false)}
            className="p-1.5 rounded-lg bg-red-800/60 hover:bg-red-800 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <a
              href="tel:112"
              className="p-3 rounded-xl bg-red-50 border border-red-200 text-center hover:bg-red-100 transition-colors"
            >
              <span className="text-xs font-semibold text-red-700 block">Emergência Geral UE</span>
              <span className="text-2xl font-bold text-red-900">112</span>
              <span className="text-[11px] text-red-600 block">França e Bélgica</span>
            </a>
            <a
              href="tel:17"
              className="p-3 rounded-xl bg-sand-50 border border-sand-200 text-center hover:bg-sand-100 transition-colors"
            >
              <span className="text-xs font-semibold text-navy-700 block">Polícia</span>
              <span className="text-xl font-bold text-navy-900">17 (FR) / 101 (BE)</span>
              <span className="text-[11px] text-navy-500 block">Socorro Policial</span>
            </a>
            <a
              href="tel:15"
              className="p-3 rounded-xl bg-sand-50 border border-sand-200 text-center hover:bg-sand-100 transition-colors"
            >
              <span className="text-xs font-semibold text-navy-700 block">Ambulância</span>
              <span className="text-xl font-bold text-navy-900">15 (FR) / 112 (BE)</span>
              <span className="text-[11px] text-navy-500 block">SAMU Médico</span>
            </a>
            <a
              href="tel:18"
              className="p-3 rounded-xl bg-sand-50 border border-sand-200 text-center hover:bg-sand-100 transition-colors"
            >
              <span className="text-xs font-semibold text-navy-700 block">Bombeiros</span>
              <span className="text-xl font-bold text-navy-900">18 (FR) / 112 (BE)</span>
              <span className="text-[11px] text-navy-500 block">Incêndio / Resgate</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-sand-50 border border-sand-200">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-700">Consulado do Brasil em Paris</p>
              <p className="text-sm font-semibold text-navy-900 mt-1">65 Avenue Franklin D. Roosevelt, 75008 Paris</p>
              <p className="text-xs text-navy-600 mt-0.5">Metrô: Franklin D. Roosevelt (Linhas 1 e 9) ou Saint-Philippe-du-Roule</p>
              <p className="text-xs text-navy-700 mt-1.5 font-medium">
                Plantão Consular (apenas emergências graves):{' '}
                <a href="tel:+33680123234" className="text-red-700 underline font-bold">+33 6 80 12 32 34</a>
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-sand-50 border border-sand-200">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-700">Consulado do Brasil em Bruxelas</p>
              <p className="text-sm font-semibold text-navy-900 mt-1">Rue Trèves 45 (Trierstraat 45), 1040 Bruxelles</p>
              <p className="text-xs text-navy-600 mt-0.5">Próximo à Place du Luxembourg / Quartier Européen</p>
              <p className="text-xs text-navy-700 mt-1.5 font-medium">
                Plantão Consular (emergências graves):{' '}
                <a href="tel:+32475681075" className="text-red-700 underline font-bold">+32 475 68 10 75</a>
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-900 text-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
                Frase de Emergência com Áudio (Francês)
              </span>
              <button
                onClick={() =>
                  speakFrench(
                    "Bonjour, j'ai besoin d'aide d'urgence, s'il vous plaît. Je suis touriste brésilien."
                  )
                }
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gold-500 text-navy-950 text-xs font-bold hover:bg-gold-400"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Ouvir pronúncia
              </button>
            </div>
            <p className="text-sm font-medium">
              "Bonjour, j’ai besoin d’aide d’urgence, s’il vous plaît. Je suis touriste brésilien."
            </p>
            <p className="text-xs text-navy-200">
              (Olá, preciso de ajuda de emergência, por favor. Sou turista brasileiro.)
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setIsEmergencyModalOpen(false);
                setActiveSection('emergencies');
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-navy-800 hover:text-gold-700 underline"
            >
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Abrir guia completo (perda de passaporte, roubo, bloqueio de cartões)
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsEmergencyModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
