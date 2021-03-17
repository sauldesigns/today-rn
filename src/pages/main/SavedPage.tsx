import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { ButtonGroup, Header } from 'react-native-elements';
import { black } from '../../constants/colors';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const SavedPage = () => {
    const buttons = ['Bookmarks', 'Read Later'];
    const [buttonIndex, setButtonIndex] = useState(0);

    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };

    return (
        <>
            <StatusBar barStyle="light-content" animated />
            <Header
                backgroundColor={black}
                centerComponent={
                    <ButtonGroup
                        onPress={(value) => {
                            ReactNativeHapticFeedback.trigger(
                                'selection',
                                options,
                            );
                            setButtonIndex(value);
                        }}
                        buttons={buttons}
                        selectedIndex={buttonIndex}
                        textStyle={styles.button_text}
                        selectedTextStyle={styles.active_button_text}
                        selectedButtonStyle={styles.active_button}
                        containerStyle={styles.button}
                    />
                }
            />
            <Text>{buttonIndex === 0 ? 'Test' : 'other'}</Text>
        </>
    );
};

export default SavedPage;

const styles = StyleSheet.create({
    active_button_text: {
        color: black,
    },
    button_text: {
        color: 'white',
    },
    button: {
        backgroundColor: black,
    },
    active_button: {
        backgroundColor: 'white',
    },
});
