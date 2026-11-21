import React, { useMemo, useState } from 'react';
import {
  Wallet,
  Calculator,
  CheckCircle2,
  Sparkles,
  Train,
  Utensils,
  Compass,
  Info
} from 'lucide-react';

interface ExpenseLine {
  id: string;
  category: 'Transporte & Trens' | 'Alimentação & Doces' | 'Atrações & Passeios' | 'Opcionais';
  title: string;
  detail: string;
  perPersonEur: number;
  isAlreadyPaid?: boolean;
  isOptional?: boolean;
}

const BASE_EXPENSES: ExpenseLine[] = [
  // Transporte & Trens
  {
    id: 'exp-train-bru-midi',
    category: 'Transporte & Trens',
    title: 'Trem Aeroporto BRU → Bruxelles-Midi (Chegada 26/01)',
    detail: 'Bilhete SNCB 2ª classe com taxa Diabolo do aeroporto incluída (~€11,20 por pessoa)',
    perPersonEur: 11.2
  },
  {
    id: 'exp-eurostar-ida',
    category: 'Transporte & Trens',
    title: 'Eurostar Ida (26/01 • 13h13): Bruxelles-Midi → Paris Gare du Nord',
    detail: 'Reserva confirmada para 2 passageiros',
    perPersonEur: 0,
    isAlreadyPaid: true
  },
  {
    id: 'exp-metro-paris',
    category: 'Transporte & Trens',
    title: 'Metrô & RER em Paris (7 dias: 26/01 a 02/02)',
    detail: 'Passe Navigo Semaine (€31,60 de Terça a Domingo) + ~6 bilhetes avulsos de €2,50 para Segunda/Terça + cartão físico (€5)',
    perPersonEur: 51.6
  },
  {
    id: 'exp-eurostar-volta',
    category: 'Transporte & Trens',
    title: 'Trem de Volta (02/02 • 10h48): Paris Gare du Nord → Bruxelles-Midi',
    detail: 'Reserva confirmada para 2 passageiros',
    perPersonEur: 0,
    isAlreadyPaid: true
  },
  {
    id: 'exp-stib-brussels',
    category: 'Transporte & Trens',
    title: 'Pré-Metrô / Transporte Urbano em Bruxelas (STIB)',
    detail: 'Bruxelles-Midi → De Brouckère (Hotel Fleur de Ville) + deslocamentos pontuais (~4 viagens de €2,10)',
    perPersonEur: 8.4
  },
  {
    id: 'exp-train-central-bru',
    category: 'Transporte & Trens',
    title: 'Trem Retorno: Bruxelles-Central → Aeroporto BRU (Último dia)',
    detail: 'Bilhete SNCB direto de 17 min com taxa Diabolo incluída (~€11,20 por pessoa)',
    perPersonEur: 11.2
  },

  // Atrações & Passeios do Roteiro (Sem Igrejas / Sem Moulin Rouge)
  {
    id: 'exp-louvre',
    category: 'Atrações & Passeios',
    title: 'Museu do Louvre (Quarta-feira, 27/01 às 15h00)',
    detail: 'Reserva confirmada de 2 ingressos (Musée du Louvre ticket – 0€ conforme seu comprovante QR Code!)',
    perPersonEur: 0,
    isAlreadyPaid: true
  },
  {
    id: 'exp-arc-invalides-pantheon',
    category: 'Atrações & Passeios',
    title: 'Ingressos Monumentos em Paris (Arco do Triunfo, Invalides, Panthéon, Opéra Garnier)',
    detail: 'Caso subam no terraço do Arco do Triunfo (~€16), Invalides (~€15), Panthéon (~€13) e Opéra Garnier (~€15). Nota: Petit Palais, Musée Carnavalet e Casa de Victor Hugo são GRATUITOS!',
    perPersonEur: 59.0
  },

  // Alimentação & Doces (Incluindo as Frutas Esculpidas Trompe-l'œil)
  {
    id: 'exp-cedric-grolet-fruits',
    category: 'Alimentação & Doces',
    title: 'Doces que Parecem Frutas de Verdade (Cédric Grolet Opéra / Le Meurice)',
    detail: 'Frutas esculpidas hiper-realistas (Limão, Manga, Maçã, Pêssego, Avelã): ~€18 a €22 cada fruta (calculando 2 frutas por pessoa na viagem)',
    perPersonEur: 40.0
  },
  {
    id: 'exp-food-paris-7days',
    category: 'Alimentação & Doces',
    title: 'Alimentação Diária em Paris (7 dias — 26/01 a 01/02)',
    detail: 'Média realista de €48/dia por pessoa: Café da manhã em Boulangerie na Rue de Lourmel (~€7) + Almoço/Lanche (~€17) + Jantar em Bistrô/Creperia (~€24)',
    perPersonEur: 336.0
  },
  {
    id: 'exp-food-brussels',
    category: 'Alimentação & Doces',
    title: 'Alimentação & Experiências Típicas em Bruxelas (De Pistolei, Obe Waffles, Fritiere, Pelicaen, Comptoir de Mathilde, Scott’s Bar)',
    detail: 'Inclui sanduíches no De Pistolei (~€6), Waffles belgas (~€6), Cone de Frites (~€6), chocolates para presente (~€25) e refeições nos dias em Bruxelas (~€95)',
    perPersonEur: 138.0
  },

  // Opcionais (Podem ser marcados/desmarcados na calculadora)
  {
    id: 'exp-opt-bruges',
    category: 'Opcionais',
    title: 'Passeio Opcional 1: Bate-volta a Bruges (Trem IC Ida e Volta + Passeio de Barco/Lanche)',
    detail: 'Trem SNCB Bruxelles-Central ⇄ Brugge (~€32 ida e volta em dia útil ou €17 no fim de semana) + barquinho no canal (€15)',
    perPersonEur: 47.0,
    isOptional: true
  },
  {
    id: 'exp-opt-disney',
    category: 'Opcionais',
    title: 'Passeio Opcional 2: Disneyland Paris (Ingresso 1 Dia / 2 Parques + Alimentação no Parque)',
    detail: 'Ingresso Dated Ticket 2 Parques em Jan/Fev (~€95 a €115) + lanche no parque (~€25). O trem RER A já está coberto no passe/bilhete de €2,50!',
    perPersonEur: 130.0,
    isOptional: true
  }
];

