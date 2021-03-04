import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ArticleElement} from '../models/articles';
import {InAppBrowserAPI} from '../services/in-app-browser';

interface MainHeadlineProps {
    article: ArticleElement | undefined;
}

const MainHeadline = ({article}: MainHeadlineProps) => {
    const inAppBrowser = new InAppBrowserAPI();
    const handleOnPress = async () => {
        inAppBrowser.openLink(article?.url ?? '');
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleOnPress}>
                <Text style={styles.title}>{article?.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOnPress}>
                <Text style={styles.description}>{article?.description}</Text>
            </TouchableOpacity>
            <Text style={styles.source}>- {article?.source.name}</Text>
        </View>
    );
};

export default MainHeadline;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 300,
        backgroundColor: '#000',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 16,
    },
    title: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        color: 'white',
        fontSize: 18,
        marginBottom: 16,
    },
    source: {
        color: 'white',
        alignSelf: 'flex-end',
    },
});
