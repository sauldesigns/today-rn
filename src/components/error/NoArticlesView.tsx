import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { SFProDisplayRegular } from '../../constants/font';

const NoArticlesView = () => {
    const { colors } = useTheme();
    return (
        <View style={styles.no_articles_container}>
            <Icon name="article" color={colors.text} size={50} />
            <Text style={{ ...styles.no_articles_text, color: colors.text }}>
                There are no articles.
            </Text>
        </View>
    );
};

export default NoArticlesView;

const styles = StyleSheet.create({
    no_articles_container: {
        flex: 1,
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    no_articles_text: {
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 26,
        fontFamily: SFProDisplayRegular,
    },
});
