import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StateProvider, useStateValue } from './context/StateProvider';
import reducer, { initialState } from './context/reducer';
import Landing from './pages/Landing';
import { GoogleSignin } from '@react-native-community/google-signin';
import { GOOGLE_API_KEY } from '@env';

GoogleSignin.configure({
    webClientId: GOOGLE_API_KEY,
});

const queryClient = new QueryClient();

const App = () => {
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <SafeAreaProvider>
                <QueryClientProvider client={queryClient}>
                    <NavigationContainer>
                        <Landing />
                    </NavigationContainer>
                </QueryClientProvider>
            </SafeAreaProvider>
        </StateProvider>
    );
};

export default App;
