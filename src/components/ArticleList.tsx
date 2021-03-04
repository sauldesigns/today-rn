import React from 'react';
import {ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import TimeAgo from 'react-native-timeago';
import {ArticleElement} from '../models/articles';
import {InAppBrowserAPI} from '../services/in-app-browser';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

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
        <ListItem onPress={handleOnPress} bottomDivider>
            <ListItem.Content>
                <ListItem.Title style={{marginBottom: 8}}>
                    {articleItem.title}
                </ListItem.Title>
                <ListItem.Subtitle>
                    Published <TimeAgo time={articleItem.publishedAt} />
                </ListItem.Subtitle>
            </ListItem.Content>
            <Avatar size="large" source={imageSource} />
        </ListItem>
    );
};

export default ArticleList;

const styles = StyleSheet.create({});
