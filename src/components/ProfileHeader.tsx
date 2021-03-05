import React, { ReactChild } from 'react';
import {
    Dimensions,
    GestureResponderEvent,
    ImageBackground,
    ImageSourcePropType,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ProfileHeaderProps {
    backgroundImageSource: ImageSourcePropType;
    avatarImageSource: ImageSourcePropType;
    onPress?: CallableFunction;
    children: ReactChild;
}

const WIDTH = Dimensions.get('window').width;

const ProfileHeader = ({
    backgroundImageSource,
    avatarImageSource,
    onPress = () => {},
    children,
}: ProfileHeaderProps) => {
    return (
        <>
            <View>
                <ImageBackground
                    style={{ width: WIDTH, height: 200, position: 'relative' }}
                    source={backgroundImageSource}>
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                        }}>
                        {children}
                    </View>
                </ImageBackground>
            </View>
        </>
    );
};

export default ProfileHeader;

const styles = StyleSheet.create({
    avatarContainer: {
        position: 'absolute',
        bottom: -70,
        left: 16,
        right: 10,
        borderWidth: 4,
        borderColor: 'white',
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
    },
});
