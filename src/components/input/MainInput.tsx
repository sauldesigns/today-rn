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
import { black } from '../../constants/colors';
import { SFProDisplayRegular } from '../../constants/font';

interface MainInputProps {
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

const MainInput = ({
    style,
    placeholder = 'Enter here...',
    placeholderTextColor = 'white',
    autoCorrect = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    textContentType = 'none',
    returnKeyType = 'default',
    ref,
    label = '',
    dark = false,
    disabled = false,
    maxLength,
    value,
    onSubmit = () => {},
    onBlur,
    onChange = () => {},
}: MainInputProps) => {
    return (
        <Input
            style={
                style
                    ? style
                    : { ...styles.input_style, color: dark ? black : 'white' }
            }
            label={label}
            disabled={disabled}
            placeholderTextColor={placeholderTextColor}
            placeholder={placeholder}
            autoCorrect={autoCorrect}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            textContentType={textContentType}
            returnKeyType={returnKeyType}
            maxLength={maxLength ? maxLength : undefined}
            ref={ref}
            value={value}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            onSubmitEditing={() => onSubmit()}
            blurOnSubmit={true}
        />
    );
};

export default MainInput;

const styles = StyleSheet.create({
    input_style: {
        fontFamily: SFProDisplayRegular,
        borderBottomColor: 'black',
    },
});
