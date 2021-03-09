import React, { ReactChild } from 'react';
import {
    Dimensions,
    ImageSourcePropType,
    StyleSheet,
    View,
} from 'react-native';
import { black } from '../../constants/colors';

interface ProfileHeaderProps {
    backgroundImageSource?: ImageSourcePropType;
    avatarImageSource?: ImageSourcePropType;
    onPress?: CallableFunction;
    children?: ReactChild;
}

const WIDTH = Dimensions.get('screen').width;

const ProfileHeader = ({ children }: ProfileHeaderProps) => {
    return (
        <View
            style={{
                width: '100%',
                height: 250,
                backgroundColor: black,
            }}>
            {children}
        </View>
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
