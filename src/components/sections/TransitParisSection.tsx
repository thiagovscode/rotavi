import React, { useState } from 'react';
import {
  Train,
  Compass,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  Navigation,
  ExternalLink
} from 'lucide-react';

interface PresetRoute {
  destination: string;
  nearestStationFromLourmel: string;
  lineDetails: string;
  directionToTake: string;
  transferInfo: string;
  exitStation: string;
  estimatedTime: string;
}

const ROUTES_FROM_LOURMEL: PresetRoute[] = [
  {
    destination: 'Torre Eiffel & Champ-de-Mars',
    nearestStationFromLourmel: 'Caminhada direta (ou Estação Dupleix - Linha 6)',
    lineDetails: 'A pé pelo Boulevard de Grenelle ou 1 parada na Linha 6',
    directionToTake: 'Sentido Charles de Gaulle – Étoile (se for de Linha 6 até Bir-Hakeim)',
    transferInfo: 'Sem baldeação (trajeto direto)',
    exitStation: 'Bir-Hakeim (ou 12 min a pé direto da 11 Rue de Lourmel)',
    estimatedTime: '10 a 12 min a pé'
  },
  {
    destination: 'Trocadéro (Vista frontal da Torre Eiffel)',
    nearestStationFromLourmel: 'Estação Dupleix (4 min a pé da hospedagem)',
    lineDetails: 'Metrô Linha 6 (Verde-água)',
    directionToTake: 'Sentido Charles de Gaulle – Étoile',
    transferInfo: 'Sem baldeação (apenas 3 paradas: Bir-Hakeim, Passy, Trocadéro)',
    exitStation: 'Trocadéro',
    estimatedTime: '~10 min total'
  },
  {
    destination: 'Arco do Triunfo & Champs-Élysées',
    nearestStationFromLourmel: 'Estação Dupleix (4 min a pé da hospedagem)',
    lineDetails: 'Metrô Linha 6 (Verde-água)',
    directionToTake: 'Sentido Charles de Gaulle – Étoile (ponto final da linha)',
    transferInfo: 'Sem baldeação (6 paradas diretas)',
    exitStation: 'Charles de Gaulle – Étoile',
    estimatedTime: '~15 min total'
  },
  {
    destination: 'Hôtel des Invalides & Pont Alexandre III',
    nearestStationFromLourmel: 'Estação La Motte-Picquet – Grenelle (9 min a pé da hospedagem)',
    lineDetails: 'Metrô Linha 8 (Lilás)',
    directionToTake: 'Sentido Créteil – Pointe du Lac',
    transferInfo: 'Sem baldeação se embarcar em La Motte-Picquet (apenas 3 paradas)',
    exitStation: 'Invalides',
    estimatedTime: '~15 min total'
  },
  {
    destination: 'Place de la Concorde & Jardin des Tuileries',
    nearestStationFromLourmel: 'Estação La Motte-Picquet – Grenelle (9 min a pé)',
    lineDetails: 'Metrô Linha 8 (Lilás)',
    directionToTake: 'Sentido Créteil – Pointe du Lac',
    transferInfo: 'Sem baldeação (4 paradas diretas)',
    exitStation: 'Concorde',
    estimatedTime: '~17 min total'
  },
  {
    destination: 'Museu do Louvre & Place Vendôme',
    nearestStationFromLourmel: 'Estação Dupleix (Linha 6) ou La Motte-Picquet (Linha 8)',
    lineDetails: 'Linha 8 até Concorde + Linha 1 (Amarela)',
    directionToTake: 'Linha 8 sentido Créteil → em Concorde pegue Linha 1 sentido Château de Vincennes',
    transferInfo: '1 baldeação rápida na estação Concorde',
    exitStation: 'Palais Royal – Musée du Louvre',
    estimatedTime: '~22 min total'
  },
  {
    destination: 'Île de la Cité (Pont Neuf / Vert-Galant) & Quartier Latin',
    nearestStationFromLourmel: 'Estação Charles Michels (6 min a pé da hospedagem)',
    lineDetails: 'Metrô Linha 10 (Amarelo-ocre)',
    directionToTake: 'Sentido Gare d’Austerlitz',
    transferInfo: 'Sem baldeação! Linha 10 direta da sua hospedagem até o Quartier Latin',
    exitStation: 'Cluny – La Sorbonne ou Odéon',
    estimatedTime: '~18 min total'
  },
  {
    destination: 'Jardin du Luxembourg & Panthéon',
    nearestStationFromLourmel: 'Estação Charles Michels (6 min a pé da hospedagem)',
    lineDetails: 'Metrô Linha 10 (Amarelo-ocre)',
    directionToTake: 'Sentido Gare d’Austerlitz',
    transferInfo: 'Sem baldeação! Direto pela Linha 10',
    exitStation: 'Mabillon / Odéon (p/ Luxembourg) ou Maubert – Mutualité (p/ Panthéon)',
    estimatedTime: '~16 min total'
  },
  {
    destination: 'Opéra Garnier, Cédric Grolet & Galeries Lafayette',
    nearestStationFromLourmel: 'Estação La Motte-Picquet – Grenelle (9 min a pé)',
    lineDetails: 'Metrô Linha 8 (Lilás)',
    directionToTake: 'Sentido Créteil – Pointe du Lac',
    transferInfo: 'Sem baldeação (6 paradas diretas)',
    exitStation: 'Opéra',
    estimatedTime: '~19 min total'
  },
  {
    destination: 'Le Marais (Place des Vosges, Victor Hugo, Carnavalet)',
    nearestStationFromLourmel: 'Estação La Motte-Picquet – Grenelle (9 min a pé)',
    lineDetails: 'Metrô Linha 8 (Lilás)',
    directionToTake: 'Sentido Créteil – Pointe du Lac',
    transferInfo: 'Sem baldeação (14 paradas diretas na Linha 8)',
    exitStation: 'Chemin Vert (a 2 min a pé da Place des Vosges)',
    estimatedTime: '~27 min total'
  },
  {
    destination: 'Montmartre (Place du Tertre, La Maison Rose, Café des Deux Moulins)',
    nearestStationFromLourmel: 'Estação Dupleix (4 min a pé da hospedagem)',
    lineDetails: 'Linha 6 (Verde-água) + Linha 12 (Verde-escura)',
    directionToTake: 'Linha 6 sentido Nation até Pasteur → Linha 12 sentido Mairie d’Aubervilliers',
    transferInfo: '1 baldeação em Pasteur (chega direto no alto de Montmartre)',
    exitStation: 'Abbesses',
    estimatedTime: '~28 min total'
  },
  {
    destination: 'Disneyland Paris (Marne-la-Vallée Chessy)',
    nearestStationFromLourmel: 'Estação Dupleix (4 min a pé da hospedagem)',
    lineDetails: 'Linha 6 + Trem RER A (Vermelho)',
    directionToTake: 'Linha 6 até Charles de Gaulle – Étoile → RER A sentido Marne-la-Vallée Chessy',
    transferInfo: '1 baldeação em Charles de Gaulle – Étoile (procure o ícone do Mickey no painel)',
    exitStation: 'Marne-la-Vallée – Chessy (ponto final)',
    estimatedTime: '~55 min total'
  },
  {
    destination: 'Estação Paris Gare du Nord (Trem para Bruxelas em 02/02)',
    nearestStationFromLourmel: 'Estação Dupleix (4 min a pé da hospedagem)',
    lineDetails: 'Linha 6 (Verde-água) + Linha 4 (Roxa)',
    directionToTake: 'Linha 6 sentido Nation até Montparnasse-Bienvenüe → Linha 4 sentido Porte de Clignancourt',
    transferInfo: '1 baldeação em Montparnasse – Bienvenüe (ou Raspail)',
    exitStation: 'Gare du Nord',
    estimatedTime: '~32 min total'
  }
];

