import { StyleSheet } from 'react-native';
import React from 'react';
import Router from './src/components/Router';
import Alerts from './src/components/Alerts';

import UserContextProvider from './src/contexts/UserContexts';

export default function App() {

  return (
    <>
      <UserContextProvider>

        <Router />
        <Alerts />

      </UserContextProvider>
    </>
  );
}

const styles = StyleSheet.create({

});