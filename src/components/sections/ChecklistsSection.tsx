import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  Circle,
  Plus
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { ChecklistItem } from '../../types/trip';

const CATEGORIES: ChecklistItem['category'][] = [
  'Antes da viagem',
  'Aeroporto',
  'Trem',
  'Paris',
  'Bruxelas'
];

export const ChecklistsSection: React.FC = () => {
  const { checklists, toggleChecklist, addChecklistItem } = useTrip();
  const [selectedCategory, setSelectedCategory] = useState<ChecklistItem['category'] | 'Todas'>('Todas');
  const [newLabel, setNewLabel] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [newCat, setNewCat] = useState<ChecklistItem['category']>('Antes da viagem');

  const totalCount = checklists.length;
  const doneCount = checklists.filter((c) => c.checked).length;
  const percentage = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    addChecklistItem(newCat, newLabel.trim(), newDetail.trim() || 'Item personalizado adicionado');
    setNewLabel('');
    setNewDetail('');
  };

  const visibleCategories =
    selectedCategory === 'Todas' ? CATEGORIES : [selectedCategory];

  return (
    <div className="space-y-8">
      {/* Cabeçalho com Barra de Progresso Geral */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-700">
              <CheckSquare className="w-4 h-4" />
              Progresso Salvo Automaticamente no Dispositivo
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
              Checklists Interativos da Viagem
            </h1>
            <p className="text-sm text-navy-600 mt-1 max-w-3xl">
              Cinco checklists completos organizados por etapa: Antes da viagem, Aeroporto, Trem, Paris e Bruxelas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-navy-900 text-white min-w-[200px]">
            <div className="flex items-center justify-between text-xs font-bold text-gold-300">
              <span>Progresso Total</span>
              <span>{percentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-white/15 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-gold-500 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-xs text-sand-200 mt-1.5">
              {doneCount} de {totalCount} itens concluídos
            </p>
          </div>
        </div>

        {/* Filtro por Etapa */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('Todas')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
              selectedCategory === 'Todas'
                ? 'bg-navy-900 text-gold-300'
                : 'bg-sand-100 text-navy-700 hover:bg-sand-200'
            }`}
          >
            Todas as Etapas ({doneCount}/{totalCount})
          </button>
          {CATEGORIES.map((cat) => {
            const catItems = checklists.filter((c) => c.category === cat);
            const catDone = catItems.filter((c) => c.checked).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-gold-500 text-navy-950'
                    : 'bg-sand-100 text-navy-700 hover:bg-sand-200'
                }`}
              >
                {cat} ({catDone}/{catItems.length})
              </button>
            );
          })}
        </div>
      </div>

      {/* Listas por Categoria */}
      <div className="space-y-6">
        {visibleCategories.map((cat) => {
          const items = checklists.filter((c) => c.category === cat);
          const done = items.filter((c) => c.checked).length;
          return (
            <div
              key={cat}
              className="bg-white rounded-3xl p-6 border border-sand-200 shadow-editorial"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-sand-200">
                <h2 className="font-serif text-xl font-bold text-navy-900">{cat}</h2>
                <span className="px-3 py-1 rounded-full bg-sand-100 text-navy-800 text-xs font-bold">
                  {done} / {items.length} concluídos
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      item.checked
                        ? 'bg-emerald-50/40 border-emerald-300'
                        : 'bg-sand-50 hover:bg-sand-100 border-sand-200'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {item.checked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-navy-400" />
                      )}
                    </div>
                    <div>
                      <p
                        className={`font-bold text-sm ${
                          item.checked ? 'line-through text-navy-500' : 'text-navy-900'
                        }`}
                      >
                        {item.label}
                      </p>
                      <p className="text-xs text-navy-600 mt-0.5 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Formulário para Adicionar Novo Item ao Checklist */}
      <form
        onSubmit={handleAdd}
        className="bg-white rounded-3xl p-6 border border-sand-200 shadow-editorial"
      >
        <h3 className="font-serif font-bold text-lg text-navy-900 mb-3">
          Adicionar Novo Item Personalizado ao Checklist
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <select
            value={newCat}
            onChange={(e) => setNewCat(e.target.value as ChecklistItem['category'])}
            className="px-3 py-2 rounded-xl bg-sand-50 border border-sand-300 text-xs font-bold text-navy-900"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Título do item (ex: Comprar protetor labial)"
            className="px-3 py-2 rounded-xl bg-sand-50 border border-sand-300 text-xs text-navy-900"
          />
          <input
            type="text"
            value={newDetail}
            onChange={(e) => setNewDetail(e.target.value)}
            placeholder="Detalhe ou observação..."
            className="px-3 py-2 rounded-xl bg-sand-50 border border-sand-300 text-xs text-navy-900"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 inline-flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-gold-400" />
            Adicionar Item
          </button>
        </div>
      </form>
    </div>
  );
};
