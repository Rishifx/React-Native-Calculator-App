import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';
import { convertCurrency, EXCHANGE_RATES } from '../utils/calculatorFunctions';

const CurrencyCalculator = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [result, setResult] = useState(null);

    const currencies = Object.keys(EXCHANGE_RATES);

    const handleConvert = () => {
        const res = convertCurrency(amount, fromCurrency, toCurrency);
        setResult(res);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="Enter Amount"
                placeholderTextColor="#ccc"
            />

            <View style={styles.row}>
                <View style={styles.half}>
                    <Text style={styles.label}>From</Text>
                    <View style={styles.currencyList}>
                        {currencies.map(c => (
                            <TouchableOpacity
                                key={c + 'from'}
                                style={[styles.chip, fromCurrency === c && styles.activeChip]}
                                onPress={() => setFromCurrency(c)}
                            >
                                <Text style={[styles.chipText, fromCurrency === c && styles.activeChipText]}>{c}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.half}>
                    <Text style={styles.label}>To</Text>
                    <View style={styles.currencyList}>
                        {currencies.map(c => (
                            <TouchableOpacity
                                key={c + 'to'}
                                style={[styles.chip, toCurrency === c && styles.activeChip]}
                                onPress={() => setToCurrency(c)}
                            >
                                <Text style={[styles.chipText, toCurrency === c && styles.activeChipText]}>{c}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={handleConvert} style={{ marginTop: 20 }}>
                <LinearGradient colors={[colors.primaryStart, colors.primaryEnd]} style={styles.calculateBtn}>
                    <Text style={styles.btnText}>Convert</Text>
                </LinearGradient>
            </TouchableOpacity>

            {result && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultValue}>{amount} {fromCurrency} = </Text>
                    <Text style={[styles.resultValue, { fontSize: 32, marginTop: 10 }]}>{result} {toCurrency}</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    label: { color: colors.text, fontSize: 16, marginBottom: 8, marginTop: 10 },
    input: {
        backgroundColor: colors.displayBackground,
        color: colors.text,
        padding: 15,
        borderRadius: 10,
        fontSize: 18,
    },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    half: { width: '48%' },
    currencyList: { flexDirection: 'row', flexWrap: 'wrap' },
    chip: {
        padding: 8,
        backgroundColor: colors.secondaryButton,
        borderRadius: 20,
        margin: 4,
    },
    activeChip: { backgroundColor: colors.primaryStart },
    chipText: { color: colors.text, fontSize: 12 },
    activeChipText: { fontWeight: 'bold' },
    calculateBtn: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    btnText: { color: colors.white, fontSize: 18, fontWeight: 'bold' },
    resultContainer: {
        marginTop: 30,
        alignItems: 'center',
        padding: 20,
    },
    resultValue: { color: colors.text, fontSize: 20, fontWeight: 'bold' },
});

export default CurrencyCalculator;
