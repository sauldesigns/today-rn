import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StateProvider } from './context/StateProvider';
import reducer, { initialState } from './context/reducer';
import { GoogleSignin } from '@react-native-community/google-signin';
import { GOOGLE_API_KEY } from '@env';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
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
