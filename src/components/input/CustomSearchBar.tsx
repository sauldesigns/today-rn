import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { black } from '../../constants/colors';

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
            containerStyle={{ paddingTop: 50, backgroundColor: black }}
            inputContainerStyle={{ backgroundColor: 'white' }}
            inputStyle={{color: black}}
            placeholder="Search Here..."
            autoCorrect={false}
            onChangeText={(value) => setSearch(value)}
            value={search}
            onSubmitEditing={async () => onSubmit(search)}
        />
    );
};

export default CustomSearchBar;
