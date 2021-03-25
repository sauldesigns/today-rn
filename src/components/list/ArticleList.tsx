import React, { useState } from 'react';
import { Animated, ImageSourcePropType, StyleSheet } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { ArticleElement } from '../../models/articles';
import { InAppBrowserAPI } from '../../services/in-app-browser';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import ArticleListItem from './ArticleListItem';
import Snackbar from 'react-native-snackbar';
import { DatabaseAPI } from '../../services/database';
import { useTheme } from '@react-navigation/native';

interface ArticleListProps {
    articleItem: ArticleElement;
    imageSource: ImageSourcePropType;
    showSource?: boolean;
    isSavedData?: boolean;
    isBookmark?: boolean;
    index?: number;
}

const ArticleList = ({
    articleItem,
    imageSource,
    showSource = false,
    isSavedData = false,
    isBookmark = false,
    index,
}: ArticleListProps) => {
    const inAppBrowser = new InAppBrowserAPI();
    const databaseAPI = new DatabaseAPI();
    const { colors } = useTheme();

    let swipeableRow: Swipeable;

    const updateRef = (ref: Swipeable) => {
        swipeableRow = ref;
    };
    const handleOnPress = async () => {
        ReactNativeHapticFeedback.trigger('impactMedium', options);
        inAppBrowser.openLink(articleItem?.url ?? 'http://google.com');
    };
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };

    const renderLeftActions = (
        _progress: Animated.AnimatedInterpolation,
        dragX: Animated.AnimatedInterpolation,
    ) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [0, 0.5, 1],
            extrapolate: 'clamp',
        });
        return (
            <TouchableOpacity
                style={styles.leftAction}
                onPress={LeftActionOpenBookmark}>
                <Animated.View
                    style={{
                        opacity: trans,
                        transform: [{ scale: trans }],
                    }}>
                    <Icon type="font-awesome" name="bookmark" color="white">
                        Bookmark
                    </Icon>

                    <Animated.Text style={[styles.actionText]}>
                        Bookmark
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        );
    };

    const renderRightActions = (
        _progress: Animated.AnimatedInterpolation,
        dragX: Animated.AnimatedInterpolation,
    ) => {
        const trans = dragX.interpolate({
            inputRange: [-100, -50, 0],
            outputRange: [1, 0.5, 0],
            extrapolate: 'clamp',
        });

        return (
            <TouchableOpacity
                style={styles.rightAction}
                onPress={RightActionOpenReadLater}>
                <Animated.View
                    style={{
                        opacity: trans,
                        transform: [{ scale: trans }],
                    }}>
                    <Icon type="font-awesome" name="book" color="white"></Icon>

                    <Animated.Text style={[styles.actionText]}>
                        Read Later
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        );
    };

    const renderRightDelete = (
        _progress: Animated.AnimatedInterpolation,
        dragX: Animated.AnimatedInterpolation,
    ) => {
        const trans = dragX.interpolate({
            inputRange: [-100, -50, 0],
            outputRange: [1, 0.5, 0],
            extrapolate: 'clamp',
        });
        return (
            <TouchableOpacity
                style={styles.rightActionDelete}
                onPress={RightActionOpenDelete}>
                <Animated.View
                    style={{
                        opacity: trans,
                        transform: [{ scale: trans }],
                    }}>
                    <Icon type="font-awesome" name="trash" color="white"></Icon>

                    <Animated.Text style={[styles.actionText]}>
                        Delete
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        );
    };

    const LeftActionOpenBookmark = async () => {
        ReactNativeHapticFeedback.trigger('selection', options);

        try {
            const value = await databaseAPI.addBookmark(articleItem);
            if (value) {
                ReactNativeHapticFeedback.trigger(
                    'notificationSuccess',
                    options,
                );
                Snackbar.show({
                    text: 'Successfully added to bookmarks.',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'green',
                });
            }
        } catch (err) {
            ReactNativeHapticFeedback.trigger('notificationError', options);
        }
        swipeableRow.close();
    };

    const RightActionOpenDelete = async () => {
        ReactNativeHapticFeedback.trigger('selection', options);
        try {
            const value = await databaseAPI.deleteSaved(
                articleItem.id ?? '',
                isBookmark,
            );
            if (value) {
                ReactNativeHapticFeedback.trigger(
                    'notificationSuccess',
                    options,
                );
                Snackbar.show({
                    text: 'Successfully deleted saved article.',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'green',
                });
            }
        } catch (err) {
            ReactNativeHapticFeedback.trigger('notificationError', options);
        }

        if (swipeableRow) {
            swipeableRow.close();
        }
    };

    const RightActionOpenReadLater = async () => {
        ReactNativeHapticFeedback.trigger('selection', options);
        try {
            const value = await databaseAPI.addReadLater(articleItem);
            if (value) {
                ReactNativeHapticFeedback.trigger(
                    'notificationSuccess',
                    options,
                );
                Snackbar.show({
                    text: 'Successfully added to read later.',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'green',
                });
            }
        } catch (err) {
            ReactNativeHapticFeedback.trigger('notificationError', options);
        }
        swipeableRow.close();
    };

    return (
        <>
            <Swipeable
                ref={updateRef}
                friction={2}
                enableTrackpadTwoFingerGesture
                renderLeftActions={isSavedData ? undefined : renderLeftActions}
                renderRightActions={
                    isSavedData ? renderRightDelete : renderRightActions
                }
                leftThreshold={50}
                rightThreshold={50}
                containerStyle={{ backgroundColor: colors.background }}>
                <ListItem bottomDivider>
                    <ArticleListItem
                        imageSource={imageSource}
                        articleItem={articleItem}
                        showSource={showSource}
                        handleOnPress={handleOnPress}
                    />
                </ListItem>
            </Swipeable>
        </>
    );
};

export default ArticleList;

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#007580',
        justifyContent: 'center',
    },
    rightActionDelete: {
        alignItems: 'center',
        minWidth: 100,
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
    },
});
