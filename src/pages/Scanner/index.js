import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Icon, ListItem} from 'react-native-elements';

export default function Scanner({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [lampu, setlampu] = useState(false);

  const top = new Animated.Value(0);
  const bottom = new Animated.Value(1);

  useEffect(() => {
    Animated.timing(
      top, // The animated value to drive
      {
        toValue: windowHeight / 2 - 5, // Animate to opacity: 1 (opaque)
        duration: 3500, // Make it take a while
        useNativeDriver: false,
      },
    ).start();

    Animated.timing(
      bottom, // The animated value to drive
      {
        toValue: 0, // Animate to opacity: 1 (opaque)
        duration: 1200, // Make it take a while
        useNativeDriver: false,
      },
    ).start();
  }, []);

  const barcodeReceived = (result) => {
    // alert(result);
    navigation.navigate('Hasil', {barcode: result.data});
  };

  return (
    <View style={styles().container}>
      <RNCamera
        style={styles().preview}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={
          lampu
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={barcodeReceived}>
        <View style={styles(windowHeight).box}>
          <Animated.View
            style={{
              borderWidth: 2,
              borderColor: 'red',
              width: '100%',
              position: 'absolute',
              marginTop: top,
              // top: 1,
            }}
          />
        </View>
        {/* {!lampu ? (
          <TouchableOpacity
            onPress={() => setlampu(true)}
            style={{
              width: '90%',
              backgroundColor: 'red',
              padding: 10,
            }}>
            <Icon name="flash" type="font-awesome" color="white" size={35} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setlampu(false)}
            style={{
              width: '90%',
              backgroundColor: 'grey',
              padding: 10,
            }}>
            <Icon name="times" type="font-awesome" color="white" size={35} />
          </TouchableOpacity>
        )} */}
      </RNCamera>
    </View>
  );
}

const styles = (windowHeight) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
    box: {
      width: '90%',
      height: windowHeight / 2,
      // borderRadius: 10,
      borderWidth: 2,
      // justifyContent: 'center',
      borderColor: 'grey',
      padding: 1,
      marginBottom: '5%',
    },
    line: {},
  });
