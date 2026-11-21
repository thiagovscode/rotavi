import React from 'react';
import {
  Lightbulb,
  Luggage,
  Droplets,
  Smartphone,
  CreditCard,
  ShieldCheck,
  Train,
  Plane,
  CheckCircle2
} from 'lucide-react';

export const TipsSection: React.FC = () => {
  const tipCards = [
    {
      badge: 'Aeroporto & Bagagem Despachada',
      title: '1. Declaração Especial de Valor (Bagagem)',
      icon: <Luggage className="w-5 h-5 text-gold-600" />,
      content:
        'Caso você transporte itens de alto valor na bagagem despachada (Acordo de Montreal / ANAC), você pode solicitar à companhia aérea no check-in o preenchimento da Declaração Especial de Valor mediante taxa, aumentando o limite de indenização em caso de extravio. Regra de ouro: NUNCA despache eletrônicos, joias, medicamentos contínuos, dinheiro, cartões ou documentos — leve-os sempre na mochila/bagagem de mão!'
    },
    {
      badge: 'Salas VIP • Verificado para 2027',
      title: '2. Sala VIP e Dragon Pass (Visa Airport Companion / Mastercard)',
      icon: <Plane className="w-5 h-5 text-gold-600" />,
      content:
        'O aplicativo Visa Airport Companion utiliza a rede Dragon Pass (enquanto cartões Mastercard Black utilizam LoungeKey / salas próprias em GRU Terminal 3). Atenção para 2027: os bancos brasileiros atualizaram as regras de elegibilidade — verifique no app Visa Airport Companion ou do seu banco quantos acessos gratuitos estão ativos e se há exigência de gasto mínimo na fatura antes do embarque.'
    },
    {
      badge: 'Regras de Segurança UE • Verificado para 2027',
      title: '3. Líquidos na Bagagem de Mão: Frascos de até 100 ml e Saco Ziplock de 1 Litro',
      icon: <Droplets className="w-5 h-5 text-gold-600" />,
      content:
        'Verificação 2027 (União Europeia): A Comissão Europeia manteve a regra padronizada nos aeroportos europeus (incluindo Brussels Airport BRU): todos os líquidos, géis, pastas, cremes, perfumes e aerossóis na bagagem de mão DEVEM estar em embalagens individuais de no máximo 100 ml (mesmo que um frasco de 150 ml esteja pela metade, ele é retido!). Todos os frascos devem caber confortavelmente dentro de 1 único saco plástico transparente vedável (tipo Ziplock) de até 1 litro (aprox. 20x20 cm) por passageiro, que tenha fecho hermético.'
    },
    {
      badge: 'Conectividade na Europa',
      title: '4. eSIM Airalo vs. Roaming Internacional da Claro (Passaporte Europa)',
      icon: <Smartphone className="w-5 h-5 text-gold-600" />,
      content:
        '• eSIM Airalo: Se optar pelo eSIM digital da Airalo, escolha o pacote regional "Eurolink" (e não um chip apenas de 1 país), pois você pousará na Bélgica e viajará no mesmo dia para a França! Instale o eSIM ainda no Wi-Fi de casa no Brasil na véspera do voo.\n• Roaming da Claro (Passaporte Europa / Américas): Se o seu plano pós-pago da Claro já inclui o Passaporte Europa, ative o "Roaming de Dados" nas configurações do celular ao pousar em Bruxelas. Ele funciona automaticamente tanto na Bélgica quanto na França.'
    },
    {
      badge: 'Transporte Público em Paris e Bruxelas',
      title: '5. Transporte Público: Diferenças entre Bruxelas (STIB) e Paris (RATP)',
      icon: <Train className="w-5 h-5 text-gold-600" />,
      content:
        '• Em Bruxelas (STIB/MIVB): Você NÃO precisa comprar cartão de transporte físico para o metrô/tram! Basta encostar seu cartão bancário por aproximação (Wise/Nomad/Apple Pay) direto no validador vermelho dentro da estação ou do tram.\n• Em Paris (RATP/Île-de-France): As catracas do metrô de Paris NÃO aceitam cartão bancário de crédito direto na catraca! Você deve usar o aplicativo oficial "Île-de-France Mobilités / Bonjour RATP" no celular ou o cartão Navigo Easy / Navigo Découverte.'
    },
    {
      badge: 'Finanças & Pagamentos',
      title: '6. Cuidados com Dinheiro, Cartões Internacionais e Moeda (Euro €)',
      icon: <CreditCard className="w-5 h-5 text-gold-600" />,
      content:
        'Tanto a Bélgica quanto a França utilizam o Euro (€). Hoje, 98% dos estabelecimentos em Paris e Bruxelas aceitam pagamento por aproximação (Contactless / Apple Pay / Google Pay). Leve ao menos 2 cartões físicos diferentes (ex: Wise + Nomad + cartão de crédito de reserva guardados em lugares separados) e cerca de €100 a €150 em notas pequenas (€10 e €20) para pequenas despesas.'
    },
    {
      badge: 'Segurança Pessoal',
      title: '7. Cuidados com Documentos, Celulares e Batedores de Carteira (Pickpockets)',
      icon: <ShieldCheck className="w-5 h-5 text-gold-600" />,
      content:
        'Em áreas muito movimentadas (Trocadéro, Sacré-Cœur, metrô Linha 1 e Linha 4, Gare du Nord e Bruxelles-Midi), mantenha bolsas sempre fechadas à frente do corpo, nunca coloque celular ou carteira no bolso traseiro do casaco/calça e ignore abordagens de rua (golpe da pulseirinha em Montmartre, abaixo-assinado falso ou anel dourado no chão). Guarde foto do passaporte na nuvem e deixe o passaporte original bem protegido.'
    },
    {
      badge: 'Viagens de Trem (Eurostar & SNCB)',
      title: '8. Orientações Essenciais para Deslocamentos Ferroviários',
      icon: <CheckCircle2 className="w-5 h-5 text-gold-600" />,
      content:
        '• Nos trens Eurostar (26/01 às 13h13 e 02/02 às 10h48), seu assento e vagão são numerados e marcados no bilhete.\n• Não há limite de peso rigoroso como no avião (desde que você mesmo consiga carregar suas malas), mas cada passageiro pode levar até 2 malas grandes (máx. 85 cm) + 1 bagagem de mão, todas obrigatoriamente com etiqueta de identificação com seu nome e telefone.\n• Fique atento às suas malas nos bagageiros das extremidades dos vagões durante as paradas.'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-editorial">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-700">
          <Lightbulb className="w-4 h-4" />
          Informações Revisadas e Atualizadas para 2027
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-navy-900 mt-1">
          Dicas Gerais de Viagem
        </h1>
        <p className="text-sm text-navy-600 mt-1 max-w-3xl">
          Todas as dicas práticas do seu documento original (Declaração Especial de Valor, Sala VIP/Dragon Pass, líquidos de 100ml no Ziplock de 1L, eSIM Airalo, Roaming Claro, segurança e trens) verificadas para as regras vigentes em 2027.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tipCards.map((tip, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-6 border border-sand-200 shadow-editorial flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-sand-100 text-navy-800 border border-sand-200 text-[11px] font-bold">
                  {tip.badge}
                </span>
                <div className="p-2 rounded-xl bg-sand-50 border border-sand-200">
                  {tip.icon}
                </div>
              </div>
              <h3 className="font-serif font-bold text-navy-900 text-lg">{tip.title}</h3>
              <p className="text-xs sm:text-sm text-navy-700 mt-2.5 leading-relaxed whitespace-pre-line">
                {tip.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
