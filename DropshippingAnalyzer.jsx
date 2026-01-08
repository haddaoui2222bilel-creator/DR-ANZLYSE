import React, { useState, useMemo } from 'react';

const CURRENCIES = [
  // العملات الرئيسية
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  
  // أوروبا الغربية
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  
  // أوروبا الشرقية
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
  { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
  { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna' },
  { code: 'RSD', symbol: 'дин', name: 'Serbian Dinar' },
  { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  
  // أمريكا اللاتينية
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso' },
  { code: 'ARS', symbol: 'AR$', name: 'Argentine Peso' },
  { code: 'CLP', symbol: 'CL$', name: 'Chilean Peso' },
  { code: 'COP', symbol: 'CO$', name: 'Colombian Peso' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
  { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso' },
  { code: 'BOB', symbol: 'Bs', name: 'Bolivian Boliviano' },
  { code: 'PYG', symbol: '₲', name: 'Paraguayan Guarani' },
  { code: 'VES', symbol: 'Bs.S', name: 'Venezuelan Bolívar' },
  { code: 'DOP', symbol: 'RD$', name: 'Dominican Peso' },
  { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal' },
  { code: 'CRC', symbol: '₡', name: 'Costa Rican Colón' },
  { code: 'PAB', symbol: 'B/', name: 'Panamanian Balboa' },
  
  // الشرق الأوسط وشمال أفريقيا
  { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar' },
  { code: 'MAD', symbol: 'د.م', name: 'Moroccan Dirham' },
  { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar' },
  { code: 'EGP', symbol: 'ج.م', name: 'Egyptian Pound' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
  { code: 'BHD', symbol: 'د.ب', name: 'Bahraini Dinar' },
  { code: 'OMR', symbol: 'ر.ع', name: 'Omani Rial' },
  { code: 'JOD', symbol: 'د.أ', name: 'Jordanian Dinar' },
  { code: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pound' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  
  // آسيا
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  
  // أوقيانوسيا
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  
  // أفريقيا
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi' },
  
  // أمريكا الشمالية
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
];

const CurrencySelect = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      padding: '8px 12px',
      border: '2px solid #1e293b',
      borderRadius: '8px',
      background: '#0f172a',
      color: '#e2e8f0',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      outline: 'none',
      minWidth: '80px'
    }}
  >
    {CURRENCIES.map(c => (
      <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
    ))}
  </select>
);

const InputFieldWithCurrency = ({ label, value, onChange, placeholder, currency, onCurrencyChange }) => (
  <div style={{ marginBottom: '12px' }}>
    <label style={{
      display: 'block',
      fontSize: '11px',
      fontWeight: '600',
      color: '#94a3b8',
      marginBottom: '6px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontFamily: "'IBM Plex Sans Arabic', 'Tajawal', sans-serif"
    }}>
      {label}
    </label>
    <div style={{ display: 'flex', gap: '8px' }}>
      <div style={{ position: 'relative', flex: 1 }}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '12px 14px',
            paddingLeft: '36px',
            border: '2px solid #1e293b',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: '500',
            background: '#0f172a',
            color: '#e2e8f0',
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            fontFamily: "'Space Mono', monospace",
            boxSizing: 'border-box'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#6366f1';
            e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#1e293b';
            e.target.style.boxShadow = 'none';
          }}
        />
        <span style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#64748b',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {CURRENCIES.find(c => c.code === currency)?.symbol}
        </span>
      </div>
      <CurrencySelect value={currency} onChange={onCurrencyChange} />
    </div>
  </div>
);

const InputField = ({ label, value, onChange, placeholder }) => (
  <div style={{ marginBottom: '12px' }}>
    <label style={{
      display: 'block',
      fontSize: '11px',
      fontWeight: '600',
      color: '#94a3b8',
      marginBottom: '6px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontFamily: "'IBM Plex Sans Arabic', 'Tajawal', sans-serif"
    }}>
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '12px 14px',
        border: '2px solid #1e293b',
        borderRadius: '10px',
        fontSize: '15px',
        fontWeight: '500',
        background: '#0f172a',
        color: '#e2e8f0',
        outline: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        fontFamily: "'Space Mono', monospace",
        boxSizing: 'border-box'
      }}
      onFocus={(e) => {
        e.target.style.borderColor = '#6366f1';
        e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.2)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = '#1e293b';
        e.target.style.boxShadow = 'none';
      }}
    />
  </div>
);

const MetricCard = ({ label, value, unit, status }) => (
  <div style={{
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid #334155',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      top: '-20px',
      right: '-20px',
      width: '80px',
      height: '80px',
      background: status?.color || '#6366f1',
      opacity: 0.1,
      borderRadius: '50%',
      filter: 'blur(20px)'
    }} />
    <div style={{
      fontSize: '11px',
      color: '#94a3b8',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontWeight: '600',
      fontFamily: "'IBM Plex Sans Arabic', 'Tajawal', sans-serif"
    }}>
      {label}
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
      <span style={{
        fontSize: '24px',
        fontWeight: '700',
        color: status?.color || '#e2e8f0',
        fontFamily: "'Space Mono', monospace"
      }}>
        {typeof value === 'number' ? value.toFixed(2) : value}
      </span>
      <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>{unit}</span>
      {status && <span style={{ marginRight: 'auto', fontSize: '18px' }}>{status.icon}</span>}
    </div>
  </div>
);

const Section = ({ title, icon, children }) => (
  <div style={{
    background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #334155',
    marginBottom: '20px'
  }}>
    <h3 style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '14px',
      fontWeight: '700',
      color: '#e2e8f0',
      marginBottom: '18px',
      paddingBottom: '12px',
      borderBottom: '1px solid #334155',
      fontFamily: "'IBM Plex Sans Arabic', 'Tajawal', sans-serif"
    }}>
      <span style={{ fontSize: '20px' }}>{icon}</span>
      {title}
    </h3>
    {children}
  </div>
);

