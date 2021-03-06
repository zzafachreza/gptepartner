import React, {useEffect, useState} from 'react';
// Import required components
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {storeData, getData} from '../../utils/localStorage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';

export default function Splash({navigation}) {
  PushNotification.createChannel(
    {
      channelId: 'gptepartner', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
      const tokenRefresh = token;
      storeData('token', token);
      getData('user').then((res) => {
        console.log(res);
        axios
          .post('https://hikvisionindonesia.co.id/api/update_token.php', {
            id: res.id,
            token: tokenRefresh.token,
          })
          .then(function (response) {
            console.log(response);
          });
      });
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      const json = JSON.stringify(notification);
      const obj = JSON.parse(json);

      console.log(obj);
      // if (obj.userInteraction) {
      //   navigation.replace('Notifikasi');
      // }

      if (obj.userInteraction) {
        const unsubscribe = getData('user').then((res) => {
          console.log(res);
          if (!res) {
            // console.log('beum login');
            setTimeout(() => {
              navigation.replace('GetStarted');
            }, 3000);
          } else {
            // console.log('sudah login logon');
            setTimeout(() => {
              navigation.replace('Notifikasi');
              axios
                .post('https://hikvisionindonesia.co.id/api/update_popup.php', {
                  id: res.id,
                  popup: 0,
                })
                .then((res) => {
                  console.log(res);
                });
            }, 3000);
          }
        });

        // alert(obj.userInteraction);
      }

      // process the notification
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      // console.log('ACTION:', notification.action);
      // console.log('NOTIFICATIONzzzz:', notification);
      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  const width = new Animated.Value(0);
  const height = new Animated.Value(0);
  const top = new Animated.Value(0);
  const [notif, setNotif] = useState(false);

  const [logo, setLogo] = useState('test');
  const [desc, setDesc] = useState('');

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the camera');
        // navigation.replace('MainApp');
      } else {
        // console.log('Camera permission denied');
      }
    } catch (err) {
      // console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission();

    messaging().onMessage(async (remoteMessage) => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const json = JSON.stringify(remoteMessage);
      const obj = JSON.parse(json);
      // alert(obj.notification);
      console.log(obj.notification);
      PushNotification.checkPermissions((permissions) => {
        console.log('permissions', permissions);
        if (permissions.alert === true) {
          PushNotification.localNotification({
            channelId: 'gptepartner',
            title: obj.notification.title,
            message: obj.notification.body,
            playSound: true,
            bigPictureUrl: obj.notification.android.imageUrl,
          });
        }
      });
    });

    const unsubscribe = getData('user').then((res) => {
      console.log(res);
      if (!res) {
        // console.log('beum login');
        setTimeout(() => {
          navigation.replace('GetStarted');
        }, 3000);
      } else {
        // console.log('sudah login logon');
        setTimeout(() => {
          navigation.replace('MainApp');
        }, 3000);
      }
    });

    axios.get('https://hikvisionindonesia.co.id/api/logo.php').then((res) => {
      // console.log(res.data);
      setLogo(res.data);
    });

    axios.get('https://hikvisionindonesia.co.id/api/desc.php').then((res) => {
      // console.log(res.data);
      setDesc(res.data);
    });
  }, []);

  setTimeout(() => {
    Animated.timing(
      width, // The animated value to drive
      {
        toValue: 150, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start(); // Starts the animation

    Animated.timing(
      height, // The animated value to drive
      {
        toValue: 150, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start(); // Starts the animation

    Animated.timing(
      top, // The animated value to drive
      {
        toValue: 10, // Animate to opacity: 1 (opaque)
        duration: 1200, // Make it take a while
        useNativeDriver: false,
      },
    ).start(); // Starts the animation
  }, 500);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{uri: logo}}
        style={{
          width: width,
          height: height,
        }}
      />

      <Animated.Text
        style={{
          marginTop: top,
          fontSize: 20,
          fontFamily: 'Montserrat-Medium',
        }}>
        {desc}
      </Animated.Text>

      <ActivityIndicator size="large" color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
