import React, { useState } from 'react';
import {
  Languages,
  Volume2,
  Copy,
  Check
} from 'lucide-react';
import { INITIAL_PHRASES } from '../../data/tripData';

const PHRASE_CATEGORIES = [
  'Todas',
  'Aeroporto',
  'Estação de trem',
  'Hotel',
  'Restaurante',
  'Compras',
  'Transporte público',
  'Pedir informações',
  'Emergências',
  'Farmácia',
  'Comunicação com autoridades'
] as const;

export const PhrasesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = INITIAL_PHRASES.filter((p) =>
    selectedCategory === 'Todas' ? true : p.category === selectedCategory
  );

  const speak = (text: string, lang: 'fr-FR' | 'en-US') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.92;
      window.speechSynthesis.speak(utterance);
    }
  };

  const copyPhrase = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-700">
          <Languages className="w-4 h-4" />
          Guia de Comunicação Rápida • Funciona Offline com Pronúncia em Áudio
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
          Frases Úteis e Idiomas (Português • Francês • Inglês)
        </h1>
        <p className="text-sm text-navy-600 mt-1 max-w-3xl">
          Tanto em Paris quanto em Bruxelas o idioma principal do cotidiano é o <strong>Francês</strong> (e em Bruges/Aeroporto BRU também o Flamengo e o Inglês). Toque no botão de áudio para ouvir a pronúncia nativa pelo sintetizador do seu celular ou copie a frase.
        </p>

        {/* Filtros por Situação */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {PHRASE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                selectedCategory === cat
                  ? 'bg-navy-900 text-gold-300'
                  : 'bg-sand-100 text-navy-700 hover:bg-sand-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards de Frases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 border border-sand-200 shadow-editorial flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-sand-100 text-navy-700 border border-sand-200 text-[11px] font-bold">
                  {item.category}
                </span>
                <button
                  onClick={() => copyPhrase(item.id, `${item.fr} / ${item.en}`)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-navy-600 hover:text-navy-900"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              <p className="font-serif font-bold text-navy-900 text-base mt-2">
                🇧🇷 {item.pt}
              </p>

              <div className="mt-3 p-3.5 rounded-2xl bg-navy-900 text-white space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400">
                    🇫🇷 Francês (Paris & Bruxelas)
                  </span>
                  <button
                    onClick={() => speak(item.fr, 'fr-FR')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gold-500 text-navy-950 text-xs font-bold hover:bg-gold-400"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    Ouvir FR
                  </button>
                </div>
                <p className="text-sm font-bold text-white">{item.fr}</p>
                <p className="text-xs text-gold-200 italic">
                  Pronúncia aproximada: "{item.pronunciationFr}"
                </p>
              </div>

              <div className="mt-2.5 p-3 rounded-2xl bg-sand-50 border border-sand-200 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-navy-500 block">
                    🇬🇧 Inglês (Aeroporto / Bruges)
                  </span>
                  <p className="text-xs font-bold text-navy-900 mt-0.5">{item.en}</p>
                </div>
                <button
                  onClick={() => speak(item.en, 'en-US')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sand-200 text-navy-900 text-xs font-bold hover:bg-sand-300 shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Ouvir EN
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
