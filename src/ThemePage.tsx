import AsyncStorage from '@react-native-community/async-storage';
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import { actionTypes } from './context/reducer';
import { useStateValue } from './context/StateProvider';
import Landing from './pages/Landing';

const ThemePage = () => {
    const [{ darkMode }, dispatch] = useStateValue();
    const colorScheme = useColorScheme();
    useEffect(() => {
        const getTheme = async () => {
            let result = await AsyncStorage.getItem('darkMode');

            if (result === null) {
                dispatch({
                    type: actionTypes.SET_DARKMODE,
                    darkMode: colorScheme === 'dark',
                });
            } else {
                result = JSON.parse(result);
                dispatch({
                    type: actionTypes.SET_DARKMODE,
                    darkMode: result,
                });
            }
        };
        getTheme();
    }, [colorScheme]);

    return (
        <ThemeProvider useDark={darkMode}>
            <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
                <Landing />
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default ThemePage;

const styles = StyleSheet.create({});
