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
import ArticleListItem from './ArticleListItem';

interface ArticleListProps {
    articleItem: ArticleElement;
    imageSource: ImageSourcePropType;
    showSource?: boolean;
}

const ArticleList = ({
    articleItem,
    imageSource,
    showSource = false,
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
            <ArticleListItem
                imageSource={imageSource}
                articleItem={articleItem}
                showSource={showSource}
                handleOnPress={handleOnPress}
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
