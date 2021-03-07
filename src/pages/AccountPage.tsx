import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Dimensions,
    ImageSourcePropType,
    StyleSheet,
    View,
} from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileHeader from '../components/ProfileHeader';
import UserDetails from '../components/UserDetails';
import { ACCOUNT_NAVIGATION } from '../constants/navigation';

const AccountPage = () => {
    const navigation = useNavigation();
    const backgroundImageSource: ImageSourcePropType = {
        uri: 'https://bit.ly/2MLjriq',
        cache: 'force-cache',
    };

    const avatarImageSource: ImageSourcePropType = {
        uri: 'https://bit.ly/38bn9tr',
        cache: 'force-cache',
    };
    return (
        <>
            <ScrollView style={styles.container}>
                <ProfileHeader
                    onPress={() => {
                        navigation.navigate('Settings');
                    }}
                    avatarImageSource={avatarImageSource}
                    backgroundImageSource={backgroundImageSource}>
                    <UserDetails
                        avatarImageSource={avatarImageSource}
                        username="John Smith"
                        location="Riverside, CA"
                    />
                </ProfileHeader>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'center',
                        marginTop: 26,
                    }}>
                    <Button
                        raised
                        title="Edit Profile"
                        containerStyle={{
                            marginRight: 8,
                            width: '45%',
                        }}
                        onPress={() =>
                            navigation.navigate(ACCOUNT_NAVIGATION.EditProfile)
                        }
                    />
                    <Button
                        raised
                        title="Settings"
                        containerStyle={{
                            width: '45%',
                        }}
                        titleStyle={{ color: 'black' }}
                        buttonStyle={{ backgroundColor: 'white' }}
                        onPress={() =>
                            navigation.navigate(ACCOUNT_NAVIGATION.Settings)
                        }
                    />
                </View>
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
