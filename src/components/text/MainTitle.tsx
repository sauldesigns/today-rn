import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { black } from '../../constants/colors';
import { SFProDisplayBold, SFProDisplayMedium } from '../../constants/font';

interface MainTitleProps {
    style?: StyleProp<TextStyle>;
    text: string;
    dark?: boolean;
}

const MainTitle = ({ style, text = '', dark = false }: MainTitleProps) => {
    return (
        <Text
            style={
                style
                    ? style
                    : { ...styles.title, color: dark ? black : 'white' }
            }>
            {text}
        </Text>
    );
};

export default MainTitle;

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        marginBottom: 48,
        fontFamily: SFProDisplayMedium,
    },
});
