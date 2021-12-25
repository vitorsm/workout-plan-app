/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

const AppWrapper = function () {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
