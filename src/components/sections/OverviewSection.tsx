import React, { useMemo, useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Train,
  PlaneLanding,
  PlaneTakeoff,
  Building2,
  MapPin,
  CheckSquare,
  ShieldAlert,
  Compass,
  ArrowRight,
  Sparkles,
  Navigation,
  Languages
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';

export const OverviewSection: React.FC = () => {
  const {
    setActiveSection,
    config,
    parisAttractions,
    brusselsAttractions,
    checklists,
    setIsEmergencyModalOpen
  } = useTrip();

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const tripStart = new Date('2027-01-26T00:00:00');
  const returnToBrussels = new Date('2027-02-02T10:48:00');

  const countdown = useMemo(() => {
    const diff = tripStart.getTime() - now.getTime();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, isOngoing: true };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return { days, hours, minutes, isOngoing: false };
  }, [now]);

  // Determinar etapa atual/futura para exibir Próximo Compromisso, Próximo Deslocamento e Hospedagem Atual
  const currentStage = useMemo(() => {
    if (now < returnToBrussels) {
      return {
        stageTitle: 'Etapa 1 & 2 • Chegada via Bruxelas (BRU) e 7 Dias em Paris',
        nextAppointment: '26/01/2027 • Desembarque em Brussels Airport (BRU) → Estação Bruxelles-Midi',
        nextTransit: 'Trem Eurostar Direto • 26/01/2027 às 13h13 (Bruxelles-Midi → Paris Gare du Nord, chegada 14h42)',
        currentLodgingName: 'Hospedagem em Paris (26/01 a 02/02)',
        currentLodgingAddress: '11 Rue de Lourmel, Paris, Île-de-France, 75015, França',
        lodgingSection: 'lodging-paris' as const
      };
    }
    return {
      stageTitle: 'Etapa 3 & 4 • Retorno à Bélgica e Estadia em Bruxelas',
      nextAppointment: '02/02/2027 • Check-in no Hotel Fleur de Ville e Passeios em Bruxelas',
      nextTransit: 'Trem Direto • 02/02/2027 às 10h48 (Paris Gare du Nord → Bruxelles-Midi, chegada 12h17)',
      currentLodgingName: 'Hotel Fleur de Ville (a partir de 02/02)',
      currentLodgingAddress: 'Rue du Fossé aux Loups, 46, 1000 Brussels, Bélgica',
      lodgingSection: 'lodging-brussels' as const
    };
  }, [now]);

  const completedChecklists = checklists.filter((c) => c.checked).length;
  const visitedParis = parisAttractions.filter((a) => a.visited).length;
  const visitedBrussels = brusselsAttractions.filter((a) => a.visited).length;

  return (
    <div className="space-y-8">
      {/* Hero Banner Editorial */}
      <div className="relative rounded-3xl overflow-hidden bg-navy-900 text-white shadow-editorial-lg border border-navy-800">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-900/50" />

        <div className="relative p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-semibold uppercase tracking-widest">
              Guia Digital Oficial • Janeiro & Fevereiro 2027
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-sand-100 text-xs font-medium">
              Bélgica 🇧🇪 & França 🇫🇷 • 2 Passageiros
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Minha viagem pela Europa
          </h1>
          <p className="mt-2.5 text-sand-200 max-w-2xl text-sm sm:text-base leading-relaxed">
            Sequência oficial: Chegada pelo Aeroporto de Bruxelas (BRU) → Bruxelles-Midi/Zuid → Eurostar para Paris (7 dias baseados na 11 Rue de Lourmel) → Retorno a Bruxelas em 02/02/2027 (Hotel Fleur de Ville) → Passeios em Bruxelas & Bruges opcional → Retorno via BRU.
          </p>

          {/* Contagem regressiva + Indicadores */}
          <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="flex items-center gap-2 text-gold-300 text-xs font-semibold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                Contagem Regressiva
              </div>
              <p className="mt-1.5 font-serif text-2xl sm:text-3xl font-bold text-white">
                {countdown.days}d {countdown.hours}h
              </p>
              <p className="text-xs text-sand-200 mt-0.5">Para 26 de janeiro de 2027</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="flex items-center gap-2 text-gold-300 text-xs font-semibold uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                Período Oficial
              </div>
              <p className="mt-1.5 font-serif text-xl sm:text-2xl font-bold text-white">
                Jan – Fev 2027
              </p>
              <p className="text-xs text-sand-200 mt-0.5">Início 26/01 • Retorno BE 02/02</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="flex items-center gap-2 text-gold-300 text-xs font-semibold uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                Roteiro Visitado
              </div>
              <p className="mt-1.5 font-serif text-xl sm:text-2xl font-bold text-white">
                {visitedParis + visitedBrussels} / {parisAttractions.length + brusselsAttractions.length}
              </p>
              <p className="text-xs text-sand-200 mt-0.5">Pontos em Paris e Bruxelas</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="flex items-center gap-2 text-gold-300 text-xs font-semibold uppercase tracking-wider">
                <CheckSquare className="w-4 h-4" />
                Checklists
              </div>
              <p className="mt-1.5 font-serif text-xl sm:text-2xl font-bold text-white">
                {completedChecklists} / {checklists.length}
              </p>
              <p className="text-xs text-sand-200 mt-0.5">Itens concluídos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Status Imediato: Próximo Compromisso, Próximo Deslocamento, Hospedagem Atual */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-editorial flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-700">
              <Calendar className="w-3.5 h-3.5" />
              Próximo Compromisso
            </span>
            <h3 className="font-serif font-bold text-navy-900 text-lg mt-1.5">
              {currentStage.nextAppointment}
            </h3>
            <p className="text-xs text-navy-600 mt-1 leading-relaxed">
              Sem turismo em Bruxelas no dia 26/01: o foco na chegada internacional em BRU é descer ao nível -1 e seguir direto para Bruxelles-Midi.
            </p>
          </div>
          <button
            onClick={() => setActiveSection('arrival-bru')}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-navy-800 hover:text-gold-700"
          >
            Abrir tutorial do Aeroporto BRU
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-editorial flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-700">
              <Train className="w-3.5 h-3.5" />
              Próximo Deslocamento Confirmado
            </span>
            <h3 className="font-serif font-bold text-navy-900 text-lg mt-1.5">
              Eurostar • 26/01 às 13h13
            </h3>
            <p className="text-xs text-navy-600 mt-1 leading-relaxed">
              Bruxelles-Midi/Zuid (13h13) → Paris Gare du Nord (14h42) • Duração 1h29 • Serviço direto • 2 passageiros.
            </p>
          </div>
          <button
            onClick={() => setActiveSection('train-out')}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-navy-800 hover:text-gold-700"
          >
            Ver guia de embarque Eurostar
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-editorial flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-700">
              <Building2 className="w-3.5 h-3.5" />
              Hospedagens por Etapa
            </span>
            <h3 className="font-serif font-bold text-navy-900 text-base mt-1.5">
              1) Paris (26/01 a 02/02): 11 Rue de Lourmel
            </h3>
            <p className="text-xs text-navy-600 mt-0.5">
              75015 Paris • Base principal dos 7 dias na França.
            </p>
            <h3 className="font-serif font-bold text-navy-900 text-base mt-2">
              2) Bruxelas (após 02/02): Hotel Fleur de Ville
            </h3>
            <p className="text-xs text-navy-600 mt-0.5">
              Rue du Fossé aux Loups, 46, 1000 Brussels.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setActiveSection('lodging-paris')}
              className="inline-flex items-center gap-1 text-xs font-bold text-navy-800 hover:text-gold-700"
            >
              Base Paris <ArrowRight className="w-3 h-3" />
            </button>
            <span className="text-sand-300">•</span>
            <button
              onClick={() => setActiveSection('lodging-brussels')}
              className="inline-flex items-center gap-1 text-xs font-bold text-navy-800 hover:text-gold-700"
            >
              Hotel Bruxelas <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Acesso Rápido (Atalhos Grandes Mobile-First) */}
      <div>
        <h2 className="font-serif text-xl font-bold text-navy-900 mb-3">
          Acesso Rápido em Deslocamento
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => setActiveSection('tickets')}
            className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 shadow-editorial text-left transition-all group"
          >
            <Sparkles className="w-6 h-6 text-emerald-700 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-sm text-emerald-950 mt-2">QR Codes & Louvre</p>
            <p className="text-xs text-emerald-800 mt-0.5">27/01 às 15h00</p>
          </button>

          <button
            onClick={() => setActiveSection('maps')}
            className="p-4 rounded-2xl bg-white hover:bg-sand-100 border border-sand-200 shadow-editorial text-left transition-all group"
          >
            <MapPin className="w-6 h-6 text-gold-600 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-sm text-navy-900 mt-2">8 Mapas & Rotas</p>
            <p className="text-xs text-navy-500 mt-0.5">Todos os trajetos</p>
          </button>

          <button
            onClick={() => setActiveSection('transit-paris')}
            className="p-4 rounded-2xl bg-white hover:bg-sand-100 border border-sand-200 shadow-editorial text-left transition-all group"
          >
            <Navigation className="w-6 h-6 text-navy-800 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-sm text-navy-900 mt-2">Metrô & Navigo</p>
            <p className="text-xs text-navy-500 mt-0.5">Simulador de rotas</p>
          </button>

          <button
            onClick={() => setActiveSection('paris-itinerary')}
            className="p-4 rounded-2xl bg-white hover:bg-sand-100 border border-sand-200 shadow-editorial text-left transition-all group"
          >
            <Compass className="w-6 h-6 text-gold-600 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-sm text-navy-900 mt-2">Paris: 7 Dias</p>
            <p className="text-xs text-navy-500 mt-0.5">Louvre em 27/01</p>
          </button>

          <button
            onClick={() => setActiveSection('budget')}
            className="p-4 rounded-2xl bg-gold-50 hover:bg-gold-100 border border-gold-300 shadow-editorial text-left transition-all group"
          >
            <Compass className="w-6 h-6 text-gold-700 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-sm text-navy-900 mt-2">Gastos & Frutas</p>
            <p className="text-xs text-gold-800 mt-0.5">Orçamento & Preços</p>
          </button>

          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="p-4 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-200 shadow-editorial text-left transition-all group"
          >
            <ShieldAlert className="w-6 h-6 text-red-700 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-sm text-red-900 mt-2">Emergências</p>
            <p className="text-xs text-red-700 mt-0.5">112 & Consulados</p>
          </button>
        </div>
      </div>

      {/* Resumo Oficial das Passagens Ferroviárias Confirmadas */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-sand-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
              Reservas Ferroviárias Confirmadas
            </span>
            <h2 className="font-serif text-2xl font-bold text-navy-900 mt-0.5">
              Resumo das Passagens de Trem (Bélgica ⇄ França)
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-navy-50 text-navy-800 text-xs font-semibold border border-navy-100 self-start sm:self-center">
            2 Passageiros • Serviço Direto (1h29)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          {/* Trem 1: Ida */}
          <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-navy-900 text-gold-300 text-xs font-bold">
                  TRECHO 1 • IDA PARA PARIS
                </span>
                <span className="text-xs font-bold text-navy-700">26 de janeiro de 2027</span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-2xl font-serif font-bold text-navy-900">13h13</p>
                  <p className="text-xs font-semibold text-navy-700">Bruxelles-Midi/Zuid</p>
                  <p className="text-[11px] text-navy-500">Bruxelas, Bélgica</p>
                </div>
                <div className="flex-1 flex flex-col items-center px-2">
                  <span className="text-[11px] font-semibold text-gold-700">Eurostar • 1h29</span>
                  <div className="w-full h-0.5 bg-gold-400 my-1 relative" />
                  <span className="text-[10px] text-navy-500">Serviço Direto</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-serif font-bold text-navy-900">14h42</p>
                  <p className="text-xs font-semibold text-navy-700">Paris Gare du Nord</p>
                  <p className="text-[11px] text-navy-500">Paris, França</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveSection('train-out')}
              className="mt-5 w-full py-2.5 px-4 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors flex items-center justify-center gap-2"
            >
              Abrir Página de Embarque de 26/01 (Bruxelas → Paris)
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Trem 2: Volta */}
          <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-gold-500 text-navy-950 text-xs font-bold">
                  TRECHO 2 • RETORNO PARA BRUXELAS
                </span>
                <span className="text-xs font-bold text-navy-700">02 de fevereiro de 2027</span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-2xl font-serif font-bold text-navy-900">10h48</p>
                  <p className="text-xs font-semibold text-navy-700">Paris Gare du Nord</p>
                  <p className="text-[11px] text-navy-500">Paris, França</p>
                </div>
                <div className="flex-1 flex flex-col items-center px-2">
                  <span className="text-[11px] font-semibold text-gold-700">Eurostar • 1h29</span>
                  <div className="w-full h-0.5 bg-gold-400 my-1 relative" />
                  <span className="text-[10px] text-navy-500">Serviço Direto</span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-serif font-bold text-navy-900">12h17</p>
                  <p className="text-xs font-semibold text-navy-700">Bruxelles-Midi/Zuid</p>
                  <p className="text-[11px] text-navy-500">Seguindo p/ Hotel Fleur de Ville</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveSection('train-return')}
              className="mt-5 w-full py-2.5 px-4 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors flex items-center justify-center gap-2"
            >
              Abrir Página de Embarque de 02/02 (Paris → Bruxelas)
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Linha do Tempo Visual Oficial da Viagem */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
          Sequência Cronológica Real
        </span>
        <h2 className="font-serif text-2xl font-bold text-navy-900 mt-0.5 mb-6">
          Linha do Tempo da Viagem
        </h2>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-gold-400 space-y-8">
          {/* Etapa 1 */}
          <div className="relative">
            <div className="absolute -left-[33px] sm:-left-[41px] top-0 w-6 h-6 rounded-full bg-navy-900 border-4 border-gold-400" />
            <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
                  26/01/2027 — Chegada à Bélgica & Ida para Paris
                </span>
                <span className="text-xs font-medium text-navy-600">Sem turismo em Bruxelas nesta data</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-navy-900 mt-1">
                Aeroporto de Bruxelas (BRU) → Bruxelles-Midi/Zuid → Eurostar para Paris
              </h3>
              <ul className="mt-2 space-y-1 text-xs sm:text-sm text-navy-700 list-disc list-inside">
                <li>Desembarque internacional no Aeroporto de Bruxelas (BRU).</li>
                <li>Descida ao Nível -1 do aeroporto e trem até Bruxelles-Midi/Zuid (~20-25 min).</li>
                <li>Embarque no trem Eurostar às <strong>13h13</strong> com chegada em Paris Gare du Nord às <strong>14h42</strong>.</li>
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSection('arrival-bru')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-sand-300 text-xs font-semibold text-navy-800 hover:bg-sand-100"
                >
                  Tutorial Aeroporto BRU
                </button>
                <button
                  onClick={() => setActiveSection('train-out')}
                  className="px-3 py-1.5 rounded-lg bg-navy-900 text-xs font-semibold text-white hover:bg-navy-800"
                >
                  Embarque Eurostar 13h13
                </button>
              </div>
            </div>
          </div>

          {/* Etapa 2 */}
          <div className="relative">
            <div className="absolute -left-[33px] sm:-left-[41px] top-0 w-6 h-6 rounded-full bg-navy-900 border-4 border-gold-400" />
            <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
                26/01 a 02/02/2027 — 7 Dias em Paris
              </span>
              <h3 className="font-serif font-bold text-lg text-navy-900 mt-1">
                Base na 11 Rue de Lourmel (75015) • Passeios por Proximidade
              </h3>
              <ul className="mt-2 space-y-1 text-xs sm:text-sm text-navy-700 list-disc list-inside">
                <li>Hospedagem fixa na <strong>11 Rue de Lourmel, Paris, Île-de-France, 75015</strong>.</li>
                <li>Sete dias organizados por regiões: Torre Eiffel, Invalides/Arco do Triunfo, Louvre/Tuileries, Île de la Cité/Quartier Latin, Opéra/Galeries Lafayette, Le Marais e Montmartre.</li>
                <li><strong>Opcional:</strong> Guia separado para a Disneyland Paris caso haja tempo e interesse.</li>
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSection('lodging-paris')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-sand-300 text-xs font-semibold text-navy-800 hover:bg-sand-100"
                >
                  Hospedagem Rue de Lourmel
                </button>
                <button
                  onClick={() => setActiveSection('paris-itinerary')}
                  className="px-3 py-1.5 rounded-lg bg-navy-900 text-xs font-semibold text-white hover:bg-navy-800"
                >
                  Roteiro de 7 Dias em Paris
                </button>
                <button
                  onClick={() => setActiveSection('disneyland')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-sand-300 text-xs font-semibold text-navy-800 hover:bg-sand-100"
                >
                  Passeio Opcional: Disney
                </button>
              </div>
            </div>
          </div>

          {/* Etapa 3 */}
          <div className="relative">
            <div className="absolute -left-[33px] sm:-left-[41px] top-0 w-6 h-6 rounded-full bg-navy-900 border-4 border-gold-400" />
            <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
                02/02/2027 — Retorno de Paris para a Bélgica
              </span>
              <h3 className="font-serif font-bold text-lg text-navy-900 mt-1">
                Trem Paris Gare du Nord (10h48) → Bruxelles-Midi (12h17) → Hotel Fleur de Ville
              </h3>
              <ul className="mt-2 space-y-1 text-xs sm:text-sm text-navy-700 list-disc list-inside">
                <li>Saída da 11 Rue de Lourmel pela manhã rumo à Gare du Nord.</li>
                <li>Trem direto às <strong>10h48</strong> com chegada em Bruxelles-Midi/Zuid às <strong>12h17</strong>.</li>
                <li>Deslocamento até o <strong>Hotel Fleur de Ville</strong> (Rue du Fossé aux Loups, 46, 1000 Brussels).</li>
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSection('train-return')}
                  className="px-3 py-1.5 rounded-lg bg-navy-900 text-xs font-semibold text-white hover:bg-navy-800"
                >
                  Embarque 02/02 (10h48)
                </button>
                <button
                  onClick={() => setActiveSection('lodging-brussels')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-sand-300 text-xs font-semibold text-navy-800 hover:bg-sand-100"
                >
                  Hotel Fleur de Ville
                </button>
              </div>
            </div>
          </div>

          {/* Etapa 4 */}
          <div className="relative">
            <div className="absolute -left-[33px] sm:-left-[41px] top-0 w-6 h-6 rounded-full bg-navy-900 border-4 border-gold-400" />
            <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
                Após 02/02/2027 — Bruxelas & Passeio Opcional a Bruges
              </span>
              <h3 className="font-serif font-bold text-lg text-navy-900 mt-1">
                Turismo em Bruxelas + Possibilidade de Conhecer Bruges
              </h3>
              <ul className="mt-2 space-y-1 text-xs sm:text-sm text-navy-700 list-disc list-inside">
                <li>Passeios a pé a partir do Hotel Fleur de Ville: Galeries Saint-Hubert, Grand Place, Manneken Pis, Mural do Tintim, Smurf, Mont des Arts, Sablon, Palácio Real e Parlamento.</li>
                <li><strong>Opcional:</strong> Bate-volta de 1 dia a Bruges saindo da estação Bruxelles-Central (~58 min).</li>
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSection('brussels-itinerary')}
                  className="px-3 py-1.5 rounded-lg bg-navy-900 text-xs font-semibold text-white hover:bg-navy-800"
                >
                  Roteiro de Bruxelas
                </button>
                <button
                  onClick={() => setActiveSection('bruges-optional')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-sand-300 text-xs font-semibold text-navy-800 hover:bg-sand-100"
                >
                  Passeio Opcional: Bruges
                </button>
              </div>
            </div>
          </div>

          {/* Etapa 5 */}
          <div className="relative">
            <div className="absolute -left-[33px] sm:-left-[41px] top-0 w-6 h-6 rounded-full bg-gold-500 border-4 border-navy-900" />
            <div className="p-5 rounded-2xl bg-sand-50 border border-sand-200">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
                Último Dia — Retorno ao Brasil
              </span>
              <h3 className="font-serif font-bold text-lg text-navy-900 mt-1">
                Hotel Fleur de Ville → Aeroporto de Bruxelas (BRU)
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-navy-700">
                Saída do hotel rumo ao Aeroporto de Bruxelas (BRU). Horário do voo de retorno configurável com cálculo automático da hora recomendada de saída do hotel.
                {config.returnFlightTime && (
                  <span className="block mt-1 font-semibold text-navy-900">
                    Voo configurado: {config.returnFlightDate} às {config.returnFlightTime}
                  </span>
                )}
              </p>
              <div className="mt-3">
                <button
                  onClick={() => setActiveSection('departure-bru')}
                  className="px-3 py-1.5 rounded-lg bg-navy-900 text-xs font-semibold text-white hover:bg-navy-800"
                >
                  Configurar Voo de Retorno & Guia para BRU
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
