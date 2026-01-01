import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace localhost with 10.0.2.2 for Android Emulator, or your machine IP for real device
// For real device, use terminal 'ipconfig' to find your IPv4
const API_URL = 'http://10.0.2.2:8000/api'; 

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
