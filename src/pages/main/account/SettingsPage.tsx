import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import { privacy_policy_link } from '../../../constants/links';
import { ACCOUNT_NAVIGATION } from '../../../constants/navigation';
import { actionTypes } from '../../../context/reducer';
import { useStateValue } from '../../../context/StateProvider';
import { FirebaseAPI } from '../../../services/firebase';
import { InAppBrowserAPI } from '../../../services/in-app-browser';

interface listItem {
    title: string;
    icon: string;
    onPress: CallableFunction;
}

const SettingsPage = () => {
    const firebaseAPI = new FirebaseAPI();
    const inAppBrowserAPI = new InAppBrowserAPI();
    const navigation = useNavigation();
    const [_, dispatch] = useStateValue();
    const list: listItem[] = [
        {
            title: 'Edit Profile',
            icon: 'edit',
            onPress: () => {
                navigation.navigate(ACCOUNT_NAVIGATION.EditProfile);
            },
        },
        {
            title: 'Privacy Policy',
            icon: 'policy',
            onPress: async () => {
                await inAppBrowserAPI.openLink(privacy_policy_link);
            },
        },
        {
            title: 'Reset Password',
            icon: 'lock',
            onPress: async () => {
                await firebaseAPI.resetPassword();
            },
        },
        {
            title: 'Sign Out',
            icon: 'logout',
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
            <StatusBar barStyle="light-content" animated />
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={list}
                renderItem={({ item }) => {
                    return (
                        <ListItem onPress={() => item?.onPress()} bottomDivider>
                            <Icon name={item?.icon} />
                            <ListItem.Content>
                                <ListItem.Title>{item?.title}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    );
                }}
            />
        </>
    );
};

export default SettingsPage;

const styles = StyleSheet.create({});
