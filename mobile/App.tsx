import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
