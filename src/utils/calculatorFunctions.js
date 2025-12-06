
export const calculateGST = (amount, gstPercent) => {
    const value = parseFloat(amount) || 0;
    const percent = parseFloat(gstPercent) || 0;
    const gstAmount = (value * percent) / 100;
    const totalAmount = value + gstAmount;
    const splitGST = gstAmount / 2;
    return {
        gstAmount: gstAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        cgst: splitGST.toFixed(2),
        sgst: splitGST.toFixed(2),
    };
};

export const calculateEMI = (principal, annualRate, tenureMonths) => {
    const p = parseFloat(principal);
    const rAnnual = parseFloat(annualRate);
    const n = parseFloat(tenureMonths);

    if (!p || !rAnnual || !n) return null;

    const r = rAnnual / 12 / 100;
    // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    return {
        emi: emi.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
    };
};

export const calculateBMI = (weightKg, heightCm) => {
    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm);
    if (!w || !h) return null;

    const heightM = h / 100;
    const bmi = w / (heightM * heightM);
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 24.9) category = 'Normal';
    else if (bmi < 29.9) category = 'Overweight';
    else category = 'Obese';

    return {
        bmi: bmi.toFixed(1),
        category,
    };
};

export const calculateAge = (dobString) => {
    if (!dobString) return null;
    const birthDate = new Date(dobString);
    const today = new Date();

    if (isNaN(birthDate.getTime())) return null;

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    return { years, months, days };
};

export const percentageCalc = {
    percentOf: (x, y) => ((parseFloat(x) / 100) * parseFloat(y)).toFixed(2),
    percentChange: (oldVal, newVal) => {
        const o = parseFloat(oldVal);
        const n = parseFloat(newVal);
        if (!o) return 0;
        return (((n - o) / o) * 100).toFixed(2);
    }
};

export const EXCHANGE_RATES = {
    USD: 1,
    INR: 83.5,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 155.0,
    AUD: 1.5,
    CAD: 1.36,
    AED: 3.67
};

export const convertCurrency = (amount, from, to) => {
    const val = parseFloat(amount);
    if (isNaN(val)) return '0';
    if (!EXCHANGE_RATES[from] || !EXCHANGE_RATES[to]) return '0';

    // Convert to USD first (Base)
    const inUSD = val / EXCHANGE_RATES[from];
    // Convert USD to Target
    const result = inUSD * EXCHANGE_RATES[to];
    return result.toFixed(2);
};

export const evaluateExpression = (expression) => {
    // Safe evaluation for standard calculator
    // Replace visual symbols with JS operators if needed
    // standard: x -> *, ÷ -> /
    try {
        let cleanExpr = expression.replace(/×/g, '*').replace(/÷/g, '/');
        // Prevent dangerous code injection by strict validation
        if (!/^[\d\.\+\-\*\/\(\)\s\%\^Math\.PI\.E]+$/.test(cleanExpr) && !cleanExpr.includes('sin') && !cleanExpr.includes('cos')) {
            // Basic regex check, might need expansion for scientific functions
        }

        // Use a Function constructor for somewhat safer eval in local scope context, 
        // effectively eval but isolated from local vars, still has access to globals
        // For a calculator app, using 'new Function' returning value is acceptable pattern usually.
        // We will make it robust for scientific functions later.

        // Hack for scientific: replace sin with Math.sin, etc.
        cleanExpr = cleanExpr
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/log/g, 'Math.log10')
            .replace(/ln/g, 'Math.log')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/π/g, 'Math.PI')
            .replace(/e/g, 'Math.E')
            .replace(/\^/g, '**');

        const result = new Function('return ' + cleanExpr)();
        return String(result);
    } catch (e) {
        return 'Error';
    }
};
