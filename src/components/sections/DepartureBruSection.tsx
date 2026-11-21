import React, { useMemo } from 'react';
import {
  PlaneTakeoff,
  Clock,
  Train,
  Car,
  CheckCircle2,
  Info,
  Navigation
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { InteractiveMap } from '../InteractiveMap';

export const DepartureBruSection: React.FC = () => {
  const { config, updateConfig } = useTrip();

  // Calculate recommended hotel departure time based on returnFlightTime
  const departureCalculation = useMemo(() => {
    if (!config.returnFlightTime) return null;
    const [hStr, mStr] = config.returnFlightTime.split(':');
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (isNaN(h) || isNaN(m)) return null;

    const flightTotalMin = h * 60 + m;
    // Recommend arriving at BRU 3 hours (180 min) before international flight + 45 min transit from Hotel Fleur de Ville = 225 min (3h45) before flight
    let leaveHotelMin = flightTotalMin - 225;
    let arrivalAtAirportMin = flightTotalMin - 180;

    const formatMin = (total: number) => {
      const normalized = ((total % 1440) + 1440) % 1440;
      const hh = String(Math.floor(normalized / 60)).padStart(2, '0');
      const mm = String(normalized % 60).padStart(2, '0');
      return `${hh}:${mm}`;
    };

    return {
      leaveHotelTime: formatMin(leaveHotelMin),
      arriveAirportTime: formatMin(arrivalAtAirportMin)
    };
  }, [config.returnFlightTime]);

  return (
    <div className="space-y-8">
      {/* Cabeçalho e Calculadora de Saída do Hotel Fleur de Ville */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-700">
          <PlaneTakeoff className="w-4 h-4" />
          Último Deslocamento da Viagem • Retorno ao Brasil
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
          Saída da Bélgica: Hotel Fleur de Ville → Aeroporto de Bruxelas (BRU)
        </h1>
        <p className="text-sm text-navy-600 mt-1 max-w-3xl">
          Guia prático para ir do <strong>Hotel Fleur de Ville (Rue du Fossé aux Loups, 46)</strong> até o <strong>Aeroporto de Bruxelas (BRU - Zaventem)</strong> com calculadora inteligente de horário de saída do hotel.
        </p>

        {/* Calculadora do Voo de Retorno */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-navy-900 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-lg flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-gold-400" />
                Cadastrar Horário do Voo de Retorno (Configurável)
              </h3>
              <p className="text-xs text-sand-200 mt-0.5">
                Informe a data e o horário do seu voo de volta para calcular o horário ideal de saída da recepção do Hotel Fleur de Ville (considerando 3h de antecedência internacional + 45 min de deslocamento).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gold-300 mb-1">
                  Data do Voo
                </label>
                <input
                  type="date"
                  value={config.returnFlightDate}
                  onChange={(e) => updateConfig({ returnFlightDate: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-white text-navy-900 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-gold-300 mb-1">
                  Horário de Partida (BRU)
                </label>
                <input
                  type="time"
                  value={config.returnFlightTime}
                  onChange={(e) => updateConfig({ returnFlightTime: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-white text-navy-900 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-gold-300 mb-1">
                  Nº do Voo
                </label>
                <input
                  type="text"
                  value={config.returnFlightNumber}
                  onChange={(e) => updateConfig({ returnFlightNumber: e.target.value })}
                  placeholder="Ex: SN / LA..."
                  className="px-3 py-2 rounded-xl bg-white text-navy-900 text-xs font-bold w-28"
                />
              </div>
            </div>
          </div>

          {departureCalculation ? (
            <div className="mt-5 p-4 rounded-xl bg-gold-500 text-navy-950 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider block">
                  1. Sair do Hotel Fleur de Ville às:
                </span>
                <p className="font-serif text-3xl font-bold mt-0.5">
                  {departureCalculation.leaveHotelTime}
                </p>
                <span className="text-xs font-medium">Check-out concluído e saída com malas</span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider block">
                  2. Chegada Recomendada no Aeroporto BRU:
                </span>
                <p className="font-serif text-3xl font-bold mt-0.5">
                  {departureCalculation.arriveAirportTime}
                </p>
                <span className="text-xs font-medium">3h antes do voo (despacho, Tax Free e imigração)</span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider block">
                  3. Partida do seu Voo:
                </span>
                <p className="font-serif text-3xl font-bold mt-0.5">{config.returnFlightTime}</p>
                <span className="text-xs font-medium">
                  Data: {config.returnFlightDate} {config.returnFlightNumber && `• Voo ${config.returnFlightNumber}`}
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-3.5 rounded-xl bg-white/10 border border-white/15 text-xs text-sand-100 flex items-center gap-2">
              <Info className="w-4 h-4 text-gold-400 shrink-0" />
              <span>
                Insira o horário do seu voo no campo acima quando desejar: o cálculo de saída recomendada do Hotel Fleur de Ville aparecerá instantaneamente.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Comparativo de Meios de Transporte: Trem, Táxi, Aplicativo e Ônibus */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
          Opções de Deslocamento Atualizadas
        </span>
        <h2 className="font-serif text-2xl font-bold text-navy-900 mt-0.5 mb-5">
          Como ir do Hotel Fleur de Ville ao Aeroporto de Bruxelas (BRU)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-md bg-navy-900 text-gold-300 text-xs font-bold">
                OPÇÃO 1 • TREM DIRETO (Mais Rápida e Pontual)
              </span>
              <h3 className="font-serif font-bold text-navy-900 text-lg mt-3">
                Via Estação Bruxelles-Central (17 a 20 min de trem)
              </h3>
              <ol className="mt-2 space-y-1.5 text-xs text-navy-700 list-decimal list-inside leading-relaxed">
                <li>
                  Saia do <strong>Hotel Fleur de Ville</strong> e caminhe 7 minutos (550m) até a estação <strong>Bruxelles-Central / Brussel-Centraal</strong>.
                </li>
                <li>
                  Compre o bilhete para <strong>Brussels Airport - Zaventem</strong> (~€11,20/pessoa, já com taxa Diabolo incluída).
                </li>
                <li>
                  Há até 6 trens diretos por hora! O trem leva apenas <strong>17 a 20 minutos</strong> até o Nível -1 do aeroporto.
                </li>
                <li>
                  Passe o código de barras do bilhete na catraca de saída do aeroporto e suba de elevador para o <strong>Nível 3 (Departures / Partidas)</strong>.
                </li>
              </ol>
            </div>
            <p className="text-xs font-bold text-emerald-800 mt-4 pt-2 border-t border-sand-200">
              Vantagem: Sem risco de trânsito na rodovia anelar de Bruxelas (Ring R0).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-md bg-gold-500 text-navy-950 text-xs font-bold">
                OPÇÃO 2 • UBER / BOLT (Porta a Porta com Malas)
              </span>
              <h3 className="font-serif font-bold text-navy-900 text-lg mt-3">
                Aplicativo na Porta do Hotel (~25 a 35 min)
              </h3>
              <p className="mt-2 text-xs text-navy-700 leading-relaxed">
                • Solicite <strong>Uber</strong> ou <strong>Bolt</strong> diretamente na porta do Hotel Fleur de Ville (<em>Rue du Fossé aux Loups 46</em>).
                <br />• Custo médio estimado: <strong>€35 a €48</strong> para o carro todo (dependendo do horário).
                <br />• Deixa você diretamente na área de embarque (Drop-off zone / Kiss & Fly) do Aeroporto de Bruxelas.
              </p>
            </div>
            <p className="text-xs font-bold text-navy-800 mt-4 pt-2 border-t border-sand-200">
              Ideal caso vocês estejam com malas pesadas de compras no último dia.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-md bg-sand-200 text-navy-900 text-xs font-bold">
                OPÇÃO 3 • TÁXI OFICIAL DE BRUXELAS
              </span>
              <h3 className="font-serif font-bold text-navy-900 text-lg mt-3">
                Táxi Licenciado (~25 a 35 min)
              </h3>
              <p className="mt-2 text-xs text-navy-700 leading-relaxed">
                • A recepção do Hotel Fleur de Ville pode agendar um táxi oficial (Taxis Verts ou Taxis Bleus) na noite anterior para o horário exato calculado acima.
                <br />• Tarifa no taxímetro do centro ao aeroporto Zaventem (14 km): cerca de <strong>€45 a €55</strong>.
              </p>
            </div>
            <p className="text-xs font-bold text-gold-800 mt-4 pt-2 border-t border-sand-200">
              Para voos muito cedo (antes das 06h00), agende táxi ou Uber na véspera.
            </p>
          </div>
        </div>
      </div>

      {/* Mapa Específico 7: Hotel Fleur de Ville -> Aeroporto de Bruxelas (BRU) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <h2 className="font-serif text-xl font-bold text-navy-900 mb-3">
          Mapa do Retorno: Hotel Fleur de Ville → Estação Central → Aeroporto de Bruxelas (BRU)
        </h2>
        <InteractiveMap
          center={[50.875, 4.42]}
          zoom={12}
          drawRouteLine
          markers={[
            {
              id: 'dep-fleur',
              name: '1. Saída: Hotel Fleur de Ville',
              subtitle: 'Rue du Fossé aux Loups, 46, 1000 Brussels',
              lat: 50.8495,
              lng: 4.3548,
              isBase: true
            },
            {
              id: 'dep-central',
              name: '2. Estação Bruxelles-Central (7 min a pé do hotel)',
              subtitle: 'Embarque no trem direto para o Aeroporto (17 min)',
              lat: 50.8455,
              lng: 4.3571
            },
            {
              id: 'dep-bru-air',
              name: '3. Aeroporto de Bruxelas (BRU - Zaventem)',
              subtitle: 'Nível 3: Salão de Partidas Internacionais (Departures)',
              lat: 50.9010,
              lng: 4.4856
            }
          ]}
        />
      </div>
    </div>
  );
};
