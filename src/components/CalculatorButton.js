import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';
import gradients from '../theme/gradients';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = width / 4 - 20;

const CalculatorButton = ({ label, onPress, style, textStyle, isSecondary, isWide, isOperator, icon }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[
                styles.container,
                isWide && styles.wideContainer,
                style
            ]}
        >
            <LinearGradient
                colors={isSecondary ? [colors.danger, colors.danger] : isOperator ? [colors.accent, colors.accentDark] : gradients.buttonGlass}
                style={[styles.gradient, isWide && styles.wideGradient]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {icon ? icon : <Text style={[styles.text, isOperator && styles.operatorText, textStyle]}>{label}</Text>}
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        margin: 8,
        shadowColor: colors.buttonShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 6,
    },
    wideContainer: {
        width: BUTTON_SIZE * 2 + 16,
        borderRadius: 40,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BUTTON_SIZE / 2,
        borderWidth: 1.5,
        borderColor: colors.glassBorder,
        backgroundColor: 'transparent',
    },
    wideGradient: {
        paddingLeft: 20,
        alignItems: 'flex-start',
        borderRadius: 40,
    },
    text: {
        color: colors.text,
        fontSize: 28,
        fontFamily: 'System',
        fontWeight: '500',
    },
    operatorText: {
        fontWeight: 'bold',
        color: colors.white,
    },
});

export default CalculatorButton;
