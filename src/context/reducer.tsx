import AsyncStorage from '@react-native-community/async-storage';

export const initialState = {
    user: null,
    darkMode: false,
};

export const actionTypes = {
    SET_USER: 'SET_USER',
    SET_DARKMODE: 'SET_DARKMODE',
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.SET_DARKMODE:
            return {
                ...state,
                darkMode: action.darkMode,
            };
        default:
            return state;
    }
};

export default reducer;
