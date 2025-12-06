import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

const Display = ({ input, result }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.inputText} numberOfLines={1} adjustsFontSizeToFit>
                {input || ''}
            </Text>
            <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit>
                {result !== '' ? result : ''}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        minHeight: 150,
        backgroundColor: colors.displayBackground,
        marginTop: 80,
        marginBottom: 10,
        borderRadius: 20,
        marginHorizontal: 16,
    },
    inputText: {
        color: colors.text,
        fontSize: 24,
        marginBottom: 8,
        opacity: 0.7,
        textAlign: 'right',
    },
    resultText: {
        color: colors.text,
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'right',
    },
});

export default Display;
