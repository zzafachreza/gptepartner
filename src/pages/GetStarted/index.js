import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Animated,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function GetStarted({navigation}) {
  const top = new Animated.Value(0);
  const left = new Animated.Value(0);

  const [bgLogo, setBgLogo] = useState('test');
  const [logo, setLogo] = useState('test');
  const [desc, setdesc] = useState('test');

  useEffect(() => {
    axios.get('https://hikvisionindonesia.co.id/api/back.php').then((res) => {
      // console.log(res.data);
      setBgLogo(res.data);
    });

    axios.get('https://hikvisionindonesia.co.id/api/logo.php').then((res) => {
      // console.log(res.data);
      setLogo(res.data);
    });

    axios
      .get('https://hikvisionindonesia.co.id/api/keterangan.php')
      .then((res) => {
        // console.log(res.data);
        setdesc(res.data);
      });
  }, []);

  Animated.timing(
    top, // The animated value to drive
    {
      toValue: 50, // Animate to opacity: 1 (opaque)
      duration: 1000, // Make it take a while
      useNativeDriver: false,
    },
  ).start();

  Animated.timing(
    left, // The animated value to drive
    {
      toValue: 20, // Animate to opacity: 1 (opaque)
      duration: 1000, // Make it take a while
      useNativeDriver: false,
    },
  ).start();

  return (
    <ImageBackground source={{uri: bgLogo}} style={styles.bg}>
      <View
        style={{
          paddingHorizontal: 20,
          marginVertical: 20,
          marginTop: '35%',
          justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <Animated.Image
          source={{uri: logo}}
          style={{
            alignSelf: 'center',
            width: 150,
            height: 150,
            top: top,
          }}
        />

        <Button
          onPress={() => navigation.navigate('Login')}
          buttonStyle={{
            backgroundColor: 'red',
            height: 45,
            width: '100%',
            marginTop: '45%',
            marginBottom: 20,
          }}
          icon={
            <Icon
              style={{
                marginRight: 5,
              }}
              name="sign-in"
              size={15}
              color="white"
            />
          }
          title="LOGIN"
        />

        <Button
          onPress={() => navigation.navigate('Register')}
          buttonStyle={{
            backgroundColor: 'gray',
            height: 45,
          }}
          icon={
            <Icon
              style={{
                marginRight: 5,
              }}
              name="bookmark"
              size={15}
              color="white"
            />
          }
          title="REGISTER"
        />
      </View>

      <View>
        <Animated.Text
          style={{
            // maxWidth: 250,
            fontSize: 20,
            color: 'white',
            backgroundColor: 'red',
            padding: left,
            opacity: 0.7,
            fontFamily: 'Montserrat-Medium',
            textAlign: 'center',
          }}>
          {desc}
        </Animated.Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    paddingTop: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    maxWidth: 250,
    fontSize: 20,
    color: 'white',
    backgroundColor: 'red',
    padding: 20,
    opacity: 0.7,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'left',
  },
});
