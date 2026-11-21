import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AttractionItem,
  ChecklistItem,
  DigitalTicket,
  DisneyAttraction,
  GastronomyPlace,
  SectionId,
  UserTripConfig
} from '../types/trip';
import {
  DEFAULT_USER_CONFIG,
  INITIAL_BRUGES_ATTRACTIONS,
  INITIAL_BRUSSELS_ATTRACTIONS,
  INITIAL_CHECKLISTS,
  INITIAL_DISNEY_ATTRACTIONS,
  INITIAL_GASTRONOMY,
  INITIAL_PARIS_ATTRACTIONS,
  INITIAL_TICKETS
} from '../data/tripData';

interface TripContextValue {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  config: UserTripConfig;
  updateConfig: (partial: Partial<UserTripConfig>) => void;
  tickets: DigitalTicket[];
  addTicket: (ticket: Omit<DigitalTicket, 'id'>) => void;
  updateTicket: (id: string, partial: Partial<DigitalTicket>) => void;
  removeTicket: (id: string) => void;
  parisAttractions: AttractionItem[];
  updateParisAttraction: (id: string, partial: Partial<AttractionItem>) => void;
  moveParisAttractionOrder: (id: string, direction: 'up' | 'down') => void;
  disneyAttractions: DisneyAttraction[];
  updateDisneyAttraction: (id: string, partial: Partial<DisneyAttraction>) => void;
  brusselsAttractions: AttractionItem[];
  updateBrusselsAttraction: (id: string, partial: Partial<AttractionItem>) => void;
  moveBrusselsAttractionOrder: (id: string, direction: 'up' | 'down') => void;
  brugesAttractions: AttractionItem[];
  updateBrugesAttraction: (id: string, partial: Partial<AttractionItem>) => void;
  gastronomy: GastronomyPlace[];
  updateGastronomy: (id: string, partial: Partial<GastronomyPlace>) => void;
  checklists: ChecklistItem[];
  toggleChecklist: (id: string) => void;
  addChecklistItem: (category: ChecklistItem['category'], label: string, detail: string) => void;
  resetAllData: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
}

const TripContext = createContext<TripContextValue | undefined>(undefined);

