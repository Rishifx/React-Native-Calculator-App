import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CalculatorButton from '../components/CalculatorButton';
import Display from '../components/Display';
import { evaluateExpression } from '../utils/calculatorFunctions';

const StandardCalculator = () => {
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
            if (!input) return;
            const res = evaluateExpression(input);
            setResult(res);
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
        [{ label: '7' }, { label: '8' }, { label: '9' }, { label: '×', type: 'op' }],
        [{ label: '4' }, { label: '5' }, { label: '6' }, { label: '-', type: 'op' }],
        [{ label: '1' }, { label: '2' }, { label: '3' }, { label: '+', type: 'op' }],
        [{ label: '00' }, { label: '0' }, { label: '.' }, { label: '=', type: 'op' }],
    ];

    return (
        <View style={styles.container}>
            <Display input={input} result={result} />
            <View style={styles.keypad}>
                {rows.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((btn, btnIndex) => (
                            <CalculatorButton
                                key={btnIndex}
                                label={btn.label}
                                onPress={() => handlePress(btn.val || btn.label)}
                                isSecondary={btn.type === 'secondary'}
                                isOperator={btn.type === 'op'}
                            />
                        ))}
                    </View>
                ))}
            </View>
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
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 8,
    },
});

export default StandardCalculator;
