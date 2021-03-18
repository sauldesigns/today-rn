import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Keyboard,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { FirebaseAPI } from '../../services/firebase';
import { ScrollView } from 'react-native-gesture-handler';
import MainTitle from '../../components/text/MainTitle';
import MainInput from '../../components/input/MainInput';
import { Button } from 'react-native-elements';
import { black } from '../../constants/colors';
import { SFProDisplayRegular } from '../../constants/font';
import Snackbar from 'react-native-snackbar';
import { isAndroid } from '../../constants/misc';

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};
const ForgotPassword = () => {
    const authService = new FirebaseAPI();
    const { control, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const onSubmit = async (data: any) => {
        Keyboard.dismiss();
        ReactNativeHapticFeedback.trigger('selection', options);
        setIsLoading(true);
        try {
            const value = await authService.resetPasswordWithEmail(data?.email);
            if (!value) {
                ReactNativeHapticFeedback.trigger('notificationError', options);
            } else {
                ReactNativeHapticFeedback.trigger(
                    'notificationSuccess',
                    options,
                );
            }
            Snackbar.show({
                text: 'A request has been sent to reset email.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'green',
            });
            setIsLoading(false);
        } catch {
            setIsLoading(false);
            ReactNativeHapticFeedback.trigger('notificationError', options);
        }
    };

    return (
        <>
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps="handled">
                <StatusBar barStyle="light-content" animated />
                <View style={styles.content}>
                    <MainTitle text="Forgot Password" />
                    <View style={styles.input_container}>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur }) => (
                                <MainInput
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    textContentType="emailAddress"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                            name="email"
                            rules={{
                                required: true,
                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            }}
                            defaultValue=""
                        />
                    </View>
                    <Button
                        titleStyle={{ fontFamily: SFProDisplayRegular }}
                        onPress={handleSubmit(onSubmit)}
                        loading={isLoading}
                        title="Submit"
                    />
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    position: 'absolute',
                    top: 25,
                    right: 26,
                    alignSelf: 'center',
                }}>
                <Text style={{ color: 'white' }}>Close</Text>
            </TouchableOpacity>
        </>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
    },
    content: {
        marginHorizontal: 28,
        paddingTop: isAndroid ? 18 : 65,
    },
    input_container: {
        marginBottom: 26,
    },
});
