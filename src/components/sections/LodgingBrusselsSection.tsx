import React, { useState } from 'react';
import {
  Building2,
  Copy,
  Check,
  Navigation,
  Clock,
  Train,
  PlaneTakeoff,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { useTrip } from '../../context/TripContext';
import { InteractiveMap } from '../InteractiveMap';

export const LodgingBrusselsSection: React.FC = () => {
  const { config, updateConfig, setActiveSection } = useTrip();
  const [copied, setCopied] = useState(false);

  const fullAddress = 'Hotel Fleur de Ville — Rue du Fossé aux Loups, 46, 1000 Brussels, Bélgica';

  const copyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho do Hotel Fleur de Ville */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-700">
              <Building2 className="w-4 h-4" />
              Hospedagem na Bélgica • Somente Após o Retorno de Paris (a partir de 02/02/2027)
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
              Hotel Fleur de Ville — Bruxelas
            </h1>
            <p className="text-base sm:text-lg font-semibold text-navy-800 mt-2">
              Rue du Fossé aux Loups, 46 • 1000 Brussels • Bélgica
            </p>
            <p className="text-xs text-navy-600 mt-1 max-w-2xl">
              Localização privilegiada no coração histórico de Bruxelas: a 3 minutos a pé das Galeries Royales Saint-Hubert, a 6 minutos da Grand Place e a 7 minutos da estação ferroviária Bruxelles-Central.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={copyAddress}
              className="px-4 py-2.5 rounded-xl bg-sand-100 hover:bg-sand-200 border border-sand-300 text-navy-900 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gold-700" />}
              {copied ? 'Endereço Copiado!' : 'Copiar Endereço'}
            </button>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Hotel+Fleur+de+Ville+Rue+du+Fosse+aux+Loups+46+1000+Brussels"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <Navigation className="w-4 h-4 text-gold-400" />
              Abrir no Google Maps
            </a>
          </div>
        </div>

        {/* Campos Editáveis de Check-in e Check-out */}
        <div className="mt-6 p-5 rounded-2xl bg-sand-50 border border-sand-200">
          <h3 className="font-serif font-bold text-navy-900 text-base mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold-600" />
            Informações de Check-in, Check-out e Observações do Hotel Fleur de Ville
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase text-navy-600 mb-1">
                Check-in em Bruxelas (02/02/2027)
              </label>
              <input
                type="text"
                value={config.brusselsCheckIn}
                onChange={(e) => updateConfig({ brusselsCheckIn: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-sm text-navy-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-navy-600 mb-1">
                Check-out em Bruxelas
              </label>
              <input
                type="text"
                value={config.brusselsCheckOut}
                onChange={(e) => updateConfig({ brusselsCheckOut: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-sm text-navy-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold uppercase text-navy-600 mb-1">
                Anotações do Hotel Fleur de Ville
              </label>
              <textarea
                rows={2}
                value={config.brusselsConfirmationNotes}
                onChange={(e) => updateConfig({ brusselsConfirmationNotes: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-sand-300 text-xs text-navy-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Como chegar a partir de Bruxelles-Midi/Zuid e como ir ao Aeroporto de Bruxelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
            Chegada em 02/02 às 12h17
          </span>
          <h2 className="font-serif text-xl font-bold text-navy-900 mt-0.5 mb-4">
            Como ir de Bruxelles-Midi/Zuid até o Hotel Fleur de Ville
          </h2>

          <div className="space-y-3.5 text-xs text-navy-700 leading-relaxed">
            <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200">
              <p className="font-bold text-navy-900 text-sm">
                Alternativa 1 • Pré-Metrô Subterrâneo Linhas 3 ou 4 (~10 min — Recomendado!)
              </p>
              <p className="mt-1">
                Dentro de Bruxelles-Midi, desça para a estação subterrânea da STIB/MIVB e embarque no <strong>Tram/Pré-metrô Linha 4 (sentido Gare du Nord) ou Linha 10 (antiga 3)</strong>. Passe apenas 3 paradas (Lemonnier → Anneessens → Bourse → <strong>De Brouckère</strong>). Desça na estação <strong>De Brouckère</strong> (pague encostando seu cartão bancário por aproximação na validadora vermelha, ~€2,10). Ao sair na Place de Brouckère, caminhe apenas 220 metros (2 minutos) pela Rue des Augustins / Rue du Fossé aux Loups até o nº 46!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200">
              <p className="font-bold text-navy-900 text-sm">
                Alternativa 2 • Trem SNCB até Bruxelles-Central (~4 min de trem + 7 min a pé)
              </p>
              <p className="mt-1">
                Pegue qualquer trem nacional da SNCB em Bruxelles-Midi que passe por <strong>Bruxelles-Central / Brussel-Centraal</strong> (1 parada de 4 minutos). Saindo da Gare Centrale, caminhe 550 metros (7 minutos) descendo até a Rue du Fossé aux Loups, 46.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200">
              <p className="font-bold text-navy-900 text-sm">
                Alternativa 3 • Táxi Oficial ou Uber/Bolt (~10-12 min)
              </p>
              <p className="mt-1">
                Na saída Place Victor Hortá da estação Bruxelles-Midi, pegue um táxi oficial ou solicite Uber/Bolt direto para <em>Rue du Fossé aux Loups 46</em> (distância de apenas 2,1 km).
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
              Estações & Pontos Próximos ao Hotel
            </span>
            <h2 className="font-serif text-xl font-bold text-navy-900 mt-0.5 mb-4">
              Transporte, Aeroporto e Atrações ao Redor
            </h2>

            <div className="space-y-3 text-xs text-navy-700">
              <div className="p-3.5 rounded-2xl bg-sand-50 border border-sand-200">
                <p className="font-bold text-navy-900">🚇 Estação de Metrô/Pré-metrô De Brouckère (a 220m / 2 min a pé)</p>
                <p className="mt-0.5">Linhas 1 e 5 de Metrô + Linhas 4 e 10 de Pré-metrô. Conecta com toda Bruxelas.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-sand-50 border border-sand-200">
                <p className="font-bold text-navy-900">🚆 Estação Ferroviária Bruxelles-Central / Brussel-Centraal (a 550m / 7 min a pé)</p>
                <p className="mt-0.5">
                  Sua estação chave! Daqui partem os trens diretos para o <strong>Aeroporto de Bruxelas (BRU)</strong> em ~17 minutos e também os trens diretos para o passeio opcional a <strong>Bruges</strong> (~58 min).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-sand-50 border border-sand-200">
                <p className="font-bold text-navy-900">🏛️ Pontos Turísticos e Gastronomia a Poucos Passos</p>
                <p className="mt-0.5">
                  • <strong>Scott's Bar:</strong> 1 min a pé (mesmo quarteirão)<br />
                  • <strong>Galeries Royales Saint-Hubert & De Pistolei:</strong> 3 min a pé (250m)<br />
                  • <strong>Grand Place & Hôtel de Ville:</strong> 6 min a pé (450m)<br />
                  • <strong>Mont des Arts & Estátua do Smurf:</strong> 6 a 8 min a pé (500m)<br />
                  • <strong>Manneken Pis & Mural do Tintim:</strong> 8 a 9 min a pé (700m)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sand-200 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSection('brussels-itinerary')}
              className="px-4 py-2 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 inline-flex items-center gap-1.5"
            >
              Ver Roteiro de Bruxelas
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveSection('departure-bru')}
              className="px-4 py-2 rounded-xl bg-sand-100 text-navy-900 border border-sand-300 text-xs font-semibold hover:bg-sand-200 inline-flex items-center gap-1.5"
            >
              Guia do Hotel para o Aeroporto BRU
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mapa Interativo do Hotel Fleur de Ville e Arredores */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">
          Mapa Interativo: Hotel Fleur de Ville, Estações e Centro de Bruxelas
        </h2>
        <InteractiveMap
          center={[50.8475, 4.3548]}
          zoom={16}
          markers={[
            {
              id: 'fleur-base',
              name: 'Hotel Fleur de Ville',
              subtitle: 'Rue du Fossé aux Loups, 46, 1000 Brussels',
              description: 'Sua hospedagem em Bruxelas a partir de 02/02/2027.',
              lat: 50.8495,
              lng: 4.3548,
              isBase: true
            },
            {
              id: 'st-debrouckere',
              name: 'Estação De Brouckère (Metrô 1, 5 / Pré-metrô 4, 10)',
              subtitle: 'A 2 minutos a pé do hotel',
              lat: 50.8505,
              lng: 4.3526
            },
            {
              id: 'st-central-bru',
              name: 'Estação Bruxelles-Central / Brussel-Centraal',
              subtitle: 'A 7 minutos a pé do hotel',
              description: 'Trens diretos para o Aeroporto BRU (17 min) e para Bruges (58 min).',
              lat: 50.8455,
              lng: 4.3571
            },
            {
              id: 'gp-bru',
              name: 'Grand Place de Bruxelas',
              subtitle: 'A 6 minutos a pé do hotel',
              lat: 50.8467,
              lng: 4.3525
            },
            {
              id: 'gal-st-hubert',
              name: 'Galeries Royales Saint-Hubert',
              subtitle: 'A 3 minutos a pé do hotel',
              lat: 50.8475,
              lng: 4.3549
            }
          ]}
        />
      </div>
    </div>
  );
};
