import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  MapPin,
  ArrowUp,
  ArrowDown,
  Navigation,
  Sparkles,
  Calendar,
  FileText,
  ExternalLink
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { InteractiveMap } from '../InteractiveMap';

const DAY_LABELS: Record<number, { date: string; title: string; subtitle: string }> = {
  1: {
    date: 'Dia 1 • 26/01 (Terça)',
    title: 'Chegada + Trocadéro, Torre Eiffel e Champ-de-Mars',
    subtitle: 'Passeio leve ao redor da 11 Rue de Lourmel após chegada às 14h42'
  },
  2: {
    date: 'Dia 2 • 27/01 (Quarta)',
    title: 'Centro Histórico: Place Vendôme, Jardin des Tuileries e Museu do Louvre (Reserva Confirmada às 15h00)',
    subtitle: 'Ingresso oficial do Louvre agendado para Quarta-feira 27/01 às 15h00 (2 tickets)'
  },
  3: {
    date: 'Dia 3 • 28/01 (Quinta)',
    title: 'Invalides, Pont Alexandre III, Petit Palais, Concorde, Champs-Élysées e Arco do Triunfo',
    subtitle: 'Eixo monumental da Margem Esquerda ao Arco do Triunfo (retorno direto pela Linha 6)'
  },
  4: {
    date: 'Dia 4 • 29/01 (Sexta)',
    title: 'Île de la Cité (Pont Neuf, Vert-Galant, Quai de l’Horloge) & Quartier Latin (Panthéon, Luxembourg)',
    subtitle: 'Ligação direta com a Linha 10 (estação Charles Michels perto da hospedagem)'
  },
  5: {
    date: 'Dia 5 • 30/01 (Sábado)',
    title: 'Opéra Garnier, Cédric Grolet (Doces de Frutas), Galeries Lafayette & Região Comercial',
    subtitle: 'Ligação direta com a Linha 8 a partir de La Motte-Picquet Grenelle'
  },
  6: {
    date: 'Dia 6 • 31/01 (Domingo)',
    title: 'Le Marais: Musée Carnavalet, Rue des Rosiers, Place des Vosges e Casa de Victor Hugo',
    subtitle: 'Bairro histórico do Marais (ou data alternativa caso decidam fazer o passeio opcional à Disneyland)'
  },
  7: {
    date: 'Dia 7 • 01/02 (Segunda)',
    title: 'Montmartre Artístico: Mirante da Colina, Place du Tertre, La Maison Rose, Rue de l’Abreuvoir e Café des Deux Moulins',
    subtitle: 'Passeio pelas ruas artísticas no alto da colina de Montmartre via estação Abbesses'
  }
};

