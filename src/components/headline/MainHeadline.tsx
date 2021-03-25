import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    ImageSourcePropType,
    StyleSheet,
    Text,
    View,
} from 'react-native';
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
import { black } from '../../constants/colors';
interface MainHeadlineProps {
    article: ArticleElement | undefined;
    isLoading: boolean;
    isFetching?: boolean;
    imageSource: ImageSourcePropType;
}

const MainHeadline = ({
    article,
    isLoading,
    isFetching = false,
    imageSource,
}: MainHeadlineProps) => {
    const inAppBrowser = new InAppBrowserAPI();
    const databaseAPI = new DatabaseAPI();
    const [bookmarked, setIsBookmarked] = useState<boolean | null>(null);

    useEffect(() => {
        const subscribe = databaseAPI
            .getTopHeadlineBookmark()
            .where('title', '==', article?.title ?? '')
            .onSnapshot((doc) => {
                if (doc.docs.length === 0) {
                    setIsBookmarked(false);
                } else {
                    setIsBookmarked(true);
                }
            });

        return () => subscribe();
    }, [article]);

    const handleOnPress = async () => {
        ReactNativeHapticFeedback.trigger('impactMedium', options);
        inAppBrowser.openLink(article?.url ?? 'http://google.com');
    };

    const handleLongPress = async () => {
        ReactNativeHapticFeedback.trigger('selection', options);
        try {
            const value = await databaseAPI.toggleHeadlineBookmark(
                article,
                bookmarked ?? false,
            );

            if (value) {
                ReactNativeHapticFeedback.trigger(
                    'notificationSuccess',
                    options,
                );
                Snackbar.show({
                    text: 'Successfully added to bookmark.',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'green',
                });
            } else {
                Snackbar.show({
                    text: 'Successfully removed bookmark.',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'red',
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

    return isLoading || isFetching ? (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    ) : (
        <ImageBackground
            style={{
                width: '100%',
                minHeight: 300,
            }}
            source={imageSource}
            resizeMode="cover">
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
                    <Text style={{ ...styles.source, marginRight: 8 }}>
                        Published <TimeAgo time={article?.publishedAt ?? ''} />
                    </Text>
                    <Icon
                        onPress={handleLongPress}
                        type="font-awesome"
                        name="bookmark"
                        color={!bookmarked ? 'white' : 'red'}
                        style={styles.source}>
                        Author: {article?.author}
                    </Icon>
                </View>
            </View>
        </ImageBackground>
    );
};

export default MainHeadline;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        minHeight: 300,
        backgroundColor: 'rgba(0,0,0,0.70)',
        paddingHorizontal: 16,
        paddingTop: isAndroid ? 18 : 18,
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
