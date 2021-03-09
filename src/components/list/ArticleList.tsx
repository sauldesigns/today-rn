import React from 'react';
import {
    ActivityIndicator,
    ImageSourcePropType,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Avatar, Image, ListItem } from 'react-native-elements';
import TimeAgo from 'react-native-timeago';
import { ArticleElement } from '../../models/articles';
import { InAppBrowserAPI } from '../../services/in-app-browser';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { SFProDisplayMedium, SFProDisplayRegular } from '../../constants/font';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ArticleListProps {
    articleItem: ArticleElement;
    imageSource: ImageSourcePropType;
    isLoading: boolean;
}

const ArticleList = ({
    articleItem,
    imageSource,
    isLoading,
}: ArticleListProps) => {
    const inAppBrowser = new InAppBrowserAPI();
    const handleOnPress = async () => {
        ReactNativeHapticFeedback.trigger('impactMedium', options);
        inAppBrowser.openLink(articleItem?.url ?? 'http://google.com');
    };
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };
    return (
        <ListItem bottomDivider>
            <ListItem.Content>
                <TouchableOpacity onPress={handleOnPress}>
                    <ListItem.Title style={styles.title}>
                        {articleItem.title}
                    </ListItem.Title>
                </TouchableOpacity>
                <ListItem.Subtitle style={styles.subtitle}>
                    Published <TimeAgo time={articleItem.publishedAt} />
                </ListItem.Subtitle>
            </ListItem.Content>

            <Image
                onPress={handleOnPress}
                style={styles.imageContainer}
                source={imageSource}
                PlaceholderContent={<ActivityIndicator />}
            />
        </ListItem>
    );
};

export default ArticleList;

const styles = StyleSheet.create({
    imageContainer: {
        width: 85,
        height: 85,
        borderRadius: 10,
    },
    title: {
        fontFamily: SFProDisplayMedium,
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: SFProDisplayRegular,
    },
});
