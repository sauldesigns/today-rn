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
import { Button, Divider } from 'react-native-elements';
import { black } from '../../constants/colors';
import LoginButtons from '../../components/auth/LoginButtons';
import { SFProDisplayRegular } from '../../constants/font';
import { AUTH_NAVIGATION } from '../../constants/navigation';
import { isAndroid } from '../../constants/misc';

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};
const Login = () => {
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
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const onSubmit = async (data: any) => {
        Keyboard.dismiss();
        ReactNativeHapticFeedback.trigger('selection', options);
        setIsLoading(true);
        try {
            const value = await authService.loginWithEmail(
                data?.email,
                data?.password,
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
        <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="handled">
            <StatusBar barStyle="light-content" animated />
            <View style={styles.content}>
                <GreetingText text="Hey! Welcome Back!" />
                <MainTitle text="Login" />
                <View style={styles.input_container}>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur }) => (
                            <>
                                <MainInput
                                    placeholder="E-mail"
                                    placeholderTextColor="rgba(255,255,255,0.3)"
                                    keyboardType="email-address"
                                    textContentType="emailAddress"
                                    style={{ color: 'white' }}
                                    onBlur={onBlur}
                                    onChange={onChange}
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
                        render={({ onChange, onBlur }) => (
                            <>
                                <SecureInput
                                    textContentType="password"
                                    placeholderTextColor="rgba(255,255,255,0.3)"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                                {errors.password?.type === 'minLength' ? (
                                    <Text style={styles.error_text}>
                                        Password must be at least 6 characters
                                        long
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
                <TouchableOpacity
                    style={styles.forgot_password_container}
                    onPress={() =>
                        navigation.navigate(AUTH_NAVIGATION.ForgotPassword)
                    }>
                    <Text style={styles.forgot_password_text}>
                        Forgot Password
                    </Text>
                </TouchableOpacity>
                <Button
                    disabled={!isValid}
                    titleStyle={{ fontFamily: SFProDisplayRegular }}
                    onPress={handleSubmit(onSubmit)}
                    loading={isLoading}
                    title="Login"
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate(AUTH_NAVIGATION.SignUp)}
                    style={styles.create_account_button}>
                    <Text style={styles.create_account_button_text}>
                        Create an Account
                    </Text>
                </TouchableOpacity>
                <LoginButtons isLogin />
            </View>
        </ScrollView>
    );
};

export default Login;

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
        marginBottom: 18,
    },
    forgot_password_container: {
        marginBottom: 29,
        marginRight: 4,
        alignSelf: 'flex-end',
    },
    forgot_password_text: {
        color: 'white',
        fontFamily: SFProDisplayRegular,
    },
    create_account_button: {
        marginTop: 26,
        alignSelf: 'center',
    },
    create_account_button_text: {
        color: 'white',
        fontFamily: SFProDisplayRegular,
    },
    error_text: {
        fontFamily: SFProDisplayRegular,
        marginLeft: 8,
        color: 'red',
    },
});
