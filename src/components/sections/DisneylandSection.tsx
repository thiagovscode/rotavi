import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  ExternalLink,
  AlertCircle,
  Train,
  Clock,
  MapPin
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { InteractiveMap } from '../InteractiveMap';

export const DisneylandSection: React.FC = () => {
  const { disneyAttractions, updateDisneyAttraction, config, updateConfig } = useTrip();
  const [parkFilter, setParkFilter] = useState<string>('Todos');

  const filtered = disneyAttractions.filter((a) =>
    parkFilter === 'Todos' ? true : a.park === parkFilter
  );

  const visitedCount = disneyAttractions.filter((a) => a.visited).length;

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Passeio Opcional (Não Obrigatório) • Caso haja tempo e interesse durante os dias em Paris
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-2">
              Passeio opcional: Disneyland Paris
            </h1>
            <p className="text-sm text-navy-600 mt-1 max-w-3xl">
              Este guia fica salvo como <strong>opcional</strong> caso vocês decidam dedicar um dia aos parques em Marne-la-Vallée (a ~55 min de RER A). A visita não é um compromisso obrigatório do roteiro de 7 dias em Paris. Abaixo estão organizadas as 11 atrações do PDF original caso resolvam ir.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 text-right">
            <span className="text-xs font-bold uppercase text-gold-700 block">Checklist Opcional</span>
            <span className="font-serif text-2xl font-bold text-navy-900">
              {visitedCount} / {disneyAttractions.length}
            </span>
            <span className="text-xs text-navy-500 block">atrações concluídas</span>
          </div>
        </div>

        {/* Como chegar a partir da 11 Rue de Lourmel + Alerta de Funcionamento */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200">
            <h3 className="font-serif font-bold text-navy-900 text-sm flex items-center gap-2">
              <Train className="w-4 h-4 text-gold-600" />
              Como chegar saindo da 11 Rue de Lourmel
            </h3>
            <p className="text-xs text-navy-700 mt-1.5 leading-relaxed">
              1. Caminhe 4 min até a estação <strong>Dupleix (Linha 6)</strong> e vá até <strong>Charles de Gaulle – Étoile</strong> (6 paradas, 10 min).
              <br />
              2. Na mesma estação, siga as placas do <strong>RER A (vermelho)</strong> sentido <strong>Marne-la-Vallée – Chessy</strong> (identificado pelo ícone do Mickey nos painéis!).
              <br />
              3. Desça na estação final (Marne-la-Vallée Chessy): os portões dos dois parques ficam a 2 minutos a pé da saída da estação.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col justify-between">
            <div>
              <h3 className="font-serif font-bold text-amber-950 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                Aviso de Manutenção & Status em Tempo Real
              </h3>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                Em janeiro e fevereiro (baixa temporada de inverno), a Disneyland Paris pode realizar manutenção programada em algumas atrações ou alterar horários por condições climáticas. Não presuma que todas estarão abertas sem antes conferir o calendário oficial da data da sua visita.
              </p>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-bold uppercase text-amber-900">Data da visita:</label>
                <input
                  type="date"
                  value={config.disneyVisitDate}
                  onChange={(e) => updateConfig({ disneyVisitDate: e.target.value })}
                  className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-xs font-bold text-navy-900"
                />
              </div>
              <a
                href="https://www.disneylandparis.com/en-int/calendars/park-hours/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-navy-900 underline hover:text-gold-700"
              >
                Consultar Atrações Abertas Oficial
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Filtro por Parque */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {['Todos', 'Disneyland Park', 'Walt Disney Studios Park (Disney Adventure World)'].map(
            (p) => (
              <button
                key={p}
                onClick={() => setParkFilter(p)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  parkFilter === p
                    ? 'bg-navy-900 text-gold-300'
                    : 'bg-sand-100 text-navy-700 hover:bg-sand-200'
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>
      </div>

      {/* Cards das 11 Atrações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((attr) => (
          <div
            key={attr.id}
            className={`bg-white rounded-3xl p-5 border shadow-editorial transition-all flex flex-col justify-between ${
              attr.visited ? 'border-emerald-300 bg-emerald-50/20' : 'border-sand-200'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => updateDisneyAttraction(attr.id, { visited: !attr.visited })}
                    className="mt-1 shrink-0"
                  >
                    {attr.visited ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-navy-400" />
                    )}
                  </button>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-navy-900 text-gold-300 text-[11px] font-bold">
                        {attr.park === 'Disneyland Park' ? 'Disneyland Park' : 'Walt Disney Studios'}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-sand-100 text-navy-700 text-[11px] font-semibold border border-sand-200">
                        {attr.land}
                      </span>
                    </div>
                    <h3
                      className={`font-serif text-lg font-bold mt-1 ${
                        attr.visited ? 'line-through text-navy-500' : 'text-navy-900'
                      }`}
                    >
                      {attr.name}
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gold-100 text-gold-900 shrink-0">
                  {attr.thrillLevel}
                </span>
              </div>

              <p className="text-xs text-navy-700 mt-3 leading-relaxed">{attr.description}</p>
              <p className="text-xs font-medium text-gold-800 bg-sand-50 p-2.5 rounded-xl border border-sand-200 mt-2.5">
                💡 {attr.tips}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-sand-100 space-y-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-navy-500 mb-0.5">
                    Horário / Premier Access
                  </label>
                  <input
                    type="time"
                    value={attr.scheduledTime}
                    onChange={(e) =>
                      updateDisneyAttraction(attr.id, { scheduledTime: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 rounded-xl bg-sand-50 border border-sand-300 text-xs font-bold text-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-navy-500 mb-0.5">
                    Reserva / Fila Virtual
                  </label>
                  <input
                    type="text"
                    value={attr.reservationNote}
                    onChange={(e) =>
                      updateDisneyAttraction(attr.id, { reservationNote: e.target.value })
                    }
                    placeholder="Ex: Single Rider..."
                    className="w-full px-2.5 py-1.5 rounded-xl bg-sand-50 border border-sand-300 text-xs text-navy-900"
                  />
                </div>
              </div>
              <input
                type="text"
                value={attr.notes}
                onChange={(e) => updateDisneyAttraction(attr.id, { notes: e.target.value })}
                placeholder="Adicionar anotação sobre a atração..."
                className="w-full px-2.5 py-1.5 rounded-xl bg-sand-50 border border-sand-200 text-xs text-navy-800"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mapa Interativo das Atrações da Disneyland Paris */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <h2 className="font-serif text-xl font-bold text-navy-900 mb-3">
          Mapa Interativo das 11 Atrações nos Dois Parques da Disneyland Paris
        </h2>
        <InteractiveMap
          center={[48.8695, 2.7775]}
          zoom={15}
          markers={disneyAttractions.map((d) => ({
            id: d.id,
            name: d.name,
            subtitle: `${d.park} • ${d.land}`,
            description: d.description,
            lat: d.lat,
            lng: d.lng
          }))}
        />
      </div>
    </div>
  );
};
