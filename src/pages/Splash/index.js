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

export default function Splash({navigation}) {
  const width = new Animated.Value(0);
  const height = new Animated.Value(0);
  const top = new Animated.Value(0);

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
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission();

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
  text: {},
});
