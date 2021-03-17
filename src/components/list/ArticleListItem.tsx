import React from 'react';
import { ActivityIndicator, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { Image, ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TimeAgo from 'react-native-timeago';
import { SFProDisplayMedium, SFProDisplayRegular } from '../../constants/font';
import { ArticleElement } from '../../models/articles';

interface ArticleListItemProps {
    handleOnPress: CallableFunction,
    articleItem: ArticleElement,
    showSource?: boolean,
    imageSource: ImageSourcePropType
}

const ArticleListItem = ({
    handleOnPress = () => {},
    articleItem,
    showSource,
    imageSource,
}: ArticleListItemProps) => {
    return (
        <>
            <ListItem.Content>
                <TouchableOpacity onPress={() => handleOnPress()}>
                    <ListItem.Title style={styles.title}>
                        {articleItem.title}
                    </ListItem.Title>
                </TouchableOpacity>
                <ListItem.Subtitle style={styles.subtitle}>
                    {showSource ? `Source: ${articleItem.source.name}` : ''}
                    {showSource ? '\n' : ''}
                    Published <TimeAgo time={articleItem.publishedAt} />
                </ListItem.Subtitle>
            </ListItem.Content>

            <Image
                onPress={() => handleOnPress()}
                style={styles.imageContainer}
                source={imageSource}
                PlaceholderContent={<ActivityIndicator />}
            />
        </>
    );
};

export default ArticleListItem;

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