const DropshippingAnalyzer = () => {
  // Currency converter state
  const [converterFrom, setConverterFrom] = useState('USD');
  const [converterTo, setConverterTo] = useState('EUR');
  const [converterAmount, setConverterAmount] = useState('');
  const [exchangeRates] = useState({
    // العملات الرئيسية
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    
    // أوروبا الغربية
    CHF: 0.88,
    SEK: 10.45,
    NOK: 10.75,
    DKK: 6.87,
    
    // أوروبا الشرقية
    PLN: 3.95,
    CZK: 23.20,
    HUF: 355.0,
    RON: 4.57,
    BGN: 1.80,
    HRK: 6.95,
    RSD: 107.5,
    UAH: 41.50,
    RUB: 92.0,
    TRY: 32.50,
    
    // أمريكا اللاتينية
    BRL: 4.97,
    MXN: 17.15,
    ARS: 875.0,
    CLP: 880.0,
    COP: 3950.0,
    PEN: 3.72,
    UYU: 39.50,
    BOB: 6.91,
    PYG: 7350.0,
    VES: 36.50,
    DOP: 58.50,
    GTQ: 7.82,
    CRC: 515.0,
    PAB: 1.0,
    
    // الشرق الأوسط وشمال أفريقيا
    TND: 3.12,
    MAD: 10.05,
    DZD: 134.5,
    EGP: 30.90,
    SAR: 3.75,
    AED: 3.67,
    QAR: 3.64,
    KWD: 0.31,
    BHD: 0.38,
    OMR: 0.38,
    JOD: 0.71,
    LBP: 89500.0,
    ILS: 3.65,
    
    // آسيا
    CNY: 7.24,
    JPY: 149.50,
    KRW: 1320.0,
    INR: 83.20,
    PKR: 278.0,
    THB: 35.50,
    MYR: 4.72,
    SGD: 1.34,
    PHP: 56.20,
    IDR: 15650.0,
    VND: 24500.0,
    
    // أوقيانوسيا
    AUD: 1.53,
    NZD: 1.64,
    
    // أفريقيا
    ZAR: 18.65,
    NGN: 1550.0,
    KES: 153.0,
    GHS: 12.50,
    
    // أمريكا الشمالية
    CAD: 1.36,
  });

  // Field currencies
  const [currencies, setCurrencies] = useState({
    sellingPrice: 'EUR',
    productCost: 'USD',
    shippingCost: 'EUR',
    adBudget: 'EUR'
  });

  // Main currency for results
  const [mainCurrency, setMainCurrency] = useState('EUR');

  const [productData, setProductData] = useState({
    name: '',
    sellingPrice: '',
    productCost: '',
    shippingCost: '',
  });

  const [adData, setAdData] = useState({
    adBudget: '',
    impressions: '',
    clicks: '',
  });

  const [funnelData, setFunnelData] = useState({
    pageViews: '',
    addToCart: '',
    initiateCheckout: '',
    purchases: '',
  });

  // Convert amount from one currency to another
  const convert = (amount, from, to) => {
    if (!amount || isNaN(amount)) return 0;
    const inUSD = amount / exchangeRates[from];
    return inUSD * exchangeRates[to];
  };

  const converterResult = useMemo(() => {
    const amount = parseFloat(converterAmount) || 0;
    return convert(amount, converterFrom, converterTo);
  }, [converterAmount, converterFrom, converterTo, exchangeRates]);

  const mainSymbol = CURRENCIES.find(c => c.code === mainCurrency)?.symbol || '€';

  const calculations = useMemo(() => {
    // Convert all values to main currency
    const sp = convert(parseFloat(productData.sellingPrice) || 0, currencies.sellingPrice, mainCurrency);
    const pc = convert(parseFloat(productData.productCost) || 0, currencies.productCost, mainCurrency);
    const sc = convert(parseFloat(productData.shippingCost) || 0, currencies.shippingCost, mainCurrency);
    const budget = convert(parseFloat(adData.adBudget) || 0, currencies.adBudget, mainCurrency);
    
    const impr = parseFloat(adData.impressions) || 0;
    const clicks = parseFloat(adData.clicks) || 0;
    const views = parseFloat(funnelData.pageViews) || 0;
    const atc = parseFloat(funnelData.addToCart) || 0;
    const checkout = parseFloat(funnelData.initiateCheckout) || 0;
    const purchases = parseFloat(funnelData.purchases) || 0;

    const profitMargin = sp - pc - sc;
    const marginPercent = sp > 0 ? (profitMargin / sp) * 100 : 0;
    const cpm = impr > 0 ? (budget / impr) * 1000 : 0;
    const ctr = impr > 0 ? (clicks / impr) * 100 : 0;
    const cpc = clicks > 0 ? budget / clicks : 0;
    const atcRate = views > 0 ? (atc / views) * 100 : 0;
    const checkoutRate = atc > 0 ? (checkout / atc) * 100 : 0;
    const conversionRate = views > 0 ? (purchases / views) * 100 : 0;
    const revenue = sp * purchases;
    const totalCost = (pc + sc) * purchases + budget;
    const cpa = purchases > 0 ? budget / purchases : 0;
    const roas = budget > 0 ? revenue / budget : 0;
    const netProfit = revenue - totalCost;
    const roi = totalCost > 0 ? ((revenue - totalCost) / totalCost) * 100 : 0;

    return {
      profitMargin, marginPercent, cpm, ctr, cpc,
      atcRate, checkoutRate, conversionRate,
      revenue, totalCost, cpa, roas, netProfit, roi
    };
  }, [productData, adData, funnelData, currencies, mainCurrency, exchangeRates]);

  const getDecision = () => {
    const { ctr, roas, cpa, profitMargin } = calculations;
    
    if (roas >= 2 && ctr >= 1.5) {
      return { text: 'SCALE - كمّل واستثمر أكثر', icon: '🚀', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
    } else if (roas >= 1.5 && ctr >= 0.8) {
      return { text: 'حسّن - غيّر الـ Creative أو الصفحة', icon: '🔧', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' };
    } else if (cpa > profitMargin * 2) {
      return { text: 'أوقف - صرفت برشا بدون نتيجة', icon: '⛔', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' };
    }
    return { text: 'كمّل الاختبار - جمّع بيانات أكثر', icon: '🧪', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)' };
  };

  const getStatus = (value, goodThreshold, okThreshold, isLowerBetter = false) => {
    if (isLowerBetter) {
      if (value <= goodThreshold) return { icon: '✅', color: '#10b981' };
      if (value <= okThreshold) return { icon: '⚠️', color: '#f59e0b' };
      return { icon: '❌', color: '#ef4444' };
    }
    if (value >= goodThreshold) return { icon: '✅', color: '#10b981' };
    if (value >= okThreshold) return { icon: '⚠️', color: '#f59e0b' };
    return { icon: '❌', color: '#ef4444' };
  };

  const decision = getDecision();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0e1a',
      padding: '24px',
      fontFamily: "'IBM Plex Sans Arabic', 'Tajawal', sans-serif",
      direction: 'rtl'
    }}>
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#e2e8f0',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '32px' }}>📊</span>
            محلل اختبار المنتجات
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '6px' }}>
            أدخل البيانات واحصل على تحليل شامل وتوصية فورية
          </p>
          <p style={{ 
            color: '#6366f1', 
            fontSize: '12px', 
            fontWeight: '600',
            marginTop: '8px',
            padding: '6px 16px',
            background: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '20px',
            display: 'inline-block'
          }}>
            © جميع حقوق ملكية البرنامج | Haddaoui Bilel
          </p>
        </div>

        {/* Currency Converter */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #334155',
          marginBottom: '24px'
        }}>
          <h3 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            fontWeight: '700',
            color: '#e2e8f0',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '20px' }}>💱</span>
            محول العملات
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="text"
                value={converterAmount}
                onChange={(e) => setConverterAmount(e.target.value)}
                placeholder="المبلغ"
                style={{
                  width: '120px',
                  padding: '10px 14px',
                  border: '2px solid #1e293b',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '500',
                  background: '#0f172a',
                  color: '#e2e8f0',
                  outline: 'none',
                  fontFamily: "'Space Mono', monospace"
                }}
              />
              <CurrencySelect value={converterFrom} onChange={setConverterFrom} />
            </div>
            
            <span style={{ color: '#6366f1', fontSize: '24px', fontWeight: 'bold' }}>→</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                padding: '10px 16px',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
                fontFamily: "'Space Mono', monospace",
                minWidth: '100px',
                textAlign: 'center'
              }}>
                {converterResult.toFixed(2)}
              </div>
              <CurrencySelect value={converterTo} onChange={setConverterTo} />
            </div>

            <div style={{
              marginRight: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#0f172a',
              padding: '8px 14px',
              borderRadius: '10px',
              border: '1px solid #334155'
            }}>
              <span style={{ color: '#94a3b8', fontSize: '12px' }}>عملة النتائج:</span>
              <CurrencySelect value={mainCurrency} onChange={setMainCurrency} />
            </div>
          </div>
        </div>

        {/* Decision Banner */}
        <div style={{
          background: decision.bg,
          border: `2px solid ${decision.color}`,
          borderRadius: '16px',
          padding: '20px 24px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <span style={{ fontSize: '40px' }}>{decision.icon}</span>
          <div>
            <div style={{
              fontSize: '11px',
              color: '#94a3b8',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '600'
            }}>
              التوصية النهائية
            </div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: decision.color }}>
              {decision.text}
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {/* Input Column */}
          <div>
            <Section title="معلومات المنتج" icon="📦">
              <InputField
                label="اسم المنتج"
                value={productData.name}
                onChange={(e) => setProductData({...productData, name: e.target.value})}
                placeholder="مثال: ساعة ذكية"
              />
              <InputFieldWithCurrency
                label="سعر البيع"
                value={productData.sellingPrice}
                onChange={(e) => setProductData({...productData, sellingPrice: e.target.value})}
                placeholder="35"
                currency={currencies.sellingPrice}
                onCurrencyChange={(c) => setCurrencies({...currencies, sellingPrice: c})}
              />
              <InputFieldWithCurrency
                label="تكلفة المنتج"
                value={productData.productCost}
                onChange={(e) => setProductData({...productData, productCost: e.target.value})}
                placeholder="8"
                currency={currencies.productCost}
                onCurrencyChange={(c) => setCurrencies({...currencies, productCost: c})}
              />
              <InputFieldWithCurrency
                label="تكلفة الشحن"
                value={productData.shippingCost}
                onChange={(e) => setProductData({...productData, shippingCost: e.target.value})}
                placeholder="4"
                currency={currencies.shippingCost}
                onCurrencyChange={(c) => setCurrencies({...currencies, shippingCost: c})}
              />
            </Section>

            <Section title="بيانات الإعلان" icon="📢">
              <InputFieldWithCurrency
                label="ميزانية الإعلان"
                value={adData.adBudget}
                onChange={(e) => setAdData({...adData, adBudget: e.target.value})}
                placeholder="50"
                currency={currencies.adBudget}
                onCurrencyChange={(c) => setCurrencies({...currencies, adBudget: c})}
              />
              <InputField
                label="عدد الظهور (Impressions)"
                value={adData.impressions}
                onChange={(e) => setAdData({...adData, impressions: e.target.value})}
                placeholder="5000"
              />
              <InputField
                label="عدد النقرات (Clicks)"
                value={adData.clicks}
                onChange={(e) => setAdData({...adData, clicks: e.target.value})}
                placeholder="80"
              />
            </Section>

            <Section title="بيانات القمع (Funnel)" icon="🎯">
              <InputField
                label="زيارات الصفحة"
                value={funnelData.pageViews}
                onChange={(e) => setFunnelData({...funnelData, pageViews: e.target.value})}
                placeholder="200"
              />
              <InputField
                label="Add to Cart"
                value={funnelData.addToCart}
                onChange={(e) => setFunnelData({...funnelData, addToCart: e.target.value})}
                placeholder="12"
              />
              <InputField
                label="Initiate Checkout"
                value={funnelData.initiateCheckout}
                onChange={(e) => setFunnelData({...funnelData, initiateCheckout: e.target.value})}
                placeholder="5"
              />
              <InputField
                label="عدد المبيعات"
                value={funnelData.purchases}
                onChange={(e) => setFunnelData({...funnelData, purchases: e.target.value})}
                placeholder="2"
              />
            </Section>
          </div>

          {/* Results Column */}
          <div>
            <Section title="مؤشرات المنتج" icon="💰">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <MetricCard
                  label="هامش الربح"
                  value={calculations.profitMargin}
                  unit={mainSymbol}
                  status={getStatus(calculations.profitMargin, 15, 10)}
                />
                <MetricCard
                  label="نسبة الهامش"
                  value={calculations.marginPercent}
                  unit="%"
                  status={getStatus(calculations.marginPercent, 40, 30)}
                />
              </div>
            </Section>

            <Section title="مؤشرات الإعلان" icon="📈">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <MetricCard
                  label="CPM"
                  value={calculations.cpm}
                  unit={mainSymbol}
                  status={getStatus(calculations.cpm, 10, 15, true)}
                />
                <MetricCard
                  label="CTR"
                  value={calculations.ctr}
                  unit="%"
                  status={getStatus(calculations.ctr, 1.5, 0.8)}
                />
                <MetricCard
                  label="CPC"
                  value={calculations.cpc}
                  unit={mainSymbol}
                  status={getStatus(calculations.cpc, 0.8, 1.2, true)}
                />
              </div>
            </Section>

            <Section title="مؤشرات القمع" icon="🔄">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <MetricCard
                  label="ATC Rate"
                  value={calculations.atcRate}
                  unit="%"
                  status={getStatus(calculations.atcRate, 5, 3)}
                />
                <MetricCard
                  label="Checkout Rate"
                  value={calculations.checkoutRate}
                  unit="%"
                  status={getStatus(calculations.checkoutRate, 50, 30)}
                />
                <MetricCard
                  label="Conversion"
                  value={calculations.conversionRate}
                  unit="%"
                  status={getStatus(calculations.conversionRate, 2, 1)}
                />
              </div>
            </Section>

            <Section title="الربحية" icon="💎">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <MetricCard label="الإيرادات" value={calculations.revenue} unit={mainSymbol} />
                <MetricCard label="التكاليف" value={calculations.totalCost} unit={mainSymbol} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <MetricCard
                  label="CPA"
                  value={calculations.cpa}
                  unit={mainSymbol}
                  status={getStatus(calculations.cpa, calculations.profitMargin * 0.7, calculations.profitMargin, true)}
                />
                <MetricCard
                  label="ROAS"
                  value={calculations.roas}
                  unit="x"
                  status={getStatus(calculations.roas, 2, 1.5)}
                />
              </div>
              <div style={{
                background: calculations.netProfit >= 0 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 100%)',
                border: `2px solid ${calculations.netProfit >= 0 ? '#10b981' : '#ef4444'}`,
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '11px',
                  color: '#94a3b8',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: '600'
                }}>
                  صافي الربح / الخسارة
                </div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: calculations.netProfit >= 0 ? '#10b981' : '#ef4444',
                  fontFamily: "'Space Mono', monospace"
                }}>
                  {calculations.netProfit >= 0 ? '+' : ''}{calculations.netProfit.toFixed(2)}{mainSymbol}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                  ROI: {calculations.roi.toFixed(1)}%
                </div>
              </div>
            </Section>

            {/* Benchmarks */}
            <div style={{
              background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
              borderRadius: '16px',
              padding: '16px 20px',
              border: '1px solid #334155'
            }}>
              <h4 style={{
                fontSize: '12px',
                color: '#94a3b8',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>📋</span> المعايير المرجعية
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                fontSize: '12px'
              }}>
                {[
                  { label: 'CTR', target: '> 1.5%' },
                  { label: 'CPC', target: `< 1${mainSymbol}` },
                  { label: 'ATC', target: '> 5%' },
                  { label: 'Conv.', target: '> 1%' },
                  { label: 'ROAS', target: '> 2x' },
                  { label: 'CPM', target: `< 15${mainSymbol}` }
                ].map((item, i) => (
                  <div key={i} style={{
                    background: '#0f172a',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ color: '#64748b' }}>{item.label}</span>
                    <span style={{ color: '#e2e8f0', fontWeight: '600', fontFamily: "'Space Mono', monospace" }}>{item.target}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Analysis & Recommendations Section */}
        <div style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #334155',
          marginTop: '24px'
        }}>
          <h3 style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '16px',
            fontWeight: '700',
            color: '#e2e8f0',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '1px solid #334155'
          }}>
            <span style={{ fontSize: '24px' }}>🔍</span>
            تحليل النتائج والتوصيات
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            
            {/* Ad Performance Analysis */}
            <div style={{
              background: calculations.ctr >= 1.5 ? 'rgba(16, 185, 129, 0.1)' : calculations.ctr >= 0.8 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${calculations.ctr >= 1.5 ? '#10b981' : calculations.ctr >= 0.8 ? '#f59e0b' : '#ef4444'}`,
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '20px' }}>📢</span>
                <h4 style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '600', margin: 0 }}>أداء الإعلان</h4>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.7' }}>
                {calculations.ctr < 0.8 ? (
                  <>
                    <p style={{ margin: '0 0 8px 0' }}>❌ <strong>CTR ضعيف ({calculations.ctr.toFixed(2)}%)</strong> - الإعلان لا يجذب الانتباه</p>
                    <ul style={{ margin: '8px 0', paddingRight: '20px', color: '#94a3b8' }}>
                      <li>غيّر الـ Hook (أول 3 ثواني من الفيديو)</li>
                      <li>جرب صور/فيديوهات مختلفة تماماً</li>
                      <li>اكتب نص إعلاني يثير الفضول</li>
                      <li>استخدم UGC (محتوى من مستخدمين حقيقيين)</li>
                    </ul>
                  </>
                ) : calculations.ctr < 1.5 ? (
                  <>
                    <p style={{ margin: '0 0 8px 0' }}>⚠️ <strong>CTR متوسط ({calculations.ctr.toFixed(2)}%)</strong> - يحتاج تحسين</p>
                    <ul style={{ margin: '8px 0', paddingRight: '20px', color: '#94a3b8' }}>
                      <li>جرب A/B test على العناوين</li>
                      <li>أضف عرض أو خصم في الإعلان</li>
                      <li>استخدم ألوان أكثر جاذبية</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p style={{ margin: '0 0 8px 0' }}>✅ <strong>CTR ممتاز ({calculations.ctr.toFixed(2)}%)</strong> - الإعلان يجذب!</p>
                    <ul style={{ margin: '8px 0', paddingRight: '20px', color: '#94a3b8' }}>
                      <li>حافظ على هذا الـ Creative</li>
                      <li>اعمل variations مشابهة</li>
                      <li>زد الميزانية تدريجياً</li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Landing Page Analysis */}
            <div style={{
              background: calculations.atcRate >= 5 ? 'rgba(16, 185, 129, 0.1)' : calculations.atcRate >= 3 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${calculations.atcRate >= 5 ? '#10b981' : calculations.atcRate >= 3 ? '#f59e0b' : '#ef4444'}`,
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '20px' }}>🛒</span>
                <h4 style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '600', margin: 0 }}>صفحة المنتج</h4>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.7' }}>
                {calculations.atcRate < 3 ? (
                  <>
                    <p style={{ margin: '0 0 8px 0' }}>❌ <strong>ATC ضعيف ({calculations.atcRate.toFixed(2)}%)</strong> - الصفحة لا تقنع</p>
                    <ul style={{ margin: '8px 0', paddingRight: '20px', color: '#94a3b8' }}>
                      <li>راجع السعر - قد يكون مرتفع</li>
                      <li>أضف صور عالية الجودة</li>
                      <li>اكتب وصف يركز على الفوائد</li>
                      <li>أضف مراجعات وتقييمات</li>
                      <li>تأكد من سرعة تحميل الصفحة</li>
                    </ul>
                  </>
                ) : calculations.atcRate < 5 ? (
                  <>
                    <p style={{ margin: '0 0 8px 0' }}>⚠️ <strong>ATC متوسط ({calculations.atcRate.toFixed(2)}%)</strong></p>
                    <ul style={{ margin: '8px 0', paddingRight: '20px', color: '#94a3b8' }}>
                      <li>أضف urgency (عرض محدود)</li>
                      <li>وضّح الشحن المجاني إن وجد</li>
                      <li>أضف Trust badges</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p style={{ margin: '0 0 8px 0' }}>✅ <strong>ATC ممتاز ({calculations.atcRate.toFixed(2)}%)</strong></p>
                    <ul style={{ margin: '8px 0', paddingRight: '20px', color: '#94a3b8' }}>
                      <li>الصفحة تعمل جيداً</li>
                      <li>ركز على تحسين Checkout</li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Checkout Analysis */}
            <div style={{
              background: calculations.checkoutRate >= 50 ? 'rgba(16, 185, 129, 0.1)' : calculations.checkoutRate >= 30 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${calculations.checkoutRate >= 50 ? '#10b981' : calculations.checkoutRate >= 30 ? '#f59e0b' : '#ef4444'}`,
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '20px' }}>💳</span>
                <h4 style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '600', margin: 0 }}>صفحة الدفع</h4>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.7' }}>
                {calculations.checkoutRate < 30 ? (
                  <>
                    <p style={{ margin: '0 0 8px 0' }}>❌ <strong>Checkout ضعيف ({calculations.checkoutRate.toFixed(1)}%)</strong></p>
                    <ul style={{ margin: '8px 0', paddingRight: '20px', color: '#94a3b8' }}>
                      <li>مصاريف الشحن مفاجئة؟ أظهرها مبكراً</li>
                      <li>بسّط نموذج الدفع</li>
                      <li>أضف COD إذا كان السوق يحتاجه</li>
                      <li>أضف طرق دفع متعددة</li>
                      <li>أضف ضمان استرجاع الأموال</li>
                    </ul>
                  </>
                ) : calculations.checkoutRate < 50 ? (
                  <>
                    <p style={{ margin: '0 0 8px 0' }}>⚠️ <strong>Checkout متوسط ({calculations.checkoutRate.toFixed(1)}%)</strong></p>
                    <ul style={{ margin: '8px 0', paddingRight: '20px', color: '#94a3b8' }}>
                      <li>جرب تقليل حقول النموذج</li>
                      <li>أضف شارات الأمان</li>
                      <li>فعّل Guest Checkout</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p style={{ margin: '0 0 8px 0' }}>✅ <strong>Checkout جيد ({calculations.checkoutRate.toFixed(1)}%)</strong></p>
                    <ul style={{ margin: '8px 0', paddingRight: '20px', color: '#94a3b8' }}>
                      <li>صفحة الدفع تعمل جيداً</li>
                      <li>جرب upsell عند الدفع</li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Profitability Analysis */}
            <div style={{
              background: calculations.roas >= 2 ? 'rgba(16, 185, 129, 0.1)' : calculations.roas >= 1.5 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${calculations.roas >= 2 ? '#10b981' : calculations.roas >= 1.5 ? '#f59e0b' : '#ef4444'}`,
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '20px' }}>💰</span>
                <h4 style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '600', margin: 0 }}>الربحية</h4>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.7' }}>
                {calculations.roas < 1 ? (
                  <>
                    <p style={{ margin: '0 0 8px 0' }}>❌ <strong>خسارة (ROAS: {calculations.roas.toFixed(2)}x)</strong></p>
                    <ul style={{ margin: '8px 0', paddingRight: '20px', color: '#94a3b8' }}>
                      <li>أوقف الإعلان فوراً إذا صرفت 3x الهامش</li>
                      <li>راجع كل المؤشرات أعلاه</li>
                      <li>قد يكون المنتج غير مناسب</li>
                      <li>جرب جمهور مختلف تماماً</li>
                    </ul>
                  </>
                ) : calculations.roas < 1.5 ? (
                  <>
                    <p style={{ margin: '0 0 8px 0' }}>⚠️ <strong>Break-even (ROAS: {calculations.roas.toFixed(2)}x)</strong></p>
                    <ul style={{ margin: '8px 0', paddingRight: '20px', color: '#94a3b8' }}>
                      <li>المنتج محتمل لكن يحتاج تحسين</li>
                      <li>حسّن أضعف نقطة في الـ Funnel</li>
                      <li>جرب رفع السعر قليلاً</li>
                      <li>ابحث عن مورد أرخص</li>
                    </ul>
                  </>
                ) : calculations.roas < 2 ? (
                  <>
                    <p style={{ margin: '0 0 8px 0' }}>⚠️ <strong>ربح قليل (ROAS: {calculations.roas.toFixed(2)}x)</strong></p>
                    <ul style={{ margin: '8px 0', paddingRight: '20px', color: '#94a3b8' }}>
                      <li>كمّل الاختبار لجمع بيانات أكثر</li>
                      <li>حسّن الـ CPA بتحسين الإعلان</li>
                      <li>جرب Lookalike audiences</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p style={{ margin: '0 0 8px 0' }}>✅ <strong>مربح! (ROAS: {calculations.roas.toFixed(2)}x)</strong></p>
                    <ul style={{ margin: '8px 0', paddingRight: '20px', color: '#94a3b8' }}>
                      <li>🚀 ابدأ الـ Scaling تدريجياً</li>
                      <li>زد الميزانية 20-30% كل 2-3 أيام</li>
                      <li>أنشئ Lookalike audiences</li>
                      <li>جرب منصات أخرى (TikTok, Google)</li>
                      <li>فكر في Retargeting</li>
                    </ul>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Action Plan */}
          <div style={{
            marginTop: '20px',
            padding: '16px',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            borderRadius: '12px'
          }}>
            <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '700', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎯</span> خطة العمل التالية
            </h4>
            <div style={{ color: '#e0e7ff', fontSize: '13px', lineHeight: '1.8' }}>
              {calculations.roas >= 2 && calculations.ctr >= 1.5 ? (
                <p style={{ margin: 0 }}>
                  <strong>1.</strong> زد الميزانية 20% → 
                  <strong> 2.</strong> أنشئ 2-3 creatives مشابهة → 
                  <strong> 3.</strong> جرب Lookalike 1-2% → 
                  <strong> 4.</strong> فعّل Retargeting للزوار
                </p>
              ) : calculations.ctr < 0.8 ? (
                <p style={{ margin: 0 }}>
                  <strong>1.</strong> أوقف الإعلان الحالي → 
                  <strong> 2.</strong> اصنع 3 فيديوهات جديدة مختلفة تماماً → 
                  <strong> 3.</strong> ركز على Hook قوي في أول 3 ثواني → 
                  <strong> 4.</strong> اختبر من جديد بـ 20{mainSymbol}/يوم
                </p>
              ) : calculations.atcRate < 3 ? (
                <p style={{ margin: 0 }}>
                  <strong>1.</strong> راجع سعر المنتج مقارنة بالمنافسين → 
                  <strong> 2.</strong> حسّن صور وفيديوهات المنتج → 
                  <strong> 3.</strong> أضف 10+ مراجعات → 
                  <strong> 4.</strong> اختبر عرض خصم 10-15%
                </p>
              ) : calculations.checkoutRate < 30 ? (
                <p style={{ margin: 0 }}>
                  <strong>1.</strong> أظهر سعر الشحن في صفحة المنتج → 
                  <strong> 2.</strong> بسّط نموذج الدفع → 
                  <strong> 3.</strong> أضف COD إن أمكن → 
                  <strong> 4.</strong> أضف Trust badges وضمانات
                </p>
              ) : (
                <p style={{ margin: 0 }}>
                  <strong>1.</strong> كمّل جمع البيانات (50-100 زائر على الأقل) → 
                  <strong> 2.</strong> حلل أي جزء من الـ Funnel الأضعف → 
                  <strong> 3.</strong> ركز على تحسينه أولاً → 
                  <strong> 4.</strong> اختبر تغيير واحد في كل مرة
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropshippingAnalyzer;
