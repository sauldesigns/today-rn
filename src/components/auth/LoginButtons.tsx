import { AppleButton } from '@invertase/react-native-apple-authentication';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Divider, SocialIcon } from 'react-native-elements';
import { black } from '../../constants/colors';
import { FirebaseAPI } from '../../services/firebase';
const PLATFORM = Platform.OS;

interface LoginButtonsProps {
    isLogin?: boolean;
}
const LoginButtons = ({ isLogin = false }: LoginButtonsProps) => {
    const firebaseAPI = new FirebaseAPI();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <Divider style={{ marginTop: 22, marginBottom: 22 }} />
            {PLATFORM === 'ios' ? (
                <SocialIcon
                    title="Sign In With Apple"
                    button
                    //@ts-ignore
                    type="apple"
                    //@ts-check
                    loading={isLoading}
                    style={{ backgroundColor: 'white', marginBottom: 16 }}
                    fontStyle={{ color: black }}
                    iconColor={black}
                    onPress={async () => {
                        setIsLoading(true);
                        firebaseAPI.onAppleButtonPress();
                        setIsLoading(false);
                    }}
                />
            ) : (
                // <AppleButton
                //     buttonStyle={AppleButton.Style.WHITE}
                //     buttonType={
                //         isLogin
                //             ? AppleButton.Type.SIGN_IN
                //             : AppleButton.Type.SIGN_UP
                //     }
                //     style={{
                //         marginTop: 24,
                //         width: 160,
                //         height: 45,
                //         alignSelf: 'center',
                //     }}
                //     onPress={async () => await firebaseAPI.onAppleButtonPress()}
                // />
                <></>
            )}
            <SocialIcon
                title="Sign In With Google"
                button
                type="google"
                onPress={async () => {
                    setIsLoading(true);
                    firebaseAPI.signInWithGoogle();
                    setIsLoading(false);
                }}
            />
            {/* <GoogleSigninButton
                style={{
                    marginTop: 24,
                    width: 192,
                    height: 48,
                    alignSelf: 'center',
                }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => firebaseAPI.signInWithGoogle()}
            /> */}
        </>
    );
};

export default LoginButtons;

const styles = StyleSheet.create({});
