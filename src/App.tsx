/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Printer, Calculator, X, Info } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// Types
interface ProposalData {
  cliente: string;
  renda: number;
  ranking: string;
  data: string;
  empreendimento: string;
  unidade: string;
  observacoes: string;
  dataEntrega: string;
  valorUnidade: number;
  bonusAdimplencia: number;
  bonusCampanha: number;
  voltaAoCaixa: number;
  folgaTabela: number;
  descontoCoordenador: number;
  sinalEmDobroPorcentagem: number;
  financiamentoInfo: string;
  financiamentoValor: number;
  subsidioFederalInfo: string;
  subsidioFederalValor: number;
  subsidioEstadualInfo: string;
  subsidioEstadualValor: number;
  fgtsInfo: string;
  fgtsValor: number;
  valorParcelaFinanciamentoInfo: string;
  valorParcelaFinanciamentoValor: number;
  sinalAtoInfo: string;
  sinalAtoValor: number;
  sinal1Info: string;
  sinal1Valor: number;
  sinal2Info: string;
  sinal2Valor: number;
  sinal3Info: string;
  sinal3Valor: number;
  valorRestanteEntradaInfo: string;
  valorRestanteEntradaValor: number;
  quantidadeParcelasInfo: string;
  quantidadeParcelasValor: number;
  valorParcelaInfo: string;
  valorParcelaValor: number;
  anuaisQuantidade: number;
  anuaisValor: number;
}