export const TransitParisSection: React.FC = () => {
  const [selectedDestIndex, setSelectedDestIndex] = useState<number>(0);
  const [customOrigin, setCustomOrigin] = useState('11 Rue de Lourmel, 75015 Paris');
  const [customDestination, setCustomDestination] = useState('');

  const activeRoute = ROUTES_FROM_LOURMEL[selectedDestIndex];

  const manualGuides = [
    {
      title: '1. Como funciona o Metrô vs. RER',
      desc: 'O Metrô possui 16 linhas numeradas de 1 a 14 (mais 3bis e 7bis) que circulam dentro de Paris com paradas curtas. O RER é o trem expresso regional identificado por letras (A, B, C, D, E): dentro de Paris ele funciona exatamente como um metrô mais rápido, e também leva a pontos mais afastados como a Disneyland Paris (RER A).'
    },
    {
      title: '2. Como identificar a Direção Correta da Linha',
      desc: 'Nas estações de Paris, as plataformas são identificadas pelo nome da ESTAÇÃO FINAL (Terminus) daquela direção. Por exemplo, na sua estação Dupleix (Linha 6), você verá duas direções: "Direction Charles de Gaulle – Étoile" (vai para Bir-Hakeim, Trocadéro e Arco do Triunfo) e "Direction Nation" (vai para Montparnasse e Bercy).'
    },
    {
      title: '3. Como fazer Baldeações (Correspondances)',
      desc: 'Ao descer do vagão para trocar de linha, siga as placas laranjas/brancas com o número ou letra da nova linha desejada. Não passe por placas azuis escritas "Sortie" (Saída), pois se sair pelas portas de vidro terá que pagar um novo bilhete!'
    },
    {
      title: '4. Como utilizar o RER sem errar o ramal',
      desc: 'Diferente do metrô, uma mesma linha de RER pode ter bifurcações nas pontas. Ao pegar o RER A para a Disneyland Paris na estação Charles de Gaulle – Étoile, olhe para o monitor suspenso na plataforma: o trem correto terá a luz acesa ao lado de "Marne-la-Vallée – Chessy (Parcs Disneyland)".'
    },
    {
      title: '5. Como validar bilhetes e quando guardar',
      desc: 'Encoste o cartão físico Navigo Easy ou o celular (com NFC via app Île-de-France Mobilités / Bonjour RATP) no leitor roxo/azul da catraca até ouvir o bipe verde. No RER, você precisa validar o cartão TANTO na catraca de entrada quanto na catraca de saída!'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
          Guia Prático Verificado para 2027 • Metrô, RER & Passes Navigo
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
          Transporte Público em Paris
        </h1>
        <p className="text-sm text-navy-600 mt-1 max-w-3xl">
          Como dominar o metrô e o RER a partir da <strong>11 Rue de Lourmel</strong>, além das regras e tarifas atualizadas do sistema Navigo vigentes após a reforma tarifária de Île-de-France.
        </p>

        {/* Simulador / Pesquisador de Rotas a partir da Hospedagem */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-navy-900 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/15">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                Simulador Instantâneo Offline (Base: 11 Rue de Lourmel)
              </span>
              <h2 className="font-serif text-xl font-bold mt-0.5">
                Como Chegar aos Pontos da Viagem a partir da Hospedagem
              </h2>
            </div>
            <div className="w-full md:w-80">
              <label className="block text-[11px] font-bold uppercase text-gold-300 mb-1">
                Escolha o Destino em Paris:
              </label>
              <select
                value={selectedDestIndex}
                onChange={(e) => setSelectedDestIndex(parseInt(e.target.value, 10))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white text-navy-900 text-xs font-bold focus:outline-none"
              >
                {ROUTES_FROM_LOURMEL.map((r, i) => (
                  <option key={i} value={i}>
                    {r.destination}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
              <span className="text-[11px] uppercase tracking-wider text-gold-300 font-bold block">
                1. Estação de Embarque (Perto do 11 Rue de Lourmel)
              </span>
              <p className="text-sm font-bold text-white mt-1">
                {activeRoute.nearestStationFromLourmel}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
              <span className="text-[11px] uppercase tracking-wider text-gold-300 font-bold block">
                2. Linha & Direção Correta
              </span>
              <p className="text-sm font-bold text-white mt-1">{activeRoute.lineDetails}</p>
              <p className="text-xs text-sand-200 mt-0.5">{activeRoute.directionToTake}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
              <span className="text-[11px] uppercase tracking-wider text-gold-300 font-bold block">
                3. Desembarque & Tempo Estimado
              </span>
              <p className="text-sm font-bold text-white mt-1">Descer em: {activeRoute.exitStation}</p>
              <p className="text-xs text-gold-300 font-semibold mt-0.5">
                {activeRoute.transferInfo} • Tempo: {activeRoute.estimatedTime}
              </p>
            </div>
          </div>

          {/* Campo livre para abrir qualquer origem/destino no Google Maps Transit */}
          <div className="mt-5 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
            <div className="flex-1">
              <label className="block text-[11px] font-bold uppercase text-sand-200 mb-1">
                Origem Personalizada
              </label>
              <input
                type="text"
                value={customOrigin}
                onChange={(e) => setCustomOrigin(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-sand-300"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] font-bold uppercase text-sand-200 mb-1">
                Pesquisar Qualquer Outro Destino em Paris
              </label>
              <input
                type="text"
                value={customDestination}
                onChange={(e) => setCustomDestination(e.target.value)}
                placeholder="Ex: Rue des Rosiers, Musée d'Orsay, Bercy..."
                className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-sand-300"
              />
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
                customOrigin
              )}&destination=${encodeURIComponent(
                customDestination || activeRoute.destination
              )}+Paris&travelmode=transit`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gold-500 text-navy-950 text-xs font-bold hover:bg-gold-400 inline-flex items-center justify-center gap-1.5 shrink-0"
            >
              <Navigation className="w-3.5 h-3.5" />
              Calcular Rota no Mapa
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Atualização Verificada 2025 -> 2027 sobre o Navigo e Bilhetes */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
              Regras Verificadas para 2027 (Île-de-France Mobilités)
            </span>
            <h2 className="font-serif text-2xl font-bold text-navy-900 mt-0.5">
              Navigo Découverte, Navigo Easy e Nova Tarifa Única
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            Atualizado para 2027
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 mb-5 leading-relaxed">
          <strong>O que mudou entre 2025 e 2027 (Importante!):</strong> Os antigos bilhetes de papel magnético (Ticket t+) e as antigas tarifas separadas por zonas para a Disneyland Paris foram substituídos pela <strong>Tarifa Simplificada Única</strong> da Île-de-France Mobilités. Agora, um único tipo de bilhete "Ticket Métro-Train-RER" vale tanto para o metrô no centro de Paris quanto para o trem RER A até a Disneyland Paris!
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-navy-900 text-gold-300 text-[11px] font-bold">
                MAIS PRÁTICO • SEM FOTO
              </span>
              <h3 className="font-serif font-bold text-navy-900 text-lg mt-2">
                1. Bilhete Unitário no Celular ou Cartão Navigo Easy
              </h3>
              <p className="text-xs text-navy-700 mt-2 leading-relaxed">
                • <strong>Ticket Métro-Train-RER:</strong> ~€2,50 por viagem (inclui metrô e também o RER A até a Disneyland Paris!).
                <br />• <strong>Ticket Bus-Tram:</strong> ~€2,00 por viagem.
                <br />• Pode ser comprado direto pelo celular nos aplicativos <strong>Bonjour RATP</strong> ou <strong>Île-de-France Mobilités</strong> (ou Apple Carteira), ou carregado no cartão físico <strong>Navigo Easy</strong> (custa €2 nas máquinas).
              </p>
            </div>
            <p className="text-[11px] font-bold text-gold-800 mt-3 pt-2 border-t border-sand-200">
              Atenção: Cada passageiro deve ter seu próprio cartão Navigo Easy ou celular (não é possível passar 2 pessoas com o mesmo cartão).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500 text-navy-950 text-[11px] font-bold">
                VIAGENS ILIMITADAS
              </span>
              <h3 className="font-serif font-bold text-navy-900 text-lg mt-2">
                2. Navigo Semaine (Passe Semanal) & Navigo Jour
              </h3>
              <p className="text-xs text-navy-700 mt-2 leading-relaxed">
                • <strong>Navigo Semaine (~€31,60 para zonas 1 a 5):</strong> Permite viagens ilimitadas, mas <strong>ATENÇÃO À REGRA OFICIAL:</strong> ele sempre vale de <strong>Segunda-feira (00h00) a Domingo (23h59)</strong>, independentemente do dia da compra!
                <br />• Como vocês chegam na <strong>Terça-feira (26/01)</strong> e vão embora na <strong>Terça-feira (02/02)</strong>, o Navigo Semaine cobriria de Terça 26/01 até Domingo 31/01 (vendido até quinta-feira à meia-noite). Para Segunda (01/02) e Terça (02/02), basta usar bilhetes avulsos de €2,50!
              </p>
            </div>
            <p className="text-[11px] font-bold text-navy-800 mt-3 pt-2 border-t border-sand-200">
              Navigo Jour (Diário 1 dia todas as zonas exceto aeroportos): ~€12,00.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[11px] font-bold">
                EVITE MULTAS DOS FISCAIS
              </span>
              <h3 className="font-serif font-bold text-navy-900 text-lg mt-2">
                3. Regras Obrigatórias do Cartão Físico Navigo Découverte
              </h3>
              <p className="text-xs text-navy-700 mt-2 leading-relaxed">
                Caso optem por comprar o cartão físico <strong>Navigo Découverte</strong> (€5 no guichê) em vez de usar o aplicativo no celular:
                <br />• É <strong>OBRIGATÓRIO</strong> colar uma foto 3x4 (ou 2,5x3cm) e escrever seu nome e sobrenome à caneta no cartão antes do primeiro uso!
                <br />• Fiscais da RATP aplicam multa imediata (€35 a €50) se o Navigo Découverte físico estiver sem foto colada ou sem nome assinado.
              </p>
            </div>
            <p className="text-[11px] font-bold text-emerald-800 mt-3 pt-2 border-t border-sand-200">
              Dica: Comprando pelo app Île-de-France Mobilités no celular, a foto é tirada na própria tela com a câmera frontal!
            </p>
          </div>
        </div>
      </div>

      {/* Passo a Passo do Metrô e RER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
          Manual de Uso para Iniciantes
        </span>
        <h2 className="font-serif text-2xl font-bold text-navy-900 mt-0.5 mb-5">
          Como Andar de Metrô e RER em Paris sem Dúvidas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {manualGuides.map((g, i) => (
            <div key={i} className="p-5 rounded-2xl bg-sand-50 border border-sand-200">
              <h3 className="font-serif font-bold text-navy-900 text-base">{g.title}</h3>
              <p className="text-xs text-navy-700 mt-2 leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
