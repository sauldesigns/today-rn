import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext<any>({});

export const StateProvider = ({ reducer, initialState, children }: any) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
