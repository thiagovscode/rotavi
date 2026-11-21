import React, { useMemo } from 'react';
import {
  PlaneLanding,
  Train,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Luggage,
  Ticket,
  Compass,
  Info
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { InteractiveMap } from '../InteractiveMap';

export const ArrivalBruSection: React.FC = () => {
  const { config, updateConfig, setActiveSection } = useTrip();

  // Eurostar departure: 13:13 (793 minutes from midnight)
  const connectionAnalysis = useMemo(() => {
    if (!config.arrivalFlightTime) return null;
    const [hStr, mStr] = config.arrivalFlightTime.split(':');
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (isNaN(h) || isNaN(m)) return null;

    const landingMinutes = h * 60 + m;
    const eurostarMinutes = 13 * 60 + 13; // 13:13
    const diffMinutes = eurostarMinutes - landingMinutes;

    // Estimated time: 60m immigration/baggage + 25m train to Midi + 30m buffer = 115m ideal
    if (diffMinutes < 90) {
      return {
        status: 'tight',
        diffMinutes,
        title: 'Intervalo Apertado! Atenção redobrada no desembarque',
        message: `Com pouso às ${config.arrivalFlightTime}, você terá ${diffMinutes} minutos até a partida do Eurostar às 13h13. Considerando controle de passaporte (~45 min), retirada de bagagem e trem de 22 min do aeroporto até Bruxelles-Midi, siga direto para o Nível -1 sem paradas.`
      };
    }
    if (diffMinutes < 140) {
      return {
        status: 'moderate',
        diffMinutes,
        title: 'Intervalo Moderado (Adequado sem atrasos)',
        message: `Com pouso às ${config.arrivalFlightTime}, você terá ${Math.floor(diffMinutes / 60)}h${diffMinutes % 60}min até o Eurostar das 13h13. Tempo suficiente para imigração, bagagem e trem SNCB até Bruxelles-Midi, desde que siga direto para a estação.`
      };
    }
    return {
      status: 'comfortable',
      diffMinutes,
      title: 'Margem Confortável e Segura',
      message: `Com pouso às ${config.arrivalFlightTime}, você terá ${Math.floor(diffMinutes / 60)}h${diffMinutes % 60}min até o Eurostar das 13h13 em Bruxelles-Midi. Você poderá fazer a imigração, retirar as malas, descer ao Nível -1 e aguardar com tranquilidade na estação Bruxelles-Midi.`
    };
  }, [config.arrivalFlightTime]);

  const steps = [
    {
      num: 1,
      title: 'Após desembarcar da aeronave: Controle de Passaportes (Imigração Schengen)',
      desc: 'Siga as placas amarelas/azuis "Arrivals / Sortie / Uitgang" e "Baggage Claim". Como a Bélgica é sua porta de entrada no Espaço Schengen, você passará primeiro pelo controle de imigração ("All Passports / Tous Passeports"). Tenha em mãos: passaporte, reserva da hospedagem de Paris (11 Rue de Lourmel), reserva do Hotel Fleur de Ville (Bruxelas), passagens do Eurostar, seguro viagem e passagem de volta ao Brasil.',
      badge: 'Piso de Desembarque'
    },
    {
      num: 2,
      title: 'Onde localizar a área de bagagens (Baggage Claim / Livraison des bagages)',
      desc: 'Logo após os guichês da polícia de fronteira, você entrará no salão das esteiras de bagagem. Confira o número do seu voo nos painéis luminosos, retire suas malas e passe pela saída da Alfândega ("Nothing to Declare" — faixa verde) rumo ao saguão público de desembarque (Arrivals Hall, Nível 2).',
      badge: 'Nível 2 (Arrivals)'
    },
    {
      num: 3,
      title: 'Como identificar as placas de trem no saguão de chegada',
      desc: 'No saguão de desembarque (Nível 2), procure imediatamente as placas com o ícone de um TREM e a inscrição "Train / Trein / Bahnhof". Não saia para a área externa de ônibus ou táxis: a estação ferroviária fica dentro do próprio edifício do terminal!',
      badge: 'Sinalização Interna'
    },
    {
      num: 4,
      title: 'Como encontrar a estação ferroviária do aeroporto (Nível -1)',
      desc: 'Pegue os elevadores amplos ou as escadas rolantes no centro do saguão de desembarque e desça até o Nível -1 (Basement Level -1: "Brussels Airport - Zaventem Train Station").',
      badge: 'Descer ao Nível -1'
    },
    {
      num: 5,
      title: 'Como comprar ou localizar a passagem do aeroporto até Bruxelles-Midi/Zuid',
      desc: 'No Nível -1, antes das catracas, você verá os guichês e as máquinas azuis/amarelas da SNCB/NMBS (ferrovia nacional belga). Toque na tela, escolha "English" ou "Français", selecione destino "Bruxelles-Midi / Brussel-Zuid", 2 passageiros, 2ª classe e pague com cartão por aproximação. O bilhete já inclui a taxa de acesso do aeroporto (Diabolo Fee) — guarde o bilhete com código de barras para abrir a catraca do aeroporto!',
      badge: 'Bilhete SNCB (~€11,20/pessoa)'
    },
    {
      num: 6,
      title: 'Como consultar a plataforma (Quai / Spoor)',
      desc: 'Passe o código de barras do bilhete na catraca do aeroporto e olhe os monitores azuis de partidas. Há 3 plataformas (1, 2 e 3). Procure o próximo trem que liste parada em: Brussel-Noord → Brussel-Centraal → Brussel-Zuid / Bruxelles-Midi (há até 4 a 6 trens por hora!).',
      badge: 'Plataformas 1, 2 ou 3'
    },
    {
      num: 7,
      title: 'Como identificar o trem correto para Bruxelles-Midi/Zuid',
      desc: 'Atenção aos nomes bilíngues na Bélgica: em francês a estação chama-se "Bruxelles-Midi" e em holandês/flamengo chama-se "Brussel-Zuid". São exatamente a mesma estação! O trem leva cerca de 20 a 25 minutos. Ele passará primeiro por Bruxelles-Nord e Bruxelles-Central: NÃO desça nelas; desça somente na terceira grande estação: Bruxelles-Midi / Brussel-Zuid.',
      badge: '20 a 25 min de viagem'
    },
    {
      num: 8,
      title: 'Chegada a Bruxelles-Midi/Zuid e conexão com o Eurostar (13h13 para Paris)',
      desc: 'Ao descer do trem do aeroporto em Bruxelles-Midi, desça as escadas para o corredor principal da estação (Couloir Principal). Os trens Eurostar para Paris (antigos Thalys vermelhos) partem das plataformas normais de alta velocidade (geralmente plataformas 3 a 6 — NÃO é o terminal fechado com alfândega do Reino Unido, pois França e Bélgica são ambos do Espaço Schengen). Confira no painel eletrônico o trem Eurostar das 13h13 para Paris Gare du Nord.',
      badge: 'Embarque Eurostar 13h13'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-700">
              <PlaneLanding className="w-4 h-4" />
              Etapa 1 • 26 de Janeiro de 2027
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
              Chegada ao Aeroporto de Bruxelas (BRU)
            </h1>
            <p className="text-sm text-navy-600 mt-1 max-w-3xl">
              Tutorial passo a passo para sair da aeronave, passar pela imigração, retirar as malas, descer à estação ferroviária do aeroporto (Nível -1) e chegar à estação <strong>Bruxelles-Midi/Zuid</strong> para o Eurostar das 13h13 rumo a Paris.
            </p>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold max-w-xs">
            <strong>Importante:</strong> Não há passeios turísticos em Bruxelas hoje (26/01). O turismo em Bruxelas acontecerá somente após o retorno de Paris em 02/02!
          </div>
        </div>

        {/* Calculadora de Margem entre Pouso do Voo e Eurostar 13h13 */}
        <div className="mt-6 p-5 rounded-2xl bg-sand-50 border border-sand-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-navy-900 text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-600" />
                Horário Real de Chegada do seu Voo em BRU (26/01/2027)
              </h3>
              <p className="text-xs text-navy-600 mt-0.5">
                Insira o horário previsto de pouso do seu voo para calcular automaticamente a margem até o Eurostar das 13h13.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-navy-600 mb-1">
                  Nº do Voo (opcional)
                </label>
                <input
                  type="text"
                  value={config.arrivalFlightNumber}
                  onChange={(e) => updateConfig({ arrivalFlightNumber: e.target.value })}
                  placeholder="Ex: LA / SN / TP..."
                  className="px-3 py-2 rounded-xl bg-white border border-sand-300 text-sm text-navy-900 w-36 focus:outline-none focus:border-navy-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-navy-600 mb-1">
                  Horário de Pouso em BRU
                </label>
                <input
                  type="time"
                  value={config.arrivalFlightTime}
                  onChange={(e) => updateConfig({ arrivalFlightTime: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-white border border-sand-300 text-sm font-bold text-navy-900 focus:outline-none focus:border-navy-700"
                />
              </div>
            </div>
          </div>

          {connectionAnalysis ? (
            <div
              className={`mt-4 p-4 rounded-xl border flex items-start gap-3 ${
                connectionAnalysis.status === 'tight'
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : connectionAnalysis.status === 'moderate'
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}
            >
              {connectionAnalysis.status === 'tight' ? (
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-sm">{connectionAnalysis.title}</p>
                <p className="text-xs mt-0.5 leading-relaxed">{connectionAnalysis.message}</p>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-3.5 rounded-xl bg-white border border-sand-200 text-xs text-navy-600 flex items-center gap-2">
              <Info className="w-4 h-4 text-gold-600 shrink-0" />
              <span>
                Nenhum horário de voo preenchido ainda. O sistema não presume horário de chegada — preencha o campo acima quando tiver o horário do voo para verificar a conexão com o Eurostar das 13h13.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Passo a Passo Numerado (1 a 8) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
          Tutorial Visual Numerado
        </span>
        <h2 className="font-serif text-2xl font-bold text-navy-900 mt-0.5 mb-6">
          Do Desembarque no Aeroporto até a Estação Bruxelles-Midi/Zuid
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-5 rounded-2xl bg-sand-50 border border-sand-200 flex flex-col justify-between hover:border-gold-400 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="w-8 h-8 rounded-xl bg-navy-900 text-gold-300 font-serif font-bold text-base flex items-center justify-center">
                    {step.num}
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white border border-sand-300 text-navy-700">
                    {step.badge}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-navy-900 text-base">{step.title}</h3>
                <p className="text-xs text-navy-700 mt-2 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dica de Ouro sobre Nomes Bilíngues */}
        <div className="mt-6 p-5 rounded-2xl bg-navy-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Dica Fundamental na Bélgica (Francês vs. Flamenco)
            </span>
            <p className="text-sm font-semibold">
              "Bruxelles-Midi" (Francês) = "Brussel-Zuid" (Holandês/Flamengo) = "Brussels-South" (Inglês)
            </p>
            <p className="text-xs text-navy-200">
              Como o aeroporto de Zaventem fica na região de Flandres, os painéis na estação do aeroporto costumam exibir <strong>Brussel-Zuid</strong> em primeiro lugar. É a mesma estação onde você pegará o Eurostar!
            </p>
          </div>
          <button
            onClick={() => setActiveSection('train-out')}
            className="px-4 py-2.5 rounded-xl bg-gold-500 text-navy-950 text-xs font-bold hover:bg-gold-400 shrink-0 inline-flex items-center gap-1.5"
          >
            Próximo Passo: Embarque Eurostar
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mapa Específico 1: Aeroporto BRU -> Bruxelles-Midi/Zuid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
              Mapa do 1º Deslocamento
            </span>
            <h2 className="font-serif text-xl font-bold text-navy-900">
              Aeroporto de Bruxelas (BRU) → Estação Bruxelles-Midi/Zuid
            </h2>
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&origin=Brussels+Airport+Zaventem&destination=Bruxelles-Midi&travelmode=transit"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800"
          >
            Abrir Trajeto no Google Maps
          </a>
        </div>

        <InteractiveMap
          center={[50.868, 4.41]}
          zoom={11}
          drawRouteLine
          markers={[
            {
              id: 'm-bru',
              name: '1. Aeroporto de Bruxelas (BRU - Nível -1)',
              subtitle: 'Estação Ferroviária do Aeroporto',
              description: 'Desça ao nível -1 e pegue o trem SNCB direto para Brussel-Zuid / Bruxelles-Midi.',
              lat: 50.9010,
              lng: 4.4856
            },
            {
              id: 'm-midi',
              name: '2. Estação Bruxelles-Midi / Brussel-Zuid',
              subtitle: 'Conexão com o Eurostar das 13h13',
              description: 'Desça aqui para embarcar no Eurostar direto para Paris Gare du Nord.',
              lat: 50.8357,
              lng: 4.3365,
              isBase: true
            }
          ]}
        />
      </div>
    </div>
  );
};