export const ParisItinerarySection: React.FC = () => {
  const {
    parisAttractions,
    updateParisAttraction,
    moveParisAttractionOrder,
    setActiveSection
  } = useTrip();

  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [regionFilter, setRegionFilter] = useState<string>('Todas');

  const regions = [
    'Todas',
    'Torre Eiffel e arredores',
    'Centro histórico e região do Louvre',
    'Île de la Cité',
    'Região do Quartier Latin',
    'Opéra e compras',
    'Le Marais',
    'Montmartre'
  ];

  const dayAttractions = useMemo(() => {
    return parisAttractions
      .filter((a) => a.dayAssigned === selectedDay)
      .filter((a) => (regionFilter === 'Todas' ? true : a.region === regionFilter))
      .sort((a, b) => a.order - b.order);
  }, [parisAttractions, selectedDay, regionFilter]);

  const totalVisited = parisAttractions.filter((a) => a.visited).length;

  const mapMarkers = useMemo(() => {
    const baseMarker = {
      id: 'base-lourmel',
      name: 'Sua Base: 11 Rue de Lourmel (75015)',
      subtitle: 'Hospedagem Principal em Paris',
      description: 'Ponto de partida e chegada diário.',
      lat: 48.8511,
      lng: 2.2882,
      isBase: true
    };
    const dayMarkers = dayAttractions.map((a, index) => ({
      id: a.id,
      name: `${index + 1}. ${a.name}`,
      subtitle: `${a.scheduledTime || 'Horário livre'} • ${a.region}`,
      description: a.metroOrAccess,
      lat: a.lat,
      lng: a.lng
    }));
    return [baseMarker, ...dayMarkers];
  }, [dayAttractions]);

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
              26 de Janeiro a 02 de Fevereiro de 2027 • Base: 11 Rue de Lourmel
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
              Paris — Roteiro Interativo de 7 Dias
            </h1>
            <p className="text-sm text-navy-600 mt-1 max-w-3xl">
              Os 7 dias em Paris distribuídos com tranquilidade por proximidade geográfica a partir da <strong>11 Rue de Lourmel (75015)</strong>. A <strong>Disneyland Paris</strong> fica separada como passeio opcional caso vocês decidam ir em algum dos dias.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 text-right">
            <span className="text-xs font-bold uppercase text-gold-700 block">Progresso em Paris</span>
            <span className="font-serif text-2xl font-bold text-navy-900">
              {totalVisited} de {parisAttractions.length}
            </span>
            <span className="text-xs text-navy-500 block">atrações visitadas</span>
          </div>
        </div>

        {/* Seletor dos 7 Dias */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => {
            const count = parisAttractions.filter((a) => a.dayAssigned === day).length;
            const done = parisAttractions.filter((a) => a.dayAssigned === day && a.visited).length;
            const active = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => {
                  setSelectedDay(day);
                  setRegionFilter('Todas');
                }}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  active
                    ? 'bg-navy-900 text-white border-navy-900 shadow-editorial'
                    : 'bg-sand-50 hover:bg-sand-100 text-navy-900 border-sand-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${active ? 'text-gold-400' : 'text-gold-700'}`}>
                    DIA {day}
                  </span>
                  <span className={`text-[11px] font-semibold ${active ? 'text-sand-200' : 'text-navy-500'}`}>
                    {done}/{count}
                  </span>
                </div>
                <p className="font-bold text-xs mt-1 truncate">
                  {DAY_LABELS[day].date.split('•')[1]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Filtro Rápido por Região Temática do PDF */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-navy-600 shrink-0">Filtrar região:</span>
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setRegionFilter(r)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                regionFilter === r
                  ? 'bg-gold-500 text-navy-950'
                  : 'bg-sand-100 text-navy-700 hover:bg-sand-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Resumo do Dia Selecionado */}
      <div className="bg-navy-900 text-white rounded-3xl p-6 border border-navy-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
            {DAY_LABELS[selectedDay].date}
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-0.5">
            {DAY_LABELS[selectedDay].title}
          </h2>
          <p className="text-xs text-sand-200 mt-1">{DAY_LABELS[selectedDay].subtitle}</p>
        </div>
        <button
          onClick={() => setActiveSection('disneyland')}
          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-gold-300 text-xs font-semibold shrink-0 inline-flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Ver Passeio Opcional: Disneyland Paris
        </button>
      </div>

      {/* Lista de Atrações do Dia com Controles Completos */}
      <div className="space-y-4">
        {dayAttractions.map((item, idx) => (
          <div
            key={item.id}
            className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all shadow-editorial ${
              item.visited ? 'border-emerald-300 bg-emerald-50/20' : 'border-sand-200'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex items-start gap-3.5 flex-1">
                <button
                  onClick={() => updateParisAttraction(item.id, { visited: !item.visited })}
                  className="mt-1 text-navy-700 hover:text-emerald-600 transition-colors shrink-0"
                  title="Marcar como visitado"
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
                      ⏱ Duração sugerida: {item.estimatedDuration}
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
                      🚇 Como chegar / Acesso a partir da 11 Rue de Lourmel:
                    </p>
                    <p className="text-xs text-navy-700">{item.metroOrAccess}</p>
                    <p className="text-xs text-gold-800 font-medium pt-1">
                      💡 Dica prática: {item.tips}
                    </p>
                    {item.id === 'par-louvre' && (
                      <div className="pt-2">
                        <button
                          onClick={() => setActiveSection('tickets')}
                          className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                        >
                          🎟️ Abrir Ingresso & QR Code do Louvre (27/01 às 15h00)
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Controles interativos: Horário, Trocar de Dia, Observações e Rota */}
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-navy-500 mb-1">
                        Horário Planejado
                      </label>
                      <input
                        type="time"
                        value={item.scheduledTime}
                        onChange={(e) =>
                          updateParisAttraction(item.id, { scheduledTime: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-sand-50 border border-sand-300 text-xs font-bold text-navy-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-navy-500 mb-1">
                        Mover para outro dia
                      </label>
                      <select
                        value={item.dayAssigned}
                        onChange={(e) =>
                          updateParisAttraction(item.id, {
                            dayAssigned: parseInt(e.target.value, 10)
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl bg-sand-50 border border-sand-300 text-xs font-bold text-navy-900"
                      >
                        {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                          <option key={d} value={d}>
                            Dia {d} ({DAY_LABELS[d].date.split('•')[1].trim()})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-end gap-2">
                      <button
                        onClick={() => moveParisAttractionOrder(item.id, 'up')}
                        className="p-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-navy-800 border border-sand-300"
                        title="Subir na ordem do dia"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveParisAttractionOrder(item.id, 'down')}
                        className="p-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-navy-800 border border-sand-300"
                        title="Descer na ordem do dia"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&origin=11+Rue+de+Lourmel+75015+Paris&destination=${item.lat},${item.lng}&travelmode=transit`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 inline-flex items-center justify-center gap-1"
                      >
                        <Navigation className="w-3.5 h-3.5 text-gold-400" />
                        Rota
                      </a>
                    </div>
                  </div>

                  <div className="pt-1">
                    <input
                      type="text"
                      value={item.notes}
                      onChange={(e) => updateParisAttraction(item.id, { notes: e.target.value })}
                      placeholder="Adicionar observação pessoal para esta atração..."
                      className="w-full px-3 py-2 rounded-xl bg-sand-50 border border-sand-200 text-xs text-navy-800 placeholder-navy-400 focus:outline-none focus:border-navy-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mapa do Dia Selecionado em Paris */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <h3 className="font-serif text-xl font-bold text-navy-900 mb-3">
          Mapa do Dia {selectedDay} em Paris (Origem: 11 Rue de Lourmel)
        </h3>
        <InteractiveMap
          center={[48.8606, 2.3222]}
          zoom={12}
          drawRouteLine
          markers={mapMarkers}
        />
      </div>
    </div>
  );
};
