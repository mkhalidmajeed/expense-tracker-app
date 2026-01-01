import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, FAB, List, Avatar, ActivityIndicator, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const theme = useTheme();

    const fetchData = async () => {
        try {
            const response = await api.get('/dashboard');
            setData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    if (loading && !data) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {/* Summary Card */}
                <Card style={styles.summaryCard}>
                    <Card.Content>
                        <Text variant="titleMedium" style={{ color: 'white' }}>{data?.month} Expenses</Text>
                        <Text variant="displayMedium" style={{ color: 'white', fontWeight: 'bold' }}>
                            ${data?.total_expenses ? Number(data.total_expenses).toFixed(2) : '0.00'}
                        </Text>
                    </Card.Content>
                </Card>

                <Text variant="titleLarge" style={styles.sectionTitle}>Recent Transactions</Text>

                {data?.recent_transactions?.map((item) => (
                    <List.Item
                        key={item.id}
                        title={item.category?.name || 'Uncategorized'}
                        description={item.description || item.date}
                        left={props => <Avatar.Icon {...props} icon={item.category?.icon || 'help-circle'} style={{ backgroundColor: item.category?.color || 'gray' }} />}
                        right={props => (
                            <Text {...props} style={styles.amountText}>
                                -${Number(item.amount).toFixed(2)}
                            </Text>
                        )}
                        style={styles.listItem}
                    />
                ))}

                {(!data?.recent_transactions || data.recent_transactions.length === 0) && (
                    <Text style={styles.emptyText}>No recent transactions.</Text>
                )}

            </ScrollView>

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('AddExpense')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 80,
    },
    summaryCard: {
        backgroundColor: '#6200ee',
        marginBottom: 20,
        borderRadius: 12,
    },
    sectionTitle: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    listItem: {
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
    },
    amountText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#d32f2f',
        marginRight: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200ee',
    },
});

export default HomeScreen;
