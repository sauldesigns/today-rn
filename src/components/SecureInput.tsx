import React from 'react';
import {
    NativeSyntheticEvent,
    OpaqueColorValue,
    StyleProp,
    StyleSheet,
    TextInputFocusEventData,
    TextStyle,
} from 'react-native';
import { Input } from 'react-native-elements';
import { SFProDisplayRegular } from '../constants/font';

interface SecureInputProps {
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
}

const SecureInput = ({
    placeholder = 'Password',
    placeholderTextColor = 'white',
    style,
    textContentType = 'none',
    onBlur,
    onChange = () => {},
}: SecureInputProps) => {
    return (
        <Input
            style={style ? style : styles.input_style}
            secureTextEntry
            placeholderTextColor={placeholderTextColor}
            placeholder={placeholder}
            autoCapitalize={'none'}
            textContentType={textContentType}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
        />
    );
};

export default SecureInput;

const styles = StyleSheet.create({
    input_style: {
        color: 'white',
        fontFamily: SFProDisplayRegular,
    },
});
