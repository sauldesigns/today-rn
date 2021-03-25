import React, { useEffect, useState } from 'react';
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StateProvider, useStateValue } from './context/StateProvider';
import reducer, { actionTypes, initialState } from './context/reducer';
import Landing from './pages/Landing';
import { GoogleSignin } from '@react-native-community/google-signin';
import { GOOGLE_API_KEY } from '@env';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import AsyncStorage from '@react-native-community/async-storage';
import { color } from 'react-native-reanimated';
import ThemePage from './ThemePage';

GoogleSignin.configure({
    webClientId: GOOGLE_API_KEY,
});

const queryClient = new QueryClient();

const App = () => {
    admob()
        .setRequestConfiguration({
            // Update all future requests suitable for parental guidance
            maxAdContentRating: MaxAdContentRating.PG,

            // Indicates that you want your content treated as child-directed for purposes of COPPA.
            tagForChildDirectedTreatment: true,

            // Indicates that you want the ad request to be handled in a
            // manner suitable for users under the age of consent.
            tagForUnderAgeOfConsent: true,
        })
        .then(() => {
            // Request config successfully set!
        });

    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <SafeAreaProvider>
                <QueryClientProvider client={queryClient}>
                    <ThemePage />
                </QueryClientProvider>
            </SafeAreaProvider>
        </StateProvider>
    );
};

export default App;
