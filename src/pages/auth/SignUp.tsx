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
import SecureInput from '../../components/input/SecureInput';
import GreetingText from '../../components/text/GreetingText';
import MainTitle from '../../components/text/MainTitle';
import MainInput from '../../components/input/MainInput';
import { Button } from 'react-native-elements';
import { black } from '../../constants/colors';
import LoginButtons from '../../components/auth/LoginButtons';
import { SFProDisplayRegular } from '../../constants/font';
import { isAndroid } from '../../constants/misc';

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};
const SignUp = () => {
    const authService = new FirebaseAPI();
    const {
        control,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm({
        mode: 'all',
        defaultValues: {
            email: '',
            password: '',
            username: '',
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const onSubmit = async (data: any) => {
        Keyboard.dismiss();
        ReactNativeHapticFeedback.trigger('selection', options);
        setIsLoading(true);
        try {
            const value = await authService.signUpWithEmail(
                data?.email,
                data?.password,
                data?.username,
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

    return (
        <>
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps="handled">
                <StatusBar barStyle="light-content" animated />
                <View style={styles.content}>
                    <GreetingText text="Hey! Nice to meet you!" />
                    <MainTitle text="Sign Up" />
                    <View style={styles.input_container}>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <>
                                    <MainInput
                                        placeholder="Username"
                                        placeholderTextColor="rgba(255,255,255,0.3)"
                                        style={{ color: 'white' }}
                                        keyboardType="default"
                                        textContentType="username"
                                        onBlur={field.onBlur}
                                        onChange={field.onChange}
                                    />
                                    {errors.username?.type === 'minLength' ? (
                                        <Text style={styles.error_text}>
                                            Please enter a username.
                                        </Text>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}
                            name="username"
                            rules={{
                                required: true,
                                minLength: 1,
                            }}
                            defaultValue=""
                        />
                    </View>

                    <View style={styles.input_container}>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <>
                                    <MainInput
                                        placeholder="E-mail"
                                        placeholderTextColor="rgba(255,255,255,0.3)"
                                        style={{ color: 'white' }}
                                        keyboardType="email-address"
                                        textContentType="emailAddress"
                                        onBlur={field.onBlur}
                                        onChange={field.onChange}
                                    />
                                    {errors.email?.type === 'pattern' ? (
                                        <Text style={styles.error_text}>
                                            Please enter a valid e-mail.
                                        </Text>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}
                            name="email"
                            rules={{
                                required: true,
                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            }}
                            defaultValue=""
                        />
                    </View>
                    <View style={styles.input_container}>
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <>
                                    <SecureInput
                                        textContentType="password"
                                        placeholderTextColor="rgba(255,255,255,0.3)"
                                        style={{ color: 'white' }}
                                        onBlur={field.onBlur}
                                        onChange={field.onChange}
                                    />
                                    {errors.password?.type === 'minLength' ? (
                                        <Text style={styles.error_text}>
                                            Password must be at least 6
                                            characters long
                                        </Text>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}
                            name="password"
                            rules={{ required: true, minLength: 6 }}
                            defaultValue=""
                        />
                    </View>
                    <Button
                        disabled={!isValid}
                        titleStyle={{ fontFamily: SFProDisplayRegular }}
                        onPress={handleSubmit(onSubmit)}
                        loading={isLoading}
                        title="Create"
                    />

                    <LoginButtons />
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

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
    },
    content: {
        marginHorizontal: 28,
        paddingTop: isAndroid ? 18 : 35,
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
    error_text: {
        fontFamily: SFProDisplayRegular,
        marginLeft: 8,
        color: 'red',
    },
});
