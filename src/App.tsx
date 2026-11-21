import React, { useState } from 'react';
import {
  Compass,
  PlaneLanding,
  Train,
  Building2,
  Sparkles,
  Navigation,
  PlaneTakeoff,
  Utensils,
  Languages,
  ShieldAlert,
  Lightbulb,
  CheckSquare,
  Map,
  BookOpen,
  Search,
  Menu,
  X,
  RotateCcw,
  QrCode,
  Wallet
} from 'lucide-react';
import { TripProvider, useTrip } from './context/TripContext';
import { SectionId } from './types/trip';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { EmergencyQuickModal } from './components/EmergencyQuickModal';
import { OverviewSection } from './components/sections/OverviewSection';
import { TicketsWalletSection } from './components/sections/TicketsWalletSection';
import { BudgetSection } from './components/sections/BudgetSection';
import { ArrivalBruSection } from './components/sections/ArrivalBruSection';
import { TrainOutSection } from './components/sections/TrainOutSection';
import { LodgingParisSection } from './components/sections/LodgingParisSection';
import { ParisItinerarySection } from './components/sections/ParisItinerarySection';
import { DisneylandSection } from './components/sections/DisneylandSection';
import { TransitParisSection } from './components/sections/TransitParisSection';
import { TrainReturnSection } from './components/sections/TrainReturnSection';
import { LodgingBrusselsSection } from './components/sections/LodgingBrusselsSection';
import { BrusselsItinerarySection } from './components/sections/BrusselsItinerarySection';
import { BrugesOptionalSection } from './components/sections/BrugesOptionalSection';
import { DepartureBruSection } from './components/sections/DepartureBruSection';
import { GastronomySection } from './components/sections/GastronomySection';
import { PhrasesSection } from './components/sections/PhrasesSection';
import { EmergenciesSection } from './components/sections/EmergenciesSection';
import { TipsSection } from './components/sections/TipsSection';
import { ChecklistsSection } from './components/sections/ChecklistsSection';
import { MapsSection } from './components/sections/MapsSection';
import { CdgReferenceSection } from './components/sections/CdgReferenceSection';

interface NavGroup {
  groupLabel: string;
  items: {
    id: SectionId;
    label: string;
    badge?: string;
    icon: React.ReactNode;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupLabel: 'Visão Geral & Planejamento',
    items: [
      { id: 'overview', label: 'Início & Linha do Tempo', icon: <Compass className="w-4 h-4" /> },
      {
        id: 'tickets',
        label: 'Ingressos & QR Codes',
        badge: 'Louvre 27/01',
        icon: <QrCode className="w-4 h-4" />
      },
      {
        id: 'budget',
        label: 'Gastos & Doces de Fruta',
        badge: 'Orçamento',
        icon: <Wallet className="w-4 h-4" />
      }
    ]
  },
  {
    groupLabel: '1. Chegada & Ida a Paris (26/01)',
    items: [
      {
        id: 'arrival-bru',
        label: 'Chegada Aeroporto BRU',
        badge: '26/01',
        icon: <PlaneLanding className="w-4 h-4" />
      },
      {
        id: 'train-out',
        label: 'Trem Eurostar → Paris',
        badge: '13h13',
        icon: <Train className="w-4 h-4" />
      }
    ]
  },
  {
    groupLabel: '2. Estadia em Paris (7 Dias)',
    items: [
      {
        id: 'lodging-paris',
        label: 'Hospedagem: Rue de Lourmel',
        badge: 'Base',
        icon: <Building2 className="w-4 h-4" />
      },
      {
        id: 'paris-itinerary',
        label: 'Paris — Roteiro 7 Dias',
        badge: '26/01-02/02',
        icon: <Compass className="w-4 h-4" />
      },
      {
        id: 'disneyland',
        label: 'Passeio Opcional: Disney',
        badge: 'Opcional',
        icon: <Sparkles className="w-4 h-4" />
      },
      {
        id: 'transit-paris',
        label: 'Metrô, RER & Navigo',
        icon: <Navigation className="w-4 h-4" />
      }
    ]
  },
  {
    groupLabel: '3. Retorno & Bruxelas (02/02)',
    items: [
      {
        id: 'train-return',
        label: 'Trem Paris → Bruxelas',
        badge: '02/02 • 10h48',
        icon: <Train className="w-4 h-4" />
      },
      {
        id: 'lodging-brussels',
        label: 'Hotel Fleur de Ville',
        badge: 'Bruxelas',
        icon: <Building2 className="w-4 h-4" />
      },
      {
        id: 'brussels-itinerary',
        label: 'Roteiro de Bruxelas',
        badge: 'Após 02/02',
        icon: <Compass className="w-4 h-4" />
      },
      {
        id: 'bruges-optional',
        label: 'Passeio Opcional: Bruges',
        badge: 'Opcional',
        icon: <Compass className="w-4 h-4" />
      },
      {
        id: 'departure-bru',
        label: 'Saída: Hotel → Aeroporto BRU',
        icon: <PlaneTakeoff className="w-4 h-4" />
      }
    ]
  },
  {
    groupLabel: '4. Guia Prático & Ferramentas',
    items: [
      { id: 'maps', label: '8 Mapas Interativos', icon: <Map className="w-4 h-4" /> },
      { id: 'gastronomy', label: 'Restaurantes & Waffles', icon: <Utensils className="w-4 h-4" /> },
      { id: 'phrases', label: 'Frases Úteis & Áudio', icon: <Languages className="w-4 h-4" /> },
      { id: 'checklists', label: 'Checklists Interativos', icon: <CheckSquare className="w-4 h-4" /> },
      { id: 'tips', label: 'Dicas Gerais (2027)', icon: <Lightbulb className="w-4 h-4" /> },
      { id: 'emergencies', label: 'Emergências & Consulados', icon: <ShieldAlert className="w-4 h-4" /> },
      { id: 'cdg-reference', label: 'Referência Separada: CDG', icon: <BookOpen className="w-4 h-4" /> }
    ]
  }
];

