import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons, HelperText, ActivityIndicator } from 'react-native-paper';
import { format } from 'date-fns';
import api from '../services/api';

const AddExpenseScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
            if (response.data.length > 0) {
                // Pre-select first category or let user choose. 
                // Don't auto select to force user choice.
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to load categories');
        } finally {
            setLoadingCategories(false);
        }
    };

    const handleSave = async () => {
        if (!amount || !selectedCategory) {
            Alert.alert('Error', 'Please enter amount and select a category');
            return;
        }

        setLoading(true);
        try {
            await api.post('/expenses', {
                amount: parseFloat(amount),
                description,
                category_id: selectedCategory,
                date: format(new Date(), 'yyyy-MM-dd'),
            });
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to save expense');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <TextInput
                    label="Amount"
                    value={amount}
                    onChangeText={setAmount}
                    mode="outlined"
                    keyboardType="numeric"
                    style={styles.input}
                    left={<TextInput.Affix text="$" />}
                />

                <TextInput
                    label="Description"
                    value={description}
                    onChangeText={setDescription}
                    mode="outlined"
                    style={styles.input}
                    multiline
                />

                <Text variant="titleMedium" style={styles.label}>Category</Text>

                {loadingCategories ? (
                    <ActivityIndicator style={{ marginTop: 20 }} />
                ) : (
                    <View style={styles.categoryGrid}>
                        {categories.map((cat) => (
                            <Button
                                key={cat.id}
                                mode={selectedCategory === cat.id ? 'contained' : 'outlined'}
                                onPress={() => setSelectedCategory(cat.id)}
                                style={styles.categoryButton}
                                contentStyle={{ height: 40 }}
                                labelStyle={{ fontSize: 12 }}
                                compact
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </View>
                )}

                <Button
                    mode="contained"
                    onPress={handleSave}
                    loading={loading}
                    style={styles.saveButton}
                >
                    Save Expense
                </Button>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white',
    },
    label: {
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    categoryButton: {
        margin: 4,
        borderRadius: 20,
    },
    saveButton: {
        marginTop: 20,
        paddingVertical: 5,
    },
});

export default AddExpenseScreen;
