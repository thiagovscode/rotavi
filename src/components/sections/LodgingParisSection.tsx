import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Train,
  Copy,
  Check,
  Navigation,
  Clock,
  ArrowRight,
  Compass
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { InteractiveMap } from '../InteractiveMap';

export const LodgingParisSection: React.FC = () => {
  const { config, updateConfig, setActiveSection } = useTrip();
  const [copied, setCopied] = useState(false);

  const fullAddress = '11 Rue de Lourmel, Paris, Île-de-France, 75015, França';

  const copyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nearbyStations = [
    {
      name: 'Estação Dupleix',
      line: 'Linha 6 (Verde-água)',
      distance: '~350 metros (4 minutos a pé)',
      whyUseful:
        'A estação mais prática da sua viagem! Fica no Boulevard de Grenelle (viaduto elevado com vista para a Torre Eiffel). Leva DIRETO sem baldeação para: Bir-Hakeim/Torre Eiffel (1 parada), Trocadéro (3 paradas), Charles de Gaulle – Étoile / Arco do Triunfo (6 paradas) e Montparnasse-Bienvenüe (4 paradas).'
    },
    {
      name: 'Estação Charles Michels',
      line: 'Linha 10 (Amarelo-ocre)',
      distance: '~500 metros (6 minutos a pé)',
      whyUseful:
        'Fica na Place Charles Michels. Leva DIRETO sem baldeação para: Saint-Germain-des-Prés (Odéon/Mabillon), Quartier Latin, Jardin du Luxembourg e Île de la Cité / Notre-Dame (estação Cluny – La Sorbonne).'
    },
    {
      name: 'Estação La Motte-Picquet – Grenelle',
      line: 'Linhas 6, 8 e 10 (Grande Hub)',
      distance: '~750 metros (9 minutos a pé ou 1 parada a partir de Dupleix)',
      whyUseful:
        'Conecta você à Linha 8 (Lilás), que vai DIRETO para: Hôtel des Invalides, Place de la Concorde, Madeleine, Opéra Garnier / Galeries Lafayette e Le Marais (Chemin Vert / Bastille).'
    },
    {
      name: 'Estação Champ de Mars – Tour Eiffel',
      line: 'RER C (Trem Urbano)',
      distance: '~850 metros (11 minutos a pé)',
      whyUseful:
        'Marginal ao Rio Sena, conecta rapidamente com Musée d’Orsay, Saint-Michel Notre-Dame e Versalhes.'
    }
  ];

  const returnFromSpots = [
    {
      from: 'Torre Eiffel / Champ-de-Mars',
      how: 'Volte caminhando! São apenas 10 a 12 minutos a pé (950m) pelo Boulevard de Grenelle até a 11 Rue de Lourmel.'
    },
    {
      from: 'Trocadéro ou Arco do Triunfo (Champs-Élysées)',
      how: 'Pegue a Linha 6 (sentido Nation) diretamente até a estação Dupleix (5 a 10 min) e caminhe 4 minutos até a 11 Rue de Lourmel.'
    },
    {
      from: 'Museu do Louvre / Jardin des Tuileries',
      how: 'Pegue a Linha 1 até Charles de Gaulle – Étoile (ou Concorde → Linha 8 até La Motte-Picquet Grenelle) e Linha 6 até Dupleix (~22 min).'
    },
    {
      from: 'Île de la Cité (Pont Neuf) / Quartier Latin / Jardin du Luxembourg',
      how: 'Pegue a Linha 10 (sentido Boulogne – Pont de Saint-Cloud) na estação Cluny – La Sorbonne ou Odéon DIRETO até a estação Charles Michels (~15 min).'
    },
    {
      from: 'Opéra Garnier / Cédric Grolet / Galeries Lafayette / Le Marais',
      how: 'Pegue a Linha 8 (sentido Balard) na estação Opéra ou Chemin Vert DIRETO até La Motte-Picquet – Grenelle (~15-22 min) e caminhe 9 min (ou 1 parada na Linha 6 até Dupleix).'
    },
    {
      from: 'Disneyland Paris (Passeio Opcional - Marne-la-Vallée Chessy)',
      how: 'Pegue o trem RER A até a estação Charles de Gaulle – Étoile e lá faça baldeação para a Linha 6 (sentido Nation) direto até Dupleix!'
    },
    {
      from: 'Montmartre (Place du Tertre / La Maison Rose / Café des Deux Moulins)',
      how: 'Na estação Abbesses (Linha 12), vá até Pasteur e troque para a Linha 6 até Dupleix (~28 min).'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Cabeçalho do Endereço Principal */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-700">
              <Building2 className="w-4 h-4" />
              Ponto de Referência Principal • 26/01 a 02/02/2027 (7 Dias)
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
              Hospedagem em Paris
            </h1>
            <p className="text-base sm:text-lg font-semibold text-navy-800 mt-2">
              11 Rue de Lourmel • Paris, Île-de-France, 75015 • França
            </p>
            <p className="text-xs text-navy-600 mt-1 max-w-2xl">
              Localizada no 15º arrondissement (quartier de Grenelle), a poucos minutos a pé da Torre Eiffel e servida pelas excelentes linhas 6, 8 e 10 do metrô.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={copyAddress}
              className="px-4 py-2.5 rounded-xl bg-sand-100 hover:bg-sand-200 border border-sand-300 text-navy-900 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gold-700" />}
              {copied ? 'Endereço Copiado!' : 'Copiar Endereço'}
            </button>
            <a
              href="https://www.google.com/maps/search/?api=1&query=11+Rue+de+Lourmel+75015+Paris+France"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <Navigation className="w-4 h-4 text-gold-400" />
              Abrir no Google Maps
            </a>
          </div>
        </div>

        {/* Campos Editáveis de Check-in, Check-out e Observações */}
        <div className="mt-6 p-5 rounded-2xl bg-sand-50 border border-sand-200">
          <h3 className="font-serif font-bold text-navy-900 text-base mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold-600" />
            Informações de Check-in, Check-out e Anotações da Hospedagem (Salvo Offline)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase text-navy-600 mb-1">
                Horário / Instruções de Check-in (26/01/2027)
              </label>
              <input
                type="text"
                value={config.parisCheckIn}
                onChange={(e) => updateConfig({ parisCheckIn: e.target.value })}
                placeholder="Ex: A partir das 15h00"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-sm text-navy-900 focus:outline-none focus:border-navy-700"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-navy-600 mb-1">
                Horário / Instruções de Check-out (02/02/2027)
              </label>
              <input
                type="text"
                value={config.parisCheckOut}
                onChange={(e) => updateConfig({ parisCheckOut: e.target.value })}
                placeholder="Ex: Até 09h15 (para trem das 10h48)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-sm text-navy-900 focus:outline-none focus:border-navy-700"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold uppercase text-navy-600 mb-1">
                Observações Pessoais (Andar, instruções de chegada, supermercados próximos)
              </label>
              <textarea
                rows={2}
                value={config.parisDoorCodeOrNotes}
                onChange={(e) => updateConfig({ parisDoorCodeOrNotes: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-sand-300 text-xs text-navy-900 focus:outline-none focus:border-navy-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Como chegar da Gare du Nord até 11 Rue de Lourmel em 26/01 às 14h42 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
          Rota de Chegada em 26/01/2027 (Após desembarcar às 14h42)
        </span>
        <h2 className="font-serif text-2xl font-bold text-navy-900 mt-0.5 mb-4">
          Como ir da Paris Gare du Nord até 11 Rue de Lourmel
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200 space-y-3">
            <span className="px-2.5 py-1 rounded-md bg-navy-900 text-gold-300 text-xs font-bold">
              OPÇÃO 1 • METRÔ (Mais Rápida e Econômica • ~32 min)
            </span>
            <ol className="space-y-2 text-xs text-navy-800 list-decimal list-inside leading-relaxed">
              <li>
                Ao descer do Eurostar na <strong>Gare du Nord</strong>, siga as placas internas <strong>"Métro Ligne 4"</strong> (cor roxa/magenta).
              </li>
              <li>
                Embarque na <strong>Linha 4</strong> sentido <strong>Bagneux – Lucie Aubrac</strong> e desça na estação <strong>Montparnasse – Bienvenüe</strong> (12 paradas, ~16 min) <em>— ou desça em Raspail para conexão mais curta</em>.
              </li>
              <li>
                Faça a baldeação para a <strong>Linha 6</strong> (verde-água) sentido <strong>Charles de Gaulle – Étoile</strong> e desça na estação <strong>Dupleix</strong> (apenas 4 paradas a partir de Montparnasse, ~6 min).
              </li>
              <li>
                Saia da estação <strong>Dupleix</strong>, caminhe 350 metros (4 minutos em terreno plano) até a <strong>11 Rue de Lourmel</strong>!
              </li>
            </ol>
          </div>

          <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200 space-y-3">
            <span className="px-2.5 py-1 rounded-md bg-gold-500 text-navy-950 text-xs font-bold">
              OPÇÃO 2 • TÁXI OFICIAL OU APLICATIVO (Com Malas Grandes • ~30-40 min)
            </span>
            <ul className="space-y-2 text-xs text-navy-800 list-disc list-inside leading-relaxed">
              <li>
                Na Gare du Nord, siga exclusivamente as placas oficiais <strong>"Taxis"</strong> no piso térreo lateral (Cour de Maubeuge).
              </li>
              <li>
                <strong>Alerta de Segurança:</strong> Nunca aceite motoristas que abordam passageiros dentro do saguão. Entre apenas na fila oficial de táxis com luminoso "TAXI PARISIEN" no teto, ou chame Uber/Bolt no ponto demarcado.
              </li>
              <li>
                Mostre o endereço escrito: <strong>11 Rue de Lourmel, 75015 Paris</strong>.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Estações de Metrô Próximas Verificadas */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
          Mobilidade Verificada ao Redor do 11 Rue de Lourmel
        </span>
        <h2 className="font-serif text-2xl font-bold text-navy-900 mt-0.5 mb-5">
          Estações de Metrô e RER Mais Próximas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nearbyStations.map((st, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-sand-50 border border-sand-200">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-serif font-bold text-navy-900 text-base">{st.name}</h3>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-navy-900 text-gold-300">
                  {st.line}
                </span>
              </div>
              <p className="text-xs font-semibold text-gold-700 mt-1">{st.distance}</p>
              <p className="text-xs text-navy-700 mt-2 leading-relaxed">{st.whyUseful}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Como voltar dos principais pontos turísticos para 11 Rue de Lourmel */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
          Guia de Retorno Seguro no Fim do Dia
        </span>
        <h2 className="font-serif text-2xl font-bold text-navy-900 mt-0.5 mb-5">
          Como Voltar dos Principais Pontos Turísticos para 11 Rue de Lourmel
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {returnFromSpots.map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-sand-50 border border-sand-200">
              <p className="font-bold text-sm text-navy-900">Voltando de: {item.from}</p>
              <p className="text-xs text-navy-700 mt-1 leading-relaxed">{item.how}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mapa Interativo da Hospedagem em Paris e Estações Próximas */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">
          Mapa Interativo: 11 Rue de Lourmel, Estações Próximas e Torre Eiffel
        </h2>
        <InteractiveMap
          center={[48.8525, 2.2905]}
          zoom={15}
          markers={[
            {
              id: 'lourmel-base',
              name: 'Hospedagem: 11 Rue de Lourmel',
              subtitle: 'Sua base de 26/01 a 02/02/2027',
              description: '75015 Paris, Île-de-France, França.',
              lat: 48.8511,
              lng: 2.2882,
              isBase: true
            },
            {
              id: 'st-dupleix',
              name: 'Estação Dupleix (Metrô Linha 6)',
              subtitle: 'A 4 min a pé da hospedagem',
              description: 'Conexão direta para Trocadéro, Arco do Triunfo e Montparnasse.',
              lat: 48.8504,
              lng: 2.2936
            },
            {
              id: 'st-charles-michels',
              name: 'Estação Charles Michels (Metrô Linha 10)',
              subtitle: 'A 6 min a pé da hospedagem',
              description: 'Conexão direta para Quartier Latin, Luxembourg e Notre-Dame.',
              lat: 48.8466,
              lng: 2.2870
            },
            {
              id: 'st-motte-picquet',
              name: 'Estação La Motte-Picquet – Grenelle (Linhas 6, 8 e 10)',
              subtitle: 'A 9 min a pé da hospedagem',
              description: 'Conexão direta (Linha 8) para Invalides, Concorde, Opéra e Marais.',
              lat: 48.8491,
              lng: 2.2981
            },
            {
              id: 'eiffel-near',
              name: 'Torre Eiffel',
              subtitle: 'A apenas 12 min de caminhada!',
              description: '950 metros da sua hospedagem.',
              lat: 48.8584,
              lng: 2.2945
            }
          ]}
        />
      </div>
    </div>
  );
};
