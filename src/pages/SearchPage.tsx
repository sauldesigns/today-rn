import React, { useState } from 'react';
import {
    ImageSourcePropType,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { NewsAPI } from '../services/api';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ArticleElement } from '../models/articles';
import ArticleList from '../components/ArticleList';
import { SFProDisplayRegular } from '../constants/font';

const SearchPage = () => {
    const newsAPI = new NewsAPI();
    const [search, setSearch] = useState('');
    const { refetch, data, isLoading } = newsAPI.searchArticles(search);
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };
    console.log(data);
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
                ListEmptyComponent={() => (
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
                )}
            />
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
});
