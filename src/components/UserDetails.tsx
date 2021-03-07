import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SFProDisplayBold, SFProDisplayRegular } from '../constants/font';

interface UserDetailsProps {
    avatarImageSource: ImageSourcePropType;
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
                <Avatar
                    rounded
                    size={120}
                    source={avatarImageSource}
                    containerStyle={styles.avatar_container}
                />
                <View style={{ paddingRight: 100 }}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.location}>{location}</Text>
                </View>
            </View>
        </View>
    );
};

export default UserDetails;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 55,
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontFamily: SFProDisplayBold,
        fontSize: 22,
        textTransform: 'uppercase',
        marginBottom: 8,
        color: 'white',
    },
    location: {
        fontFamily: SFProDisplayRegular,
        fontSize: 16,
        color: 'white',
    },
});
