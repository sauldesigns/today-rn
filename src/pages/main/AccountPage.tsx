import { useNavigation, useScrollToTop } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import UserDetails from '../../components/profile/UserDetails';
import { ACCOUNT_NAVIGATION } from '../../constants/navigation';
import { useStateValue } from '../../context/StateProvider';
import { User } from '../../models/user';
import { InAppBrowserAPI } from '../../services/in-app-browser';
import { FirebaseAPI } from '../../services/firebase';
import { privacy_policy_link } from '../../constants/links';
import { actionTypes } from '../../context/reducer';
import Snackbar from 'react-native-snackbar';
import { black } from '../../constants/colors';
import AsyncStorage from '@react-native-community/async-storage';
import { View } from '@motify/components';
import { AnimatePresence } from 'framer-motion';
import SettingsListItemCheckbox from '../../components/list/SettingsListItemCheckbox';
import SettingsListItem from '../../components/list/SettingsListItem';

export interface SettingsListItemValue {
    title: string;
    icon: string;
    onPress: CallableFunction;
    onLongPress?: CallableFunction;
}

const AccountPage = () => {
    const ref = React.useRef(null);
    const navigation = useNavigation();
    const [{ user }] = useStateValue();
    const userObj: User = user;
    const inAppBrowserAPI = new InAppBrowserAPI();
    const firebaseAPI = new FirebaseAPI();
    const [{ darkMode }, dispatch] = useStateValue();

    useScrollToTop(ref);

    const settings_list: SettingsListItemValue[] = [
        {
            title: 'Edit Profile',
            icon: 'edit',
            onPress: () => {
                navigation.navigate(ACCOUNT_NAVIGATION.EditProfile);
            },
        },
        {
            title: 'Privacy Policy',
            icon: 'file',
            onPress: async () => {
                try {
                    await inAppBrowserAPI.openLink(privacy_policy_link);
                } catch (err) {
                    Snackbar.show({
                        text: 'An error occured.',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: 'red',
                    });
                }
            },
        },
        {
            title: 'Reset Password',
            icon: 'lock',
            onPress: async () => {
                try {
                    await firebaseAPI.resetPassword();
                    Snackbar.show({
                        text: 'A reset link has been sent to your email.',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: 'green',
                    });
                } catch (err) {
                    Snackbar.show({
                        text: 'An error occured.',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: 'red',
                    });
                }
            },
        },
        {
            title: 'Toggle Dark Mode',
            icon: 'moon-o',
            onPress: async () => {
                try {
                    await AsyncStorage.setItem(
                        'darkMode',
                        JSON.stringify(!darkMode),
                    );

                    dispatch({
                        type: actionTypes.SET_DARKMODE,
                        darkMode: !darkMode,
                    });
                } catch (err) {
                    Snackbar.show({
                        text: 'An error occured.',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: 'red',
                    });
                }
            },
            onLongPress: async () => {
                try {
                    await AsyncStorage.removeItem('darkMode');
                    Snackbar.show({
                        text: 'Theme has been set to dynamic.',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: 'green',
                    });
                    dispatch({
                        type: actionTypes.SET_DARKMODE,
                        darkMode: !darkMode,
                    });
                } catch (err) {
                    Snackbar.show({
                        text: 'An error occured.',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: 'red',
                    });
                }
            },
        },
        {
            title: 'Sign Out',
            icon: 'sign-out',
            onPress: async () => {
                try {
                    await firebaseAPI.signOut();
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: null,
                    });
                } catch (err) {
                    Snackbar.show({
                        text: 'An error occured.',
                        duration: Snackbar.LENGTH_LONG,
                    });
                }
            },
        },
    ];

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: black }} />
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" animated />
                <View
                    style={{
                        // paddingTop: 18,
                        backgroundColor: black,
                        paddingBottom: 26,
                    }}>
                    <UserDetails
                        username={userObj?.username ?? ''}
                        location={userObj?.bio ?? ''}
                    />
                </View>
                <FlatList
                    ref={ref}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    data={settings_list}
                    renderItem={({ item, index }) => {
                        return (
                            <AnimatePresence exitBeforeEnter>
                                {item?.title === 'Toggle Dark Mode' ? (
                                    <SettingsListItemCheckbox
                                        item={item}
                                        index={index}
                                        darkMode={darkMode}
                                    />
                                ) : (
                                    <SettingsListItem
                                        item={item}
                                        index={index}
                                    />
                                )}
                            </AnimatePresence>
                        );
                    }}
                />
            </SafeAreaView>
        </>
    );
};

export default AccountPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
