import React from 'react';
import {
  BookOpen,
  AlertTriangle,
  Train,
  Plane,
  ArrowRight
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const CdgReferenceSection: React.FC = () => {
  const { setActiveSection } = useTrip();

  const cdgGuides = [
    {
      title: '1. Terminais do Aeroporto Charles de Gaulle (CDG 1, CDG 2A–2G e CDG 3)',
      content:
        'O aeroporto Paris-Charles de Gaulle (Roissy) fica a 25 km a nordeste de Paris e é dividido em três complexos principais conectados gratuitamente pelo trem automático interno CDGVAL (funciona das 04h00 à 01h00 a cada 4 minutos). O Terminal 2 é subdividido nos módulos 2A, 2B, 2C, 2D, 2E, 2F e 2G.'
    },
    {
      title: '2. Estações do Trem RER B dentro do CDG',
      content:
        'O trem regional RER B (linha azul) possui duas estações dentro do aeroporto:\n• "Aéroport Charles de Gaulle 1" (atende os Terminais 1 e 3 via CDGVAL).\n• "Aéroport Charles de Gaulle 2 – TGV" (localizada entre os terminais 2C/2E e 2D/2F). O RER B leva cerca de 35 minutos até a Gare du Nord ou Châtelet-Les Halles no centro de Paris.'
    },
    {
      title: '3. Atenção à Tarifa de Aeroporto (Vigência 2027 — Île-de-France Mobilités)',
      content:
        'Na nova estrutura tarifária de Paris vigente em 2027, o bilhete comum de metrô/RER de €2,50 NÃO vale para embarcar ou desembarcar nos aeroportos CDG e Orly! Para os aeroportos de Paris existe o bilhete específico "Ticket Paris Région <> Aéroports" (~€13,00), enquanto o passe semanal Navigo Semaine (Zonas 1–5) continua incluindo o RER B do CDG.'
    },
    {
      title: '4. Alternativas ao RER B: RoissyBus e Táxi Oficial c/ Tarifa Fixa',
      content:
        '• RoissyBus: Ônibus expresso direto dos terminais do CDG até a lateral da Opéra Garnier (~60–75 min).\n• Táxi Parisiense Oficial: Possui tarifa fixa tabelada por lei do CDG para Paris: ~€56 para a Margem Direita (Rive Droite) e ~€65 para a Margem Esquerda (Rive Gauche, onde fica o 15º arrondissement / Rue de Lourmel).'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Banner de Aviso Importante */}
      <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-editorial">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <AlertTriangle className="w-7 h-7 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Material Exclusivo de Referência • Não é o Aeroporto desta Viagem
              </span>
              <h2 className="font-serif text-xl font-bold text-amber-950 mt-0.5">
                Atenção: Sua chegada e saída oficial serão pelo Aeroporto de Bruxelas (BRU)!
              </h2>
              <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                Esta página preserva as informações do <strong>Aeroporto Paris-Charles de Gaulle (CDG)</strong> presentes no seu PDF original apenas como material de consulta futura. Na sua viagem de Jan/Fev 2027, você chegará a Paris de <strong>trem Eurostar pela estação Paris Gare du Nord</strong> (vindo de Bruxelas).
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveSection('arrival-bru')}
            className="px-4 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 shrink-0 inline-flex items-center gap-1.5"
          >
            Ir para Chegada Real: Aeroporto de Bruxelas (BRU)
            <ArrowRight className="w-4 h-4 text-gold-400" />
          </button>
        </div>
      </div>

      {/* Conteúdo de Referência do CDG */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-700">
          <BookOpen className="w-4 h-4" />
          Arquivo de Consulta do PDF Original
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mt-1">
          Guia de Referência — Aeroporto Charles de Gaulle (CDG)
        </h1>
        <p className="text-sm text-navy-600 mt-1">
          Orientações preservadas do roteiro original para eventuais consultas ou viagens futuras.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {cdgGuides.map((g, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-sand-50 border border-sand-200">
              <h3 className="font-serif font-bold text-navy-900 text-base">{g.title}</h3>
              <p className="text-xs text-navy-700 mt-2 leading-relaxed whitespace-pre-line">
                {g.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
