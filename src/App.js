import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './routers';
import FlashMessage from 'react-native-flash-message';
import {LogBox} from 'react-native';
import OneSignal from 'react-native-onesignal';

export default function App() {
  useEffect(() => {
    OneSignal.setAppId('005361d7-6c23-47a0-ab5d-f2120576bbb7');
  });

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  return (
    <NavigationContainer>
      <Router />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
