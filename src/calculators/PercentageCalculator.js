import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';
import { percentageCalc } from '../utils/calculatorFunctions';

const PercentageCalculator = () => {
    const [mode, setMode] = useState('OF'); // OF, CHANGE
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        if (mode === 'OF') {
            // X % of Y
            const res = percentageCalc.percentOf(val1, val2);
            setResult(`${val1}% of ${val2} is ${res}`);
        } else {
            // % change from X to Y
            const res = percentageCalc.percentChange(val1, val2);
            setResult(`change is ${res}%`);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.modeContainer}>
                <TouchableOpacity
                    style={[styles.modeBtn, mode === 'OF' && styles.activeMode]}
                    onPress={() => setMode('OF')}
                >
                    <Text style={[styles.modeText, mode === 'OF' && styles.activeModeText]}>X % of Y</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.modeBtn, mode === 'CHANGE' && styles.activeMode]}
                    onPress={() => setMode('CHANGE')}
                >
                    <Text style={[styles.modeText, mode === 'CHANGE' && styles.activeModeText]}>% Increase/Decrease</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>{mode === 'OF' ? 'Percentage (X)' : 'Initial Value'}</Text>
            <TextInput
                style={styles.input}
                value={val1}
                onChangeText={setVal1}
                keyboardType="numeric"
                placeholder={mode === 'OF' ? 'Ex. 20' : 'Ex. 100'}
                placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>{mode === 'OF' ? 'Total Value (Y)' : 'Final Value'}</Text>
            <TextInput
                style={styles.input}
                value={val2}
                onChangeText={setVal2}
                keyboardType="numeric"
                placeholder={mode === 'OF' ? 'Ex. 500' : 'Ex. 150'}
                placeholderTextColor="#ccc"
            />

            <TouchableOpacity onPress={handleCalculate} style={{ marginTop: 20 }}>
                <LinearGradient colors={[colors.primaryStart, colors.primaryEnd]} style={styles.calculateBtn}>
                    <Text style={styles.btnText}>Calculate</Text>
                </LinearGradient>
            </TouchableOpacity>

            {result && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultValue}>{result}</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    modeContainer: { flexDirection: 'row', marginBottom: 20, backgroundColor: colors.secondaryButton, borderRadius: 10, padding: 4 },
    modeBtn: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 8 },
    activeMode: { backgroundColor: colors.primaryStart },
    modeText: { color: colors.text },
    activeModeText: { fontWeight: 'bold' },
    label: { color: colors.text, fontSize: 16, marginBottom: 8, marginTop: 10 },
    input: {
        backgroundColor: colors.displayBackground,
        color: colors.text,
        padding: 15,
        borderRadius: 10,
        fontSize: 18,
    },
    calculateBtn: { padding: 15, borderRadius: 10, alignItems: 'center' },
    btnText: { color: colors.white, fontSize: 18, fontWeight: 'bold' },
    resultContainer: {
        marginTop: 30,
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.glassBackground,
        borderRadius: 15,
    },
    resultValue: { color: colors.text, fontSize: 22, fontWeight: 'bold' },
});

export default PercentageCalculator;
