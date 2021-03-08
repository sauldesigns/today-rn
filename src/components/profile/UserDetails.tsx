import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SFProDisplayBold, SFProDisplayRegular } from '../../constants/font';

interface UserDetailsProps {
    avatarImageSource?: ImageSourcePropType;
    username: string;
    location: string;
}

const UserDetails = ({
    avatarImageSource,
    username,
    location,
}: UserDetailsProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.details_container}>
                {/* <Avatar
                    rounded
                    size={120}
                    source={avatarImageSource}
                    containerStyle={styles.avatar_container}
                /> */}

                <Text style={styles.username}>{username}</Text>
                <Text style={styles.location}>{location}</Text>
            </View>
        </View>
    );
};

export default UserDetails;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        display: 'flex',
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    avatar_container: {
        borderWidth: 4,
        borderColor: 'white',
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
        marginRight: 18,
    },
    details_container: {
        display: 'flex',
        alignItems: 'center',
    },
    username: {
        fontFamily: SFProDisplayBold,
        fontSize: 32,
        textTransform: 'uppercase',
        marginBottom: 8,
        color: 'white',
    },
    location: {
        fontFamily: SFProDisplayRegular,
        fontSize: 18,
        color: 'white',
    },
});
