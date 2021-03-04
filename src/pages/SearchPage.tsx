import React, { useState } from 'react';
import {
    ActivityIndicator,
    ImageSourcePropType,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Button, Icon, SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { NewsAPI } from '../services/api';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ArticleElement } from '../models/articles';
import ArticleList from '../components/ArticleList';
import { SFProDisplayRegular } from '../constants/font';
import ErrorView from '../components/ErrorView';

const SearchPage = () => {
    const newsAPI = new NewsAPI();
    const [search, setSearch] = useState('');
    const [pullToRefresh, setPullToRefresh] = useState(false);
    const {
        refetch,
        data,
        isLoading,
        isFetching,
        error,
        isError,
    } = newsAPI.searchArticles(search);
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

            {(isLoading || isFetching) && !pullToRefresh ? (
                <View style={styles.loading}>
                    <ActivityIndicator color="black" />
                </View>
            ) : (
                <FlatList
                    data={data?.articles}
                    style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={pullToRefresh}
                            onRefresh={async () => {
                                ReactNativeHapticFeedback.trigger(
                                    'selection',
                                    options,
                                );
                                setPullToRefresh(true);
                                await refetch();
                                setPullToRefresh(false);
                            }}
                        />
                    }
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        const articleItem: ArticleElement = item;
                        const imageSource: ImageSourcePropType = {
                            uri:
                                articleItem.urlToImage ??
                                'https://bit.ly/3sOjwBy',
                            cache: 'force-cache',
                        };

                        return (
                            <ArticleList
                                articleItem={articleItem}
                                imageSource={imageSource}
                                isLoading={isLoading}
                            />
                        );
                    }}
                    ListEmptyComponent={() => {
                        return isError ? (
                            <View style={{ paddingTop: 100 }}>
                                <ErrorView errorMessage={error} />
                            </View>
                        ) : (
                            <View style={styles.no_articles_container}>
                                <Icon
                                    name="article"
                                    type="fontawesome"
                                    color="black"
                                    size={50}
                                />
                                <Text style={styles.no_articles_text}>
                                    There are no articles.
                                </Text>
                            </View>
                        );
                    }}
                />
            )}
        </View>
    );
};

export default SearchPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    no_articles_container: {
        flex: 1,
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    no_articles_text: {
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 26,
        fontFamily: SFProDisplayRegular,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
});
