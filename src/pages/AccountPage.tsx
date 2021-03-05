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
import { Avatar, Button, Icon } from 'react-native-elements';
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
                    <View
                        style={{
                            paddingHorizontal: 16,
                            paddingTop: 55,
                        }}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Avatar
                                rounded
                                size={120}
                                source={avatarImageSource}
                                containerStyle={{
                                    borderWidth: 4,
                                    borderColor: 'white',
                                    shadowColor: 'rgba(0,0,0,0.3)',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 5,
                                    elevation: 3,
                                    marginRight: 18,
                                }}
                            />
                            <View style={{ paddingRight: 100 }}>
                                <Text
                                    style={{
                                        fontFamily: SFProDisplayBold,
                                        fontSize: 22,
                                        textTransform: 'uppercase',
                                        marginBottom: 8,
                                        color: 'white',
                                    }}>
                                    John Smith
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: SFProDisplayRegular,
                                        fontSize: 16,
                                        color: 'white',
                                    }}>
                                    Riverside, CA
                                </Text>
                            </View>
                        </View>
                    </View>
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
                    />
                    <Button
                        raised
                        title="Settings"
                        onPress={() => navigation.navigate('Settings')}
                        containerStyle={{
                            width: '45%',
                        }}
                        titleStyle={{ color: 'black' }}
                        buttonStyle={{ backgroundColor: 'white' }}
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
