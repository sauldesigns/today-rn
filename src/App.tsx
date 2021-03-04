import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

const queryClient = new QueryClient();

const App = () => {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <TabStack.Navigator
                        screenOptions={({route}) => ({
                            tabBarIcon: ({focused, color, size}) => {
                                let iconName: string = '';

                                if (route.name === 'Home') {
                                    iconName = 'home';
                                } else if (route.name === 'Account') {
                                    iconName = 'person';
                                } else if (route.name === 'Search') {
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
                            name="Home"
                            component={HomeNavigation}
                        />
                        <TabStack.Screen
                            name="Search"
                            component={SearchNavigation}
                        />
                        <TabStack.Screen
                            name="Account"
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
                name="Home"
                component={HomePage}
                options={{headerShown: false}}
            />
        </HomeStack.Navigator>
    );
};

const AccountStack = createStackNavigator();

const AccountNavigation = () => {
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen
                name="Account"
                component={AccountPage}
                options={{headerShown: false}}
            />
        </AccountStack.Navigator>
    );
};

const SearchStack = createStackNavigator();

const SearchNavigation = () => {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen
                name="Search"
                component={SearchPage}
                options={{headerShown: false}}
            />
        </SearchStack.Navigator>
    );
};

const TabStack = createBottomTabNavigator();
