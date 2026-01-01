import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import StatsScreen from '../screens/StatsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Stats') iconName = 'pie-chart';
                    return <FontAwesome name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6200ee',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Expense Tracker' }} />
            <Tab.Screen name="Stats" component={StatsScreen} />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    const { token, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#6200ee" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {token ? (
                    <>
                        <Stack.Screen
                            name="Main"
                            component={HomeTabs}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="AddExpense"
                            component={AddExpenseScreen}
                            options={{ title: 'Add Expense' }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
