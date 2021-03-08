import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { SFProDisplayRegular } from '../constants/font';

interface GreetingTextProps {
    style?: StyleProp<TextStyle>;
    text: string;
}

const GreetingText = ({ style, text = '' }: GreetingTextProps) => {
    return <Text style={style ? style : styles.greeting}>{text}</Text>;
};

export default GreetingText;

const styles = StyleSheet.create({
    greeting: {
        color: 'white',
        marginVertical: 8,
        fontFamily: SFProDisplayRegular,
    },
});
