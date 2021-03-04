import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import HomePage from './pages/HomePage';

const queryClient = new QueryClient();

const App = () => {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <HomeStack.Navigator>
                        <HomeStack.Screen
                            name="Home"
                            component={HomePage}
                            options={{headerShown: false}}></HomeStack.Screen>
                    </HomeStack.Navigator>
                </NavigationContainer>
            </QueryClientProvider>
        </SafeAreaProvider>
    );
};

export default App;

const HomeStack = createStackNavigator();

const styles = StyleSheet.create({});
