import { View } from '@motify/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { SettingsListItemValue } from '../../pages/main/AccountPage';

interface SettingsListItemProps {
    item: SettingsListItemValue;
    index: number;
}

const SettingsListItem = ({ item, index }: SettingsListItemProps) => {
    return (
        <View
            key={item?.title}
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
                type: 'timing',
                duration: 500,
                delay: 50 * index,
            }}
            exit={{ opacity: 0, translateY: 50 }}>
            <ListItem onPress={() => item?.onPress()} bottomDivider>
                <Icon type="font-awesome" name={item?.icon} />
                <ListItem.Content>
                    <ListItem.Title>{item?.title}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </View>
    );
};

export default SettingsListItem;

const styles = StyleSheet.create({});
