import { StyleSheet } from 'react-native';
import React from 'react';
import Router from './src/components/Router';
import Alerts from './src/components/Alerts';

import UserContextProdiver from './src/contexts/UserContexts';

export default function App() {

  return (
    <>
      <UserContextProdiver>

        <Router />
        <Alerts />

      </UserContextProdiver>
    </>
  );
}

const styles = StyleSheet.create({

});