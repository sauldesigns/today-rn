import React from 'react';
import {
    ActivityIndicator,
    Animated,
    ImageSourcePropType,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Avatar, Image, ListItem } from 'react-native-elements';
import TimeAgo from 'react-native-timeago';
import { ArticleElement } from '../../models/articles';
import { InAppBrowserAPI } from '../../services/in-app-browser';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {
    SFProDisplayBold,
    SFProDisplayMedium,
    SFProDisplayRegular,
} from '../../constants/font';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import ArticleListItem from './ArticleListItem';
import Snackbar from 'react-native-snackbar';
import { DatabaseAPI } from '../../services/database';

interface ArticleListProps {
    articleItem: ArticleElement;
    imageSource: ImageSourcePropType;
    showSource?: boolean;
}

const ArticleList = ({
    articleItem,
    imageSource,
    showSource = false,
}: ArticleListProps) => {
    const inAppBrowser = new InAppBrowserAPI();
    const databaseAPI = new DatabaseAPI();
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

    const LeftAction = () => {
        return (
            <View style={styles.left_action_container}>
                <Text style={styles.left_action_title}>Bookmark</Text>
            </View>
        );
    };

    const RightAction = () => {
        return (
            <View style={styles.right_action_container}>
                <Text style={styles.right_action_title}>Read Later</Text>
            </View>
        );
    };

    const LeftActionOpen = async () => {
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

    const RightActionOpen = async () => {
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
        <Swipeable
            ref={updateRef}
            friction={2}
            renderLeftActions={LeftAction}
            onSwipeableLeftOpen={LeftActionOpen}
            renderRightActions={RightAction}
            onSwipeableRightOpen={RightActionOpen}
            leftThreshold={150}
            rightThreshold={150}>
            <ListItem bottomDivider>
                <ArticleListItem
                    imageSource={imageSource}
                    articleItem={articleItem}
                    showSource={showSource}
                    handleOnPress={handleOnPress}
                />
            </ListItem>
        </Swipeable>
    );
};

export default ArticleList;

const styles = StyleSheet.create({
    left_action_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 16,
        backgroundColor: '#810000',
    },
    left_action_title: {
        fontFamily: SFProDisplayBold,
        fontSize: 16,
        color: 'white',
    },
    right_action_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 16,
        backgroundColor: '#007580',
    },
    right_action_title: {
        fontFamily: SFProDisplayBold,
        fontSize: 16,
        color: 'white',
    },
});
