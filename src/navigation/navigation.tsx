import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import {
    ACCOUNT_NAVIGATION,
    AUTH_NAVIGATION,
    HOME_NAVIGATION,
    SEARCH_NAVIGATION,
    SETUSER_NAVIGATION,
} from '../constants/navigation';
import AccountInformationPage from '../pages/main/account/AccountInformationPage';
import AccountPage from '../pages/main/AccountPage';
import EditProfilePage from '../pages/main/account/EditProfilePage';
import HomePage from '../pages/main/HomePage';
import SearchPage from '../pages/main/SearchPage';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import SetUserInfo from '../pages/auth/SetUserInfo';
import { StyleSheet, View } from 'react-native';
import { black } from '../constants/colors';
import ForgotPassword from '../pages/auth/ForgotPassword';

//------------- AUTH ROUTES -----------------------------

const AuthStack = createStackNavigator();

export const AuthNavigation = () => {
    return (
        <AuthStack.Navigator
            initialRouteName={AUTH_NAVIGATION.Login}
            mode="modal"
            screenOptions={(route) => {
                const routeName = route.route.name;
                // if (!isAndroid) {
                if (routeName === 'Login') {
                    return {
                        cardOverlayEnabled: true,
                        gestureEnabled: true,
                        useNativeDrivers: true,
                    };
                }
                // else if (isAndroid) {
                //     return {
                //         cardOverlayEnabled: true,
                //         gestureEnabled: true,
                //         useNativeDrivers: true,
                //         ...TransitionPresets.SlideFromRightIOS,
                //     };
                // }
                return {
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    useNativeDrivers: true,
                    ...TransitionPresets.ModalPresentationIOS,
                };
                // }
                // return {};
            }}>
            <AuthStack.Screen
                name={AUTH_NAVIGATION.Login}
                component={Login}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name={AUTH_NAVIGATION.SignUp}
                component={SignUp}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name={AUTH_NAVIGATION.ForgotPassword}
                component={ForgotPassword}
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
    );
};

//------------- SET USER ROUTES -----------------------------

const SetUserStack = createStackNavigator();

export const SetUserNavigation = () => {
    return (
        <SetUserStack.Navigator
            initialRouteName={SETUSER_NAVIGATION.SetUserInfo}
            mode="modal"
            screenOptions={(route) => {
                const routeName = route.route.name;
                // if (!isAndroid) {
                if (routeName === SETUSER_NAVIGATION.SetUserInfo) {
                    return {
                        cardOverlayEnabled: true,
                        gestureEnabled: true,
                        useNativeDrivers: true,
                    };
                }
                // else if (isAndroid) {
                //     return {
                //         cardOverlayEnabled: true,
                //         gestureEnabled: true,
                //         useNativeDrivers: true,
                //         ...TransitionPresets.SlideFromRightIOS,
                //     };
                // }
                return {
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    useNativeDrivers: true,
                    ...TransitionPresets.ModalPresentationIOS,
                };
                // }
                // return {};
            }}>
            <SetUserStack.Screen
                name={SETUSER_NAVIGATION.SetUserInfo}
                component={SetUserInfo}
                options={{ headerShown: false }}
            />
        </SetUserStack.Navigator>
    );
};

//------------- HOME ROUTES -----------------------------
const HomeStack = createStackNavigator();

export const HomeNavigation = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name={HOME_NAVIGATION.Home}
                component={HomePage}
                options={{ headerShown: false }}
            />
        </HomeStack.Navigator>
    );
};

//------------- SEARCH ROUTES -----------------------------

const SearchStack = createStackNavigator();

export const SearchNavigation = () => {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen
                name={SEARCH_NAVIGATION.Search}
                component={SearchPage}
                options={{ headerShown: false }}
            />
        </SearchStack.Navigator>
    );
};

//------------- ACCOUNT ROUTES -----------------------------

const AccountStack = createStackNavigator();

export const AccountNavigation = () => {
    return (
        <AccountStack.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerPressColorAndroid: 'white',
                headerTitleStyle: { color: 'white' },
                headerBackground: () => (
                    <View style={{ flex: 1, backgroundColor: black }} />
                ),
            }}>
            <AccountStack.Screen
                name={ACCOUNT_NAVIGATION.Account}
                component={AccountPage}
                options={{ headerShown: false }}
            />
            <AccountStack.Screen
                name={ACCOUNT_NAVIGATION.EditProfile}
                component={EditProfilePage}
            />
            <AccountStack.Screen
                name={ACCOUNT_NAVIGATION.AccountInformation}
                component={AccountInformationPage}
            />
        </AccountStack.Navigator>
    );
};
