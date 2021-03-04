import React from 'react';
import {
    ImageSourcePropType,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ArticleList from '../components/ArticleList';
import MainHeadline from '../components/MainHeadline';
import { ArticleElement } from '../models/articles';
import { NewsAPI } from '../services/api';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const HomePage = () => {
    const newsAPI = new NewsAPI();
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };

    const {
        data,
        error,
        isLoading,
        refetch,
        isFetching,
    } = newsAPI.getTopArticles();

    return (
        <>
            <FlatList
                data={data?.articles}
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={async () => {
                            ReactNativeHapticFeedback.trigger(
                                'selection',
                                options,
                            );
                            await refetch();
                        }}
                    />
                }
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => {
                    return (
                        <MainHeadline
                            article={data?.articles[0]}
                            isLoading={isLoading}
                        />
                    );
                }}
                renderItem={({ item, index }) => {
                    const articleItem: ArticleElement = item;
                    const imageSource: ImageSourcePropType = {
                        uri: articleItem.urlToImage ?? 'https://bit.ly/3sOjwBy',
                    };
                    if (index !== 0) {
                        return (
                            <ArticleList
                                articleItem={articleItem}
                                imageSource={imageSource}
                                isLoading={isLoading}
                            />
                        );
                    } else {
                        return <></>;
                    }
                }}
            />
        </>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
