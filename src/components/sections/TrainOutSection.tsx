import React from 'react';
import {
  Train,
  Clock,
  Users,
  MapPin,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Luggage,
  FileText
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { InteractiveMap } from '../InteractiveMap';

export const TrainOutSection: React.FC = () => {
  const { setActiveSection } = useTrip();

  const guides = [
    {
      title: '1. Como chegar à estação Bruxelles-Midi/Zuid',
      content:
        'Saindo do Aeroporto de Bruxelas (BRU - Nível -1), você chegará diretamente dentro da estação Bruxelles-Midi/Zuid pelo trem da SNCB em cerca de 20 a 25 minutos. Basta descer da plataforma de chegada pelas escadas rolantes para o saguão principal (Couloir Principal).'
    },
    {
      title: '2. Quando chegar à estação para este trem',
      content:
        'Como este Eurostar faz a rota continental Bélgica → França (dentro do Espaço Schengen), NÃO há cabine de imigração nem raio-X demorado como nos trens para fora de Schengen. Mesmo assim, esteja no saguão principal da estação Bruxelles-Midi pelo menos 30 a 45 minutos antes da partida (entre 12h25 e 12h40), pois o acesso ao trem encerra minutos antes das 13h13.'
    },
    {
      title: '3. Como consultar o painel de partidas e localizar a plataforma',
      content:
        'No corredor central de Bruxelles-Midi, olhe para os grandes painéis eletrônicos azuis de partidas ("Départs / Vertrek"). Procure a linha com horário 13:13, destino "Paris-Nord" e operadora "Eurostar". O número da plataforma ("Quai / Spoor", geralmente entre as plataformas 3 e 6) aparece confirmado cerca de 20 minutos antes da partida.'
    },
    {
      title: '4. Como identificar o trem correto e o seu vagão (Coach / Voiture)',
      content:
        'Os trens Eurostar da rota Bruxelas–Paris têm pintura vermelha rubi (antiga frota Thalys integrada à Eurostar). Na plataforma, há pequenos monitores suspensos indicando a posição exata de cada vagão ("Voiture / Coach / Rijtuig") por setores (A, B, C...). Posicione-se no setor correspondente ao número do vagão impresso no seu bilhete antes de o trem encostar.'
    },
    {
      title: '5. Como organizar documentos e passagens',
      content:
        'Tenha o QR Code das 2 passagens aberto na tela do celular (com brilho no máximo) e também uma cópia impressa na mochila, junto aos passaportes. Funcionários da Eurostar fazem a leitura do QR Code na subida da escada rolante ou na porta da plataforma. Lembre-se de colocar etiquetas com nome e telefone nas malas grandes.'
    },
    {
      title: '6. Como proceder em caso de atraso ou alteração',
      content:
        'Caso haja qualquer alteração de plataforma ou atraso, o aplicativo oficial da Eurostar e os painéis da estação atualizam em tempo real. Se precisar de assistência presencial, procure o balcão "Eurostar / International Tickets" no saguão principal de Bruxelles-Midi (próximo à plataforma 3). Dentro do Espaço Schengen, a política Railteam/HOTNAT auxilia passageiros em conexões ferroviárias.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Bilhete Oficial Confirmado */}
      <div className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 border border-navy-800 shadow-editorial-lg">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-white/15">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Trecho Ferroviário 1 • Ida Bélgica → França
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold mt-1">
              Embarque Eurostar para Paris
            </h1>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-gold-500 text-navy-950 text-xs font-bold">
            26 de janeiro de 2027 • Confirmado
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 items-center">
          <div>
            <p className="text-xs uppercase tracking-wider text-gold-300 font-semibold">Origem (Bélgica)</p>
            <p className="text-4xl font-serif font-bold text-white mt-1">13h13</p>
            <p className="text-base font-bold text-sand-100 mt-1">Bruxelles-Midi / Zuid</p>
            <p className="text-xs text-navy-200 mt-0.5">Estação Ferroviária de Bruxelas Sul</p>
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
            <p className="text-xs uppercase tracking-wider text-gold-300 font-semibold">Destino (França)</p>
            <p className="text-4xl font-serif font-bold text-white mt-1">14h42</p>
            <p className="text-base font-bold text-sand-100 mt-1">Paris Gare du Nord</p>
            <p className="text-xs text-navy-200 mt-0.5">Chegada no centro de Paris (10º arr.)</p>
          </div>
        </div>
      </div>

      {/* Guia Completo de Embarque */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
          Manual Passo a Passo
        </span>
        <h2 className="font-serif text-2xl font-bold text-navy-900 mt-0.5 mb-6">
          Tudo sobre o Embarque em Bruxelles-Midi/Zuid
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((g, i) => (
            <div key={i} className="p-5 rounded-2xl bg-sand-50 border border-sand-200">
              <h3 className="font-serif font-bold text-navy-900 text-base">{g.title}</h3>
              <p className="text-xs text-navy-700 mt-2 leading-relaxed">{g.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 rounded-2xl bg-sand-100 border border-sand-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif font-bold text-navy-900 text-base">
              Chegou em Paris Gare du Nord às 14h42?
            </h4>
            <p className="text-xs text-navy-700 mt-0.5">
              Veja agora o guia completo da sua hospedagem na <strong>11 Rue de Lourmel (75015)</strong> e como ir da Gare du Nord até lá passo a passo.
            </p>
          </div>
          <button
            onClick={() => setActiveSection('lodging-paris')}
            className="px-4 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 shrink-0 inline-flex items-center gap-1.5"
          >
            Ir para Hospedagem em Paris (Rue de Lourmel)
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mapa Específico 2: Bruxelles-Midi/Zuid -> Paris Gare du Nord */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
              Mapa Ferroviário • 26/01/2027
            </span>
            <h2 className="font-serif text-xl font-bold text-navy-900">
              Bruxelles-Midi/Zuid (13h13) → Paris Gare du Nord (14h42)
            </h2>
          </div>
        </div>

        <InteractiveMap
          center={[49.85, 3.35]}
          zoom={7}
          drawRouteLine
          markers={[
            {
              id: 'm-midi-out',
              name: 'Partida: Bruxelles-Midi / Zuid (13h13)',
              subtitle: '26/01/2027 • Eurostar Direto',
              description: 'Embarque com 30 a 45 min de antecedência.',
              lat: 50.8357,
              lng: 4.3365
            },
            {
              id: 'm-garedunord-in',
              name: 'Chegada: Paris Gare du Nord (14h42)',
              subtitle: 'Duração: 1h29 • 2 Passageiros',
              description: 'Ao desembarcar, siga para o Metrô Linha 4 rumo à 11 Rue de Lourmel.',
              lat: 48.8809,
              lng: 2.3553,
              isBase: true
            }
          ]}
        />
      </div>
    </div>
  );
};
