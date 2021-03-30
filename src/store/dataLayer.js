import React, { createContext, useContext, useReducer } from "react";

const StateContext = createContext();

export const DataLayer = ({ children, initialState, reducer }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useDataLayerValue = () => useContext(StateContext);
