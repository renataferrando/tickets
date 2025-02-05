/* eslint-disable */
 // @ts-nocheck 

'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { initializeStore } from './initializedStore';

export const Provider = ({ children, initialState }) => {
  const store = initializeStore(initialState);
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export const Hydrate = ({ children }) => {
  return <>{children}</>;
};
