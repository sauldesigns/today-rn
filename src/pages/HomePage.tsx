import React from 'react';
import {ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import ArticleList from '../components/ArticleList';
import MainHeadline from '../components/MainHeadline';
import {ArticleElement} from '../models/articles';
import {NewsAPI} from '../services/api';

const HomePage = () => {
    const newsAPI = new NewsAPI();

    const {data, error, isLoading} = newsAPI.useTopArticles();

    return (
        <>
            <FlatList
                data={data?.articles}
                style={styles.container}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => {
                    return <MainHeadline article={data?.articles[0]} />;
                }}
                renderItem={({item, index}) => {
                    const articleItem: ArticleElement = item;
                    const imageSource: ImageSourcePropType = {
                        uri: articleItem.urlToImage ?? "",
                    };
                    if (index !== 0) {
                        return (
                            <ArticleList
                                articleItem={articleItem}
                                imageSource={imageSource}
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
