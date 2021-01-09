import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

import axios from 'axios';

export default function Otp({navigation, route}) {
  const [newotp, setNewOtp] = useState('');

  const simpan = () => {
    if (newotp === validasi) {
      showMessage({
        message:
          'Selamat Berhasil mendaftar, silahkan hubungi admin untuk segera aktifasi',
        type: 'success',
      });
      navigation.replace('Login');
    } else {
      showMessage({
        message: 'Kode OTP salah !',
        type: 'danger',
      });
    }
  };

  const otp = route.params.otp;

  const validasi =
    otp.substring(9, 11) + otp.substring(4, 6) + otp.substring(1, 3);

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
        }}>
        {/* {validasi} */}
        Masukan Kode OTP
      </Text>

      <TextInput
        autoFocus={true}
        keyboardType="numeric"
        maxLength={6}
        style={{
          borderBottomWidth: 1,
          width: 170,
          textAlign: 'center',
          fontSize: 50,
          color: 'black',
          fontFamily: 'Montserrat-Bold',
        }}
        value={newotp}
        onChangeText={(value) => setNewOtp(value)}
      />
      <TouchableOpacity
        onPress={simpan}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
          height: 45,
          paddingHorizontal: 50,
          marginVertical: 50,
          borderRadius: 5,
        }}>
        <Text
          style={{
            // fontSize: 50,
            color: 'white',
            fontFamily: 'Montserrat-Medium',
          }}>
          VALIDASI OTP
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
