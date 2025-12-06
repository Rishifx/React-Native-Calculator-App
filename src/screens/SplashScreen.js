import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import gradients from '../theme/gradients';

const SplashScreen = ({ navigation }) => {
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const textOpacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Logo Animation - parallel animations
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
        ]).start();

        // Text Animation (delayed)
        Animated.timing(textOpacityAnim, {
            toValue: 1,
            duration: 800,
            delay: 1000,
            useNativeDriver: true,
        }).start();

        // Navigation
        const timer = setTimeout(() => {
            navigation.replace('Home');
        }, 2800);

        return () => clearTimeout(timer);
    }, []);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <LinearGradient colors={gradients.primary} style={styles.container}>
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        transform: [{ scale: scaleAnim }, { rotate: spin }],
                        opacity: opacityAnim,
                    },
                ]}
            >
                <Ionicons name="calculator" size={100} color="#FFF" />
            </Animated.View>
            <Animated.Text style={[styles.title, { opacity: textOpacityAnim }]}>
                Expo Calculator
            </Animated.Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.white,
        letterSpacing: 2,
    },
});

export default SplashScreen;
