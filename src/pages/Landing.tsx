import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { black } from '../constants/colors';
import { MAIN_NAVIGATION_TABS } from '../constants/navigation';
import { useStateValue } from '../context/StateProvider';
import {
    AccountNavigation,
    AuthNavigation,
    HomeNavigation,
    SearchNavigation,
} from '../navigation/navigation';
import { actionTypes } from '../context/reducer';
import { TransitionPresets } from '@react-navigation/stack';

const TabStack = createBottomTabNavigator();

const Landing = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

    const [, dispatch] = useStateValue();
    const [needsUserInfo, setNeedsUserInfo] = useState(false);
    const isAndroid = Platform.OS === 'android';

    // Handle user state changes
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
        setUser(user);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return () => subscriber(); // unsubscribe on unmount
    }, []);

    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .doc(user?.uid)
            .onSnapshot((value) => {
                if (value?.data()) {
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: value?.data(),
                    });
                    setNeedsUserInfo(false);
                } else {
                    setNeedsUserInfo(true);
                }
                if (initializing) setInitializing(false);
            });

        return () => subscriber();
    }, [user]);

    if (initializing)
        return (
            <View
                style={{
                    backgroundColor: black,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{ color: 'white' }}>Loading</Text>
            </View>
        );

    if (!user) {
        return <AuthNavigation />;
    }

    return (
        <TabStack.Navigator
            tabBarOptions={{ activeTintColor: black }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: string = '';

                    if (route.name === MAIN_NAVIGATION_TABS.Home) {
                        iconName = 'home';
                    } else if (route.name === MAIN_NAVIGATION_TABS.Account) {
                        iconName = 'person';
                    } else if (route.name === MAIN_NAVIGATION_TABS.Search) {
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
    );
};

export default Landing;

const styles = StyleSheet.create({});
