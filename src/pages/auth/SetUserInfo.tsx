import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import MainInput from '../../components/input/MainInput';
import GreetingText from '../../components/text/GreetingText';
import MainTitle from '../../components/text/MainTitle';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { FirebaseAPI } from '../../services/firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Input } from 'react-native-elements';
import { black } from '../../constants/colors';

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};

const SetUserInfo = () => {
    const authService = new FirebaseAPI();
    const {
        control,
        handleSubmit,
        errors,
        formState: { isValid, isDirty },
    } = useForm({ mode: 'all' });
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState();

    const onSubmit = async (data: any) => {
        ReactNativeHapticFeedback.trigger('selection', options);
        setIsLoading(true);
        try {
            // const value = await authService.uploadAvatarToStorage(
            //     data?.username,
            //     image,
            // );
            const value = await authService.setupUserDBInfo(
                data?.username,
                data?.bio,
            );
            if (!value) {
                setIsLoading(false);
                ReactNativeHapticFeedback.trigger('notificationError', options);
            } else {
                ReactNativeHapticFeedback.trigger(
                    'notificationSuccess',
                    options,
                );
            }
        } catch {
            setIsLoading(false);
            ReactNativeHapticFeedback.trigger('notificationError', options);
        }
    };

    // const selectImage = async () => {
    //     launchImageLibrary({mediaType: 'photo', quality: 0.5}, (value) => {
    //         setImage(value);
    //     });
    // };
    return (
        <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag">
            <StatusBar animated barStyle="light-content" />
            <View style={styles.content}>
                <GreetingText text="Just a few more steps!" />
                <MainTitle text="User Info" />

                {/* <TouchableOpacity
                    onPress={() => {
                        selectImage();
                    }}>
                    <Thumbnail
                        large
                        style={{
                            alignSelf: 'center',
                            marginBottom: 24,
                        }}
                        source={{
                            uri: image ? image?.uri : 'https://bit.ly/3pnIBkI',
                        }}
                    />
                </TouchableOpacity> */}
                <View style={styles.input_container}>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur }) => (
                            <MainInput
                                placeholder="Username"
                                textContentType="username"
                                onBlur={onBlur}
                                onChange={onChange}
                            />
                        )}
                        name="username"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                </View>

                <View style={styles.input_container}>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur }) => (
                            <MainInput
                                placeholder="Enter bio here... (Optional)"
                                placeholderTextColor="white"
                                style={{ color: 'white' }}
                                onBlur={onBlur}
                                onChange={onChange}
                            />
                        )}
                        name="bio"
                        defaultValue=""
                    />
                </View>

                <Button
                    onPress={handleSubmit(onSubmit)}
                    loading={isLoading}
                    disabled={!isValid || !isDirty}
                    title="Submit"
                />
            </View>
        </ScrollView>
    );
};

export default SetUserInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
    },
    content: {
        marginHorizontal: 28,
        paddingTop: 50,
    },
    input_container: {
        marginBottom: 26,
    },
    create_account_button: {
        marginTop: 26,
        alignSelf: 'center',
    },
    create_account_button_text: {
        color: 'white',
    },
});
