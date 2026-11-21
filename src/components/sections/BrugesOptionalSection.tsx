import React from 'react';
import {
  CheckCircle2,
  Circle,
  Train,
  Clock,
  Info,
  Navigation,
  Compass
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { InteractiveMap } from '../InteractiveMap';

export const BrugesOptionalSection: React.FC = () => {
  const { brugesAttractions, updateBrugesAttraction } = useTrip();

  const visitedCount = brugesAttractions.filter((a) => a.visited).length;

  return (
    <div className="space-y-8">
      {/* Cabeçalho com Aviso Claro de Passeio Opcional */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold uppercase tracking-wider">
              Passeio Opcional (Não Obrigatório) • Caso haja tempo e interesse após 02/02
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-2">
              Passeio opcional: Bruges
            </h1>
            <p className="text-sm text-navy-600 mt-1 max-w-3xl">
              Roteiro completo de 1 dia a pé por Bruges caso vocês decidam fazer um bate-volta a partir de Bruxelas nos dias após 2 de fevereiro. Inclui todos os 16 pontos e histórias do PDF original.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 text-right">
            <span className="text-xs font-bold uppercase text-gold-700 block">Roteiro de 1 Dia</span>
            <span className="font-serif text-2xl font-bold text-navy-900">
              {visitedCount} / {brugesAttractions.length}
            </span>
            <span className="text-xs text-navy-500 block">paradas visitadas</span>
          </div>
        </div>

        {/* Como Chegar a Bruges saindo do Hotel Fleur de Ville em Bruxelas */}
        <div className="mt-6 p-5 rounded-2xl bg-navy-900 text-white grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/10 border border-white/15">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-300 block">
              1. Estação de Origem e Destino
            </span>
            <p className="text-sm font-bold mt-1">
              Origem: Bruxelles-Central / Brussel-Centraal (a 7 min a pé do Hotel Fleur de Ville)
            </p>
            <p className="text-xs text-sand-200 mt-1">
              Destino: Estação <strong>Brugge (Station Brugge)</strong>. Pegue os trens InterCity (IC) sentido Oostende, Knokke ou Blankenberge.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/15">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-300 block">
              2. Tempo de Deslocamento Atualizado
            </span>
            <p className="text-sm font-bold mt-1">
              58 minutos a 1h03 (Trem IC Direto)
            </p>
            <p className="text-xs text-sand-200 mt-1">
              Frequência: 3 a 4 trens diretos por hora. Não precisa reservar assento com dias de antecedência: basta comprar na hora na estação ou no app SNCB (aos finais de semana há o "Weekend Ticket" com 50% de desconto na ida e volta!).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/15">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-300 block">
              3. Sequência de Caminhada Perfeita
            </span>
            <p className="text-sm font-bold mt-1">
              Sul (Minnewater) → Norte (Grote Markt)
            </p>
            <p className="text-xs text-sand-200 mt-1">
              Saindo da estação de trem de Bruges, você entra direto pelo Minnewater Park e sobe caminhando pelos canais até a Praça Burg e o Grote Markt (~2,2 km planos no total).
            </p>
          </div>
        </div>
      </div>

      {/* Lista Ordenada de Atrações de Bruges */}
      <div className="space-y-4">
        {brugesAttractions.map((item, idx) => (
          <div
            key={item.id}
            className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all shadow-editorial ${
              item.visited ? 'border-emerald-300 bg-emerald-50/20' : 'border-sand-200'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <button
                onClick={() => updateBrugesAttraction(item.id, { visited: !item.visited })}
                className="mt-1 shrink-0"
              >
                {item.visited ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Circle className="w-6 h-6 text-navy-400" />
                )}
              </button>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-gold-500 text-navy-950 text-xs font-bold">
                      Parada #{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-sand-100 text-navy-700 text-xs font-semibold border border-sand-200">
                      {item.region}
                    </span>
                    <span className="text-xs font-bold text-gold-700">
                      ⏱ Estimativa: {item.estimatedDuration}
                    </span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}&travelmode=walking`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 inline-flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3 text-gold-400" />
                    Abrir no Mapa
                  </a>
                </div>

                <h3
                  className={`font-serif text-xl font-bold ${
                    item.visited ? 'line-through text-navy-500' : 'text-navy-900'
                  }`}
                >
                  {item.name}
                </h3>

                <p className="text-xs sm:text-sm text-navy-700 leading-relaxed">
                  {item.description}
                </p>

                <p className="text-xs font-medium text-gold-800 bg-sand-50 p-3 rounded-xl border border-sand-200">
                  💡 {item.tips}
                </p>

                <input
                  type="text"
                  value={item.notes}
                  onChange={(e) => updateBrugesAttraction(item.id, { notes: e.target.value })}
                  placeholder="Adicionar anotação para esta parada em Bruges..."
                  className="w-full px-3 py-1.5 rounded-xl bg-sand-50 border border-sand-200 text-xs text-navy-800"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mapa Específico 8: Roteiro de 1 Dia em Bruges */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <h3 className="font-serif text-xl font-bold text-navy-900 mb-3">
          Mapa do Roteiro a Pé de 1 Dia em Bruges (Da Estação ao Grote Markt)
        </h3>
        <InteractiveMap
          center={[51.2045, 3.2245]}
          zoom={15}
          drawRouteLine
          markers={[
            {
              id: 'brg-station-start',
              name: '0. Estação Ferroviária de Bruges (Station Brugge)',
              subtitle: 'Chegada do trem IC vindo de Bruxelles-Central (~58 min)',
              lat: 51.1972,
              lng: 3.2167,
              isBase: true
            },
            ...brugesAttractions.map((a, idx) => ({
              id: a.id,
              name: `${idx + 1}. ${a.name}`,
              subtitle: `Tempo estimado: ${a.estimatedDuration}`,
              description: a.description,
              lat: a.lat,
              lng: a.lng
            }))
          ]}
        />
      </div>
    </div>
  );
};