export default function App() {
  const [data, setData] = useState<ProposalData>({
    cliente: '',
    renda: 0,
    ranking: '',
    data: new Date().toLocaleDateString('pt-BR'),
    empreendimento: '',
    unidade: '',
    observacoes: '',
    dataEntrega: '',
    valorUnidade: 0,
    bonusAdimplencia: 0,
    bonusCampanha: 0,
    voltaAoCaixa: 0,
    folgaTabela: 0,
    descontoCoordenador: 0,
    sinalEmDobroPorcentagem: 0,
    financiamentoInfo: '',
    financiamentoValor: 0,
    subsidioFederalInfo: '',
    subsidioFederalValor: 0,
    subsidioEstadualInfo: '',
    subsidioEstadualValor: 0,
    fgtsInfo: '',
    fgtsValor: 0,
    valorParcelaFinanciamentoInfo: '',
    valorParcelaFinanciamentoValor: 0,
    sinalAtoInfo: '',
    sinalAtoValor: 0,
    sinal1Info: '',
    sinal1Valor: 0,
    sinal2Info: '',
    sinal2Valor: 0,
    sinal3Info: '',
    sinal3Valor: 0,
    valorRestanteEntradaInfo: '',
    valorRestanteEntradaValor: 0,
    quantidadeParcelasInfo: '',
    quantidadeParcelasValor: 84,
    valorParcelaInfo: '',
    valorParcelaValor: 0,
    anuaisQuantidade: 0,
    anuaisValor: 0,
  });

  const [printCount, setPrintCount] = useState(0);
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [showDeliveryWarning, setShowDeliveryWarning] = useState(false);
  const [isResumoMode, setIsResumoMode] = useState(false);

  const EMPREENDIMENTOS: Record<string, { data: string, link: string }> = {
    "Conquista Maraponga": { data: "2027-01-31", link: "https://drive.google.com/drive/folders/1SG_hjajREyteMcr7_M2swybXdswYcLds?usp=drive_link" },
    "Conquista Messejana": { data: "2028-05-31", link: "https://drive.google.com/drive/folders/1LXqN4e7ib6GA37f_zSVJWk8232rs7bRi?usp=drive_link" },
    "Estilo Fátima": { data: "2027-03-30", link: "https://drive.google.com/drive/folders/14hOJLPrMCvHRzk9VGjxjQNoPrRj_nUx2?usp=drive_link" },
    "Estilo Passaré": { data: "2026-10-31", link: "https://drive.google.com/drive/folders/1GvKhDsrZ4rnEa-NuNymCKwOezcv4CGXf?usp=drive_link" },
    "Estilo Praia": { data: "2026-10-31", link: "https://drive.google.com/drive/folders/1jqFVnn8Pf5Qd-aR-GsHLkkRVCJ3a-JvU?usp=drive_link" },
    "Lúmina Fátima": { data: "2028-06-30", link: "https://drive.google.com/drive/folders/1gdRJMDH2e2Ecv8U8bb7C1uG-MWeETLCo?usp=drive_link" },
    "MyPlace Benfica": { data: "Entregue", link: "https://drive.google.com/drive/folders/1nqzfTcIAtUj9sdAgXlKzcKeBfVv3NlMZ?usp=drive_link" },
    "Nature Arbo": { data: "2028-05-31", link: "https://drive.google.com/drive/folders/1f_OG7VKMFagDX_UoxWK8-SgeX15kfYaN?usp=drive_link" },
    "Nature Eusébio": { data: "2028-07-31", link: "https://drive.google.com/drive/folders/1AfU2DAam5h6s6wVmSzWnTbOcUUKiNHAg?usp=drive_link" },
    "Orizon Rooftop": { data: "2029-04-30", link: "https://drive.google.com/drive/folders/1QvUfUg3-27uVDQMpAV9z60EAWCpdsMxC?usp=drive_link" },
    "Reserva Flora": { data: "Entregue", link: "https://drive.google.com/drive/folders/1aQGlqupGsA672ilyPUeMxUqNRkSBTBAE?usp=drive_link" },
    "Seano Beach": { data: "2028-07-30", link: "https://drive.google.com/drive/folders/1Ou40hjybFktfT3-zQZFPqRtwdHxS8DmN?usp=drive_link" },
    "Viva Nova Caucaia": { data: "2027-04-30", link: "https://drive.google.com/drive/folders/1VelEu-DcrA8R763DiG3ifwebVwkNNPdt?usp=drive_link" },
    "Viva Vida Coqueiros": { data: "2027-09-30", link: "https://drive.google.com/drive/folders/1I8YkjufrVCB5UDVd867P-Y5QYGaQaE-_?usp=drive_link" },
    "Viva Vida Jandaia": { data: "2028-06-30", link: "https://drive.google.com/drive/folders/1_ojnKIEd8QPPlkCA7U65_AR2lU589a5h?usp=drive_link" },
    "Viva Vida Maracanaú": { data: "2027-06-30", link: "https://drive.google.com/drive/folders/1x_3GxAQIth_noN4qZjrawwZ6IO35Ibyf?usp=drive_link" },
    "Viva Vida Parque": { data: "Entregue", link: "https://drive.google.com/drive/folders/1RFswrgGeE2wOTAVt2a3uFbOXcl7CtN89?usp=drive_link" },
    "Viva Vida Siqueira": { data: "2026-09-30", link: "https://drive.google.com/drive/folders/13h5L-fAHtaSusnKoB4t7j7qPbD9eH4Oc?usp=drive_link" },
    "Viva Vida Sul": { data: "2028-04-30", link: "https://drive.google.com/drive/folders/1rag3UlzyFIkTVMkTxWFO79GUeOGtGZpM?usp=drive_link" },
    "Viva Vida Tropical": { data: "2026-09-30", link: "https://drive.google.com/drive/folders/1WSWGcOTs_8_YgWJINXMjyOi391bNuSQN?usp=drive_link" }
  };

  useEffect(() => {
    const getNextWorkday = () => {
      const target = new Date();
      target.setDate(target.getDate() + 2);
      
      const day = target.getDay();
      if (day === 0) { // Sunday
        target.setDate(target.getDate() + 1);
      } else if (day === 6) { // Saturday
        target.setDate(target.getDate() + 2);
      }
      
      return target.toISOString().split('T')[0];
    };

    setData(prev => ({
      ...prev,
      sinalAtoInfo: getNextWorkday()
    }));
  }, []);

  const handleEmpreendimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setData(prev => {
      const newData = { ...prev, empreendimento: value };
      if (EMPREENDIMENTOS[value]) {
        newData.dataEntrega = EMPREENDIMENTOS[value].data;
        setShowDeliveryWarning(true);
      }
      return newData;
    });
  };

  // Calculations
  const totalDescontos = useMemo(() => {
    return (
      Number(data.bonusAdimplencia) +
      Number(data.bonusCampanha) +
      Number(data.voltaAoCaixa) +
      Number(data.folgaTabela) +
      Number(data.descontoCoordenador)
    );
  }, [data.bonusAdimplencia, data.bonusCampanha, data.voltaAoCaixa, data.folgaTabela, data.descontoCoordenador]);

  const valorBaseParaSinal = useMemo(() => {
    return Number(data.valorUnidade) - totalDescontos;
  }, [data.valorUnidade, totalDescontos]);

  const sinalEmDobroResultado = useMemo(() => {
    return valorBaseParaSinal * (Number(data.sinalEmDobroPorcentagem) / 100);
  }, [valorBaseParaSinal, data.sinalEmDobroPorcentagem]);

  const valorFinal = useMemo(() => {
    return valorBaseParaSinal - sinalEmDobroResultado;
  }, [valorBaseParaSinal, sinalEmDobroResultado]);

  const totalSubsidiosFGTS = useMemo(() => {
    return Number(data.subsidioFederalValor) + Number(data.subsidioEstadualValor) + Number(data.fgtsValor);
  }, [data.subsidioFederalValor, data.subsidioEstadualValor, data.fgtsValor]);

  const valorRestanteEntradaCalculado = useMemo(() => {
    const totalAnuais = (Number(data.anuaisQuantidade) || 0) * (Number(data.anuaisValor) || 0);
    return valorFinal - (
      data.financiamentoValor + 
      data.subsidioFederalValor + 
      data.subsidioEstadualValor + 
      data.fgtsValor +
      data.sinalAtoValor +
      data.sinal1Valor +
      data.sinal2Valor +
      data.sinal3Valor +
      totalAnuais
    );
  }, [
    valorFinal, 
    data.financiamentoValor, 
    data.subsidioFederalValor, 
    data.subsidioEstadualValor, 
    data.fgtsValor,
    data.sinalAtoValor,
    data.sinal1Valor,
    data.sinal2Valor,
    data.sinal3Valor,
    data.anuaisQuantidade,
    data.anuaisValor
  ]);

  const validParcelaDates = useMemo(() => {
    // Find the latest date among Ato and Sinais that have a date filled
    const dates = [
      data.sinalAtoInfo,
      data.sinal1Info,
      data.sinal2Info,
      data.sinal3Info
    ].filter(date => date && date !== '')
     .sort();

    let lastDateStr = dates.length > 0 ? dates[dates.length - 1] : null;
    
    // If no Ato/Sinal is filled, return empty options
    if (!lastDateStr) {
      return [];
    }

    const [yearStr, monthStr, dayStr] = lastDateStr.split('-');
    // Use UTC to avoid timezone daylight saving issues when calculating diffDays
    const lastDate = new Date(Date.UTC(Number(yearStr), Number(monthStr) - 1, Number(dayStr)));
    
    const nextMonth = new Date(Date.UTC(lastDate.getUTCFullYear(), lastDate.getUTCMonth() + 1, 1));
    const nextMonthYear = nextMonth.getUTCFullYear();
    const nextMonthIndex = nextMonth.getUTCMonth();

    const options = [5, 10, 15].map(day => {
      const optDate = new Date(Date.UTC(nextMonthYear, nextMonthIndex, day));
      // Calculate difference in days
      const diffTime = optDate.getTime() - lastDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return {
        dateStr: `${nextMonthYear}-${String(nextMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        label: `${String(day).padStart(2, '0')}/${String(nextMonthIndex + 1).padStart(2, '0')}/${nextMonthYear}`,
        diffDays,
        day
      };
    });

    // A month can have up to 31 days. If the last payment was on the 15th, 
    // the next payment on the 15th might be 31 days away.
    // We should allow the same day of the month or earlier, even if it's 31 days.
    const lastDayOfMonth = Number(dayStr);
    
    let validOptions = options.filter(o => o.diffDays <= 30 || (o.diffDays === 31 && o.day <= lastDayOfMonth));
    
    if (validOptions.length === 0) {
      validOptions = [options[0]]; // If all are > 31 days, allow the 5th
    }

    return validOptions;
  }, [
    data.sinalAtoInfo,
    data.sinal1Info,
    data.sinal2Info,
    data.sinal3Info
  ]);

  const anuaisDates = useMemo(() => {
    const qty = Number(data.anuaisQuantidade) || 0;
    if (qty <= 0 || !data.dataEntrega || data.dataEntrega === 'Entregue') return [];

    const deliveryDate = new Date(data.dataEntrega + 'T12:00:00');
    const deliveryYear = deliveryDate.getFullYear();
    const deliveryMonth = deliveryDate.getMonth(); // 0-11

    const today = new Date();
    let startYear = today.getFullYear();
    
    // If today is after Dec 15th, start next year
    if (today.getMonth() === 11 && today.getDate() > 15) {
      startYear++;
    }

    const dates: string[] = [];
    for (let i = 0; i < qty; i++) {
      const year = startYear + i;
      
      // Rule: No annual in Dec if delivery is in Dec
      if (year === deliveryYear && deliveryMonth === 11) {
        // Skip this year or stop? Usually stop if it's delivery year
        break; 
      }
      
      // Rule: Annual must be before delivery
      const annualDate = new Date(year, 11, 15, 12, 0, 0);
      if (annualDate >= deliveryDate) {
        break;
      }

      dates.push(`${year}-12-15`);
    }
    return dates;
  }, [data.anuaisQuantidade, data.dataEntrega]);

  const valorParcelaCalculado = useMemo(() => {
    const parcelas = Number(data.quantidadeParcelasValor) || 0;
    if (parcelas <= 0) return 0;
    
    // Determine the start date of the installments
    let startDateStr = data.valorParcelaInfo;
    if (!startDateStr && validParcelaDates.length > 0) {
      startDateStr = validParcelaDates[0].dateStr;
    }
    
    let startDate = new Date();
    if (startDateStr) {
      const [y, m, d] = startDateStr.split('-');
      startDate = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
    } else {
      startDate = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, 15));
    }

    const isEntregue = data.dataEntrega?.trim().toLowerCase() === 'entregue';
    
    const n = parcelas;
    const pv = valorRestanteEntradaCalculado;
    if (n === 0) return 0;

    // Taxas base
    const rPre = 0.005; // 0.5% ao mês
    const rPost = 0.015; // 1.5% ao mês

    // Carência
    let simDate = new Date();
    if (data.data) {
      const parts = data.data.split('/');
      if (parts.length === 3) {
        const [d, m, y] = parts.map(Number);
        simDate = new Date(Date.UTC(y, m - 1, d));
      }
    }
    const simMonth = simDate.getUTCFullYear() * 12 + simDate.getUTCMonth();
    const firstInstMonth = startDate.getUTCFullYear() * 12 + startDate.getUTCMonth();
    const carencia = Math.max(0, firstInstMonth - simMonth);

    // Saldo corrigido com carência (sempre 0.5% conforme regra)
    const pvCarencia = pv * Math.pow(1 + rPre, carencia);

    // Índice do mês de entrega em relação à 1ª parcela
    let deliveryIndex = Infinity;
    if (!isEntregue && data.dataEntrega) {
      const [ey, em] = data.dataEntrega.split('-').map(Number);
      const absDeliveryMonth = ey * 12 + (em - 1);
      deliveryIndex = absDeliveryMonth - firstInstMonth + 1;
    } else if (isEntregue) {
      deliveryIndex = 1; // Já entregue, todas são pós
    }

    // Cálculo da parcela fixa equivalente (PMT) - Tabela Price
    let sumDiscountFactors = 0;
    
    for (let k = 1; k <= n; k++) {
      let discountFactor = 1;
      
      for (let i = 1; i <= k; i++) {
        const rate = i >= deliveryIndex ? rPost : rPre;
        discountFactor /= (1 + rate);
      }
      
      sumDiscountFactors += discountFactor;
    }

    const pmt = pvCarencia / sumDiscountFactors;
    
    return pmt;
  }, [
    valorRestanteEntradaCalculado, 
    data.quantidadeParcelasValor, 
    data.dataEntrega, 
    data.data,
    validParcelaDates,
    data.valorParcelaInfo
  ]);

  const RANKING_RULES: Record<string, { ps: number, totalComp: number, constComp: number }> = {
    '💎 Diamante': { ps: 0.25, totalComp: 0.50, constComp: 0.20 },
    '🥇 Ouro': { ps: 0.20, totalComp: 0.50, constComp: 0.20 },
    '🥈 Prata': { ps: 0.18, totalComp: 0.48, constComp: 0.18 },
    '🥉 Bronze': { ps: 0.15, totalComp: 0.45, constComp: 0.15 },
    '⚙️ Aço': { ps: 0.12, totalComp: 0.40, constComp: 0.10 },
  };

  const rankingValidation = useMemo(() => {
    const psPercentage = data.valorUnidade > 0 ? valorRestanteEntradaCalculado / data.valorUnidade : 0;
    const totalCompPercentage = data.renda > 0 ? (Number(data.valorParcelaFinanciamentoValor) + valorParcelaCalculado) / data.renda : 0;
    const constCompPercentage = data.renda > 0 ? valorParcelaCalculado / data.renda : 0;

    // Arredondamos para 2 casas decimais para a comparação de renda, para bater com o que o usuário vê
    const valorParcelaArredondado = Math.round(valorParcelaCalculado * 100) / 100;

    const isParcelaTooHigh = data.renda > 0 && valorParcelaArredondado > data.renda;

    const hasAnyError = isParcelaTooHigh;

    if (!data.ranking || !RANKING_RULES[data.ranking]) {
      // Mesmo sem ranking selecionado, validamos se a parcela mensal ultrapassa a renda
      if (hasAnyError) {
        return {
          isValid: false,
          isGeneralError: true,
          isParcelaTooHigh,
          ps: { valid: true, current: psPercentage, max: 1 },
          totalComp: { valid: true, current: totalCompPercentage, max: 1 },
          constComp: { valid: true, current: constCompPercentage, max: 1 }
        };
      }
      return null;
    }

    const rule = RANKING_RULES[data.ranking];
    const isPsValid = psPercentage <= rule.ps;
    const isTotalCompValid = totalCompPercentage <= rule.totalComp;
    const isConstCompValid = constCompPercentage <= rule.constComp;
    
    // Validação de Anuais (máximo 50% da renda)
    const isAnuaisValid = Number(data.anuaisValor) <= (Number(data.renda) * 0.5);

    // Cálculo de sugestão de aumento no Ato para enquadramento
    let suggestedAtoIncrease = 0;
    if (data.ranking && RANKING_RULES[data.ranking]) {
      // 1. Limite PS
      const targetPvPs = rule.ps * data.valorUnidade;
      const diffPs = valorRestanteEntradaCalculado - targetPvPs;
      if (diffPs > 0) suggestedAtoIncrease = Math.max(suggestedAtoIncrease, diffPs);
      
      // 2. Limites de Comprometimento (Linear com o saldo devedor)
      if (valorRestanteEntradaCalculado > 0) {
        const ratio = valorParcelaCalculado / valorRestanteEntradaCalculado;
        
        // Limite Construtora
        const targetPvConst = (rule.constComp * data.renda) / ratio;
        const diffConst = valorRestanteEntradaCalculado - targetPvConst;
        if (diffConst > 0) suggestedAtoIncrease = Math.max(suggestedAtoIncrease, diffConst);
        
        // Limite Total
        const targetParcelaTotal = (rule.totalComp * data.renda) - Number(data.valorParcelaFinanciamentoValor);
        const targetPvTotal = targetParcelaTotal / ratio;
        const diffTotal = valorRestanteEntradaCalculado - targetPvTotal;
        if (diffTotal > 0) suggestedAtoIncrease = Math.max(suggestedAtoIncrease, diffTotal);
      }
    }

    return {
      isValid: isPsValid && isTotalCompValid && isConstCompValid && isAnuaisValid && !hasAnyError,
      isGeneralError: hasAnyError,
      isParcelaTooHigh,
      isAnuaisTooHigh: !isAnuaisValid,
      suggestedAtoIncrease: Math.ceil(suggestedAtoIncrease),
      ps: { valid: isPsValid, current: psPercentage, max: rule.ps },
      totalComp: { valid: isTotalCompValid, current: totalCompPercentage, max: rule.totalComp },
      constComp: { valid: isConstCompValid, current: constCompPercentage, max: rule.constComp }
    };
  }, [data.ranking, data.valorUnidade, valorRestanteEntradaCalculado, data.renda, data.valorParcelaFinanciamentoValor, valorParcelaCalculado, data.anuaisValor]);

  // Auto-select the best date when valid options change
  useEffect(() => {
    if (validParcelaDates.length > 0) {
      const currentIsValid = validParcelaDates.some(o => o.dateStr === data.valorParcelaInfo);
      if (!currentIsValid) {
        // Select the latest possible valid date (closest to 30 days)
        setData(prev => ({ ...prev, valorParcelaInfo: validParcelaDates[validParcelaDates.length - 1].dateStr }));
      }
    } else {
      // Clear the value if there are no valid dates
      setData(prev => ({ ...prev, valorParcelaInfo: '' }));
    }
  }, [validParcelaDates, data.valorParcelaInfo]);

  // Format currency for display in inputs
  const formatDisplay = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Handle input changes with currency mask
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Fields that use currency masking (cents-based)
    const currencyFields = [
      'renda',
      'valorUnidade', 
      'bonusAdimplencia', 
      'bonusCampanha', 
      'voltaAoCaixa', 
      'folgaTabela', 
      'descontoCoordenador',
      'financiamentoValor',
      'subsidioFederalValor',
      'subsidioEstadualValor',
      'fgtsValor',
      'valorParcelaFinanciamentoValor',
      'sinalAtoValor',
      'sinal1Valor',
      'sinal2Valor',
      'sinal3Valor',
      'valorRestanteEntradaValor',
      'anuaisValor'
    ];

    if (currencyFields.includes(name)) {
      // Remove everything except digits
      const cleanValue = value.replace(/\D/g, '');
      const numericValue = Number(cleanValue) / 100;
      setData(prev => ({ ...prev, [name]: numericValue }));
    } else if (name === 'sinalEmDobroPorcentagem' || name === 'quantidadeParcelasValor' || name === 'anuaisQuantidade') {
      // Simple number for percentage and installments
      const numericValue = value === '' ? 0 : Number(value);
      setData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      // Text fields
      setData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Format currency for final results (with R$)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const executePrint = () => {
    try {
      window.focus();
      if (window.print) {
        window.print();
      } else {
        document.execCommand('print', false, null);
      }
    } catch (e) {
      console.error("Erro ao imprimir:", e);
    }
  };

  const handlePrint = () => {
    const newCount = printCount + 1;
    setPrintCount(newCount);
    
    if (newCount % 5 === 0) {
      setShowAdPopup(true);
    } else {
      executePrint();
    }
  };

  const handleOpenNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24">
      {/* Header Branding */}
      <header className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className="flex items-center gap-6 sm:gap-12">
            <span className="text-xl sm:text-2xl font-black text-indigo-900 tracking-tighter">DIRECIONAL</span>
            <span className="text-xl sm:text-2xl font-black text-indigo-900 tracking-tighter">RIVA</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button 
              onClick={handlePrint}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm text-sm sm:text-base font-bold"
            >
              <Printer size={18} />
              Imprimir / PDF
            </button>
            <button 
              onClick={handleOpenNewTab}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors shadow-sm text-xs sm:text-sm"
            >
              Abrir em Nova Aba
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 print:p-0">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none">
          {/* Visual Header from Image */}
          <div className="relative h-16 sm:h-24 bg-white flex items-center justify-between px-4 sm:px-12 border-b-4 border-indigo-900">
            <span className="text-2xl sm:text-4xl font-black text-indigo-900 tracking-tighter">DIRECIONAL</span>
            <div className="flex flex-col items-end">
              <span className="text-2xl sm:text-4xl font-black text-indigo-900 tracking-tighter">RIVA</span>
              <span className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-bold">Incorporadora</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-900 via-rose-700 to-rose-600 py-2 sm:py-3 px-4 sm:px-12 flex justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px)' }}></div>
            <h1 className="text-white text-xl sm:text-3xl font-black tracking-[0.2em] sm:tracking-[0.5em] uppercase relative z-10">Proposta</h1>
          </div>

          <div className="p-4 sm:p-12 space-y-8 sm:space-y-12">
            {/* Block 1: Client & Project */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-4 col-span-full md:col-span-1">
                <div className="flex items-end gap-2 border-b border-gray-300 pb-1">
                  <label className="text-sm font-semibold text-gray-600 min-w-fit">Cliente:</label>
                  <input 
                    type="text" 
                    name="cliente"
                    value={data.cliente}
                    onChange={handleChange}
                    className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-gray-800"
                  />
                </div>
                <div className="flex items-end gap-2 border-b border-gray-300 pb-1">
                  <label className="text-sm font-semibold text-gray-600 min-w-fit">Renda:</label>
                  <div className="flex-1 flex items-center gap-1">
                    <span className="text-gray-500 text-sm">R$</span>
                    <input 
                      type="text" 
                      name="renda"
                      value={formatDisplay(data.renda)}
                      onChange={handleChange}
                      className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-gray-800"
                    />
                    {!data.renda && (
                      <div className="animate-blink print:hidden">
                        <span className="text-[10px] font-black text-red-600 uppercase bg-white/80 px-1 rounded shadow-sm border border-red-200">
                          Preencha a renda
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-end gap-2 border-b border-gray-300 pb-1">
                  <label className="text-sm font-semibold text-gray-600 min-w-fit">Empreendimento:</label>
                  <input 
                    type="text" 
                    list="empreendimentos-list"
                    name="empreendimento"
                    value={data.empreendimento}
                    onChange={handleEmpreendimentoChange}
                    className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-gray-800"
                  />
                  <datalist id="empreendimentos-list">
                    {Object.keys(EMPREENDIMENTOS).map(emp => (
                      <option key={emp} value={emp} />
                    ))}
                  </datalist>
                </div>
                <div className="flex items-start gap-2 border-b border-gray-300 pb-1">
                  <label className="text-sm font-semibold text-gray-600 min-w-fit mt-1">Unidade:</label>
                  <textarea 
                    name="unidade"
                    value={data.unidade}
                    onChange={handleChange}
                    rows={1}
                    className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-gray-800 resize-none"
                  />
                </div>
                <div className="flex items-start gap-2 border-b border-gray-300 pb-1">
                  <label className="text-sm font-semibold text-gray-600 min-w-fit mt-1">Observações:</label>
                  <textarea 
                    name="observacoes"
                    value={data.observacoes}
                    onChange={handleChange}
                    rows={1}
                    className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-gray-800 resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4 col-span-full md:col-span-1">
                <div className="flex items-end gap-2 border-b border-gray-300 pb-1">
                  <label className="text-sm font-semibold text-gray-600 min-w-fit">Data:</label>
                  <input 
                    type="text" 
                    name="data"
                    value={data.data}
                    onChange={handleChange}
                    className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-gray-800"
                  />
                </div>
                <div className="flex items-end gap-2 border-b border-gray-300 pb-1">
                  <label className="text-sm font-semibold text-gray-600 min-w-fit">Data de entrega:</label>
                  {data.dataEntrega === 'Entregue' ? (
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-gray-800 font-medium">Entregue</span>
                      <button 
                        type="button" 
                        onClick={() => setData(prev => ({ ...prev, dataEntrega: '' }))}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none print:hidden"
                        title="Limpar"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <input 
                      type="date" 
                      name="dataEntrega"
                      value={data.dataEntrega}
                      onChange={handleChange}
                      className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-gray-800"
                    />
                  )}
                </div>
                <div className="flex items-end gap-2 border-b border-gray-300 pb-1">
                  <label className="text-sm font-semibold text-gray-600 min-w-fit">Ranking:</label>
                  <select 
                    name="ranking"
                    value={data.ranking}
                    onChange={handleChange}
                    className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-gray-800 cursor-pointer"
                  >
                    <option value="">Selecione...</option>
                    <option value="💎 Diamante">💎 Diamante</option>
                    <option value="🥇 Ouro">🥇 Ouro</option>
                    <option value="🥈 Prata">🥈 Prata</option>
                    <option value="🥉 Bronze">🥉 Bronze</option>
                    <option value="⚙️ Aço">⚙️ Aço</option>
                  </select>
                </div>
                <div className="pt-3 flex justify-end">
                  <a 
                    href="https://ranking-direcional.streamlit.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded shadow-sm hover:bg-indigo-700 transition-colors print:hidden"
                  >
                    Consultar Ranking
                  </a>
                </div>
              </div>
            </section>

            {/* Block 2: Values Table */}
            <section className="space-y-6">
              <h2 className="text-center text-3xl font-bold text-indigo-800">MCMV e SBPE</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-gray-400">
                  <thead>
                    <tr className="bg-gray-100">
                      <th colSpan={2} className="border-2 border-gray-400 px-4 py-2 text-sm font-black text-white bg-[#002598] uppercase tracking-widest text-center">
                        Valor do Empreendimento
                      </th>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="border-2 border-gray-400 px-4 py-2 text-sm font-black text-gray-700 uppercase tracking-widest w-1/2">Descrição</th>
                      <th className="border-2 border-gray-400 px-4 py-2 text-sm font-black text-gray-700 uppercase tracking-widest w-1/2">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="text-center font-medium">
                    <tr>
                      <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-bold text-right w-1/2">Valor da Unidade</td>
                      <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 w-1/2 relative">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-gray-500">R$</span>
                          <input 
                            type="text" 
                            name="valorUnidade"
                            value={formatDisplay(data.valorUnidade)}
                            onChange={handleChange}
                            className="w-full text-center bg-transparent border-none focus:ring-0 p-0"
                          />
                        </div>
                        {Number(data.valorUnidade) === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-blink print:hidden">
                            <span className="text-[7px] sm:text-[9px] font-black text-red-600 uppercase bg-white/95 px-2 py-1 rounded shadow-sm border border-red-200 text-center leading-tight">
                              Atenção: coloque o valor de VENDA<br/>e não o de avaliação
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                    {isResumoMode ? (
                      <tr>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-bold text-right">Total de Descontos</td>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 font-bold text-green-600">
                          {formatCurrency(totalDescontos + sinalEmDobroResultado)}
                        </td>
                      </tr>
                    ) : (
                      <>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-bold text-right">Bônus de Adimplência</td>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-gray-500">R$</span>
                              <input 
                                type="text" 
                                name="bonusAdimplencia"
                                value={formatDisplay(data.bonusAdimplencia)}
                                onChange={handleChange}
                                className="w-full text-center bg-transparent border-none focus:ring-0 p-0"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-bold text-right">Bônus Campanha</td>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-gray-500">R$</span>
                              <input 
                                type="text" 
                                name="bonusCampanha"
                                value={formatDisplay(data.bonusCampanha)}
                                onChange={handleChange}
                                className="w-full text-center bg-transparent border-none focus:ring-0 p-0"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-bold text-right">Volta ao Caixa</td>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-gray-500">R$</span>
                              <input 
                                type="text" 
                                name="voltaAoCaixa"
                                value={formatDisplay(data.voltaAoCaixa)}
                                onChange={handleChange}
                                className="w-full text-center bg-transparent border-none focus:ring-0 p-0"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-bold text-right">Folga de Tabela</td>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-gray-500">R$</span>
                              <input 
                                type="text" 
                                name="folgaTabela"
                                value={formatDisplay(data.folgaTabela)}
                                onChange={handleChange}
                                className="w-full text-center bg-transparent border-none focus:ring-0 p-0"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-bold text-right">Desconto Coordenador</td>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-gray-500">R$</span>
                              <input 
                                type="text" 
                                name="descontoCoordenador"
                                value={formatDisplay(data.descontoCoordenador)}
                                onChange={handleChange}
                                className="w-full text-center bg-transparent border-none focus:ring-0 p-0"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-bold text-right">Sinal em Dobro</td>
                          <td className="border-2 border-gray-400 px-0 py-0">
                            <div className="flex h-full">
                              <div className="w-1/3 sm:w-1/4 border-r-2 border-gray-400 flex items-center justify-center bg-white">
                                <input 
                                  type="number" 
                                  name="sinalEmDobroPorcentagem"
                                  value={data.sinalEmDobroPorcentagem || ''}
                                  onChange={handleChange}
                                  className="w-full text-center bg-transparent border-none focus:ring-0 p-0 font-bold"
                                />
                                <span className="font-bold mr-1 sm:mr-2">%</span>
                              </div>
                              <div className="flex-1 flex items-center justify-center font-bold text-indigo-700 text-xs sm:text-sm">
                                {formatCurrency(sinalEmDobroResultado)}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    )}
                    <tr className="bg-white">
                      <td className="border-2 border-gray-400 px-2 py-3 sm:px-4 sm:py-4 uppercase text-[9px] sm:text-[10px] font-black leading-tight text-right">
                        {isResumoMode ? 'Valor do Imóvel' : 'Valor da Unidade após os descontos acima'}
                      </td>
                      <td className="border-2 border-gray-400 px-2 py-3 sm:px-4 sm:py-4 text-base sm:text-xl font-black text-indigo-900">
                        {formatCurrency(valorFinal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Tabela de Financiamento */}
            <section className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-gray-400 text-sm text-center bg-white">
                  <thead>
                    <tr>
                      <th colSpan={2} className="border-2 border-gray-400 px-4 py-2 uppercase text-sm tracking-wider font-bold bg-[#002598] text-white">
                        FINANCIAMENTO
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isResumoMode ? (
                      <>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right w-1/2">Financiamento Bancário</td>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 w-1/2 font-bold">
                            {formatCurrency(data.financiamentoValor)}
                          </td>
                        </tr>
                        {totalSubsidiosFGTS > 0 && (
                          <tr>
                            <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right">Subsídios e FGTS</td>
                            <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 font-bold text-green-600">
                              {formatCurrency(totalSubsidiosFGTS)}
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-bold text-right">Valor da Parcela (Financ.)</td>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 font-bold text-indigo-700 relative">
                            {formatCurrency(data.valorParcelaFinanciamentoValor)}
                            {!data.valorParcelaFinanciamentoValor && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-blink print:hidden">
                                <span className="text-[8px] font-black text-red-600 uppercase bg-white/80 px-1 rounded shadow-sm border border-red-200">
                                  Preencha a parcela
                                </span>
                              </div>
                            )}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right w-1/2">Financiamento</td>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 w-1/2">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-gray-500">R$</span>
                              <input 
                                type="text" 
                                name="financiamentoValor"
                                value={formatDisplay(data.financiamentoValor)}
                                onChange={handleChange}
                                className="w-full text-center bg-transparent border-none focus:ring-0 p-0"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right">Subsídio Federal</td>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-gray-500">R$</span>
                              <input 
                                type="text" 
                                name="subsidioFederalValor"
                                value={formatDisplay(data.subsidioFederalValor)}
                                onChange={handleChange}
                                className="w-full text-center bg-transparent border-none focus:ring-0 p-0"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right">Subsídio Estadual</td>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-gray-500">R$</span>
                              <input 
                                type="text" 
                                name="subsidioEstadualValor"
                                value={formatDisplay(data.subsidioEstadualValor)}
                                onChange={handleChange}
                                className="w-full text-center bg-transparent border-none focus:ring-0 p-0"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right">FGTS</td>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-gray-500">R$</span>
                              <input 
                                type="text" 
                                name="fgtsValor"
                                value={formatDisplay(data.fgtsValor)}
                                onChange={handleChange}
                                className="w-full text-center bg-transparent border-none focus:ring-0 p-0"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-bold text-right">Valor da Parcela de Financiamento</td>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 relative">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-gray-500 font-bold">R$</span>
                              <input 
                                type="text" 
                                name="valorParcelaFinanciamentoValor"
                                value={formatDisplay(data.valorParcelaFinanciamentoValor)}
                                onChange={handleChange}
                                className="w-full text-center bg-transparent border-none focus:ring-0 p-0 font-bold"
                              />
                            </div>
                            {!data.valorParcelaFinanciamentoValor && (
                              <div className="absolute inset-0 flex items-center justify-end pr-1 pointer-events-none animate-blink print:hidden">
                                <span className="text-[8px] font-black text-red-600 uppercase bg-white/80 px-1 rounded shadow-sm border border-red-200">
                                  Preencha a parcela
                                </span>
                              </div>
                            )}
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Tabela ATO */}
            <section className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-gray-400 text-sm text-center bg-white">
                  <thead>
                    <tr>
                      <th colSpan={3} className="border-2 border-gray-400 px-4 py-2 uppercase text-sm tracking-wider font-bold bg-[#002598] text-white">
                        ATO
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right w-1/3">Sinal Ato</td>
                      <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 w-1/3">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-gray-500">R$</span>
                          <input 
                            type="text" 
                            name="sinalAtoValor"
                            value={formatDisplay(data.sinalAtoValor)}
                            onChange={handleChange}
                            className="w-full text-center bg-transparent border-none focus:ring-0 p-0"
                          />
                        </div>
                      </td>
                      <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 w-1/3 relative">
                        <input 
                          type="date" 
                          name="sinalAtoInfo"
                          value={data.sinalAtoInfo}
                          onChange={handleChange}
                          className="w-full text-center bg-transparent border-none focus:ring-0 p-0 text-gray-700 uppercase text-[10px] sm:text-xs"
                        />
                        {!data.sinalAtoInfo && (
                          <div className="absolute inset-0 flex items-center justify-end pr-1 pointer-events-none animate-blink print:hidden">
                            <span className="text-[7px] sm:text-[8px] font-black text-red-600 uppercase bg-white/80 px-1 rounded shadow-sm border border-red-200">
                              Preencha a data
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                    {(!isResumoMode || data.sinal1Valor > 0) && (
                      <tr>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right">Sinal 1</td>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-gray-500">R$</span>
                            <input 
                              type="text" 
                              name="sinal1Valor"
                              value={formatDisplay(data.sinal1Valor)}
                              onChange={handleChange}
                              className="w-full text-center bg-transparent border-none focus:ring-0 p-0"
                            />
                          </div>
                        </td>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                          <input 
                            type="date" 
                            name="sinal1Info"
                            value={data.sinal1Info}
                            onChange={handleChange}
                            className="w-full text-center bg-transparent border-none focus:ring-0 p-0 text-gray-700 uppercase text-[10px] sm:text-xs"
                          />
                        </td>
                      </tr>
                    )}
                    {(!isResumoMode || data.sinal2Valor > 0) && (
                      <tr>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right">Sinal 2</td>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-gray-500">R$</span>
                            <input 
                              type="text" 
                              name="sinal2Valor"
                              value={formatDisplay(data.sinal2Valor)}
                              onChange={handleChange}
                              className="w-full text-center bg-transparent border-none focus:ring-0 p-0"
                            />
                          </div>
                        </td>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                          <input 
                            type="date" 
                            name="sinal2Info"
                            value={data.sinal2Info}
                            onChange={handleChange}
                            className="w-full text-center bg-transparent border-none focus:ring-0 p-0 text-gray-700 uppercase text-[10px] sm:text-xs"
                          />
                        </td>
                      </tr>
                    )}
                    {(!isResumoMode || data.sinal3Valor > 0) && (
                      <tr>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right">Sinal 3</td>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-gray-500">R$</span>
                            <input 
                              type="text" 
                              name="sinal3Valor"
                              value={formatDisplay(data.sinal3Valor)}
                              onChange={handleChange}
                              className="w-full text-center bg-transparent border-none focus:ring-0 p-0"
                            />
                          </div>
                        </td>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                          <input 
                            type="date" 
                            name="sinal3Info"
                            value={data.sinal3Info}
                            onChange={handleChange}
                            className="w-full text-center bg-transparent border-none focus:ring-0 p-0 text-gray-700 uppercase text-[10px] sm:text-xs"
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Tabela de Anuais */}
            {(!isResumoMode || data.anuaisQuantidade > 0) && (
              <section className="mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border-2 border-gray-400 text-sm text-center bg-white">
                    <thead>
                      <tr>
                        <th colSpan={3} className="border-2 border-gray-400 px-4 py-2 uppercase text-sm tracking-wider font-bold bg-[#002598] text-white">
                          ANUAIS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right w-1/3">Quantidade</td>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 w-1/3">
                          <input 
                            type="number" 
                            name="anuaisQuantidade"
                            value={data.anuaisQuantidade || ''}
                            onChange={handleChange}
                            className="w-full text-center bg-transparent border-none focus:ring-0 p-0 font-bold"
                            min="0"
                          />
                        </td>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 w-1/3 text-[10px] text-gray-500 italic">
                          Máx. {anuaisDates.length} permitidas
                          {Number(data.anuaisQuantidade) > anuaisDates.length && anuaisDates.length > 0 && (
                            <span className="block text-red-600 font-bold">Excesso de anuais!</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right">Valor de cada Anual</td>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-gray-500">R$</span>
                            <input 
                              type="text" 
                              name="anuaisValor"
                              value={formatDisplay(data.anuaisValor)}
                              onChange={handleChange}
                              className={`w-full text-center bg-transparent border-none focus:ring-0 p-0 font-bold ${rankingValidation?.isAnuaisTooHigh ? 'text-red-600' : ''}`}
                            />
                          </div>
                        </td>
                        <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 text-[10px] font-bold text-indigo-600">
                          Total: {formatCurrency(Number(data.anuaisQuantidade) * Number(data.anuaisValor))}
                        </td>
                      </tr>
                      {anuaisDates.length > 0 && (
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right">Datas das Anuais</td>
                          <td colSpan={2} className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 text-[10px] text-gray-600">
                            <div className="flex flex-wrap justify-center gap-2">
                              {anuaisDates.map((date, idx) => (
                                <span key={idx} className="bg-gray-100 px-2 py-1 rounded border border-gray-300">
                                  {new Date(date + 'T12:00:00').toLocaleDateString('pt-BR')}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {rankingValidation?.isAnuaisTooHigh && (
                    <p className="mt-1 text-[10px] text-red-600 font-bold text-center uppercase">
                      Atenção: O valor da anual excede 50% da renda do cliente ({formatCurrency(data.renda * 0.5)})
                    </p>
                  )}
                  <p className="mt-2 text-[10px] text-indigo-700 font-medium text-center italic">
                    * Nota: As parcelas anuais coincidem com as mensais (paga-se ambas no mês da anual).
                  </p>
                </div>
              </section>
            )}

            {/* Tabela RESTANTE ENTRADA */}
            <section className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-gray-400 text-sm text-center bg-white">
                  <thead>
                    <tr>
                      <th colSpan={3} className="border-2 border-gray-400 px-4 py-2 uppercase text-sm tracking-wider font-bold bg-[#002598] text-white">
                        RESTANTE ENTRADA
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isResumoMode ? (
                      <>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-4 sm:px-4 sm:py-6 uppercase text-xs sm:text-sm font-bold text-right w-1/2">Total da Entrada Parcelada</td>
                          <td className="border-2 border-gray-400 px-2 py-4 sm:px-4 sm:py-6 font-black text-indigo-800 text-xl sm:text-2xl">
                            {formatCurrency(valorRestanteEntradaCalculado)}
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-4 sm:px-4 sm:py-6 uppercase text-xs sm:text-sm font-bold text-right">Plano de Pagamento</td>
                          <td className="border-2 border-gray-400 px-2 py-4 sm:px-4 sm:py-6 font-black text-indigo-800 text-xl sm:text-2xl">
                            {data.quantidadeParcelasValor}x de {formatCurrency(valorParcelaCalculado)}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right w-1/2">Valor Restante Entrada</td>
                          <td colSpan={2} className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 font-bold text-indigo-700 text-base sm:text-lg">
                            {formatCurrency(valorRestanteEntradaCalculado)}
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right">Valor da Parcela</td>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 font-bold text-indigo-700 text-base sm:text-lg">
                            {formatCurrency(valorParcelaCalculado)}
                          </td>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3">
                            <select
                              name="valorParcelaInfo"
                              value={data.valorParcelaInfo}
                              onChange={handleChange}
                              className="w-full text-center bg-transparent border-none focus:ring-0 p-0 text-gray-700 uppercase text-[10px] sm:text-xs appearance-none cursor-pointer"
                              disabled={validParcelaDates.length === 0}
                            >
                              {validParcelaDates.length === 0 && (
                                <option value="">DD/MM/AAAA</option>
                              )}
                              {validParcelaDates.map(opt => (
                                <option key={opt.dateStr} value={opt.dateStr}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right">Quantidade de Parcelas</td>
                          <td colSpan={2} className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 relative">
                            <input 
                              type="number" 
                              min="0"
                              max="84"
                              name="quantidadeParcelasValor"
                              value={data.quantidadeParcelasValor || ''}
                              onChange={handleChange}
                              placeholder="Escreva quantas parcelas: 0 a 84 x "
                              className="w-full text-center bg-transparent border-none focus:ring-0 p-0 placeholder:text-gray-400 placeholder:text-xs font-bold"
                            />
                            <span className="absolute bottom-0 right-1 text-[8px] text-gray-400 italic pointer-events-none">
                              Clique para alterar
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 uppercase text-[10px] sm:text-xs font-semibold text-right">
                            Se pagar a última tem desconto? Sim! Segue valor aproximado:
                          </td>
                          <td colSpan={2} className="border-2 border-gray-400 px-2 py-2 sm:px-4 sm:py-3 font-bold text-green-700 text-base sm:text-lg">
                            {formatCurrency(data.quantidadeParcelasValor && Number(data.quantidadeParcelasValor) > 0 ? valorRestanteEntradaCalculado / Number(data.quantidadeParcelasValor) : 0)}
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="mt-8 text-xs text-gray-500 italic space-y-1">
              <p><strong>Avisos Importantes:</strong></p>
              <p>1. Essa é apenas uma simulação, para valores exatos seria necessário a aprovação de crédito e inserção dos dados dentro do sistema da construtora.</p>
              <p>2. Colocar o ranking correto é extremamente importante para a aprovação dentro da construtora.</p>
              <p>3. Essa proposta não garante a reserva da unidade em questão.</p>
              <p>4. Esta é uma proposta simulada com validade condicionada à política comercial do mês vigente. Os valores e condições definitivos estão sujeitos à validação e reserva oficial dentro do sistema da Direcional.</p>
              <p>5. Se quiser fazer um plano com balões recomenda-se usar o sistema da construtora.</p>
              <p className="pt-2 not-italic font-medium text-gray-400">By Emanuel Santiago</p>
            </section>

            <div className="mt-8 flex flex-col items-center gap-4 print:hidden">
              {rankingValidation && !rankingValidation.isValid && (
                <div className="w-full mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm animate-pulse">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-bold text-red-800 uppercase tracking-wider">
                        {rankingValidation.isGeneralError 
                          ? "Atenção: Parcela(s) excedem a renda do cliente" 
                          : `Atenção: Plano de pagamento fora da política do ranking ${data.ranking}`}
                      </h3>
                      <div className="mt-2 text-sm text-red-700 space-y-1">
                        {rankingValidation.isParcelaTooHigh && (
                          <p>• <strong>Parcela Impeditiva:</strong> O valor da parcela mensal calculada ultrapassa a renda mensal do cliente.</p>
                        )}
                        {data.ranking && !rankingValidation.ps.valid && (
                          <p>• <strong>Pro Soluto (PS):</strong> O valor parcelado com a construtora representa {(rankingValidation.ps.current * 100).toFixed(1)}% do imóvel. O limite para este ranking é {(rankingValidation.ps.max * 100).toFixed(1)}%.</p>
                        )}
                        {data.ranking && !rankingValidation.totalComp.valid && (
                          <p>• <strong>Comprometimento Total:</strong> A parcela do financiamento + parcela da construtora compromete {(rankingValidation.totalComp.current * 100).toFixed(1)}% da renda. O limite é {(rankingValidation.totalComp.max * 100).toFixed(1)}%.</p>
                        )}
                        {data.ranking && !rankingValidation.constComp.valid && (
                          <p>• <strong>Comprometimento Construtora:</strong> A parcela da construtora compromete {(rankingValidation.constComp.current * 100).toFixed(1)}% da renda. O limite é {(rankingValidation.constComp.max * 100).toFixed(1)}%.</p>
                        )}
                        {rankingValidation.isAnuaisTooHigh && (
                          <p>• <strong>Anuais Impeditivas:</strong> O valor de cada anual ultrapassa 50% da renda mensal do cliente ({formatCurrency(data.renda * 0.5)}).</p>
                        )}
                        {rankingValidation.suggestedAtoIncrease > 0 && (
                          <div className="mt-3 p-2 bg-white/50 rounded border border-red-200">
                            <p className="text-red-900 font-bold">
                              💡 Sugestão: Aumente o valor do ATO em pelo menos <strong>{formatCurrency(rankingValidation.suggestedAtoIncrease)}</strong> para enquadrar este plano no ranking {data.ranking}.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* QR Code do Empreendimento */}
            {data.empreendimento && EMPREENDIMENTOS[data.empreendimento] && (
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <QRCodeSVG 
                    value={EMPREENDIMENTOS[data.empreendimento].link} 
                    size={100}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="text-[10px] font-bold text-indigo-800 uppercase tracking-widest text-center">
                  Escaneie para acessar os arquivos do empreendimento
                </p>
              </div>
            )}

            {/* Monitoramento de Ranking em Tempo Real - Reforçado (Visível na Impressão) */}
            {data.ranking && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="w-full max-w-2xl bg-indigo-50 p-6 rounded-2xl shadow-md border-2 border-indigo-200 mb-6 transform hover:scale-[1.02] transition-transform print:shadow-none print:transform-none print:hover:scale-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-600 animate-pulse print:hidden" />
                      Monitoramento em Tempo Real: {data.ranking}
                    </h4>
                    <span className="text-[10px] font-bold bg-indigo-200 text-indigo-800 px-2 py-1 rounded-full uppercase print:border print:border-indigo-300">Status: Ativo</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-xl border-2 ${rankingValidation.ps.valid ? 'bg-white border-emerald-200' : 'bg-white border-red-200'}`}>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Pro Soluto (PS)</p>
                      <p className={`text-2xl font-black ${rankingValidation.ps.valid ? 'text-emerald-600' : 'text-red-600'}`}>
                        {(rankingValidation.ps.current * 100).toFixed(1)}%
                      </p>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${rankingValidation.ps.valid ? 'bg-emerald-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(100, (rankingValidation.ps.current / rankingValidation.ps.max) * 100)}%` }}
                        />
                      </div>
                      <p className="text-[9px] font-bold text-gray-400 mt-1">Limite: {(rankingValidation.ps.max * 100).toFixed(1)}%</p>
                    </div>
                    <div className={`p-4 rounded-xl border-2 ${rankingValidation.totalComp.valid ? 'bg-white border-emerald-200' : 'bg-white border-red-200'}`}>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Comp. Total</p>
                      <p className={`text-2xl font-black ${rankingValidation.totalComp.valid ? 'text-emerald-600' : 'text-red-600'}`}>
                        {(rankingValidation.totalComp.current * 100).toFixed(1)}%
                      </p>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${rankingValidation.totalComp.valid ? 'bg-emerald-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(100, (rankingValidation.totalComp.current / rankingValidation.totalComp.max) * 100)}%` }}
                        />
                      </div>
                      <p className="text-[9px] font-bold text-gray-400 mt-1">Limite: {(rankingValidation.totalComp.max * 100).toFixed(1)}%</p>
                    </div>
                    <div className={`p-4 rounded-xl border-2 ${rankingValidation.constComp.valid ? 'bg-white border-emerald-200' : 'bg-white border-red-200'}`}>
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Comp. Construtora</p>
                      <p className={`text-2xl font-black ${rankingValidation.constComp.valid ? 'text-emerald-600' : 'text-red-600'}`}>
                        {(rankingValidation.constComp.current * 100).toFixed(1)}%
                      </p>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${rankingValidation.constComp.valid ? 'bg-emerald-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(100, (rankingValidation.constComp.current / rankingValidation.constComp.max) * 100)}%` }}
                        />
                      </div>
                      <p className="text-[9px] font-bold text-gray-400 mt-1">Limite: {(rankingValidation.constComp.max * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col items-center gap-4 print:hidden">
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <span className="text-sm font-bold text-gray-700">Modo Resumido para Impressão</span>
                <button
                  onClick={() => setIsResumoMode(!isResumoMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isResumoMode ? 'bg-indigo-600' : 'bg-gray-200'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isResumoMode ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>
              <button 
                onClick={handlePrint}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-200/50 active:scale-95 font-bold text-lg"
              >
                <Printer size={24} />
                Gerar PDF / Imprimir Agora
              </button>
              <p className="text-xs text-gray-400 text-center max-w-xs">
                Dica: Se a janela de impressão não abrir, clique no botão "Abrir em Nova Aba" no topo da página.
              </p>
            </div>

            {/* Explicação Ranking */}
            <section className="mb-8 mt-12 page-break-before print:hidden">
              <h2 className="text-center text-2xl font-bold text-indigo-800 mb-6">Políticas Ranking</h2>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="space-y-3">
                  {/* Diamante */}
                  <div className="flex flex-col sm:flex-row items-stretch border-2 border-blue-400 rounded-lg overflow-hidden bg-blue-50">
                    <div className="bg-blue-100 w-full sm:w-16 flex sm:flex-col items-center justify-center p-2 border-b-2 sm:border-b-0 sm:border-r-2 border-blue-400 gap-2 sm:gap-0">
                      <span className="text-xs font-bold text-blue-700 sm:-rotate-90 whitespace-nowrap sm:mb-4">Diamante</span>
                      <span className="text-xl sm:text-2xl">💎</span>
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 sm:px-6 gap-2 sm:gap-0">
                      <div className="flex gap-4 sm:gap-8">
                        <span className="text-lg sm:text-xl font-bold text-gray-800">25% PS</span>
                        <span className="text-lg sm:text-xl font-bold text-gray-800">84X</span>
                      </div>
                      <span className="text-sm sm:text-lg font-semibold text-gray-700 text-center sm:text-right">50% / 20% Comprometimento de renda</span>
                    </div>
                  </div>

                  {/* Ouro */}
                  <div className="flex flex-col sm:flex-row items-stretch border-2 border-yellow-500 rounded-lg overflow-hidden bg-yellow-50">
                    <div className="bg-yellow-100 w-full sm:w-16 flex sm:flex-col items-center justify-center p-2 border-b-2 sm:border-b-0 sm:border-r-2 border-yellow-500 gap-2 sm:gap-0">
                      <span className="text-xs font-bold text-yellow-700 sm:-rotate-90 whitespace-nowrap sm:mb-4">Ouro</span>
                      <span className="text-xl sm:text-2xl">🥇</span>
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 sm:px-6 gap-2 sm:gap-0">
                      <div className="flex gap-4 sm:gap-8">
                        <span className="text-lg sm:text-xl font-bold text-gray-800">20% PS</span>
                        <span className="text-lg sm:text-xl font-bold text-gray-800">84X</span>
                      </div>
                      <span className="text-sm sm:text-lg font-semibold text-gray-700 text-center sm:text-right">50% / 20% Comprometimento de renda</span>
                    </div>
                  </div>

                  {/* Prata */}
                  <div className="flex flex-col sm:flex-row items-stretch border-2 border-gray-400 rounded-lg overflow-hidden bg-gray-50">
                    <div className="bg-gray-200 w-full sm:w-16 flex sm:flex-col items-center justify-center p-2 border-b-2 sm:border-b-0 sm:border-r-2 border-gray-400 gap-2 sm:gap-0">
                      <span className="text-xs font-bold text-gray-600 sm:-rotate-90 whitespace-nowrap sm:mb-4">Prata</span>
                      <span className="text-xl sm:text-2xl">🥈</span>
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 sm:px-6 gap-2 sm:gap-0">
                      <div className="flex gap-4 sm:gap-8">
                        <span className="text-lg sm:text-xl font-bold text-gray-800">18% PS</span>
                        <span className="text-lg sm:text-xl font-bold text-gray-800">84X</span>
                      </div>
                      <span className="text-sm sm:text-lg font-semibold text-gray-700 text-center sm:text-right">48% / 18% Comprometimento de renda</span>
                    </div>
                  </div>

                  {/* Bronze */}
                  <div className="flex flex-col sm:flex-row items-stretch border-2 border-orange-400 rounded-lg overflow-hidden bg-orange-50">
                    <div className="bg-orange-100 w-full sm:w-16 flex sm:flex-col items-center justify-center p-2 border-b-2 sm:border-b-0 sm:border-r-2 border-orange-400 gap-2 sm:gap-0">
                      <span className="text-xs font-bold text-orange-700 sm:-rotate-90 whitespace-nowrap sm:mb-4">Bronze</span>
                      <span className="text-xl sm:text-2xl">🥉</span>
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 sm:px-6 gap-2 sm:gap-0">
                      <div className="flex gap-4 sm:gap-8">
                        <span className="text-lg sm:text-xl font-bold text-gray-800">15% PS</span>
                        <span className="text-lg sm:text-xl font-bold text-gray-800">84X</span>
                      </div>
                      <span className="text-sm sm:text-lg font-semibold text-gray-700 text-center sm:text-right">45% / 15% Comprometimento de renda</span>
                    </div>
                  </div>

                  {/* Aço */}
                  <div className="flex flex-col sm:flex-row items-stretch border-2 border-slate-400 rounded-lg overflow-hidden bg-slate-50">
                    <div className="bg-slate-200 w-full sm:w-16 flex sm:flex-col items-center justify-center p-2 border-b-2 sm:border-b-0 sm:border-r-2 border-slate-400 gap-2 sm:gap-0">
                      <span className="text-xs font-bold text-slate-700 sm:-rotate-90 whitespace-nowrap sm:mb-4">Aço</span>
                      <span className="text-xl sm:text-2xl">⚙️</span>
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 sm:px-6 gap-2 sm:gap-0">
                      <div className="flex gap-4 sm:gap-8">
                        <span className="text-lg sm:text-xl font-bold text-gray-800">12% PS</span>
                        <span className="text-lg sm:text-xl font-bold text-gray-800">84X</span>
                      </div>
                      <span className="text-sm sm:text-lg font-semibold text-gray-700 text-center sm:text-right">40% / 10% Comprometimento de renda</span>
                    </div>
                  </div>

                  {/* Não Elegível */}
                  <div className="flex flex-col sm:flex-row items-stretch border-2 border-red-400 rounded-lg overflow-hidden bg-red-50">
                    <div className="bg-red-100 w-full sm:w-16 flex sm:flex-col items-center justify-center p-2 border-b-2 sm:border-b-0 sm:border-r-2 border-red-400 gap-2 sm:gap-0">
                      <span className="text-xs font-bold text-red-700 sm:-rotate-90 whitespace-nowrap sm:mb-6">Não elegível</span>
                      <span className="text-xl sm:text-2xl">🚫</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-4 sm:px-6 gap-1">
                      <span className="text-lg sm:text-xl font-bold text-gray-800 text-center">Não elegível</span>
                      <span className="text-xs sm:text-sm font-semibold text-red-700 text-center">Não consegue parcelar o pro soluto. Fale com Viabilizador</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Branding */}
          <footer className="p-12 pt-0 flex flex-col items-center gap-8 opacity-30 grayscale pointer-events-none">
             <div className="flex items-center gap-12">
              <span className="text-xl font-black text-indigo-900 tracking-tighter">DIRECIONAL</span>
              <span className="text-xl font-black text-indigo-900 tracking-tighter">RIVA</span>
            </div>
          </footer>
        </div>
      </main>

      {/* Footer AdSense Placeholder */}
      <div className="w-full bg-gray-100 border-t border-gray-200 p-4 flex justify-center items-center print:hidden mt-auto">
        <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-300 rounded">
          Espaço para Publicidade (Google AdSense 728x90)
        </div>
      </div>

      {/* Ad Popup */}
      <AnimatePresence>
        {showDeliveryWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 print:hidden"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full relative"
            >
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <Info className="w-8 h-8 text-amber-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase">Verificação Importante</h3>
                <p className="text-gray-600 mb-8 font-medium">
                  Favor verifique a data de entrega do produto. A construtora pode mudar a data sem aviso prévio. A mudança da data impacta diretamente no valor das mensais.
                </p>
                
                <button
                  onClick={() => setShowDeliveryWarning(false)}
                  className="w-full px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  ESTOU CIENTE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showAdPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 print:hidden"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full relative"
            >
              <button
                onClick={() => {
                  setShowAdPopup(false);
                  executePrint();
                }}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-gray-800 transition-colors z-10 shadow-sm"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-full h-[300px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 mb-6">
                  <span className="text-lg font-medium mb-2">Publicidade</span>
                  <span className="text-sm">Google AdSense (300x250 ou maior)</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Apoie nossa ferramenta</h3>
                <p className="text-gray-600 mb-8">
                  Exibimos este anúncio a cada 5 impressões para manter a ferramenta gratuita.
                </p>
                
                <button
                  onClick={() => {
                    setShowAdPopup(false);
                    executePrint();
                  }}
                  className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
                >
                  Continuar para Impressão
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
