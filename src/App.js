import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './routers';
import FlashMessage from 'react-native-flash-message';
import {LogBox, StatusBar} from 'react-native';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';
// import messaging from '@react-native-firebase/messaging';

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  LogBox.ignoreAllLogs();
  useEffect(() => {}, []);

  return (
    <NavigationContainer>
      <Router />
      <StatusBar backgroundColor="red" barStyle="light-content" />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
