import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';
import { calculateBMI } from '../utils/calculatorFunctions';

const BmiCalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const res = calculateBMI(weight, height);
        setResult(res);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholder="Ex. 70"
                placeholderTextColor="#ccc"
            />

            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                placeholder="Ex. 175"
                placeholderTextColor="#ccc"
            />

            <TouchableOpacity onPress={handleCalculate} style={{ marginTop: 20 }}>
                <LinearGradient colors={[colors.primaryStart, colors.primaryEnd]} style={styles.calculateBtn}>
                    <Text style={styles.btnText}>Calculate BMI</Text>
                </LinearGradient>
            </TouchableOpacity>

            {result && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultLabel}>Your BMI</Text>
                    <Text style={styles.bmiValue}>{result.bmi}</Text>
                    <View style={[styles.categoryBadge,
                    result.category === 'Normal' ? styles.bgSuccess :
                        result.category === 'Overweight' ? styles.bgWarning : styles.bgDanger
                    ]}>
                        <Text style={styles.categoryText}>{result.category}</Text>
                    </View>
                </View>
            )}
        </View>
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
    calculateBtn: { padding: 15, borderRadius: 10, alignItems: 'center' },
    btnText: { color: colors.white, fontSize: 18, fontWeight: 'bold' },
    resultContainer: {
        marginTop: 40,
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.glassBackground,
        borderRadius: 15,
    },
    resultLabel: { color: colors.text, fontSize: 18 },
    bmiValue: { color: colors.text, fontSize: 48, fontWeight: 'bold', marginVertical: 10 },
    categoryBadge: { paddingHorizontal: 20, paddingVertical: 5, borderRadius: 20 },
    categoryText: { color: colors.white, fontWeight: 'bold' },
    bgSuccess: { backgroundColor: colors.success },
    bgWarning: { backgroundColor: colors.warning },
    bgDanger: { backgroundColor: colors.danger },
});

export default BmiCalculator;
