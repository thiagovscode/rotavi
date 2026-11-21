import React, { useMemo, useState } from 'react';
import {
  Search,
  X,
  MapPin,
  Utensils,
  MessageSquare,
  Train,
  ShieldAlert,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { INITIAL_PHRASES, MAP_POINTS } from '../data/tripData';
import { SectionId } from '../types/trip';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  section: SectionId;
  icon: React.ReactNode;
}

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setActiveSection,
    parisAttractions,
    brusselsAttractions,
    brugesAttractions,
    disneyAttractions,
    gastronomy
  } = useTrip();

  const [query, setQuery] = useState('');

  const allItems: SearchResult[] = useMemo(() => {
    const items: SearchResult[] = [];

    // Hospedagens e estações fixas
    items.push(
      {
        id: 'sr-lourmel',
        title: '11 Rue de Lourmel, Paris, 75015',
        subtitle: 'Hospedagem principal durante os 7 dias em Paris (26/01 a 02/02)',
        badge: 'Hospedagem Paris',
        section: 'lodging-paris',
        icon: <Building2 className="w-4 h-4 text-gold-600" />
      },
      {
        id: 'sr-fleur-de-ville',
        title: 'Hotel Fleur de Ville — Rue du Fossé aux Loups, 46',
        subtitle: 'Hospedagem em Bruxelas após o retorno de Paris (02/02/2027)',
        badge: 'Hospedagem Bruxelas',
        section: 'lodging-brussels',
        icon: <Building2 className="w-4 h-4 text-gold-600" />
      },
      {
        id: 'sr-eurostar-ida',
        title: 'Eurostar Ida: Bruxelles-Midi/Zuid → Paris Gare du Nord',
        subtitle: '26/01/2027 • Saída 13h13 → Chegada 14h42 (1h29 • 2 passageiros)',
        badge: 'Trem Eurostar',
        section: 'train-out',
        icon: <Train className="w-4 h-4 text-navy-700" />
      },
      {
        id: 'sr-eurostar-volta',
        title: 'Trem de Volta: Paris Gare du Nord → Bruxelles-Midi/Zuid',
        subtitle: '02/02/2027 • Saída 10h48 → Chegada 12h17 (1h29 • 2 passageiros)',
        badge: 'Trem Retorno',
        section: 'train-return',
        icon: <Train className="w-4 h-4 text-navy-700" />
      },
      {
        id: 'sr-bru-airport',
        title: 'Aeroporto de Bruxelas (BRU - Zaventem)',
        subtitle: 'Tutorial de desembarque para a estação de trem nível -1 e guia de retorno',
        badge: 'Aeroporto',
        section: 'arrival-bru',
        icon: <Train className="w-4 h-4 text-navy-700" />
      },
      {
        id: 'sr-emergencies',
        title: 'Consulados do Brasil, Polícia e Emergências (112)',
        subtitle: 'Paris (65 Av. Franklin D. Roosevelt) e Bruxelas (Rue Trèves 45)',
        badge: 'Emergência',
        section: 'emergencies',
        icon: <ShieldAlert className="w-4 h-4 text-red-600" />
      }
    );

    parisAttractions.forEach((a) => {
      items.push({
        id: a.id,
        title: a.name,
        subtitle: `${a.region} • Dia ${a.dayAssigned} em Paris • ${a.metroOrAccess}`,
        badge: 'Atração Paris',
        section: 'paris-itinerary',
        icon: <MapPin className="w-4 h-4 text-navy-700" />
      });
    });

    disneyAttractions.forEach((d) => {
      items.push({
        id: d.id,
        title: d.name,
        subtitle: `${d.park} (${d.land}) • ${d.description}`,
        badge: 'Disneyland Paris',
        section: 'disneyland',
        icon: <Sparkles className="w-4 h-4 text-gold-600" />
      });
    });

    brusselsAttractions.forEach((b) => {
      items.push({
        id: b.id,
        title: b.name,
        subtitle: `Bruxelas (após 02/02) • ${b.distanceFromBase || ''} • ${b.description}`,
        badge: 'Atração Bruxelas',
        section: 'brussels-itinerary',
        icon: <MapPin className="w-4 h-4 text-navy-700" />
      });
    });

    brugesAttractions.forEach((bg) => {
      items.push({
        id: bg.id,
        title: bg.name,
        subtitle: `Bruges (Passeio Opcional) • ${bg.description}`,
        badge: 'Bruges Opcional',
        section: 'bruges-optional',
        icon: <MapPin className="w-4 h-4 text-gold-600" />
      });
    });

    gastronomy.forEach((g) => {
      items.push({
        id: g.id,
        title: g.name,
        subtitle: `${g.city} • ${g.category} • ${g.address} — ${g.specialty}`,
        badge: 'Gastronomia',
        section: 'gastronomy',
        icon: <Utensils className="w-4 h-4 text-gold-600" />
      });
    });

    INITIAL_PHRASES.forEach((p) => {
      items.push({
        id: p.id,
        title: p.pt,
        subtitle: `FR: "${p.fr}" | EN: "${p.en}" (${p.category})`,
        badge: 'Frase Útil',
        section: 'phrases',
        icon: <MessageSquare className="w-4 h-4 text-navy-700" />
      });
    });

    MAP_POINTS.forEach((mp) => {
      items.push({
        id: 'mp-s-' + mp.id,
        title: mp.name,
        subtitle: `${mp.address} — ${mp.description}`,
        badge: mp.category,
        section: 'maps',
        icon: <MapPin className="w-4 h-4 text-navy-700" />
      });
    });

    return items;
  }, [parisAttractions, brusselsAttractions, brugesAttractions, disneyAttractions, gastronomy]);

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 12);
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
    );
  }, [query, allItems]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-navy-950/60 backdrop-blur-sm p-4 pt-14 md:pt-24">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-editorial-lg border border-sand-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-sand-200 bg-sand-50">
          <Search className="w-5 h-5 text-gold-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar atrações, endereços, restaurantes, frases, estações, dicas..."
            className="w-full bg-transparent text-navy-900 placeholder-navy-400 focus:outline-none text-sm md:text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-navy-500 hover:text-navy-800 px-2 py-1"
            >
              Limpar
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-lg hover:bg-sand-200 text-navy-600"
            aria-label="Fechar busca"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto divide-y divide-sand-100">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-navy-500 text-sm">
              Nenhum resultado encontrado para "{query}". Tente buscar por "Lourmel", "Fleur de Ville", "Waffle", "Eurostar" ou "Louvre".
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.section);
                  setIsSearchOpen(false);
                }}
                className="w-full text-left px-4 py-3.5 hover:bg-sand-50 transition-colors flex items-start justify-between gap-3 group"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 rounded-xl bg-sand-100 group-hover:bg-gold-100 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-navy-900 text-sm">{item.title}</span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-navy-50 text-navy-700 border border-navy-100">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-navy-600 mt-0.5 line-clamp-2">{item.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-navy-300 group-hover:text-gold-600 shrink-0 mt-2 transition-colors" />
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2.5 bg-sand-100 border-t border-sand-200 flex items-center justify-between text-xs text-navy-500">
          <span>Pesquisa global instantânea (funciona 100% offline)</span>
          <span>Clique em um item para abrir a página</span>
        </div>
      </div>
    </div>
  );
};
