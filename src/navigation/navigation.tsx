import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
