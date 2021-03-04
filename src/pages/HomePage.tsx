import React from 'react';
import {
    ImageSourcePropType,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Avatar, Button, Icon, ListItem } from 'react-native-elements';
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

    const { data, error, isLoading, refetch } = newsAPI.getTopArticles();

    return (
        <>
            {error ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Icon
                        name="error"
                        type="fontawesome"
                        color="red"
                        size={50}
                    />
                    <Text
                        style={{
                            textAlign: 'center',
                            marginTop: 16,
                            marginBottom: 26,
                        }}>
                        An error occured.{'\n'}Please refresh or try again
                        later.
                    </Text>
                    <Button
                        raised
                        titleStyle={{ marginHorizontal: 16, marginVertical: 4 }}
                        title="Retry"
                        onPress={async () => await refetch()}
                    />
                </View>
            ) : (
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
                            uri:
                                articleItem.urlToImage ??
                                'https://bit.ly/3sOjwBy',
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
            )}
        </>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
