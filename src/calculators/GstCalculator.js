import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';
import { calculateGST } from '../utils/calculatorFunctions';

const GstCalculator = () => {
    const [amount, setAmount] = useState('');
    const [gstRate, setGstRate] = useState('18');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const res = calculateGST(amount, gstRate);
        setResult(res);
    };

    const rates = ['5', '12', '18', '28'];

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Original Amount</Text>
            <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="Enter Amount"
                placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>GST Rate (%)</Text>
            <View style={styles.rateContainer}>
                {rates.map((rate) => (
                    <TouchableOpacity
                        key={rate}
                        style={[styles.rateButton, gstRate === rate && styles.selectedRate]}
                        onPress={() => setGstRate(rate)}
                    >
                        <Text style={[styles.rateText, gstRate === rate && styles.selectedRateText]}>{rate}%</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity onPress={handleCalculate}>
                <LinearGradient colors={[colors.primaryStart, colors.primaryEnd]} style={styles.calculateBtn}>
                    <Text style={styles.btnText}>Calculate GST</Text>
                </LinearGradient>
            </TouchableOpacity>

            {result && (
                <View style={styles.resultContainer}>
                    <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>GST Amount:</Text>
                        <Text style={styles.resultValue}>{result.gstAmount}</Text>
                    </View>
                    <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>Total Amount:</Text>
                        <Text style={styles.resultValue}>{result.totalAmount}</Text>
                    </View>
                    <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>CGST / SGST:</Text>
                        <Text style={styles.resultValue}>{result.cgst} / {result.sgst}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    label: { color: colors.text, fontSize: 16, marginBottom: 10, marginTop: 10 },
    input: {
        backgroundColor: colors.displayBackground,
        color: colors.text,
        padding: 15,
        borderRadius: 10,
        fontSize: 18,
    },
    rateContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    rateButton: {
        backgroundColor: colors.secondaryButton,
        padding: 10,
        borderRadius: 8,
        width: '22%',
        alignItems: 'center',
    },
    selectedRate: { backgroundColor: colors.success },
    rateText: { color: colors.text, fontWeight: 'bold' },
    selectedRateText: { color: colors.white },
    calculateBtn: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
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
        marginBottom: 10,
    },
    resultLabel: { color: colors.text, fontSize: 16 },
    resultValue: { color: colors.text, fontSize: 18, fontWeight: 'bold' },
});

export default GstCalculator;
