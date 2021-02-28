/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SearchScreen } from './screens';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SearchScreen />
    </>
  );
};

export default App;
