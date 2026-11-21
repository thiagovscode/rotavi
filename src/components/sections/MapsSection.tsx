import React, { useMemo, useState } from 'react';
import {
  Map,
  Navigation,
  ExternalLink,
  Compass
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { InteractiveMap, InteractiveMarker } from '../InteractiveMap';
import { MAP_POINTS } from '../../data/tripData';

type MapPresetId =
  | 'all'
  | 'map-1-bru-to-midi'
  | 'map-2-midi-to-paris'
  | 'map-3-paris-7days'
  | 'map-4-lourmel-to-garedunord'
  | 'map-5-midi-to-fleur'
  | 'map-6-brussels-tour'
  | 'map-7-fleur-to-bru'
  | 'map-8-bruges-optional';

interface MapPreset {
  id: MapPresetId;
  num: string;
  title: string;
  subtitle: string;
  center: [number, number];
  zoom: number;
  drawLine: boolean;
  googleMapsUrl: string;
}

const MAP_PRESETS: MapPreset[] = [
  {
    id: 'map-1-bru-to-midi',
    num: 'Mapa 1',
    title: 'Aeroporto BRU → Bruxelles-Midi/Zuid',
    subtitle: '26/01 • Desembarque internacional até a estação do Eurostar',
    center: [50.868, 4.41],
    zoom: 11,
    drawLine: true,
    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Brussels+Airport+Zaventem&destination=Bruxelles-Midi&travelmode=transit'
  },
  {
    id: 'map-2-midi-to-paris',
    num: 'Mapa 2',
    title: 'Bruxelles-Midi/Zuid → Paris Gare du Nord',
    subtitle: '26/01 • Eurostar direto (13h13 → 14h42)',
    center: [49.85, 3.35],
    zoom: 7,
    drawLine: true,
    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Bruxelles-Midi&destination=Paris+Gare+du+Nord&travelmode=transit'
  },
  {
    id: 'map-3-paris-7days',
    num: 'Mapa 3',
    title: 'Paris e seus 7 Dias de Passeio (Base: 11 Rue de Lourmel)',
    subtitle: '26/01 a 02/02 • Todas as atrações organizadas a partir da hospedagem',
    center: [48.862, 2.325],
    zoom: 12,
    drawLine: false,
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=11+Rue+de+Lourmel+75015+Paris'
  },
  {
    id: 'map-4-lourmel-to-garedunord',
    num: 'Mapa 4',
    title: 'Hospedagem em Paris (11 Rue de Lourmel) → Gare du Nord',
    subtitle: '02/02 • Saída até 09h15 para o trem das 10h48 rumo a Bruxelas',
    center: [48.865, 2.322],
    zoom: 12,
    drawLine: true,
    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=11+Rue+de+Lourmel+75015+Paris&destination=Paris+Gare+du+Nord&travelmode=transit'
  },
  {
    id: 'map-5-midi-to-fleur',
    num: 'Mapa 5',
    title: 'Bruxelles-Midi/Zuid → Hotel Fleur de Ville',
    subtitle: '02/02 • Chegada às 12h17 e deslocamento até Rue du Fossé aux Loups 46',
    center: [50.8425, 4.346],
    zoom: 14,
    drawLine: true,
    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Bruxelles-Midi&destination=Hotel+Fleur+de+Ville+Rue+du+Fosse+aux+Loups+46+1000+Brussels&travelmode=transit'
  },
  {
    id: 'map-6-brussels-tour',
    num: 'Mapa 6',
    title: 'Passeios em Bruxelas (Base: Hotel Fleur de Ville)',
    subtitle: 'Após 02/02 • Todos os 19 pontos turísticos e restaurantes em Bruxelas',
    center: [50.8465, 4.3555],
    zoom: 15,
    drawLine: true,
    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Rue+du+Fosse+aux+Loups+46+1000+Brussels&destination=Grand+Place+Brussels&travelmode=walking'
  },
  {
    id: 'map-7-fleur-to-bru',
    num: 'Mapa 7',
    title: 'Hotel Fleur de Ville → Aeroporto de Bruxelas (BRU)',
    subtitle: 'Último dia • Saída do hotel via Gare Centrale até o aeroporto Zaventem',
    center: [50.875, 4.42],
    zoom: 12,
    drawLine: true,
    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Hotel+Fleur+de+Ville+Rue+du+Fosse+aux+Loups+46+1000+Brussels&destination=Brussels+Airport+Zaventem&travelmode=transit'
  },
  {
    id: 'map-8-bruges-optional',
    num: 'Mapa 8',
    title: 'Bruges (Passeio Opcional de 1 Dia)',
    subtitle: 'Estação de Bruges → Minnewater → Canais → Burg → Grote Markt',
    center: [51.2045, 3.2245],
    zoom: 15,
    drawLine: true,
    googleMapsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Station+Brugge&destination=Grote+Markt+Brugge&travelmode=walking'
  }
];

const POINT_CATEGORIES = [
  'Todas',
  'Hospedagem',
  'Estações ferroviárias',
  'Aeroportos',
  'Pontos turísticos',
  'Restaurantes',
  'Emergências',
  'Compras'
] as const;

export const MapsSection: React.FC = () => {
  const {
    parisAttractions,
    brusselsAttractions,
    brugesAttractions,
    gastronomy
  } = useTrip();

  const [activePresetId, setActivePresetId] = useState<MapPresetId>('map-3-paris-7days');
  const [categoryFilter, setCategoryFilter] = useState<string>('Todas');

  const activePreset =
    MAP_PRESETS.find((p) => p.id === activePresetId) || MAP_PRESETS[2];

  const markers: InteractiveMarker[] = useMemo(() => {
    const matchesCategory = (cat: string) =>
      categoryFilter === 'Todas' || categoryFilter === cat;

    if (activePresetId === 'map-1-bru-to-midi') {
      return [
        {
          id: 'm1-bru',
          name: '1. Aeroporto de Bruxelas (BRU - Nível -1)',
          subtitle: 'Aeroportos',
          description: 'Estação ferroviária no subsolo (-1) do terminal.',
          lat: 50.9010,
          lng: 4.4856
        },
        {
          id: 'm1-midi',
          name: '2. Estação Bruxelles-Midi / Brussel-Zuid',
          subtitle: 'Estações ferroviárias',
          description: 'Embarque no Eurostar das 13h13 para Paris.',
          lat: 50.8357,
          lng: 4.3365,
          isBase: true
        }
      ];
    }

    if (activePresetId === 'map-2-midi-to-paris') {
      return [
        {
          id: 'm2-midi',
          name: '1. Bruxelles-Midi / Zuid (Saída 13h13)',
          subtitle: '26/01/2027 • Eurostar',
          lat: 50.8357,
          lng: 4.3365
        },
        {
          id: 'm2-gdn',
          name: '2. Paris Gare du Nord (Chegada 14h42)',
          subtitle: '26/01/2027 • 1h29 direto',
          lat: 48.8809,
          lng: 2.3553,
          isBase: true
        }
      ];
    }

    if (activePresetId === 'map-3-paris-7days') {
      const list: InteractiveMarker[] = [];
      if (matchesCategory('Hospedagem')) {
        list.push({
          id: 'm3-base',
          name: 'Hospedagem Paris: 11 Rue de Lourmel (75015)',
          subtitle: 'Hospedagem • Base dos 7 Dias',
          lat: 48.8511,
          lng: 2.2882,
          isBase: true
        });
      }
      if (matchesCategory('Pontos turísticos')) {
        parisAttractions.forEach((a) => {
          list.push({
            id: a.id,
            name: `${a.name} (Dia ${a.dayAssigned})`,
            subtitle: `Pontos turísticos • ${a.region}`,
            description: a.metroOrAccess,
            lat: a.lat,
            lng: a.lng
          });
        });
      }
      if (matchesCategory('Restaurantes')) {
        gastronomy
          .filter((g) => g.city === 'Paris')
          .forEach((g) => {
            list.push({
              id: g.id,
              name: g.name,
              subtitle: `Restaurantes • ${g.category}`,
              description: g.address,
              lat: g.lat,
              lng: g.lng
            });
          });
      }
      if (matchesCategory('Estações ferroviárias') || matchesCategory('Emergências') || matchesCategory('Compras')) {
        MAP_POINTS.filter((mp) => mp.city === 'Paris' && matchesCategory(mp.category)).forEach(
          (mp) => {
            list.push({
              id: mp.id,
              name: mp.name,
              subtitle: mp.category,
              description: mp.address,
              lat: mp.lat,
              lng: mp.lng
            });
          }
        );
      }
      return list;
    }

    if (activePresetId === 'map-4-lourmel-to-garedunord') {
      return [
        {
          id: 'm4-lourmel',
          name: '1. Hospedagem: 11 Rue de Lourmel (75015)',
          subtitle: 'Saída até 09h15 em 02/02/2027',
          lat: 48.8511,
          lng: 2.2882,
          isBase: true
        },
        {
          id: 'm4-dupleix',
          name: '2. Estação Dupleix (Linha 6) → Montparnasse (Linha 4)',
          subtitle: 'Trajeto de metrô (~32 min)',
          lat: 48.8504,
          lng: 2.2936
        },
        {
          id: 'm4-gdn',
          name: '3. Paris Gare du Nord (Trem às 10h48)',
          subtitle: 'Embarque para Bruxelles-Midi',
          lat: 48.8809,
          lng: 2.3553
        }
      ];
    }

    if (activePresetId === 'map-5-midi-to-fleur') {
      return [
        {
          id: 'm5-midi',
          name: '1. Estação Bruxelles-Midi / Zuid (Chegada 12h17)',
          subtitle: '02/02/2027 • Pré-metrô 3 ou 4 até De Brouckère',
          lat: 50.8357,
          lng: 4.3365
        },
        {
          id: 'm5-fleur',
          name: '2. Hotel Fleur de Ville',
          subtitle: 'Rue du Fossé aux Loups, 46, 1000 Brussels',
          lat: 50.8495,
          lng: 4.3548,
          isBase: true
        }
      ];
    }

    if (activePresetId === 'map-6-brussels-tour') {
      const list: InteractiveMarker[] = [];
      if (matchesCategory('Hospedagem')) {
        list.push({
          id: 'm6-fleur',
          name: 'Base: Hotel Fleur de Ville',
          subtitle: 'Hospedagem • Rue du Fossé aux Loups 46',
          lat: 50.8495,
          lng: 4.3548,
          isBase: true
        });
      }
      if (matchesCategory('Pontos turísticos')) {
        brusselsAttractions.forEach((b) => {
          list.push({
            id: b.id,
            name: b.name,
            subtitle: `Pontos turísticos • ${b.distanceFromBase || ''}`,
            description: b.description,
            lat: b.lat,
            lng: b.lng
          });
        });
      }
      if (matchesCategory('Restaurantes')) {
        gastronomy
          .filter((g) => g.city === 'Bruxelas')
          .forEach((g) => {
            list.push({
              id: g.id,
              name: g.name,
              subtitle: `Restaurantes • ${g.category}`,
              description: g.address,
              lat: g.lat,
              lng: g.lng
            });
          });
      }
      MAP_POINTS.filter((mp) => mp.city === 'Bruxelas' && matchesCategory(mp.category)).forEach(
        (mp) => {
          list.push({
            id: mp.id,
            name: mp.name,
            subtitle: mp.category,
            description: mp.address,
            lat: mp.lat,
            lng: mp.lng
          });
        }
      );
      return list;
    }

    if (activePresetId === 'map-7-fleur-to-bru') {
      return [
        {
          id: 'm7-fleur',
          name: '1. Hotel Fleur de Ville',
          subtitle: 'Rue du Fossé aux Loups, 46, 1000 Brussels',
          lat: 50.8495,
          lng: 4.3548,
          isBase: true
        },
        {
          id: 'm7-central',
          name: '2. Estação Bruxelles-Central (7 min a pé)',
          subtitle: 'Trem direto de 17 min para o aeroporto',
          lat: 50.8455,
          lng: 4.3571
        },
        {
          id: 'm7-bru',
          name: '3. Aeroporto de Bruxelas (BRU - Zaventem)',
          subtitle: 'Voo de retorno ao Brasil',
          lat: 50.9010,
          lng: 4.4856
        }
      ];
    }

    // map-8-bruges-optional
    return [
      {
        id: 'm8-station',
        name: '0. Estação Ferroviária de Bruges (Station Brugge)',
        subtitle: 'Chegada do trem IC vindo de Bruxelas (~58 min)',
        lat: 51.1972,
        lng: 3.2167,
        isBase: true
      },
      ...brugesAttractions.map((bg, i) => ({
        id: bg.id,
        name: `${i + 1}. ${bg.name}`,
        subtitle: `Estimativa: ${bg.estimatedDuration}`,
        description: bg.description,
        lat: bg.lat,
        lng: bg.lng
      }))
    ];
  }, [activePresetId, categoryFilter, parisAttractions, brusselsAttractions, brugesAttractions, gastronomy]);

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-700">
          <Map className="w-4 h-4" />
          Central Cartográfica da Viagem • 8 Mapas Específicos + Categorias
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
          Mapas Interativos e Rotas de Navegação
        </h1>
        <p className="text-sm text-navy-600 mt-1 max-w-3xl">
          Selecione qualquer um dos 8 mapas oficiais da sequência da viagem ou filtre os marcadores por categoria (Hospedagem, Estações ferroviárias, Aeroportos, Pontos turísticos, Restaurantes, Emergências e Compras).
        </p>

        {/* Seletor dos 8 Mapas Obrigatórios */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MAP_PRESETS.map((preset) => {
            const active = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setActivePresetId(preset.id);
                  setCategoryFilter('Todas');
                }}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  active
                    ? 'bg-navy-900 text-white border-navy-900 shadow-editorial'
                    : 'bg-sand-50 hover:bg-sand-100 text-navy-900 border-sand-200'
                }`}
              >
                <div>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider ${
                      active ? 'text-gold-400' : 'text-gold-700'
                    }`}
                  >
                    {preset.num}
                  </span>
                  <h3 className="font-serif font-bold text-sm mt-1">{preset.title}</h3>
                </div>
                <p className={`text-[11px] mt-1.5 ${active ? 'text-sand-200' : 'text-navy-500'}`}>
                  {preset.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Filtro por Categoria de Ponto */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-navy-600">Filtrar categorias no mapa:</span>
          {POINT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                categoryFilter === cat
                  ? 'bg-gold-500 text-navy-950'
                  : 'bg-sand-100 text-navy-700 hover:bg-sand-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Visualização do Mapa Selecionado */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
              {activePreset.num} • {markers.length} pontos exibidos
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">
              {activePreset.title}
            </h2>
            <p className="text-xs text-navy-600">{activePreset.subtitle}</p>
          </div>
          <a
            href={activePreset.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 inline-flex items-center gap-1.5"
          >
            <Navigation className="w-4 h-4 text-gold-400" />
            Abrir Trajeto no App Google Maps
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <InteractiveMap
          center={activePreset.center}
          zoom={activePreset.zoom}
          drawRouteLine={activePreset.drawLine}
          height="500px"
          markers={markers}
        />
      </div>
    </div>
  );
};
