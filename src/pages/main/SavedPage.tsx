import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ImageSourcePropType,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { ButtonGroup, Header } from 'react-native-elements';
import { black } from '../../constants/colors';
import {
    FirebaseFirestoreTypes,
    firebase,
} from '@react-native-firebase/firestore';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ArticleElement } from '../../models/articles';
import { FlatList } from 'react-native-gesture-handler';
import ArticleList from '../../components/list/ArticleList';
import { NewsAPI } from '../../services/api';
import AdComponent from '../../components/ad/AdComponent';
import { adRecurance } from '../../constants/misc';

const SavedPage = () => {
    const buttons = ['Bookmarks', 'Read Later'];
    const [buttonIndex, setButtonIndex] = useState(0);
    const [bookmarks, setBookmarks] = useState<ArticleElement[]>([]);
    const [loading, setLoading] = useState(true);
    const newsAPI = new NewsAPI();
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };

    useEffect(() => {
        if (buttonIndex === 0) {
            const subscriber = firebase
                .firestore()
                .collection('users')
                .doc(firebase?.auth().currentUser?.uid ?? '')
                .collection('bookmarks')
                .onSnapshot(
                    (querySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
                        const articles: any[] = [];

                        querySnapshot.forEach(
                            (
                                documentSnapshot: FirebaseFirestoreTypes.DocumentSnapshot,
                            ) => {
                                articles.push({
                                    ...documentSnapshot.data(),
                                    id: documentSnapshot.id,
                                });
                            },
                        );

                        setBookmarks(articles);
                        setLoading(false);
                    },
                );

            // Unsubscribe from events when no longer in use
            return () => subscriber();
        } else {
            const subscriber = firebase
                .firestore()
                .collection('users')
                .doc(firebase?.auth().currentUser?.uid ?? '')
                .collection('read_later')
                .onSnapshot(
                    (querySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
                        const articles: any[] = [];

                        querySnapshot.forEach(
                            (
                                documentSnapshot: FirebaseFirestoreTypes.DocumentSnapshot,
                            ) => {
                                articles.push({
                                    ...documentSnapshot.data(),
                                    id: documentSnapshot.id,
                                });
                            },
                        );

                        setBookmarks(articles);
                        setLoading(false);
                    },
                );

            // Unsubscribe from events when no longer in use
            return () => subscriber();
        }
    }, [buttonIndex]);

    return (
        <>
            <StatusBar barStyle="light-content" animated />
            <Header
                backgroundColor={black}
                centerComponent={
                    <ButtonGroup
                        onPress={(value) => {
                            ReactNativeHapticFeedback.trigger(
                                'selection',
                                options,
                            );
                            setButtonIndex(value);
                        }}
                        buttons={buttons}
                        selectedIndex={buttonIndex}
                        textStyle={styles.button_text}
                        selectedTextStyle={styles.active_button_text}
                        selectedButtonStyle={styles.active_button}
                        containerStyle={styles.button}
                    />
                }
            />
            <FlatList
                keyExtractor={(item) => item.id}
                data={bookmarks}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => {
                    return (
                        <View
                            style={{
                                marginTop: 50,
                                alignItems: 'center',
                            }}>
                            {loading ? (
                                <ActivityIndicator size="large" color="black" />
                            ) : (
                                <></>
                            )}

                            <Text>
                                {loading
                                    ? 'Loading'
                                    : 'There are no articles saved.'}
                            </Text>
                        </View>
                    );
                }}
                renderItem={({ item, index }) => {
                    const imageSource: ImageSourcePropType = newsAPI.handleImages(
                        item?.urlToImage,
                    );
                    return (
                        <>
                            {index % adRecurance === 0 && index !== 0 ? (
                                <AdComponent />
                            ) : (
                                <></>
                            )}
                            <ArticleList
                                articleItem={item}
                                imageSource={imageSource}
                                showSource
                                isSavedData
                                isBookmark={buttonIndex === 0 ? true : false}
                            />
                        </>
                    );
                }}
            />
        </>
    );
};

export default SavedPage;

const styles = StyleSheet.create({
    active_button_text: {
        color: black,
    },
    button_text: {
        color: 'white',
    },
    button: {
        backgroundColor: black,
    },
    active_button: {
        backgroundColor: 'white',
    },
});
