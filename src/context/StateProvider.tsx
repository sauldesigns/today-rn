import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { createContext, useContext, useReducer } from 'react';

export type StateContextType = {
    user: FirebaseAuthTypes.User | null;
};

export const StateContext = createContext<any>({});

export const StateProvider = ({ reducer, initialState, children }: any) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
