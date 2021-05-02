import { View } from '@motify/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { SFProDisplayRegular } from '../../constants/font';
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
            <ListItem
                onLongPress={() =>
                    item?.onLongPress ? item?.onLongPress() : () => {}
                }
                bottomDivider>
                <Icon type="font-awesome" name={item?.icon} />
                <ListItem.Content>
                    <ListItem.Title style={styles.title}>
                        {item?.title}
                    </ListItem.Title>
                </ListItem.Content>
                <ListItem.CheckBox
                    right
                    checked={darkMode}
                    onPress={() => item?.onPress()}
                />
            </ListItem>
        </View>
    );
};

export default SettingsListItemCheckbox;

const styles = StyleSheet.create({
    title: {
        fontFamily: SFProDisplayRegular,
        marginBottom: 8,
    },
});
