import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';
import { calculateEMI } from '../utils/calculatorFunctions';

const EmiCalculator = () => {
    const [amount, setAmount] = useState('');
    const [rate, setRate] = useState('');
    const [months, setMonths] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const res = calculateEMI(amount, rate, months);
        setResult(res);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.label}>Loan Amount</Text>
            <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="Ex. 100000"
                placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>Interest Rate (% per annum)</Text>
            <TextInput
                style={styles.input}
                value={rate}
                onChangeText={setRate}
                keyboardType="numeric"
                placeholder="Ex. 9.5"
                placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>Tenure (Months)</Text>
            <TextInput
                style={styles.input}
                value={months}
                onChangeText={setMonths}
                keyboardType="numeric"
                placeholder="Ex. 12"
                placeholderTextColor="#ccc"
            />

            <TouchableOpacity onPress={handleCalculate} style={{ marginTop: 20 }}>
                <LinearGradient colors={[colors.primaryStart, colors.primaryEnd]} style={styles.calculateBtn}>
                    <Text style={styles.btnText}>Calculate EMI</Text>
                </LinearGradient>
            </TouchableOpacity>

            {result && (
                <View style={styles.resultContainer}>
                    <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Monthly EMI:</Text>
                        <Text style={styles.resultValue}>{result.emi}</Text>
                    </View>
                    <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Total Interest:</Text>
                        <Text style={styles.resultValue}>{result.totalInterest}</Text>
                    </View>
                    <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Total Payable:</Text>
                        <Text style={styles.resultValue}>{result.totalPayment}</Text>
                    </View>
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
    calculateBtn: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    btnText: { color: colors.white, fontSize: 18, fontWeight: 'bold' },
    resultContainer: {
        marginTop: 30,
        backgroundColor: colors.glassBackground,
        padding: 20,
        borderRadius: 15,
        borderColor: colors.glassBorder,
        borderWidth: 1,
    },
    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    resultLabel: { color: colors.text, fontSize: 16 },
    resultValue: { color: colors.text, fontSize: 20, fontWeight: 'bold' },
});

export default EmiCalculator;
