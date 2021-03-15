import React, { useState } from 'react';
import {
    ImageSourcePropType,
    RefreshControl,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ArticleList from '../../components/list/ArticleList';
import MainHeadline from '../../components/article/MainHeadline';
import { ArticleElement } from '../../models/articles';
import { NewsAPI } from '../../services/api';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import ErrorView from '../../components/error/ErrorView';
import NoArticlesView from '../../components/error/NoArticlesView';
import { useScrollToTop } from '@react-navigation/native';

const HomePage = () => {
    const newsAPI = new NewsAPI();
    const ref = React.useRef(null);
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };
    useScrollToTop(ref);
    const [pullToRefresh, setPullToRefresh] = useState(false);

    const {
        data,
        error,
        isLoading,
        refetch,
        isError,
    } = newsAPI.getTopArticles();

    return (
        <View style={{ flex: 1, marginTop: pullToRefresh ? 40 : 0 }}>
            <StatusBar barStyle="light-content" />
            <FlatList
                data={data?.articles}
                ref={ref}
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={pullToRefresh}
                        colors={['black']}
                        tintColor="black"
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
                ListHeaderComponent={() => {
                    return isError ? (
                        <></>
                    ) : (
                        <MainHeadline
                            article={data?.articles[0]}
                            isLoading={isLoading}
                        />
                    );
                }}
                renderItem={({ item, index }) => {
                    const articleItem: ArticleElement = item;

                    const imageSource: ImageSourcePropType = newsAPI.handleImages(
                        articleItem?.urlToImage,
                    );
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
        </View>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
