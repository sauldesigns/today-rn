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
    onBlur,
    onChange = () => {},
}: MainInputProps) => {
    return (
        <Input
            style={style ? style : styles.input_style}
            placeholderTextColor={placeholderTextColor}
            placeholder={placeholder}
            autoCorrect={autoCorrect}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            textContentType={textContentType}
            returnKeyType={returnKeyType}
            ref={ref}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
        />
    );
};

export default MainInput;

const styles = StyleSheet.create({
    input_style: {
        color: 'white',
        fontFamily: SFProDisplayRegular,
        borderBottomColor: 'black',
    },
});
