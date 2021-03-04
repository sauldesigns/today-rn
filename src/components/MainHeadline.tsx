import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TimeAgo from 'react-native-timeago';
import {ArticleElement} from '../models/articles';
import {InAppBrowserAPI} from '../services/in-app-browser';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
interface MainHeadlineProps {
    article: ArticleElement | undefined;
    isLoading: boolean;
}

const MainHeadline = ({article, isLoading}: MainHeadlineProps) => {
    const inAppBrowser = new InAppBrowserAPI();
    const handleOnPress = async () => {
        ReactNativeHapticFeedback.trigger('impactMedium', options);
        inAppBrowser.openLink(article?.url ?? 'http://google.com');
    };
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };

    return (
        <View style={styles.container}>
            <Text style={styles.main_title}>Top Headlines</Text>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleOnPress}>
                    <Text style={styles.title}>{article?.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOnPress}>
                    <Text style={styles.description}>
                        {article?.description}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.source}>
                    Published <TimeAgo time={article?.publishedAt ?? ''} />
                </Text>
                <Text style={styles.source}>- {article?.source.name}</Text>
            </View>
        </View>
    );
};

export default MainHeadline;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        minHeight: 300,
        backgroundColor: '#000',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 16,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
    },
    main_title: {
        fontSize: 22,
        color: 'white',
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
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
