import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';
import { calculateAge } from '../utils/calculatorFunctions';

const AgeCalculator = () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [age, setAge] = useState(null);

    const handleCalculate = () => {
        if (!day || !month || !year) return;
        const dob = `${year}-${month}-${day}`;
        const res = calculateAge(dob);
        setAge(res);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Enter Date of Birth</Text>
            <View style={styles.row}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Day</Text>
                    <TextInput
                        style={styles.input}
                        value={day}
                        onChangeText={setDay}
                        keyboardType="numeric"
                        placeholder="DD"
                        placeholderTextColor="#ccc"
                        maxLength={2}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Month</Text>
                    <TextInput
                        style={styles.input}
                        value={month}
                        onChangeText={setMonth}
                        keyboardType="numeric"
                        placeholder="MM"
                        placeholderTextColor="#ccc"
                        maxLength={2}
                    />
                </View>
                <View style={[styles.inputGroup, { flex: 2 }]}>
                    <Text style={styles.label}>Year</Text>
                    <TextInput
                        style={styles.input}
                        value={year}
                        onChangeText={setYear}
                        keyboardType="numeric"
                        placeholder="YYYY"
                        placeholderTextColor="#ccc"
                        maxLength={4}
                    />
                </View>
            </View>

            <TouchableOpacity onPress={handleCalculate} style={{ marginTop: 30 }}>
                <LinearGradient colors={[colors.primaryStart, colors.primaryEnd]} style={styles.calculateBtn}>
                    <Text style={styles.btnText}>Calculate Age</Text>
                </LinearGradient>
            </TouchableOpacity>

            {age && (
                <View style={styles.resultContainer}>
                    <View style={styles.ageBox}>
                        <Text style={styles.ageValue}>{age.years}</Text>
                        <Text style={styles.ageLabel}>Years</Text>
                    </View>
                    <View style={styles.ageBox}>
                        <Text style={styles.ageValue}>{age.months}</Text>
                        <Text style={styles.ageLabel}>Months</Text>
                    </View>
                    <View style={styles.ageBox}>
                        <Text style={styles.ageValue}>{age.days}</Text>
                        <Text style={styles.ageLabel}>Days</Text>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { color: colors.text, fontSize: 18, marginBottom: 20, textAlign: 'center' },
    row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
    inputGroup: { flex: 1 },
    label: { color: colors.text, fontSize: 14, marginBottom: 5 },
    input: {
        backgroundColor: colors.displayBackground,
        color: colors.text,
        padding: 15,
        borderRadius: 10,
        fontSize: 18,
        textAlign: 'center'
    },
    calculateBtn: { padding: 15, borderRadius: 10, alignItems: 'center' },
    btnText: { color: colors.white, fontSize: 18, fontWeight: 'bold' },
    resultContainer: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    ageBox: {
        backgroundColor: colors.glassBackground,
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        width: '30%',
        borderWidth: 1,
        borderColor: colors.glassBorder
    },
    ageValue: { color: colors.primaryEnd, fontSize: 32, fontWeight: 'bold' },
    ageLabel: { color: colors.text, fontSize: 14 },
});

export default AgeCalculator;
