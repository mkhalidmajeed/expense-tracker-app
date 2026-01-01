import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, ActivityIndicator, List, Avatar } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

const screenWidth = Dimensions.get('window').width;

const StatsScreen = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await api.get('/dashboard');
            setData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const chartData = data?.category_breakdown?.map((item) => ({
        name: item.name,
        population: parseFloat(item.total),
        color: item.color,
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
    })) || [];

    return (
        <ScrollView style={styles.container}>
            <Text variant="headlineSmall" style={styles.title}>Spending Breakdown</Text>

            {chartData.length > 0 ? (
                <View style={styles.chartContainer}>
                    <PieChart
                        data={chartData}
                        width={screenWidth}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#1cc910',
                            backgroundGradientFrom: '#eff3ff',
                            backgroundGradientTo: '#efefef',
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        accessor={'population'}
                        backgroundColor={'transparent'}
                        paddingLeft={'15'}
                        absolute
                    />
                </View>
            ) : (
                <Text style={styles.emptyText}>No data to display.</Text>
            )}

            <Text variant="titleMedium" style={styles.sectionTitle}>Details</Text>

            {data?.category_breakdown?.map((item, index) => (
                <List.Item
                    key={index}
                    title={item.name}
                    right={props => <Text {...props} style={styles.amountText}>${Number(item.total).toFixed(2)}</Text>}
                    left={props => <Avatar.Icon {...props} icon="chart-pie" size={40} style={{ backgroundColor: item.color }} />}
                    style={styles.listItem}
                />
            ))}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    chartContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        marginBottom: 10,
        marginTop: 10,
        fontWeight: 'bold',
    },
    listItem: {
        backgroundColor: 'white',
        marginBottom: 5,
        borderRadius: 8,
    },
    amountText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: 'gray',
    }
});

export default StatsScreen;
