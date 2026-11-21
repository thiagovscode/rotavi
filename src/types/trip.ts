export type SectionId =
  | 'overview'
  | 'tickets'
  | 'budget'
  | 'arrival-bru'
  | 'train-out'
  | 'lodging-paris'
  | 'paris-itinerary'
  | 'disneyland'
  | 'transit-paris'
  | 'train-return'
  | 'lodging-brussels'
  | 'brussels-itinerary'
  | 'bruges-optional'
  | 'departure-bru'
  | 'gastronomy'
  | 'phrases'
  | 'emergencies'
  | 'tips'
  | 'checklists'
  | 'maps'
  | 'cdg-reference';

export interface DigitalTicket {
  id: string;
  title: string;
  category: 'Museu / Atração' | 'Trem Eurostar' | 'Voo / Transporte' | 'Outro';
  date: string;
  time: string;
  holderName: string;
  ticketCode: string;
  quantityNote: string;
  imageUrl?: string;
  notes: string;
}

export interface AttractionItem {
  id: string;
  name: string;
  region: string;
  city: 'Paris' | 'Bruxelas' | 'Bruges' | 'Disneyland Paris';
  description: string;
  tips: string;
  metroOrAccess: string;
  distanceFromBase?: string;
  estimatedDuration: string;
  lat: number;
  lng: number;
  dayAssigned: number; // 1..7 for Paris, 1..2 for Brussels, 1 for Bruges
  order: number;
  visited: boolean;
  scheduledTime: string;
  notes: string;
  image?: string;
}

export interface DisneyAttraction {
  id: string;
  name: string;
  park: 'Disneyland Park' | 'Walt Disney Studios Park (Disney Adventure World)';
  land: string;
  description: string;
  thrillLevel: 'Familiar / Tranquilo' | 'Moderado' | 'Radical / Montanha-Russa';
  tips: string;
  lat: number;
  lng: number;
  visited: boolean;
  scheduledTime: string;
  reservationNote: string;
  notes: string;
}

export interface GastronomyPlace {
  id: string;
  name: string;
  city: 'Bruxelas' | 'Paris' | 'Bruges';
  category: 'Restaurantes' | 'Doces' | 'Chocolates' | 'Waffles' | 'Comidas típicas' | 'Cafés' | 'Econômicos';
  tags: string[];
  specialty: string;
  priceEstimate?: string;
  address: string;
  status2027: string;
  priceLevel: '€' | '€€' | '€€€';
  lat: number;
  lng: number;
  favorite: boolean;
  notes: string;
}

export interface PhraseItem {
  id: string;
  category:
    | 'Aeroporto'
    | 'Estação de trem'
    | 'Hotel'
    | 'Restaurante'
    | 'Compras'
    | 'Transporte público'
    | 'Pedir informações'
    | 'Emergências'
    | 'Farmácia'
    | 'Comunicação com autoridades';
  pt: string;
  fr: string;
  en: string;
  pronunciationFr: string;
}

export interface ChecklistItem {
  id: string;
  category: 'Antes da viagem' | 'Aeroporto' | 'Trem' | 'Paris' | 'Bruxelas';
  label: string;
  detail: string;
  checked: boolean;
}

export interface MapPoint {
  id: string;
  name: string;
  category: 'Hospedagem' | 'Estações ferroviárias' | 'Aeroportos' | 'Pontos turísticos' | 'Restaurantes' | 'Emergências' | 'Compras';
  city: 'Paris' | 'Bruxelas' | 'Bruges';
  address: string;
  description: string;
  lat: number;
  lng: number;
  routeGroup: string[];
}

export interface UserTripConfig {
  arrivalFlightTime: string; // e.g. "09:45" on 26/01/2027
  arrivalFlightNumber: string;
  parisCheckIn: string;
  parisCheckOut: string;
  parisDoorCodeOrNotes: string;
  brusselsCheckIn: string;
  brusselsCheckOut: string;
  brusselsConfirmationNotes: string;
  returnFlightDate: string;
  returnFlightTime: string;
  returnFlightNumber: string;
  disneyVisitDate: string;
}
