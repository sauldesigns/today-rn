import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { privacy_policy_link } from '../../../constants/links';
import { ACCOUNT_NAVIGATION } from '../../../constants/navigation';
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
                await firebaseAPI.signOut();
            },
        },
    ];
    return (
        <>
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
