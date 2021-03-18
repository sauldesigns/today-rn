import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TimeAgo from 'react-native-timeago';
import { ArticleElement } from '../../models/articles';
import { InAppBrowserAPI } from '../../services/in-app-browser';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {
    SFProDisplayBold,
    SFProDisplayMedium,
    SFProDisplayRegular,
} from '../../constants/font';
import { DatabaseAPI } from '../../services/database';
import { Icon } from 'react-native-elements';
import Snackbar from 'react-native-snackbar';
import { isAndroid } from '../../constants/misc';
interface MainHeadlineProps {
    article: ArticleElement | undefined;
    isLoading: boolean;
    isFetching?: boolean;
}

const MainHeadline = ({
    article,
    isLoading,
    isFetching = false,
}: MainHeadlineProps) => {
    const inAppBrowser = new InAppBrowserAPI();
    const databaseAPI = new DatabaseAPI();
    const handleOnPress = async () => {
        ReactNativeHapticFeedback.trigger('impactMedium', options);
        inAppBrowser.openLink(article?.url ?? 'http://google.com');
    };

    const handleLongPress = async () => {
        ReactNativeHapticFeedback.trigger('selection', options);
        try {
            const value = await databaseAPI.addBookmark(article);
            if (value) {
                ReactNativeHapticFeedback.trigger(
                    'notificationSuccess',
                    options,
                );
                Snackbar.show({
                    text: 'Successfully added to bookmarks.',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'green',
                });
            }
        } catch (err) {
            ReactNativeHapticFeedback.trigger('notificationError', options);
        }
    };
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };

    return (
        <View style={styles.container}>
            {isLoading || isFetching ? (
                <ActivityIndicator />
            ) : (
                <>
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
                        <Text style={{ ...styles.source, marginRight: 8 }}>
                            Published{' '}
                            <TimeAgo time={article?.publishedAt ?? ''} />
                        </Text>
                        <Icon
                            onPress={handleLongPress}
                            type="fontawesome"
                            name="bookmark"
                            color="white"
                            style={styles.source}>
                            Author: {article?.author}
                        </Icon>
                    </View>
                </>
            )}
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
        paddingTop: isAndroid ? 18 : 50,
        paddingBottom: 16,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
    },
    main_title: {
        fontSize: 22,
        fontFamily: SFProDisplayMedium,
        color: 'white',
        marginBottom: 16,
    },
    title: {
        color: 'white',
        fontSize: 28,
        fontFamily: SFProDisplayBold,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        color: 'white',
        fontSize: 18,
        fontFamily: SFProDisplayRegular,
        marginBottom: 16,
    },
    source: {
        color: 'white',
        fontFamily: SFProDisplayRegular,
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
