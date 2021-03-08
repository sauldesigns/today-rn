import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import {
    ACCOUNT_NAVIGATION,
    HOME_NAVIGATION,
    SEARCH_NAVIGATION,
} from '../constants/navigation';
import AccountInformationPage from '../pages/AccountInformationPage';
import AccountPage from '../pages/AccountPage';
import EditProfilePage from '../pages/EditProfilePage';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import SettingsPage from '../pages/SettingsPage';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

//
const AuthStack = createStackNavigator();

export const AuthNavigation = () => {
    return (
        <AuthStack.Navigator
            initialRouteName="Login"
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
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
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
        <AccountStack.Navigator>
            <AccountStack.Screen
                name={ACCOUNT_NAVIGATION.Account}
                component={AccountPage}
                options={{ headerShown: false }}
            />
            <AccountStack.Screen
                name={ACCOUNT_NAVIGATION.Settings}
                component={SettingsPage}
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
