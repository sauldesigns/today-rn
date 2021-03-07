import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MAIN_NAVIGATION_TABS } from './constants/navigation';
import {
    HomeNavigation,
    SearchNavigation,
    AccountNavigation,
} from './navigation/navigation';
import { black } from './constants/colors';

const queryClient = new QueryClient();

const TabStack = createBottomTabNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <TabStack.Navigator
                        tabBarOptions={{ activeTintColor: black }}
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
