import { View } from '@motify/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { SettingsListItemValue } from '../../pages/main/AccountPage';

interface SettingsListItemCheckboxProps {
    item: SettingsListItemValue;
    darkMode: boolean;
    index: number;
}

const SettingsListItemCheckbox = ({
    item,
    darkMode,
    index,
}: SettingsListItemCheckboxProps) => {
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
            <ListItem bottomDivider>
                <Icon type="font-awesome" name={item?.icon} />
                <ListItem.Content>
                    <ListItem.Title>{item?.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.CheckBox
                    right
                    checked={darkMode}
                    onPress={() => item?.onPress()}
                    onLongPress={() => item?.onLongPress ?? {}}
                />
            </ListItem>
        </View>
    );
};

export default SettingsListItemCheckbox;

const styles = StyleSheet.create({});
