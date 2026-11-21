import React from 'react';
import {
  ShieldAlert,
  PhoneCall,
  Building2,
  FileWarning,
  Volume2,
  Navigation,
  ExternalLink
} from 'lucide-react';
import { InteractiveMap } from '../InteractiveMap';

export const EmergenciesSection: React.FC = () => {
  const speak = (text: string, lang: 'fr-FR' | 'en-US') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = 0.92;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho e Números de Emergência Oficiais */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200 shadow-editorial">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-red-700">
          <ShieldAlert className="w-4 h-4" />
          Contatos Oficiais Verificados • França & Bélgica
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
          Emergências, Segurança e Consulados do Brasil
        </h1>
        <p className="text-sm text-navy-600 mt-1 max-w-3xl">
          Todos os telefones de socorro da União Europeia, França e Bélgica, além dos endereços e contatos oficiais verificados dos Consulados-Gerais do Brasil em Paris e em Bruxelas.
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <a
            href="tel:112"
            className="p-4 rounded-2xl bg-red-900 text-white text-center hover:bg-red-800 transition-colors shadow-editorial"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-gold-300 block">
              Emergência Europeia
            </span>
            <span className="font-serif text-3xl sm:text-4xl font-bold block mt-1">112</span>
            <span className="text-xs text-red-100 block mt-1">
              Gratuito • França & Bélgica
            </span>
          </a>

          <a
            href="tel:17"
            className="p-4 rounded-2xl bg-sand-50 border border-sand-200 text-center hover:bg-sand-100 transition-colors"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-navy-600 block">
              Polícia (Police)
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 block mt-1">
              17 (FR) / 101 (BE)
            </span>
            <span className="text-xs text-navy-500 block mt-1">
              Socorro Policial Imediato
            </span>
          </a>

          <a
            href="tel:15"
            className="p-4 rounded-2xl bg-sand-50 border border-sand-200 text-center hover:bg-sand-100 transition-colors"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-navy-600 block">
              Ambulância (SAMU)
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 block mt-1">
              15 (FR) / 112 (BE)
            </span>
            <span className="text-xs text-navy-500 block mt-1">
              Emergência Médica
            </span>
          </a>

          <a
            href="tel:18"
            className="p-4 rounded-2xl bg-sand-50 border border-sand-200 text-center hover:bg-sand-100 transition-colors"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-navy-600 block">
              Bombeiros (Pompiers)
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 block mt-1">
              18 (FR) / 112 (BE)
            </span>
            <span className="text-xs text-navy-500 block mt-1">
              Resgate & Acidentes
            </span>
          </a>
        </div>
      </div>

      {/* Consulados do Brasil na França e na Bélgica (Verificados em Fontes Oficiais Gov.br / Itamaraty) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial flex flex-col justify-between">
          <div>
            <span className="px-2.5 py-1 rounded-md bg-navy-900 text-gold-300 text-xs font-bold">
              FRANÇA • GOV.BR / ITAMARATY
            </span>
            <h2 className="font-serif text-2xl font-bold text-navy-900 mt-3">
              Consulado-Geral do Brasil em Paris
            </h2>
            <div className="mt-4 space-y-2 text-xs sm:text-sm text-navy-700">
              <p>
                <strong>Endereço Oficial:</strong> 65 Avenue Franklin D. Roosevelt, 75008 Paris, França
              </p>
              <p>
                <strong>Como chegar da 11 Rue de Lourmel:</strong> Pegue a Linha 6 em Dupleix até Trocadéro e troque para a Linha 9 até a estação <em>Saint-Philippe-du-Roule</em> ou <em>Franklin D. Roosevelt</em> (~18 min).
              </p>
              <p>
                <strong>Plantão Consular de Emergência (24h, exclusivamente para casos graves como hospitalização, prisão ou perda total de documentos com voo imediato):</strong>{' '}
                <a href="tel:+33680123234" className="text-red-700 font-bold underline">
                  +33 6 80 12 32 34
                </a>
              </p>
              <p>
                <strong>Site Oficial:</strong>{' '}
                <a
                  href="https://www.gov.br/mre/pt-br/consulado-paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-900 underline font-semibold"
                >
                  gov.br/mre/pt-br/consulado-paris
                </a>
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-sand-200">
            <a
              href="https://www.google.com/maps/dir/?api=1&origin=11+Rue+de+Lourmel+75015+Paris&destination=65+Avenue+Franklin+D.+Roosevelt+75008+Paris"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800"
            >
              <Navigation className="w-3.5 h-3.5 text-gold-400" />
              Abrir Rota até o Consulado em Paris
            </a>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial flex flex-col justify-between">
          <div>
            <span className="px-2.5 py-1 rounded-md bg-gold-500 text-navy-950 text-xs font-bold">
              BÉLGICA • GOV.BR / ITAMARATY
            </span>
            <h2 className="font-serif text-2xl font-bold text-navy-900 mt-3">
              Consulado-Geral do Brasil em Bruxelas
            </h2>
            <div className="mt-4 space-y-2 text-xs sm:text-sm text-navy-700">
              <p>
                <strong>Endereço Oficial:</strong> Rue Trèves 45 (Trierstraat 45), 1040 Bruxelles, Bélgica (próximo à Place du Luxembourg / Parlamento Europeu)
              </p>
              <p>
                <strong>Telefone Geral:</strong> +32 2 626 28 91
              </p>
              <p>
                <strong>Plantão Consular de Emergência (exclusivo para emergências comprovadas):</strong>{' '}
                <a href="tel:+32475681075" className="text-red-700 font-bold underline">
                  +32 475 68 10 75
                </a>
              </p>
              <p>
                <strong>Site Oficial:</strong>{' '}
                <a
                  href="https://www.gov.br/mre/pt-br/consulado-bruxelas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-900 underline font-semibold"
                >
                  gov.br/mre/pt-br/consulado-bruxelas
                </a>
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-sand-200">
            <a
              href="https://www.google.com/maps/dir/?api=1&origin=Rue+du+Fosse+aux+Loups+46+1000+Brussels&destination=Rue+de+Treves+45+1040+Bruxelles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800"
            >
              <Navigation className="w-3.5 h-3.5 text-gold-400" />
              Abrir Rota até o Consulado em Bruxelas
            </a>
          </div>
        </div>
      </div>

      {/* Procedimento Passo a Passo em Caso de Perda de Documentos ou Roubo */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
          Protocolo de Ação Rápida
        </span>
        <h2 className="font-serif text-2xl font-bold text-navy-900 mt-0.5 mb-5">
          Como Proceder em Caso de Perda de Documentos, Furto ou Roubo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200">
            <h3 className="font-serif font-bold text-navy-900 text-base">
              1. Bloqueio Imediato de Cartões e Celular
            </h3>
            <p className="text-xs text-navy-700 mt-2 leading-relaxed">
              Abra imediatamente o aplicativo do seu cartão (Wise, Nomad, banco brasileiro) pelo celular do acompanhante e congele o cartão físico/virtual. Caso seu celular tenha sido furtado, acesse <em>icloud.com/find</em> ou <em>google.com/android/find</em> no celular do seu acompanhante para bloquear o aparelho remotamente.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200">
            <h3 className="font-serif font-bold text-navy-900 text-base">
              2. Registrar Boletim de Ocorrência (Commissariat de Police)
            </h3>
            <p className="text-xs text-navy-700 mt-2 leading-relaxed">
              Dirija-se à delegacia de polícia mais próxima (<em>Commissariat de Police</em> em Paris ou <em>Bureau de Police</em> em Bruxelas) para registrar uma declaração de furto (<em>Déclaration de Vol</em>) ou perda (<em>Déclaration de Perte</em>). Guarde o protocolo original carimbado: ele é exigido pelo Consulado e pelo Seguro Viagem.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200">
            <h3 className="font-serif font-bold text-navy-900 text-base">
              3. Emissão de ARB ou Novo Passaporte no Consulado
            </h3>
            <p className="text-xs text-navy-700 mt-2 leading-relaxed">
              Com o boletim policial em mãos e a cópia digital do passaporte (e RG/CNH), compareça ao Consulado do Brasil. Se o seu voo de volta ao Brasil já estiver próximo, o Consulado pode emitir gratuitamente ou em caráter emergencial uma <strong>ARB (Autorização de Retorno ao Brasil)</strong> ou passaporte de emergência.
            </p>
          </div>
        </div>

        {/* Frases de Emergência com Áudio para Explicar a Situação */}
        <div className="mt-6 p-5 rounded-2xl bg-navy-900 text-white space-y-4">
          <h3 className="font-serif font-bold text-lg text-gold-300">
            Como Explicar uma Emergência em Francês ou Inglês (Toque para Ouvir)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gold-300">🇫🇷 Explicar em Francês</span>
                <button
                  onClick={() =>
                    speak(
                      "Bonjour, je suis touriste brésilien. On m'a volé mon passeport et mon portefeuille. Je dois faire une déclaration de vol, s'il vous plaît.",
                      'fr-FR'
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-gold-500 text-navy-950 text-xs font-bold inline-flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Ouvir FR
                </button>
              </div>
              <p className="text-xs sm:text-sm font-semibold">
                "Bonjour, je suis touriste brésilien. On m'a volé mon passeport et mon portefeuille. Je dois faire une déclaration de vol, s'il vous plaît."
              </p>
              <p className="text-xs text-sand-200">
                (Olá, sou turista brasileiro. Furtaram meu passaporte e minha carteira. Preciso registrar um boletim de furto, por favor.)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gold-300">🇬🇧 Explicar em Inglês</span>
                <button
                  onClick={() =>
                    speak(
                      'Hello, I am a Brazilian tourist. My passport and wallet were stolen. I need to file a police report, please.',
                      'en-US'
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-gold-500 text-navy-950 text-xs font-bold inline-flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Ouvir EN
                </button>
              </div>
              <p className="text-xs sm:text-sm font-semibold">
                "Hello, I am a Brazilian tourist. My passport and wallet were stolen. I need to file a police report, please."
              </p>
              <p className="text-xs text-sand-200">
                (Olá, sou turista brasileiro. Meu passaporte e carteira foram furtados. Preciso registrar um boletim policial, por favor.)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa dos Consulados */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <h3 className="font-serif text-xl font-bold text-navy-900 mb-3">
          Localização dos Consulados do Brasil em Paris e Bruxelas
        </h3>
        <InteractiveMap
          center={[49.85, 3.35]}
          zoom={7}
          markers={[
            {
              id: 'cons-par',
              name: 'Consulado-Geral do Brasil em Paris',
              subtitle: '65 Avenue Franklin D. Roosevelt, 75008 Paris',
              description: 'Plantão: +33 6 80 12 32 34',
              lat: 48.8712,
              lng: 2.3095,
              isBase: true
            },
            {
              id: 'cons-bru',
              name: 'Consulado-Geral do Brasil em Bruxelas',
              subtitle: 'Rue Trèves 45, 1040 Bruxelles',
              description: 'Plantão: +32 475 68 10 75',
              lat: 50.8404,
              lng: 4.3746,
              isBase: true
            }
          ]}
        />
      </div>
    </div>
  );
};
