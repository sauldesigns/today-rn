import React from 'react';
import {ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import {ArticleElement} from '../models/articles';
import {InAppBrowserAPI} from '../services/in-app-browser';

interface ArticleListProps {
    articleItem: ArticleElement;
    imageSource: ImageSourcePropType;
}

const ArticleList = ({articleItem, imageSource}: ArticleListProps) => {
    const inAppBrowser = new InAppBrowserAPI();
    const handleOnPress = async () => {
        inAppBrowser.openLink(articleItem?.url ?? '');
    };
    return (
        <ListItem onPress={handleOnPress} bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{articleItem.title}</ListItem.Title>
                <ListItem.Subtitle>
                    {articleItem.description?.slice(0, 100)}
                </ListItem.Subtitle>
            </ListItem.Content>
            <Avatar size="large" source={imageSource} />
        </ListItem>
    );
};

export default ArticleList;

const styles = StyleSheet.create({});
