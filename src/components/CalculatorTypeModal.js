import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import colors from '../theme/colors';

const TYPES = [
    { id: 'STANDARD', label: 'Standard Calculator' },
    { id: 'SCIENTIFIC', label: 'Scientific Calculator' },
    { id: 'GST', label: 'GST Calculator' },
    { id: 'EMI', label: 'EMI Calculator' },
    { id: 'PERCENTAGE', label: 'Percentage Calculator' },
    { id: 'AGE', label: 'Age Calculator' },
    { id: 'BMI', label: 'BMI Calculator' },
    { id: 'CURRENCY', label: 'Currency Converter' },
];

const CalculatorTypeModal = ({ visible, onClose, onSelect, currentType }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.item,
                currentType === item.id && styles.selectedItem
            ]}
            onPress={() => {
                onSelect(item.id);
                onClose();
            }}
        >
            <Text style={[styles.itemText, currentType === item.id && styles.selectedItemText]}>
                {item.label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <View style={styles.header}>
                                <Text style={styles.title}>Select Calculator</Text>
                            </View>
                            <FlatList
                                data={TYPES}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={styles.listContent}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#1E1E1E', // Dark background for modal
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '70%',
        paddingBottom: 20,
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.glassBorder,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
    },
    listContent: {
        padding: 16,
    },
    item: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    selectedItem: {
        backgroundColor: colors.primaryStart,
    },
    itemText: {
        fontSize: 16,
        color: colors.text,
    },
    selectedItemText: {
        fontWeight: 'bold',
    },
});

export default CalculatorTypeModal;
