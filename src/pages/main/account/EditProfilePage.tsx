import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import MainInput from '../../../components/input/MainInput';
import MainTextArea from '../../../components/input/MainTextArea';

import { black } from '../../../constants/colors';
import { useStateValue } from '../../../context/StateProvider';
import { User } from '../../../models/user';
import { FirebaseAPI } from '../../../services/firebase';

const EditProfilePage = () => {
    const firebaseAPI = new FirebaseAPI();
    const [isLoading, setIsLoading] = useState(false);
    const [{ user }] = useStateValue();
    const userObj: User = user;
    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid, isDirty },
    } = useForm({
        mode: 'all',
        defaultValues: {
            username: userObj.username,
            email: userObj.email,
            bio: userObj.bio,
        },
    });

    const onSubmit = async (data: any) => {
        Keyboard.dismiss();
        setIsLoading(true);
        let tempUser = userObj;
        tempUser.username = data?.username;
        tempUser.bio = data?.bio;
        await firebaseAPI.updateUserDBInfo(tempUser);
        reset({
            username: tempUser.username,
            bio: tempUser.bio,
            email: tempUser.email,
        });
        setIsLoading(false);
    };

    return (
        <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="handled">
            <StatusBar barStyle="light-content" animated />
            <View style={styles.input_container}>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <MainInput
                            label="Username"
                            placeholder="Enter Username Here..."
                            // placeholderTextColor={black}
                            dark
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    )}
                    name="username"
                    rules={{
                        required: true,
                    }}
                />
            </View>
            <View style={styles.input_container}>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <MainInput
                            label="E-mail"
                            placeholder="Enter E-mail Here..."
                            // placeholderTextColor={black}
                            dark
                            keyboardType="email-address"
                            disabled
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    )}
                    name="email"
                    rules={{
                        required: true,
                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    }}
                />
            </View>
            <View style={styles.input_container}>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <MainTextArea
                            label="Bio"
                            placeholder="Enter Bio Here..."
                            // placeholderTextColor={black}
                            dark
                            maxLength={180}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    )}
                    name="bio"
                />
            </View>
            <Button
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid || !isDirty}
                loading={isLoading}
                title="Update"
            />
        </ScrollView>
    );
};

export default EditProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input_container: {
        marginBottom: 26,
    },
});
