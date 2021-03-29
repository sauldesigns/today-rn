import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
    NativeSyntheticEvent,
    OpaqueColorValue,
    StyleProp,
    StyleSheet,
    TextInputFocusEventData,
    TextStyle,
    View,
} from 'react-native';
import { Input, Text } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { SFProDisplayRegular } from '../../constants/font';

interface MainTextAreaProps {
    style?: StyleProp<TextStyle>;
    placeholderTextColor?: string | typeof OpaqueColorValue | undefined;
    placeholder?: string | undefined;
    autoCorrect?: boolean | undefined;
    keyboardType?:
        | 'default'
        | 'email-address'
        | 'numeric'
        | 'phone-pad'
        | 'number-pad'
        | 'decimal-pad'
        | 'visible-password'
        | 'ascii-capable'
        | 'numbers-and-punctuation'
        | 'url'
        | 'name-phone-pad'
        | 'twitter'
        | 'web-search'
        | undefined;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
    textContentType?: any;
    returnKeyType?:
        | 'default'
        | 'none'
        | 'done'
        | 'go'
        | 'next'
        | 'search'
        | 'send'
        | 'previous'
        | 'google'
        | 'join'
        | 'route'
        | 'yahoo'
        | 'emergency-call'
        | undefined;
    ref?:
        | string
        | ((instance: Input | null) => void)
        | React.RefObject<Input>
        | null
        | undefined;
    onBlur?:
        | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
        | undefined;
    onChange?: (text: string) => void | undefined;
    dark?: boolean;
    value?: string;
    label?: string;
    disabled?: boolean;
    maxLength?: number;
    onSubmit?: CallableFunction;
}

const MainTextArea = ({
    style,
    label = '',
    placeholder = 'Enter here...',
    placeholderTextColor = 'rgba(255,255,255,0.5)',
    autoCorrect = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    textContentType = 'none',
    returnKeyType = 'default',
    maxLength,
    value,
    onSubmit = () => {},
    onBlur,
    onChange = () => {},
}: MainTextAreaProps) => {
    const { colors } = useTheme();
    return (
        <View
            style={{
                borderBottomColor: '#5e6977',
                borderBottomWidth: 1,
                marginHorizontal: 11,
            }}>
            <Text
                style={{
                    marginBottom: 9,
                    fontWeight: 'bold',
                    color: '#5e6977',
                    fontSize: 16,
                }}>
                {label}
            </Text>
            <TextInput
                style={
                    style
                        ? style
                        : { ...styles.input_style, color: colors.text }
                }
                placeholderTextColor={placeholderTextColor}
                placeholder={placeholder}
                autoCorrect={autoCorrect}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                textContentType={textContentType}
                returnKeyType={returnKeyType}
                multiline
                maxLength={maxLength ? maxLength : undefined}
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                onSubmitEditing={() => onSubmit()}
                blurOnSubmit={true}
            />
        </View>
    );
};

export default MainTextArea;

const styles = StyleSheet.create({
    input_style: {
        fontFamily: SFProDisplayRegular,
        borderBottomColor: 'black',
        minHeight: 80,
        fontSize: 17,
        padding: 1,
    },
});
