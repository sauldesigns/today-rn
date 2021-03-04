import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

interface CustomSearchBarProps {
    refetch?: void;
    onSubmit: CallableFunction;
}

const CustomSearchBar = ({
    refetch,
    onSubmit = () => {},
}: CustomSearchBarProps) => {
    const [search, setSearch] = useState('');
    return (
        <SearchBar
            round
            containerStyle={{ paddingTop: 50 }}
            placeholder="Search Here..."
            autoCorrect={false}
            onChangeText={(value) => setSearch(value)}
            value={search}
            onSubmitEditing={async () => onSubmit(search)}
        />
    );
};

export default CustomSearchBar;

const styles = StyleSheet.create({});