const AppLayout: React.FC = () => {
  const {
    activeSection,
    setActiveSection,
    setIsSearchOpen,
    setIsEmergencyModalOpen,
    resetAllData
  } = useTrip();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleSelectSection = (id: SectionId) => {
    setActiveSection(id);
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'tickets':
        return <TicketsWalletSection />;
      case 'budget':
        return <BudgetSection />;
      case 'arrival-bru':
        return <ArrivalBruSection />;
      case 'train-out':
        return <TrainOutSection />;
      case 'lodging-paris':
        return <LodgingParisSection />;
      case 'paris-itinerary':
        return <ParisItinerarySection />;
      case 'disneyland':
        return <DisneylandSection />;
      case 'transit-paris':
        return <TransitParisSection />;
      case 'train-return':
        return <TrainReturnSection />;
      case 'lodging-brussels':
        return <LodgingBrusselsSection />;
      case 'brussels-itinerary':
        return <BrusselsItinerarySection />;
      case 'bruges-optional':
        return <BrugesOptionalSection />;
      case 'departure-bru':
        return <DepartureBruSection />;
      case 'gastronomy':
        return <GastronomySection />;
      case 'phrases':
        return <PhrasesSection />;
      case 'emergencies':
        return <EmergenciesSection />;
      case 'tips':
        return <TipsSection />;
      case 'checklists':
        return <ChecklistsSection />;
      case 'maps':
        return <MapsSection />;
      case 'cdg-reference':
        return <CdgReferenceSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-sand-50 text-navy-900">
      {/* Header Fixo Superior */}
      <header className="sticky top-0 z-30 bg-navy-900 text-white border-b border-navy-800 shadow-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
              aria-label="Abrir menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleSelectSection('overview')}
              className="flex items-center gap-2.5 text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-gold-500 text-navy-950 font-serif font-bold text-lg flex items-center justify-center shadow-sm">
                R
              </div>
              <div>
                <span className="font-serif font-bold text-base sm:text-lg tracking-tight block leading-none">
                  Rotavi • Europa 2027
                </span>
                <span className="text-[11px] text-gold-300 font-medium block mt-0.5">
                  BRU → Paris (7 dias) → Bruxelas → BRU
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Botão de Busca Global */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-3 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Search className="w-4 h-4 text-gold-400" />
              <span className="hidden sm:inline">Buscar atração, frase, endereço...</span>
              <span className="sm:hidden">Buscar</span>
            </button>

            {/* Botão de Emergência Sempre Visível e Discreto */}
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-red-800/90 hover:bg-red-700 border border-red-500/40 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Acesso rápido de emergência 112 e Consulados"
            >
              <ShieldAlert className="w-4 h-4 text-gold-300" />
              <span>SOS 112</span>
            </button>
          </div>
        </div>
      </header>

      {/* Corpo Principal com Sidebar Desktop + Conteúdo */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto flex">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-72 shrink-0 border-r border-sand-200 bg-white/80 backdrop-blur-sm p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="space-y-5">
            {NAV_GROUPS.map((group, gIdx) => (
              <div key={gIdx}>
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-gold-700 mb-1.5">
                  {group.groupLabel}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectSection(item.id)}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          active
                            ? 'bg-navy-900 text-white shadow-sm'
                            : 'text-navy-700 hover:bg-sand-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className={active ? 'text-gold-400' : 'text-navy-500'}>
                            {item.icon}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                              active
                                ? 'bg-gold-500 text-navy-950'
                                : 'bg-sand-100 text-navy-600 border border-sand-200'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-4 border-t border-sand-200 px-2">
            <button
              onClick={() => {
                if (window.confirm('Deseja restaurar os dados originais do roteiro?')) {
                  resetAllData();
                }
              }}
              className="w-full py-2 px-3 rounded-xl bg-sand-100 hover:bg-sand-200 text-navy-600 text-[11px] font-semibold flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restaurar Roteiro Padrão
            </button>
          </div>
        </aside>

        {/* Drawer Mobile */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <div className="relative w-80 max-w-[85vw] bg-white h-full overflow-y-auto p-4 z-10 shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-sand-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-navy-900 text-gold-400 font-serif font-bold flex items-center justify-center">
                    R
                  </div>
                  <span className="font-serif font-bold text-navy-900">Menu da Viagem</span>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg bg-sand-100 text-navy-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-5 pb-10">
                {NAV_GROUPS.map((group, gIdx) => (
                  <div key={gIdx}>
                    <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-gold-700 mb-1.5">
                      {group.groupLabel}
                    </p>
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const active = activeSection === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelectSection(item.id)}
                            className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                              active
                                ? 'bg-navy-900 text-white'
                                : 'text-navy-800 hover:bg-sand-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <span className={active ? 'text-gold-400' : 'text-navy-500'}>
                                {item.icon}
                              </span>
                              <span className="truncate">{item.label}</span>
                            </div>
                            {item.badge && (
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                  active
                                    ? 'bg-gold-500 text-navy-950'
                                    : 'bg-sand-100 text-navy-600'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Área de Conteúdo Principal */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 overflow-x-hidden">
          {renderSection()}
        </main>
      </div>

      {/* Barra Inferior Mobile-First para Uso Rápido Durante Deslocamentos */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-sand-200 shadow-editorial-lg px-2 py-1.5 grid grid-cols-5 gap-1">
        <button
          onClick={() => handleSelectSection('overview')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold ${
            activeSection === 'overview' ? 'text-navy-900 bg-sand-100' : 'text-navy-500'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span className="mt-0.5">Início</span>
        </button>

        <button
          onClick={() => handleSelectSection('paris-itinerary')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold ${
            activeSection === 'paris-itinerary' ? 'text-navy-900 bg-sand-100' : 'text-navy-500'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="mt-0.5">Paris 7d</span>
        </button>

        <button
          onClick={() => handleSelectSection('brussels-itinerary')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold ${
            activeSection === 'brussels-itinerary' ? 'text-navy-900 bg-sand-100' : 'text-navy-500'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span className="mt-0.5">Bruxelas</span>
        </button>

        <button
          onClick={() => handleSelectSection('maps')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold ${
            activeSection === 'maps' ? 'text-navy-900 bg-sand-100' : 'text-navy-500'
          }`}
        >
          <Map className="w-4 h-4" />
          <span className="mt-0.5">Mapas</span>
        </button>

        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold text-gold-700"
        >
          <Menu className="w-4 h-4" />
          <span className="mt-0.5">Mais</span>
        </button>
      </div>

      {/* Modais Globais */}
      <GlobalSearchModal />
      <EmergencyQuickModal />
    </div>
  );
};

export function App() {
  return (
    <TripProvider>
      <AppLayout />
    </TripProvider>
  );
}

export default App;
