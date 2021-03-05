import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Dimensions,
    ImageBackground,
    ImageSourcePropType,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileHeader from '../components/ProfileHeader';
import { SFProDisplayBold, SFProDisplayRegular } from '../constants/font';
const WIDTH = Dimensions.get('window').width;
const AccountPage = () => {
    const navigation = useNavigation();
    const backgroundImageSource: ImageSourcePropType = {
        uri: 'https://bit.ly/2MLjriq',
        cache: 'force-cache',
    };

    const avatarImageSource: ImageSourcePropType = {
        uri: 'https://bit.ly/2ZiF3pa',
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
                    backgroundImageSource={backgroundImageSource}
                />
                <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
                    <Text
                        style={{
                            fontFamily: SFProDisplayBold,
                            fontSize: 22,
                            textTransform: 'uppercase',
                            marginLeft: 170,
                            marginBottom: 8,
                        }}>
                        Username
                    </Text>
                    <Text
                        style={{
                            fontFamily: SFProDisplayRegular,
                            fontSize: 16,
                            marginLeft: 170,
                        }}>
                        Riverside, CA
                    </Text>
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
