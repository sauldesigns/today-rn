import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { createContext, useContext, useReducer } from 'react';
import { User } from '../models/user';
import reducer, { initialState } from '../context/reducer';

export const StateContext = createContext<any>({});

export const StateProvider = ({ reducer, initialState, children }: any) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
