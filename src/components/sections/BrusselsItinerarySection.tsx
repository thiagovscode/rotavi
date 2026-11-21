import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Circle,
  ArrowUp,
  ArrowDown,
  Navigation,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { InteractiveMap } from '../InteractiveMap';

const BRUSSELS_DAYS: Record<number, { label: string; title: string; subtitle: string }> = {
  1: {
    label: 'Bloco 1 • 02/02 (Terça à Tarde/Noite — Após chegada às 12h17)',
    title: 'Galeries Saint-Hubert, Rue de la Montagne, Grand Place Completa, Mural do Tintim e Manneken Pis',
    subtitle: 'Circuito 100% a pé a partir do Hotel Fleur de Ville (tudo em um raio de 250m a 700m do hotel)'
  },
  2: {
    label: 'Bloco 2 • 03/02 (Quarta-feira — Dia Completo em Bruxelas)',
    title: 'Smurf, Mont des Arts, Jardim do Petit Sablon, Palácio Real, Parc de Bruxelles, Parlamento e Makers',
    subtitle: 'Eixo Cidade Alta, Quartier Royal e Parlamento partindo do Hotel Fleur de Ville'
  }
};

export const BrusselsItinerarySection: React.FC = () => {
  const {
    brusselsAttractions,
    updateBrusselsAttraction,
    moveBrusselsAttractionOrder,
    setActiveSection
  } = useTrip();

  const [selectedDay, setSelectedDay] = useState<number>(1);

  const dayList = useMemo(() => {
    return brusselsAttractions
      .filter((a) => a.dayAssigned === selectedDay)
      .sort((a, b) => a.order - b.order);
  }, [brusselsAttractions, selectedDay]);

  const visitedCount = brusselsAttractions.filter((a) => a.visited).length;

  const mapMarkers = useMemo(() => {
    const base = {
      id: 'fleur-de-ville-base',
      name: 'Ponto de Partida: Hotel Fleur de Ville',
      subtitle: 'Rue du Fossé aux Loups, 46, 1000 Brussels',
      description: 'Base oficial em Bruxelas a partir de 02/02/2027.',
      lat: 50.8495,
      lng: 4.3548,
      isBase: true
    };
    const pts = dayList.map((a, idx) => ({
      id: a.id,
      name: `${idx + 1}. ${a.name}`,
      subtitle: `${a.distanceFromBase || ''} • ${a.scheduledTime}`,
      description: a.description,
      lat: a.lat,
      lng: a.lng
    }));
    return [base, ...pts];
  }, [dayList]);

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
              Somente Após o Retorno de Paris (a partir de 02/02/2027) • Base: Hotel Fleur de Ville
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
              Bruxelas — Roteiro por Proximidade
            </h1>
            <p className="text-sm text-navy-600 mt-1 max-w-3xl">
              Todos os 19 pontos turísticos de Bruxelas presentes no seu roteiro, organizados em caminhada lógica a partir do <strong>Hotel Fleur de Ville (Rue du Fossé aux Loups, 46)</strong> após o desembarque do trem de Paris em 2 de fevereiro.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 text-right">
            <span className="text-xs font-bold uppercase text-gold-700 block">Progresso Bruxelas</span>
            <span className="font-serif text-2xl font-bold text-navy-900">
              {visitedCount} / {brusselsAttractions.length}
            </span>
            <span className="text-xs text-navy-500 block">locais visitados</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[1, 2].map((d) => {
            const active = selectedDay === d;
            const total = brusselsAttractions.filter((a) => a.dayAssigned === d).length;
            const done = brusselsAttractions.filter((a) => a.dayAssigned === d && a.visited).length;
            return (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  active
                    ? 'bg-navy-900 text-white border-navy-900 shadow-editorial'
                    : 'bg-sand-50 hover:bg-sand-100 text-navy-900 border-sand-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${active ? 'text-gold-400' : 'text-gold-700'}`}>
                    {BRUSSELS_DAYS[d].label}
                  </span>
                  <span className={`text-xs font-bold ${active ? 'text-sand-200' : 'text-navy-600'}`}>
                    {done}/{total} visitados
                  </span>
                </div>
                <p className="font-serif font-bold text-base mt-1">{BRUSSELS_DAYS[d].title}</p>
                <p className={`text-xs mt-0.5 ${active ? 'text-sand-200' : 'text-navy-600'}`}>
                  {BRUSSELS_DAYS[d].subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista de Atrações de Bruxelas */}
      <div className="space-y-4">
        {dayList.map((item, idx) => (
          <div
            key={item.id}
            className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all shadow-editorial ${
              item.visited ? 'border-emerald-300 bg-emerald-50/20' : 'border-sand-200'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <button
                onClick={() => updateBrusselsAttraction(item.id, { visited: !item.visited })}
                className="mt-1 shrink-0"
              >
                {item.visited ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Circle className="w-6 h-6 text-navy-400" />
                )}
              </button>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-navy-900 text-gold-300 text-xs font-bold">
                    #{idx + 1}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sand-100 text-navy-700 text-xs font-semibold border border-sand-200">
                    {item.region}
                  </span>
                  <span className="text-xs font-semibold text-gold-700">
                    ⏱ {item.estimatedDuration}
                  </span>
                  {item.distanceFromBase && (
                    <span className="text-xs text-navy-500">• {item.distanceFromBase}</span>
                  )}
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

                <div className="p-3.5 rounded-2xl bg-sand-50 border border-sand-200 space-y-1">
                  <p className="text-xs font-bold text-navy-900">
                    🚶 Acesso a partir do Hotel Fleur de Ville: {item.metroOrAccess}
                  </p>
                  <p className="text-xs text-gold-800 font-medium">💡 Dica: {item.tips}</p>
                </div>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-navy-500 mb-1">
                      Horário Sugerido
                    </label>
                    <input
                      type="time"
                      value={item.scheduledTime}
                      onChange={(e) =>
                        updateBrusselsAttraction(item.id, { scheduledTime: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-xl bg-sand-50 border border-sand-300 text-xs font-bold text-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-navy-500 mb-1">
                      Mover de Bloco/Dia
                    </label>
                    <select
                      value={item.dayAssigned}
                      onChange={(e) =>
                        updateBrusselsAttraction(item.id, {
                          dayAssigned: parseInt(e.target.value, 10)
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl bg-sand-50 border border-sand-300 text-xs font-bold text-navy-900"
                    >
                      <option value={1}>Bloco 1 (02/02 • Tarde/Noite)</option>
                      <option value={2}>Bloco 2 (03/02 • Dia Completo)</option>
                    </select>
                  </div>

                  <div className="flex items-end gap-2">
                    <button
                      onClick={() => moveBrusselsAttractionOrder(item.id, 'up')}
                      className="p-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-navy-800 border border-sand-300"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveBrusselsAttractionOrder(item.id, 'down')}
                      className="p-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-navy-800 border border-sand-300"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&origin=Rue+du+Fosse+aux+Loups+46+1000+Brussels&destination=${item.lat},${item.lng}&travelmode=walking`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 inline-flex items-center justify-center gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5 text-gold-400" />
                      A pé
                    </a>
                  </div>
                </div>

                <input
                  type="text"
                  value={item.notes}
                  onChange={(e) => updateBrusselsAttraction(item.id, { notes: e.target.value })}
                  placeholder="Adicionar observação pessoal..."
                  className="w-full px-3 py-2 rounded-xl bg-sand-50 border border-sand-200 text-xs text-navy-800"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mapa do Roteiro de Bruxelas */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <h3 className="font-serif text-xl font-bold text-navy-900 mb-3">
          Mapa do Circuito a Pé em Bruxelas (Origem: Hotel Fleur de Ville)
        </h3>
        <InteractiveMap
          center={[50.8465, 4.3555]}
          zoom={15}
          drawRouteLine
          markers={mapMarkers}
        />
      </div>
    </div>
  );
};
