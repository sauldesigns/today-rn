import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

interface ErrorViewProps {
    errorMessage: any;
    onPress?: void;
    showButton?: boolean;
}

const ErrorView = ({
    errorMessage,
    onPress,
    showButton = false,
}: ErrorViewProps) => {
    const { colors } = useTheme();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Icon
                name="exclamation-circle"
                type="font-awesome"
                color="red"
                size={50}
            />
            <Text
                style={{
                    color: colors.text,
                    textAlign: 'center',
                    marginTop: 16,
                    marginBottom: 26,
                }}>
                An error occured.{'\n'}Please pull to refresh or try again
                later.{'\n'}
                Error Message: {errorMessage?.message || ''}
            </Text>
            {showButton ? (
                <Button
                    raised
                    titleStyle={{ marginHorizontal: 16, marginVertical: 4 }}
                    title="Retry"
                    onPress={async () => onPress}
                />
            ) : (
                <></>
            )}
        </View>
    );
};

export default ErrorView;

const styles = StyleSheet.create({});
