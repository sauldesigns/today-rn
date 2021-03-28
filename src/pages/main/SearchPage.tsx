import React, { useState } from 'react';
import {
    ActivityIndicator,
    ImageSourcePropType,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { NewsAPI } from '../../services/api';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ArticleElement } from '../../models/articles';
import ArticleList from '../../components/list/ArticleList';
import { SFProDisplayRegular } from '../../constants/font';
import ErrorView from '../../components/error/ErrorView';
import NoArticlesView from '../../components/error/NoArticlesView';
import CustomSearchBar from '../../components/input/CustomSearchBar';
import { useScrollToTop, useTheme } from '@react-navigation/native';
import { black } from '../../constants/colors';
import AdComponent from '../../components/ad/AdComponent';
import { adRecurance } from '../../constants/misc';

const SearchPage = () => {
    const newsAPI = new NewsAPI();
    const ref = React.useRef(null);
    const [search, setSearch] = useState('');
    const [pullToRefresh, setPullToRefresh] = useState(false);
    useScrollToTop(ref);
    const { colors } = useTheme();
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
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: black }} />
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" animated />
                <CustomSearchBar
                    onSubmit={(v: string) => {
                        getSearchValue(v);
                    }}
                />

                {(isLoading || isFetching) && !pullToRefresh ? (
                    <View style={styles.loading}>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <FlatList
                        data={data?.articles}
                        style={styles.container}
                        ref={ref}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                        refreshControl={
                            <RefreshControl
                                colors={[colors.text]}
                                tintColor={colors.text}
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
                            const imageSource: ImageSourcePropType = newsAPI.handleImages(
                                articleItem.urlToImage,
                            );
                            return (
                                <>
                                    {index % adRecurance === 0 &&
                                    index !== 0 ? (
                                        <AdComponent />
                                    ) : (
                                        <></>
                                    )}
                                    <ArticleList
                                        articleItem={item}
                                        index={index}
                                        imageSource={imageSource}
                                        showSource
                                    />
                                </>
                            );
                        }}
                        ListEmptyComponent={() => {
                            return isError ? (
                                <View style={{ paddingTop: 100 }}>
                                    <ErrorView errorMessage={error} />
                                </View>
                            ) : isLoading ? (
                                <View style={styles.loading}>
                                    <ActivityIndicator />
                                </View>
                            ) : (
                                <NoArticlesView />
                            );
                        }}
                    />
                )}
            </SafeAreaView>
        </>
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
