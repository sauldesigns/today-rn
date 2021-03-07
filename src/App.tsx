import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
    ACCOUNT_NAVIGATION,
    HOME_NAVIGATION,
    MAIN_NAVIGATION_TABS,
    SEARCH_NAVIGATION,
} from './constants/navigation';
import AccountInformationPage from './pages/AccountInformationPage';
import AccountPage from './pages/AccountPage';
import EditProfilePage from './pages/EditProfilePage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';

const queryClient = new QueryClient();

const App = () => {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <TabStack.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ color, size }) => {
                                let iconName: string = '';

                                if (route.name === MAIN_NAVIGATION_TABS.Home) {
                                    iconName = 'home';
                                } else if (
                                    route.name === MAIN_NAVIGATION_TABS.Account
                                ) {
                                    iconName = 'person';
                                } else if (
                                    route.name === MAIN_NAVIGATION_TABS.Search
                                ) {
                                    iconName = 'search';
                                }

                                // You can return any component that you like here!
                                return (
                                    <Icon
                                        type="fontawesome"
                                        name={iconName}
                                        size={size}
                                        color={color}
                                    />
                                );
                            },
                        })}>
                        <TabStack.Screen
                            name={MAIN_NAVIGATION_TABS.Home}
                            component={HomeNavigation}
                        />
                        <TabStack.Screen
                            name={MAIN_NAVIGATION_TABS.Search}
                            component={SearchNavigation}
                        />
                        <TabStack.Screen
                            name={MAIN_NAVIGATION_TABS.Account}
                            component={AccountNavigation}
                        />
                    </TabStack.Navigator>
                </NavigationContainer>
            </QueryClientProvider>
        </SafeAreaProvider>
    );
};

export default App;

const HomeStack = createStackNavigator();

const HomeNavigation = () => {
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

const AccountStack = createStackNavigator();

const AccountNavigation = () => {
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

const SearchStack = createStackNavigator();

const SearchNavigation = () => {
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

const TabStack = createBottomTabNavigator();
