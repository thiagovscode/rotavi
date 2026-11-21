import React, { useState } from 'react';
import {
  QrCode,
  Ticket,
  Upload,
  Plus,
  Trash2,
  Maximize2,
  X,
  Calendar,
  Clock,
  User,
  Copy,
  Check
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { DigitalTicket } from '../../types/trip';

export const TicketsWalletSection: React.FC = () => {
  const { tickets, addTicket, updateTicket, removeTicket } = useTrip();

  const [fullscreenImage, setFullscreenImage] = useState<{
    url: string;
    title: string;
    code: string;
  } | null>(null);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state for adding a new QR code / ticket
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<DigitalTicket['category']>('Museu / Atração');
  const [newDate, setNewDate] = useState('27/01/2027');
  const [newTime, setNewTime] = useState('15:00');
  const [newHolder, setNewHolder] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newQty, setNewQty] = useState('2 ingressos');
  const [newNotes, setNewNotes] = useState('');
  const [newImageBase64, setNewImageBase64] = useState('');

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onResult: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onResult(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTicket({
      title: newTitle.trim(),
      category: newCategory,
      date: newDate,
      time: newTime,
      holderName: newHolder.trim() || 'Passageiro',
      ticketCode: newCode.trim() || '-',
      quantityNote: newQty,
      imageUrl: newImageBase64,
      notes: newNotes.trim()
    });
    setNewTitle('');
    setNewCode('');
    setNewNotes('');
    setNewImageBase64('');
  };

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-700">
              <QrCode className="w-4 h-4" />
              Carteira Digital Offline • Acesso Instantâneo nas Catracas e Museus
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
              Meus Ingressos & QR Codes
            </h1>
            <p className="text-sm text-navy-600 mt-1 max-w-3xl">
              Seu ingresso oficial do <strong>Musée du Louvre (Quarta-feira, 27/01/2027 às 15h00)</strong> já está salvo abaixo com o QR Code pronto para leitura! Você também pode anexar o print do <strong>2º ingresso (2/2)</strong> ou os QR Codes do Eurostar diretamente do seu celular ou computador (fica tudo salvo offline no aparelho).
            </p>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-navy-900 text-white text-right">
            <span className="text-xs font-bold uppercase text-gold-400 block">Ingressos Salvos</span>
            <span className="font-serif text-2xl font-bold">{tickets.length}</span>
            <span className="text-[11px] text-sand-200 block">Disponíveis offline</span>
          </div>
        </div>
      </div>

      {/* Lista de Ingressos & QR Codes Salvos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tickets.map((tkt) => (
          <div
            key={tkt.id}
            className="bg-white rounded-3xl p-6 border border-sand-200 shadow-editorial flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-navy-900 text-gold-300 text-xs font-bold">
                    {tkt.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    {tkt.date} • {tkt.time}
                  </span>
                </div>
                {tkt.id.startsWith('tkt-custom-') && (
                  <button
                    onClick={() => removeTicket(tkt.id)}
                    className="p-1.5 rounded-lg text-navy-400 hover:text-red-600 hover:bg-red-50"
                    title="Remover ingresso"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <h2 className="font-serif text-xl font-bold text-navy-900 mt-2">{tkt.title}</h2>

              <div className="mt-3 grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-sand-50 border border-sand-200 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-navy-500 block">
                    Titular / Passageiro
                  </span>
                  <span className="font-bold text-navy-900 flex items-center gap-1 mt-0.5">
                    <User className="w-3.5 h-3.5 text-gold-600" />
                    {tkt.holderName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-navy-500 block">
                    Código do Bilhete
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono font-bold text-navy-900 truncate">
                      {tkt.ticketCode}
                    </span>
                    <button
                      onClick={() => copyCode(tkt.id, tkt.ticketCode)}
                      className="text-navy-500 hover:text-navy-900"
                      title="Copiar código"
                    >
                      {copiedId === tkt.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="col-span-2 pt-1 border-t border-sand-200">
                  <span className="text-[11px] font-semibold text-gold-800">
                    {tkt.quantityNote}
                  </span>
                </div>
              </div>

              {/* Imagem do QR Code */}
              {tkt.imageUrl ? (
                <div className="mt-4 relative group rounded-2xl overflow-hidden border-2 border-navy-900/15 bg-white p-2">
                  <img
                    src={tkt.imageUrl}
                    alt={tkt.title}
                    className="w-full max-h-80 object-contain rounded-xl mx-auto cursor-pointer"
                    onClick={() =>
                      setFullscreenImage({
                        url: tkt.imageUrl!,
                        title: tkt.title,
                        code: tkt.ticketCode
                      })
                    }
                  />
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-2">
                    <button
                      onClick={() =>
                        setFullscreenImage({
                          url: tkt.imageUrl!,
                          title: tkt.title,
                          code: tkt.ticketCode
                        })
                      }
                      className="px-3.5 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 inline-flex items-center gap-1.5"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
                      Abrir QR Code em Tela Cheia (Para Leitor da Catraca)
                    </button>

                    <label className="px-3 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-navy-800 text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      Trocar Imagem
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (dataUrl) =>
                            updateTicket(tkt.id, { imageUrl: dataUrl })
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-5 rounded-2xl border-2 border-dashed border-sand-300 bg-sand-50/60 text-center">
                  <QrCode className="w-8 h-8 text-gold-600 mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-navy-900">
                    Nenhuma imagem de QR Code anexada neste cartão ainda
                  </p>
                  <p className="text-[11px] text-navy-600 mt-0.5 mb-3">
                    Selecione o print ou foto do QR Code no seu celular/computador para deixá-lo salvo offline aqui:
                  </p>
                  <label className="px-4 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 cursor-pointer inline-flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-gold-400" />
                    Anexar Print / Imagem do QR Code
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e, (dataUrl) =>
                          updateTicket(tkt.id, { imageUrl: dataUrl })
                        )
                      }
                    />
                  </label>
                </div>
              )}

              <p className="text-xs text-navy-600 mt-3 leading-relaxed">{tkt.notes}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário para Adicionar o 2º QR Code do Louvre (2/2) ou Outros Ingressos */}
      <form
        onSubmit={handleCreateTicket}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial"
      >
        <div className="flex items-center gap-2 mb-4">
          <Plus className="w-5 h-5 text-gold-600" />
          <h2 className="font-serif text-xl font-bold text-navy-900">
            Adicionar Outro QR Code (Ex: Ingresso 2/2 do Louvre, Sainte-Chapelle, Eurostar...)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase text-navy-600 mb-1">
              Título do Ingresso *
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Ex: Musée du Louvre — Ingresso (2 / 2)"
              className="w-full px-3.5 py-2 rounded-xl bg-sand-50 border border-sand-300 text-xs font-bold text-navy-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-navy-600 mb-1">
              Categoria
            </label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as DigitalTicket['category'])}
              className="w-full px-3.5 py-2 rounded-xl bg-sand-50 border border-sand-300 text-xs font-bold text-navy-900"
            >
              <option value="Museu / Atração">Museu / Atração</option>
              <option value="Trem Eurostar">Trem Eurostar</option>
              <option value="Voo / Transporte">Voo / Transporte</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-navy-600 mb-1">
              Data & Horário
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                placeholder="Ex: 27/01/2027"
                className="w-1/2 px-3 py-2 rounded-xl bg-sand-50 border border-sand-300 text-xs text-navy-900"
              />
              <input
                type="text"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                placeholder="Ex: 15:00"
                className="w-1/2 px-3 py-2 rounded-xl bg-sand-50 border border-sand-300 text-xs text-navy-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-navy-600 mb-1">
              Nome do Passageiro / Titular
            </label>
            <input
              type="text"
              value={newHolder}
              onChange={(e) => setNewHolder(e.target.value)}
              placeholder="Nome no ingresso"
              className="w-full px-3.5 py-2 rounded-xl bg-sand-50 border border-sand-300 text-xs text-navy-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-navy-600 mb-1">
              Número / Código do QR Code
            </label>
            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="Ex: 75126078641093..."
              className="w-full px-3.5 py-2 rounded-xl bg-sand-50 border border-sand-300 text-xs text-navy-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-navy-600 mb-1">
              Imagem do QR Code (Print / Foto)
            </label>
            <label className="w-full px-3.5 py-2 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 cursor-pointer flex items-center justify-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-gold-400" />
              {newImageBase64 ? 'Imagem Carregada ✓' : 'Escolher Imagem do QR Code'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, (dataUrl) => setNewImageBase64(dataUrl))}
              />
            </label>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <input
            type="text"
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            placeholder="Observação opcional (ex: Entrada pela Pirâmide às 15h00)..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-sand-50 border border-sand-300 text-xs text-navy-900"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gold-500 text-navy-950 text-xs font-bold hover:bg-gold-400 inline-flex items-center justify-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Salvar Ingresso na Carteira Offline
          </button>
        </div>
      </form>

      {/* Modal Tela Cheia de Alto Contraste para Leitura na Catraca */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <div
            className="bg-white rounded-3xl p-5 max-w-3xl w-full shadow-2xl text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-sand-200 pb-3">
              <div className="text-left">
                <h3 className="font-serif font-bold text-navy-900 text-lg">
                  {fullscreenImage.title}
                </h3>
                <p className="text-xs font-mono text-navy-600">
                  Código: {fullscreenImage.code} • Aumente o brilho da tela para leitura
                </p>
              </div>
              <button
                onClick={() => setFullscreenImage(null)}
                className="p-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-navy-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={fullscreenImage.url}
              alt={fullscreenImage.title}
              className="max-h-[75vh] w-auto mx-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
