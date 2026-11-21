import React, { useMemo, useState } from 'react';
import {
  Utensils,
  Heart,
  MapPin,
  Navigation,
  CheckCircle2
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { InteractiveMap } from '../InteractiveMap';

const CATEGORIES = [
  'Todos',
  'Restaurantes',
  'Doces',
  'Chocolates',
  'Waffles',
  'Comidas típicas',
  'Cafés',
  'Econômicos',
  'Favoritos'
] as const;

export const GastronomySection: React.FC = () => {
  const { gastronomy, updateGastronomy } = useTrip();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedCity, setSelectedCity] = useState<string>('Todas');

  const filtered = useMemo(() => {
    return gastronomy.filter((item) => {
      const cityMatch = selectedCity === 'Todas' || item.city === selectedCity;
      if (!cityMatch) return false;
      if (selectedCategory === 'Todos') return true;
      if (selectedCategory === 'Favoritos') return item.favorite;
      return item.category === selectedCategory || item.tags.includes(selectedCategory);
    });
  }, [gastronomy, selectedCategory, selectedCity]);

  return (
    <div className="space-y-8">
      {/* Cabeçalho e Filtros */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-700">
              <Utensils className="w-4 h-4" />
              Gastronomia & Sabores Típicos • Bélgica & França
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
              Restaurantes, Doces, Chocolates e Waffles
            </h1>
            <p className="text-sm text-navy-600 mt-1 max-w-3xl">
              Reúne todas as sugestões do PDF original (De Pistolei, Scott's Bar, Time Off, Pelicaen Belgium Chocolates, Obe Waffles, Fritiere e Le Comptoir de Mathilde) com endereços verificados, filtros por categoria, favoritos e notas pessoais.
            </p>
          </div>
        </div>

        {/* Filtro por Cidade */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-navy-600">Cidade:</span>
          {['Todas', 'Bruxelas', 'Paris'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCity(c)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                selectedCity === c
                  ? 'bg-navy-900 text-gold-300'
                  : 'bg-sand-100 text-navy-700 hover:bg-sand-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Filtro por Categoria */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-navy-600">Categoria:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                selectedCategory === cat
                  ? 'bg-gold-500 text-navy-950'
                  : 'bg-sand-100 text-navy-700 hover:bg-sand-200'
              }`}
            >
              {cat === 'Favoritos' ? '★ Favoritos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards dos Locais Gastronômicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((place) => (
          <div
            key={place.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-sand-200 shadow-editorial flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-navy-900 text-gold-300 text-[11px] font-bold">
                      {place.city}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900 text-[11px] font-bold">
                      {place.category}
                    </span>
                    <span className="text-xs font-bold text-navy-600">{place.priceLevel}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy-900 mt-1.5">
                    {place.name}
                  </h3>
                </div>
                <button
                  onClick={() => updateGastronomy(place.id, { favorite: !place.favorite })}
                  className={`p-2 rounded-xl border transition-colors ${
                    place.favorite
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-sand-50 border-sand-200 text-navy-400 hover:text-red-500'
                  }`}
                  title="Favoritar local"
                >
                  <Heart className={`w-5 h-5 ${place.favorite ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-navy-700 mt-2.5 leading-relaxed">
                {place.specialty}
              </p>

              {place.priceEstimate && (
                <div className="mt-2.5 px-3 py-2 rounded-xl bg-gold-100/80 border border-gold-300 text-xs font-bold text-navy-900">
                  💶 Preço Estimado: <span className="text-gold-900">{place.priceEstimate}</span>
                </div>
              )}

              <div className="mt-3 p-3 rounded-2xl bg-sand-50 border border-sand-200 space-y-1 text-xs">
                <p className="font-bold text-navy-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  {place.address}
                </p>
                <p className="text-emerald-800 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  {place.status2027}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-sand-100 space-y-2.5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={place.notes}
                  onChange={(e) => updateGastronomy(place.id, { notes: e.target.value })}
                  placeholder="Adicionar observação ou pedido favorito..."
                  className="flex-1 px-3 py-1.5 rounded-xl bg-sand-50 border border-sand-200 text-xs text-navy-800"
                />
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}&travelmode=walking`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 inline-flex items-center gap-1 shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5 text-gold-400" />
                  Mapa
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mapa Gastronômico */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <h3 className="font-serif text-xl font-bold text-navy-900 mb-3">
          Mapa dos Restaurantes, Chocolaterias e Waffles
        </h3>
        <InteractiveMap
          center={[50.8475, 4.3535]}
          zoom={15}
          markers={filtered.map((g) => ({
            id: g.id,
            name: g.name,
            subtitle: `${g.city} • ${g.category}`,
            description: g.address,
            lat: g.lat,
            lng: g.lng
          }))}
        />
      </div>
    </div>
  );
};
