import React, { useState } from 'react';
import {
    ImageSourcePropType,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { NewsAPI } from '../services/api';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ArticleElement } from '../models/articles';
import ArticleList from '../components/ArticleList';

const SearchPage = () => {
    const newsAPI = new NewsAPI();
    const [search, setSearch] = useState('');
    const { refetch, data, isLoading } = newsAPI.searchArticles(search);
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };

    return (
        <View style={styles.container}>
            <SearchBar
                round
                containerStyle={{ paddingTop: 50 }}
                placeholder="Search Here..."
                onChangeText={(value) => setSearch(value)}
                value={search}
                onSubmitEditing={async () => await refetch()}
            />
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
                keyExtractor={(_, index) => index.toString()}
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
        </View>
    );
};

export default SearchPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
