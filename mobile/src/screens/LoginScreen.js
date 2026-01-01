import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Surface } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login(email, password);
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Surface style={styles.surface} elevation={4}>
                <Text variant="headlineMedium" style={styles.title}>Welcome Back</Text>

                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                />

                <Button
                    mode="contained"
                    onPress={handleLogin}
                    loading={loading}
                    style={styles.button}
                >
                    Login
                </Button>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>Don't have an account? Sign up</Text>
                </TouchableOpacity>
            </Surface>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    surface: {
        padding: 20,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#6200ee',
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white',
    },
    button: {
        marginTop: 10,
        paddingVertical: 5,
    },
    link: {
        marginTop: 15,
        textAlign: 'center',
        color: '#6200ee',
    },
});

export default LoginScreen;
