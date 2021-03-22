import { useNavigation, useScrollToTop } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
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

interface listItem {
    title: string;
    icon: string;
    onPress: CallableFunction;
}

const AccountPage = () => {
    const ref = React.useRef(null);
    const navigation = useNavigation();
    const [{ user }] = useStateValue();
    const userObj: User = user;
    const inAppBrowserAPI = new InAppBrowserAPI();
    const firebaseAPI = new FirebaseAPI();
    const [_, dispatch] = useStateValue();

    useScrollToTop(ref);

    const settings_list: listItem[] = [
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
                    // ListHeaderComponent={() => {
                    //     return <></>;
                    // }}
                    keyExtractor={(_, index) => index.toString()}
                    data={settings_list}
                    renderItem={({ item }) => {
                        return (
                            <ListItem
                                onPress={() => item?.onPress()}
                                bottomDivider>
                                <Icon type="font-awesome" name={item?.icon} />
                                <ListItem.Content>
                                    <ListItem.Title>
                                        {item?.title}
                                    </ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
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
