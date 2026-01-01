import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Surface } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            await register(name, email, password);
        } catch (error) {
            alert('Registration failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Surface style={styles.surface} elevation={4}>
                <Text variant="headlineMedium" style={styles.title}>Create Account</Text>

                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={setName}
                    mode="outlined"
                    style={styles.input}
                />

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
                    onPress={handleRegister}
                    loading={loading}
                    style={styles.button}
                >
                    Sign Up
                </Button>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Already have an account? Login</Text>
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

export default RegisterScreen;