export const BudgetSection: React.FC = () => {
  const [eurToBrl, setEurToBrl] = useState<number>(6.25);
  const [includeBruges, setIncludeBruges] = useState<boolean>(true);
  const [includeDisney, setIncludeDisney] = useState<boolean>(false);
  const [extraShoppingPerPerson, setExtraShoppingPerPerson] = useState<number>(100);

  const totals = useMemo(() => {
    const basePerPerson = BASE_EXPENSES.filter((e) => !e.isOptional).reduce(
      (acc, item) => acc + item.perPersonEur,
      0
    );

    const brugesPerPerson = includeBruges ? 47.0 : 0;
    const disneyPerPerson = includeDisney ? 130.0 : 0;

    const totalPerPersonEur =
      basePerPerson + brugesPerPerson + disneyPerPerson + extraShoppingPerPerson;
    const totalCoupleEur = totalPerPersonEur * 2;

    return {
      basePerPerson,
      totalPerPersonEur,
      totalCoupleEur,
      totalPerPersonBrl: totalPerPersonEur * eurToBrl,
      totalCoupleBrl: totalCoupleEur * eurToBrl
    };
  }, [eurToBrl, includeBruges, includeDisney, extraShoppingPerPerson]);

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-700">
          <Wallet className="w-4 h-4" />
          Planejamento Financeiro Realista • 2 Passageiros • Jan & Fev 2027
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
          Estimativa Final de Gastos da Viagem & Preços dos Doces
        </h1>
        <p className="text-sm text-navy-600 mt-1 max-w-3xl">
          Cálculo detalhado de quanto levar para cobrir transportes locais, alimentação nos 7 dias de Paris e estadia em Bruxelas, os famosos <strong>doces que parecem frutas de verdade (Trompe-l’œil de Cédric Grolet)</strong>, monumentos e passeios opcionais — descontando o que vocês já têm emitido (como os trens Eurostar e os 2 ingressos gratuitos do Louvre!).
        </p>

        {/* Destaque Especial: Onde comer e quanto custam os Doces em Formato de Fruta */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gold-50 border-2 border-gold-300">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-navy-900 text-gold-300 text-xs font-bold uppercase tracking-wider">
              Destaque Gastronômico Pedido • Paris
            </span>
            <span className="text-xs font-bold text-navy-900">
              Preço Unitário: €17 a €25 por fruta (~R$ 106 a R$ 156)
            </span>
          </div>
          <h2 className="font-serif text-xl font-bold text-navy-900 mt-2">
            🍎🍋🥭 Doces que Parecem Frutas de Verdade (Les Fruits Sculptés / Trompe-l’œil)
          </h2>
          <p className="text-xs sm:text-sm text-navy-800 mt-1.5 leading-relaxed">
            Esses doces virais mundialmente famosos são criados pelo chef confeiteiro <strong>Cédric Grolet</strong> em Paris. Cada fruta (Limão Siciliano, Manga, Maçã, Pêssego, Avelã, Pistache, Framboesa) tem uma casca finíssima crocante de chocolate branco pintada à mão com aerógrafo e interior cremoso de ganache batida e compota com pedaços da própria fruta fresca.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-gold-200">
              <p className="font-bold text-navy-900">1. La Pâtisserie du Meurice par Cédric Grolet</p>
              <p className="text-gold-800 font-bold mt-0.5">💶 Preço: €18 a €25 por fruta</p>
              <p className="text-navy-600 mt-1">
                📍 <strong>6 Rue de Castiglione, 75001 Paris</strong> — Fica exatamente ao lado do Jardin des Tuileries e do Louvre (no seu <strong>Dia 2 • 27/01</strong>)! É a melhor loja para comprar especificamente as frutas esculpidas.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-gold-200">
              <p className="font-bold text-navy-900">2. Cédric Grolet Opéra</p>
              <p className="text-gold-800 font-bold mt-0.5">💶 Preço: €17 a €22 (Balcão) / €25+ (Salão)</p>
              <p className="text-navy-600 mt-1">
                📍 <strong>35 Avenue de l’Opéra, 75002 Paris</strong> — Fica a 4 minutos a pé da Opéra Garnier (no seu <strong>Dia 5 • 30/01</strong>). Dica: faça pedido antecipado "Click & Collect" no site <em>cedric-grolet.com</em> para furar a fila!
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-gold-200">
              <p className="font-bold text-navy-900">3. Opção Mais Econômica em Paris</p>
              <p className="text-gold-800 font-bold mt-0.5">💶 Preço: €7,50 a €11,00 por doce</p>
              <p className="text-navy-600 mt-1">
                📍 Pâtisseries artesanais premiadas como <strong>Le Jardin Sucré</strong> (156 Rue de Courcelles) e confeitarias do Marais oferecem doces Trompe-l’œil pela metade do preço.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Painel de Resumo Financeiro Final (Por Pessoa e Casal / 2 Passageiros) */}
      <div className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 border border-navy-800 shadow-editorial-lg">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/15">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Resumo Geral • Gastos Locais Estimados na Europa
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
              Estimativa Final de Gasto da Viagem
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-2xl border border-white/15">
            <label className="text-xs font-bold text-gold-300">Cotação Euro (R$):</label>
            <input
              type="number"
              step="0.05"
              value={eurToBrl}
              onChange={(e) => setEurToBrl(parseFloat(e.target.value) || 6.0)}
              className="w-20 px-2.5 py-1 rounded-lg bg-white text-navy-900 font-bold text-sm text-center"
            />
          </div>
        </div>

        {/* Controles Interativos de Simulação */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <label className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-xs font-bold text-white block">
                Incluir Passeio Opcional: Bruges?
              </span>
              <span className="text-[11px] text-sand-200">+ €47 / pessoa (Trem IC + Barco)</span>
            </div>
            <input
              type="checkbox"
              checked={includeBruges}
              onChange={(e) => setIncludeBruges(e.target.checked)}
              className="w-5 h-5 accent-gold-500"
            />
          </label>

          <label className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-xs font-bold text-white block">
                Incluir Passeio Opcional: Disney?
              </span>
              <span className="text-[11px] text-sand-200">+ €130 / pessoa (Ingresso + Lanche)</span>
            </div>
            <input
              type="checkbox"
              checked={includeDisney}
              onChange={(e) => setIncludeDisney(e.target.checked)}
              className="w-5 h-5 accent-gold-500"
            />
          </label>

          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">
                Margem Compras / Extras (por pessoa)
              </span>
              <span className="text-[11px] text-sand-200">Lembranças, farmácia, cafés extras</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-gold-300">€</span>
              <input
                type="number"
                value={extraShoppingPerPerson}
                onChange={(e) => setExtraShoppingPerPerson(parseFloat(e.target.value) || 0)}
                className="w-16 px-2 py-1 rounded-lg bg-white text-navy-900 font-bold text-xs text-center"
              />
            </div>
          </div>
        </div>

        {/* Valores Finais Calculados */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-white/10 border border-white/20">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
              Total Estimado • POR PESSOA (1 Viajante)
            </span>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                € {totals.totalPerPersonEur.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-gold-300">
                (≈ R$ {totals.totalPerPersonBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
              </span>
            </div>
            <p className="text-xs text-sand-200 mt-2">
              Cobre todo o transporte local (BRU, Metrô Paris 7 dias, Bruxelas), alimentação completa, doces de frutas Cédric Grolet, monumentos e extras selecionados.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gold-500 text-navy-950">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-900">
              Total Estimado • CASAL / 2 PASSAGEIROS
            </span>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
                € {totals.totalCoupleEur.toFixed(2)}
              </span>
              <span className="text-sm font-bold text-navy-900">
                (≈ R$ {totals.totalCoupleBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
              </span>
            </div>
            <p className="text-xs text-navy-900 font-medium mt-2">
              Valor total recomendado no cartão internacional (Wise/Nomad) + espécie para os 2 passageiros durante toda a viagem.
            </p>
          </div>
        </div>
      </div>

      {/* Tabela Detalhada Item por Item do Roteiro */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
          Detalhamento Transparente Item por Item
        </span>
        <h2 className="font-serif text-2xl font-bold text-navy-900 mt-0.5 mb-5">
          De onde vem cada valor do seu roteiro
        </h2>

        <div className="space-y-3">
          {BASE_EXPENSES.map((item) => {
            const isExcludedOptional =
              (item.id === 'exp-opt-bruges' && !includeBruges) ||
              (item.id === 'exp-opt-disney' && !includeDisney);

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isExcludedOptional
                    ? 'bg-sand-50/50 border-sand-200 opacity-55'
                    : item.isAlreadyPaid
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-sand-50 border-sand-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-navy-900 text-gold-300 text-[11px] font-bold">
                      {item.category}
                    </span>
                    {item.isAlreadyPaid && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        ✓ Já Reservado / 0€ a pagar lá
                      </span>
                    )}
                    {item.isOptional && (
                      <span className="px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900 text-[11px] font-bold">
                        {isExcludedOptional ? 'Opcional (Desmarcado)' : 'Opcional (Incluído)'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-navy-900 text-base">{item.title}</h3>
                  <p className="text-xs text-navy-600">{item.detail}</p>
                </div>

                <div className="sm:text-right shrink-0">
                  {item.isAlreadyPaid ? (
                    <span className="font-serif font-bold text-lg text-emerald-700">€ 0,00</span>
                  ) : (
                    <>
                      <p className="font-serif font-bold text-lg text-navy-900">
                        € {item.perPersonEur.toFixed(2)}{' '}
                        <span className="text-xs font-sans font-normal text-navy-500">/ pessoa</span>
                      </p>
                      <p className="text-xs font-bold text-gold-700">
                        € {(item.perPersonEur * 2).toFixed(2)} (2 passageiros)
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
