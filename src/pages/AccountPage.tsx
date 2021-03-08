import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Dimensions,
    ImageSourcePropType,
    StyleSheet,
    View,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileHeader from '../components/ProfileHeader';
import UserDetails from '../components/UserDetails';
import { ACCOUNT_NAVIGATION } from '../constants/navigation';
import { useStateValue } from '../context/StateProvider';

const AccountPage = () => {
    const navigation = useNavigation();
    const [{ user }] = useStateValue();
    // const backgroundImageSource: ImageSourcePropType = {
    //     uri: 'https://bit.ly/2MLjriq',
    //     cache: 'force-cache',
    // };

    // const avatarImageSource: ImageSourcePropType = {
    //     uri: 'https://bit.ly/38bn9tr',
    //     cache: 'force-cache',
    // };
    return (
        <>
            <ScrollView style={styles.container}>
                <ProfileHeader
                    onPress={() => {
                        navigation.navigate('Settings');
                    }}
                    // avatarImageSource={avatarImageSource}
                    // backgroundImageSource={backgroundImageSource}
                >
                    <>
                        <View style={{ flex: 1, marginTop: 60 }}>
                            <UserDetails
                                // avatarImageSource={avatarImageSource}
                                username={user?.username ?? ''}
                                location={user?.bio ?? ''}
                            />
                        </View>
                        <Button
                            type="outline"
                            icon={
                                <Icon
                                    name="settings"
                                    type="fontawesome"
                                    color="white"
                                />
                            }
                            title="Settings"
                            containerStyle={{
                                width: '75%',
                                marginBottom: 16,
                                alignSelf: 'center',
                            }}
                            titleStyle={{ color: 'white', marginLeft: 8 }}
                            buttonStyle={{ borderColor: 'white' }}
                            onPress={() =>
                                navigation.navigate(ACCOUNT_NAVIGATION.Settings)
                            }
                        />
                    </>
                </ProfileHeader>
            </ScrollView>
        </>
    );
};

export default AccountPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
