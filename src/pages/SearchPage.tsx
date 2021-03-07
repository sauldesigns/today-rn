import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ImageSourcePropType,
    NativeSyntheticEvent,
    RefreshControl,
    StyleSheet,
    Text,
    TextInputKeyPressEventData,
    View,
} from 'react-native';
import { Button, Icon, SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { NewsAPI } from '../services/api';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Article, ArticleElement } from '../models/articles';
import ArticleList from '../components/ArticleList';
import { SFProDisplayRegular } from '../constants/font';
import ErrorView from '../components/ErrorView';
import NoArticlesView from '../components/NoArticlesView';
import { QueryObserverResult, RefetchOptions } from 'react-query';
import CustomSearchBar from '../components/CustomSearchBar';

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

    const getSearchValue = async (value: string) => {
        setSearch(value);
        // Timeout needed in order to set the search value first before
        // fetching
        setTimeout(async () => await refetch(), 150);
    };

    return (
        <View style={styles.container}>
            <CustomSearchBar
                onSubmit={(v: string) => {
                    getSearchValue(v);
                }}
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
                            colors={['black']}
                            tintColor="black"
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
                        // Article will sometimes return "" instead of null
                        // This will handle the case
                        if (articleItem.urlToImage === '') {
                            articleItem.urlToImage = 'https://bit.ly/3sOjwBy';
                        }
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
                        ) : isLoading ? (
                            <></>
                        ) : (
                            <NoArticlesView />
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
