import { AppleButton } from '@invertase/react-native-apple-authentication';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { FirebaseAPI } from '../../services/firebase';
const PLATFORM = Platform.OS;

interface LoginButtonsProps {
    isLogin?: boolean;
}
const LoginButtons = ({ isLogin = false }: LoginButtonsProps) => {
    const firebaseAPI = new FirebaseAPI();
    return (
        <>
            <Divider style={{ marginTop: 22 }} />
            {PLATFORM === 'ios' ? (
                <AppleButton
                    buttonStyle={AppleButton.Style.WHITE}
                    buttonType={
                        isLogin
                            ? AppleButton.Type.SIGN_IN
                            : AppleButton.Type.SIGN_UP
                    }
                    style={{
                        marginTop: 24,
                        width: 160,
                        height: 45,
                        alignSelf: 'center',
                    }}
                    onPress={async () => await firebaseAPI.onAppleButtonPress()}
                />
            ) : (
                <></>
            )}
            <GoogleSigninButton
                style={{
                    marginTop: 24,
                    width: 192,
                    height: 48,
                    alignSelf: 'center',
                }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => firebaseAPI.signInWithGoogle()}
            />
        </>
    );
};

export default LoginButtons;

const styles = StyleSheet.create({});
