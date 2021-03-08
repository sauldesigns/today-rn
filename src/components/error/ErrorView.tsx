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
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Icon name="error" type="fontawesome" color="red" size={50} />
            <Text
                style={{
                    textAlign: 'center',
                    marginTop: 16,
                    marginBottom: 26,
                }}>
                An error occured.{'\n'}Please refresh or try again later.{'\n'}
                {errorMessage?.message || ''}
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
