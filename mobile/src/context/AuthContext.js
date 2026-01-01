import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStorageData();
    }, []);

    const loadStorageData = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            const storedUser = await AsyncStorage.getItem('user');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                // Optionally validate token with API here
            }
        } catch (e) {
            console.error('Failed to load user data', e);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            const { access_token, user } = response.data;

            setToken(access_token);
            setUser(user);
            await AsyncStorage.setItem('token', access_token);
            await AsyncStorage.setItem('user', JSON.stringify(user));
            return true;
        } catch (error) {
            console.error(error.response?.data || error.message);
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await api.post('/register', { name, email, password });
            const { access_token, user } = response.data;

            setToken(access_token);
            setUser(user);
            await AsyncStorage.setItem('token', access_token);
            await AsyncStorage.setItem('user', JSON.stringify(user));
            return true;
        } catch (error) {
            console.error(error.response?.data || error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (e) {
            // Ignore error on logout
        }

        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
