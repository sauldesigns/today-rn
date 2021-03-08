import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { SFProDisplayBold } from '../constants/font';

interface MainTitleProps {
    style?: StyleProp<TextStyle>;
    text: string;
}

const MainTitle = ({ style, text = '' }: MainTitleProps) => {
    return <Text style={style ? style : styles.title}>{text}</Text>;
};

export default MainTitle;

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 50,
        marginBottom: 48,
        fontFamily: SFProDisplayBold,
    },
});
