import { AppleButton } from '@invertase/react-native-apple-authentication';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Divider, SocialIcon } from 'react-native-elements';
import { black } from '../../constants/colors';
import { SFProDisplayBold } from '../../constants/font';
import { FirebaseAPI } from '../../services/firebase';
const PLATFORM = Platform.OS;

interface LoginButtonsProps {
    isLogin?: boolean;
}
const LoginButtons = ({ isLogin = false }: LoginButtonsProps) => {
    const firebaseAPI = new FirebaseAPI();
    const [isLoadingFB, setIsLoadingFB] = useState(false);
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
    const [isLoadingApple, setIsLoadingApple] = useState(false);
    return (
        <>
            <Divider style={{ marginTop: 22, marginBottom: 22 }} />
            {PLATFORM === 'ios' ? (
                <SocialIcon
                    fontStyle={{ ...styles.font_style, color: black }}
                    title={
                        isLogin ? 'Sign In With Google' : 'Sign Up With Apple'
                    }
                    button
                    //@ts-ignore
                    type="apple"
                    //@ts-check
                    loading={isLoadingApple}
                    style={{ backgroundColor: 'white', marginBottom: 16 }}
                    iconColor={black}
                    onPress={async () => {
                        setIsLoadingApple(true);
                        const value = await firebaseAPI.onAppleButtonPress();
                        if (!value) {
                            setIsLoadingApple(false);
                        }
                    }}
                />
            ) : (
                <></>
            )}
            <SocialIcon
                fontStyle={styles.font_style}
                title={isLogin ? 'Sign In With Google' : 'Sign Up With Google'}
                button
                loading={isLoadingGoogle}
                type="google"
                style={{ marginBottom: 16 }}
                onPress={async () => {
                    setIsLoadingGoogle(true);
                    const value = await firebaseAPI.signInWithGoogle();
                    if (!value) {
                        setIsLoadingGoogle(false);
                    }
                }}
            />
            <SocialIcon
                fontStyle={styles.font_style}
                title={
                    isLogin ? 'Sign In With Facebook' : 'Sign Up With Facebook'
                }
                button
                loading={isLoadingFB}
                type="facebook"
                onPress={async () => {
                    setIsLoadingFB(true);
                    const value = await firebaseAPI.signInWithFacebook();
                    if (!value) {
                        setIsLoadingFB(false);
                    }
                }}
            />
        </>
    );
};

export default LoginButtons;

const styles = StyleSheet.create({
    font_style: { fontFamily: SFProDisplayBold, fontSize: 15 },
});
