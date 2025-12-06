import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import gradients from '../theme/gradients';

// Import Calculators
import StandardCalculator from '../calculators/StandardCalculator';
import ScientificCalculator from '../calculators/ScientificCalculator';
import GstCalculator from '../calculators/GstCalculator';
import EmiCalculator from '../calculators/EmiCalculator';
import PercentageCalculator from '../calculators/PercentageCalculator';
import AgeCalculator from '../calculators/AgeCalculator';
import BmiCalculator from '../calculators/BmiCalculator';
import CurrencyCalculator from '../calculators/CurrencyCalculator';

import CalculatorTypeModal from '../components/CalculatorTypeModal';

const HomeScreen = () => {
    const [currentType, setCurrentType] = useState('STANDARD');
    const [modalVisible, setModalVisible] = useState(false);

    const getCalculatorComponent = () => {
        switch (currentType) {
            case 'STANDARD': return <StandardCalculator />;
            case 'SCIENTIFIC': return <ScientificCalculator />;
            case 'GST': return <GstCalculator />;
            case 'EMI': return <EmiCalculator />;
            case 'PERCENTAGE': return <PercentageCalculator />;
            case 'AGE': return <AgeCalculator />;
            case 'BMI': return <BmiCalculator />;
            case 'CURRENCY': return <CurrencyCalculator />;
            default: return <StandardCalculator />;
        }
    };

    const getTitle = () => {
        switch (currentType) {
            case 'STANDARD': return 'Standard';
            case 'SCIENTIFIC': return 'Scientific';
            case 'GST': return 'GST Calculator';
            case 'EMI': return 'EMI Calculator';
            case 'PERCENTAGE': return 'Percentage';
            case 'AGE': return 'Age Calculator';
            case 'BMI': return 'BMI Calculator';
            case 'CURRENCY': return 'Currency';
            default: return 'Calculator';
        }
    };

    return (
        <LinearGradient colors={gradients.primary} style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <View style={{ width: 40 }} />
                    <Text style={styles.headerTitle}>{getTitle()}</Text>
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={styles.menuBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="grid-outline" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    {getCalculatorComponent()}
                </View>

                <CalculatorTypeModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSelect={setCurrentType}
                    currentType={currentType}
                />
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        letterSpacing: 1,
    },
    menuBtn: {
        padding: 12,
        backgroundColor: colors.secondaryButton,
        borderRadius: 12,
        elevation: 5,
        zIndex: 999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    content: {
        flex: 1,
    },
});

export default HomeScreen;
