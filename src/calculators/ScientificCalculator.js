import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CalculatorButton from '../components/CalculatorButton';
import Display from '../components/Display';
import { evaluateExpression } from '../utils/calculatorFunctions';

const ScientificCalculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handlePress = (val) => {
        if (val === 'AC') {
            setInput('');
            setResult('');
        } else if (val === 'C' || val === '⌫') {
            if (input.length > 0) setInput(prev => prev.slice(0, -1));
            else setResult('');
        } else if (val === '=') {
            const res = evaluateExpression(input);
            setResult(res);
        } else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(val)) {
            setInput(prev => prev + val + '(');
        } else {
            setInput((prev) => prev + val);
        }
    };

    const rows = [
        [
            { label: 'AC', type: 'secondary' },
            { label: 'C', type: 'secondary' },
            { label: '⌫', type: 'secondary' },
            { label: '÷', type: 'op' }
        ],
        [{ label: 'sin' }, { label: 'cos' }, { label: 'tan' }, { label: 'log' }],
        [{ label: 'ln' }, { label: 'sqrt' }, { label: '^', val: '^' }, { label: '(', val: '(' }],
        [{ label: ')', val: ')' }, { label: 'π', val: 'π' }, { label: 'e', val: 'e' }, { label: '!', val: '!' }],
        [{ label: '7' }, { label: '8' }, { label: '9' }, { label: '×', type: 'op' }],
        [{ label: '4' }, { label: '5' }, { label: '6' }, { label: '-', type: 'op' }],
        [{ label: '1' }, { label: '2' }, { label: '3' }, { label: '+', type: 'op' }],
        [{ label: '00' }, { label: '0' }, { label: '.' }, { label: '=', type: 'op' }],
    ];

    return (
        <View style={styles.container}>
            <Display input={input} result={result} />
            <ScrollView contentContainerStyle={styles.keypad} showsVerticalScrollIndicator={false}>
                {rows.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((btn, btnIndex) => (
                            <CalculatorButton
                                key={btnIndex}
                                label={btn.label}
                                onPress={() => handlePress(btn.val || btn.label)}
                                isSecondary={btn.type === 'secondary'}
                                isOperator={btn.type === 'op'}
                                textStyle={{ fontSize: btn.label.length > 2 ? 18 : 24 }}
                                style={{ width: 70, height: 70, margin: 5, borderRadius: 35 }}
                            />
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keypad: {
        padding: 10,
        justifyContent: 'flex-end',
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 8,
    },
});

export default ScientificCalculator;
