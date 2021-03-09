import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { FirebaseAPI } from '../../services/firebase';
import { ScrollView } from 'react-native-gesture-handler';
import SecureInput from '../../components/input/SecureInput';
import GreetingText from '../../components/text/GreetingText';
import MainTitle from '../../components/text/MainTitle';
import MainInput from '../../components/input/MainInput';
import { Button } from 'react-native-elements';
import { black } from '../../constants/colors';

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};
const Login = () => {
    const authService = new FirebaseAPI();
    const { control, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const onSubmit = async (data: any) => {
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
            <View style={styles.content}>
                <GreetingText text="Hey! Welcome Back!" />
                <MainTitle text="Login" />
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
                <View style={styles.input_container}>
                    <Controller
                        control={control}
                        render={({ onChange, onBlur }) => (
                            <SecureInput
                                textContentType="password"
                                onBlur={onBlur}
                                onChange={onChange}
                            />
                        )}
                        name="password"
                        rules={{ required: true, minLength: 6 }}
                        defaultValue=""
                    />
                </View>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    loading={isLoading}
                    style={{ marginTop: 50 }}
                    title="Login"
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                    style={styles.create_account_button}>
                    <Text style={styles.create_account_button_text}>
                        Create an Account
                    </Text>
                </TouchableOpacity>
                {/* <LoginButtons isLogin /> */}
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
        paddingTop: 65,
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
