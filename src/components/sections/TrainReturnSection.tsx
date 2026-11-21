import React from 'react';
import {
  Train,
  Clock,
  Users,
  ArrowRight,
  Building2,
  Navigation,
  CheckCircle2
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { InteractiveMap } from '../InteractiveMap';

export const TrainReturnSection: React.FC = () => {
  const { setActiveSection } = useTrip();

  const visualSequence = [
    {
      step: 1,
      time: '09h00 – 09h15',
      title: 'Sair da hospedagem em Paris (11 Rue de Lourmel, 75015)',
      desc: 'Faça o check-out até às 09h15. Confira se não esqueceu passaportes, carregadores e compras. Caminhe 4 minutos até a estação de metrô Dupleix (Linha 6) ou peça um táxi oficial/Uber se estiver com muitas malas.'
    },
    {
      step: 2,
      time: '09h15 – 09h55',
      title: 'Ir até a estação Paris Gare du Nord',
      desc: 'De metrô (~32 min): Na estação Dupleix, pegue a Linha 6 (sentido Nation) até Montparnasse – Bienvenüe (4 paradas). Lá, faça baldeação para a Linha 4 (roxa, sentido Porte de Clignancourt) e desça na estação Gare du Nord. Suba as escadas rolantes seguindo as placas "Grandes Lignes / Trains Internationaux".'
    },
    {
      step: 3,
      time: '10h00 – 10h25',
      title: 'Localizar o trem no saguão principal da Gare du Nord',
      desc: 'Atenção na Gare du Nord: os trens Eurostar para Bruxelas (Bélgica = Espaço Schengen) partem das plataformas térreas normais (geralmente plataformas 7 e 8), logo em frente aos painéis eletrônicos principais — NÃO suba para o mezanino de controle de passaportes do Reino Unido!'
    },
    {
      step: 4,
      time: '10h25 – 10h35',
      title: 'Conferir destino (Bruxelles-Midi/Zuid) e horário (10h48)',
      desc: 'Consulte no painel eletrônico de partidas o trem das 10:48 com destino a Bruxelles-Midi (ou destino final Amsterdam/Köln com parada principal em Bruxelles-Midi às 12h17). A plataforma ("Voie / Quai") é exibida cerca de 20 minutos antes da partida.'
    },
    {
      step: 5,
      time: '10h35 – 10h48',
      title: 'Embarcar no Eurostar (Partida pontual às 10h48)',
      desc: 'Apresente o QR Code dos 2 passageiros na entrada da plataforma, localize o número do seu vagão ("Voiture") e acomode as malas etiquetadas nos bagageiros do vagão. Partida às 10h48 em serviço direto (1h29 de viagem).'
    },
    {
      step: 6,
      time: '12h17',
      title: 'Chegar a Bruxelles-Midi / Brussel-Zuid às 12h17',
      desc: 'Prepare-se para descer alguns minutos antes das 12h17. Ao desembarcar em Bruxelles-Midi, desça pela escada rolante ou elevador para o corredor principal da estação.'
    },
    {
      step: 7,
      time: '12h20 – 12h45',
      title: 'Seguir até o Hotel Fleur de Ville (Rue du Fossé aux Loups, 46)',
      desc: 'Você tem 3 alternativas rápidas para ir de Bruxelles-Midi até o Hotel Fleur de Ville (a apenas 2,1 km): (A) Pré-metrô linhas 3 ou 4 subterrâneo por 3 paradas até a estação De Brouckère + 2 min a pé; (B) Qualquer trem SNCB por 1 parada até Bruxelles-Central + 7 min a pé; ou (C) Táxi/Uber (~10 min).'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Bilhete Oficial do 2º Trecho */}
      <div className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 border border-navy-800 shadow-editorial-lg">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-white/15">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Trecho Ferroviário 2 • Retorno França → Bélgica
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold mt-1">
              Retorno de Paris para Bruxelas — 02/02/2027
            </h1>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-gold-500 text-navy-950 text-xs font-bold">
            02 de fevereiro de 2027 • Confirmado
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 items-center">
          <div>
            <p className="text-xs uppercase tracking-wider text-gold-300 font-semibold">Saída (França)</p>
            <p className="text-4xl font-serif font-bold text-white mt-1">10h48</p>
            <p className="text-base font-bold text-sand-100 mt-1">Paris Gare du Nord</p>
            <p className="text-xs text-navy-200 mt-0.5">Saindo da 11 Rue de Lourmel até 09h15</p>
          </div>

          <div className="flex flex-col items-center justify-center py-4 px-4 rounded-2xl bg-white/10 border border-white/15">
            <div className="flex items-center gap-2 text-gold-300 text-xs font-bold uppercase">
              <Train className="w-4 h-4" />
              Eurostar • Serviço Direto
            </div>
            <div className="w-full h-0.5 bg-gold-400 my-2.5" />
            <div className="flex items-center gap-4 text-xs text-sand-100">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold-400" /> Duração: 1h29
              </span>
              <span className="inline-flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-gold-400" /> 2 Passageiros
              </span>
            </div>
          </div>

          <div className="md:text-right">
            <p className="text-xs uppercase tracking-wider text-gold-300 font-semibold">Chegada (Bélgica)</p>
            <p className="text-4xl font-serif font-bold text-white mt-1">12h17</p>
            <p className="text-base font-bold text-sand-100 mt-1">Bruxelles-Midi / Zuid</p>
            <p className="text-xs text-navy-200 mt-0.5">Rumo ao Hotel Fleur de Ville</p>
          </div>
        </div>
      </div>

      {/* Sequência Visual Passo a Passo (1 a 7) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
          Sequência Visual Completa • 02/02/2027
        </span>
        <h2 className="font-serif text-2xl font-bold text-navy-900 mt-0.5 mb-6">
          Da Hospedagem em Paris até o Hotel Fleur de Ville em Bruxelas
        </h2>

        <div className="space-y-4">
          {visualSequence.map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-2xl bg-sand-50 border border-sand-200 flex flex-col sm:flex-row sm:items-start gap-4"
            >
              <div className="flex items-center gap-3 sm:flex-col sm:items-center shrink-0">
                <span className="w-9 h-9 rounded-xl bg-navy-900 text-gold-300 font-serif font-bold text-base flex items-center justify-center">
                  {item.step}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-gold-100 text-gold-900 text-[11px] font-bold">
                  {item.time}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-serif font-bold text-navy-900 text-base">{item.title}</h3>
                <p className="text-xs text-navy-700 mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-sand-100 border border-sand-300">
          <div>
            <h4 className="font-serif font-bold text-navy-900 text-base">
              Próxima Etapa: Check-in no Hotel Fleur de Ville e Passeios em Bruxelas
            </h4>
            <p className="text-xs text-navy-700 mt-0.5">
              Veja os detalhes da sua hospedagem em Bruxelas e o roteiro de passeios organizado a partir de 02 de fevereiro.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSection('lodging-brussels')}
              className="px-4 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 inline-flex items-center gap-1.5"
            >
              Página do Hotel Fleur de Ville
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveSection('brussels-itinerary')}
              className="px-4 py-2.5 rounded-xl bg-gold-500 text-navy-950 text-xs font-bold hover:bg-gold-400 inline-flex items-center gap-1.5"
            >
              Roteiro de Bruxelas
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mapas do Deslocamento de 02/02: Paris -> Gare du Nord e Bruxelles-Midi -> Hotel Fleur de Ville */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-editorial">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
            Manhã em Paris (02/02)
          </span>
          <h3 className="font-serif text-lg font-bold text-navy-900 mt-0.5 mb-3">
            11 Rue de Lourmel → Paris Gare du Nord
          </h3>
          <InteractiveMap
            center={[48.865, 2.322]}
            zoom={12}
            drawRouteLine
            height="300px"
            markers={[
              {
                id: 'ret-lourmel',
                name: '1. Saída: 11 Rue de Lourmel (75015)',
                subtitle: 'Check-out até 09h15',
                lat: 48.8511,
                lng: 2.2882,
                isBase: true
              },
              {
                id: 'ret-gdn',
                name: '2. Paris Gare du Nord (Embarque 10h48)',
                subtitle: 'Linha 6 (Dupleix → Montparnasse) + Linha 4',
                lat: 48.8809,
                lng: 2.3553
              }
            ]}
          />
        </div>

        <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-editorial">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
            Chegada em Bruxelas às 12h17 (02/02)
          </span>
          <h3 className="font-serif text-lg font-bold text-navy-900 mt-0.5 mb-3">
            Bruxelles-Midi/Zuid → Hotel Fleur de Ville
          </h3>
          <InteractiveMap
            center={[50.8425, 4.346]}
            zoom={14}
            drawRouteLine
            height="300px"
            markers={[
              {
                id: 'ret-midi',
                name: '1. Chegada: Bruxelles-Midi/Zuid (12h17)',
                subtitle: 'Desembarque do trem vindo de Paris',
                lat: 50.8357,
                lng: 4.3365
              },
              {
                id: 'ret-fleur',
                name: '2. Hotel Fleur de Ville',
                subtitle: 'Rue du Fossé aux Loups, 46, 1000 Brussels',
                description: 'Pré-metrô 3 ou 4 até De Brouckère + 2 min a pé.',
                lat: 50.8495,
                lng: 4.3548,
                isBase: true
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
};