const STORAGE_KEY = 'rotavi_europa_2027_state_v4';

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  const [config, setConfig] = useState<UserTripConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_config');
      return saved ? { ...DEFAULT_USER_CONFIG, ...JSON.parse(saved) } : DEFAULT_USER_CONFIG;
    } catch {
      return DEFAULT_USER_CONFIG;
    }
  });

  const [tickets, setTickets] = useState<DigitalTicket[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_tickets');
      return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    } catch {
      return INITIAL_TICKETS;
    }
  });

  const [parisAttractions, setParisAttractions] = useState<AttractionItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_paris');
      return saved ? JSON.parse(saved) : INITIAL_PARIS_ATTRACTIONS;
    } catch {
      return INITIAL_PARIS_ATTRACTIONS;
    }
  });

  const [disneyAttractions, setDisneyAttractions] = useState<DisneyAttraction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_disney');
      return saved ? JSON.parse(saved) : INITIAL_DISNEY_ATTRACTIONS;
    } catch {
      return INITIAL_DISNEY_ATTRACTIONS;
    }
  });

  const [brusselsAttractions, setBrusselsAttractions] = useState<AttractionItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_brussels');
      return saved ? JSON.parse(saved) : INITIAL_BRUSSELS_ATTRACTIONS;
    } catch {
      return INITIAL_BRUSSELS_ATTRACTIONS;
    }
  });

  const [brugesAttractions, setBrugesAttractions] = useState<AttractionItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_bruges');
      return saved ? JSON.parse(saved) : INITIAL_BRUGES_ATTRACTIONS;
    } catch {
      return INITIAL_BRUGES_ATTRACTIONS;
    }
  });

  const [gastronomy, setGastronomy] = useState<GastronomyPlace[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_gastronomy');
      return saved ? JSON.parse(saved) : INITIAL_GASTRONOMY;
    } catch {
      return INITIAL_GASTRONOMY;
    }
  });

  const [checklists, setChecklists] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_checklists');
      return saved ? JSON.parse(saved) : INITIAL_CHECKLISTS;
    } catch {
      return INITIAL_CHECKLISTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_config', JSON.stringify(config));
    } catch (e) {
      console.error(e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_tickets', JSON.stringify(tickets));
    } catch (e) {
      console.error(e);
    }
  }, [tickets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_paris', JSON.stringify(parisAttractions));
    } catch (e) {
      console.error(e);
    }
  }, [parisAttractions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_disney', JSON.stringify(disneyAttractions));
    } catch (e) {
      console.error(e);
    }
  }, [disneyAttractions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_brussels', JSON.stringify(brusselsAttractions));
    } catch (e) {
      console.error(e);
    }
  }, [brusselsAttractions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_bruges', JSON.stringify(brugesAttractions));
    } catch (e) {
      console.error(e);
    }
  }, [brugesAttractions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_gastronomy', JSON.stringify(gastronomy));
    } catch (e) {
      console.error(e);
    }
  }, [gastronomy]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_checklists', JSON.stringify(checklists));
    } catch (e) {
      console.error(e);
    }
  }, [checklists]);

  const updateConfig = (partial: Partial<UserTripConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const addTicket = (ticket: Omit<DigitalTicket, 'id'>) => {
    const newTkt: DigitalTicket = {
      ...ticket,
      id: 'tkt-custom-' + Date.now()
    };
    setTickets((prev) => [newTkt, ...prev]);
  };

  const updateTicket = (id: string, partial: Partial<DigitalTicket>) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, ...partial } : t)));
  };

  const removeTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const updateParisAttraction = (id: string, partial: Partial<AttractionItem>) => {
    setParisAttractions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...partial } : item))
    );
  };

  const moveParisAttractionOrder = (id: string, direction: 'up' | 'down') => {
    setParisAttractions((prev) => {
      const target = prev.find((i) => i.id === id);
      if (!target) return prev;
      const sameDay = prev
        .filter((i) => i.dayAssigned === target.dayAssigned)
        .sort((a, b) => a.order - b.order);
      const idx = sameDay.findIndex((i) => i.id === id);
      if (idx === -1) return prev;
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= sameDay.length) return prev;
      const neighbor = sameDay[swapIdx];
      return prev.map((item) => {
        if (item.id === target.id) return { ...item, order: neighbor.order };
        if (item.id === neighbor.id) return { ...item, order: target.order };
        return item;
      });
    });
  };

  const updateDisneyAttraction = (id: string, partial: Partial<DisneyAttraction>) => {
    setDisneyAttractions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...partial } : item))
    );
  };

  const updateBrusselsAttraction = (id: string, partial: Partial<AttractionItem>) => {
    setBrusselsAttractions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...partial } : item))
    );
  };

  const moveBrusselsAttractionOrder = (id: string, direction: 'up' | 'down') => {
    setBrusselsAttractions((prev) => {
      const target = prev.find((i) => i.id === id);
      if (!target) return prev;
      const sameDay = prev
        .filter((i) => i.dayAssigned === target.dayAssigned)
        .sort((a, b) => a.order - b.order);
      const idx = sameDay.findIndex((i) => i.id === id);
      if (idx === -1) return prev;
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= sameDay.length) return prev;
      const neighbor = sameDay[swapIdx];
      return prev.map((item) => {
        if (item.id === target.id) return { ...item, order: neighbor.order };
        if (item.id === neighbor.id) return { ...item, order: target.order };
        return item;
      });
    });
  };

  const updateBrugesAttraction = (id: string, partial: Partial<AttractionItem>) => {
    setBrugesAttractions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...partial } : item))
    );
  };

  const updateGastronomy = (id: string, partial: Partial<GastronomyPlace>) => {
    setGastronomy((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...partial } : item))
    );
  };

  const toggleChecklist = (id: string) => {
    setChecklists((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const addChecklistItem = (category: ChecklistItem['category'], label: string, detail: string) => {
    const newItem: ChecklistItem = {
      id: 'chk-custom-' + Date.now(),
      category,
      label,
      detail,
      checked: false
    };
    setChecklists((prev) => [...prev, newItem]);
  };

  const resetAllData = () => {
    setConfig(DEFAULT_USER_CONFIG);
    setTickets(INITIAL_TICKETS);
    setParisAttractions(INITIAL_PARIS_ATTRACTIONS);
    setDisneyAttractions(INITIAL_DISNEY_ATTRACTIONS);
    setBrusselsAttractions(INITIAL_BRUSSELS_ATTRACTIONS);
    setBrugesAttractions(INITIAL_BRUGES_ATTRACTIONS);
    setGastronomy(INITIAL_GASTRONOMY);
    setChecklists(INITIAL_CHECKLISTS);
  };

  return (
    <TripContext.Provider
      value={{
        activeSection,
        setActiveSection,
        config,
        updateConfig,
        tickets,
        addTicket,
        updateTicket,
        removeTicket,
        parisAttractions,
        updateParisAttraction,
        moveParisAttractionOrder,
        disneyAttractions,
        updateDisneyAttraction,
        brusselsAttractions,
        updateBrusselsAttraction,
        moveBrusselsAttractionOrder,
        brugesAttractions,
        updateBrugesAttraction,
        gastronomy,
        updateGastronomy,
        checklists,
        toggleChecklist,
        addChecklistItem,
        resetAllData,
        isSearchOpen,
        setIsSearchOpen,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrip must be used within TripProvider');
  return ctx;
};
