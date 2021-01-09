import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

import axios from 'axios';

export default function GetRedeem({navigation, route}) {
  const [point, setpoint] = useState(0);
  const [loading, setLoading] = useState(false);

  const simpan = () => {
    setLoading(true);
    // navigation.replace('Redeem');

    if (route.params.point < point) {
      setLoading(false);
      showMessage({
        message: 'Maaf point Anda tidak mencukupi !',
        type: 'warning',
      });
    } else {
      axios
        .post('https://hikvisionindonesia.co.id/api/getredeem.php', {
          id: route.params.id,
          point: point,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.kode == 50) {
            setLoading(false);
            showMessage({
              message: res.data.msg,
              type: 'danger',
            });
          } else {
            setLoading(false);
            showMessage({
              message: 'Redeem Point Berhasil',
              type: 'success',
            });
            navigation.replace('MainApp', {id: route.params.id});
          }
        });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          // height: 200,
          elevation: 1,
          flexDirection: 'row',
          padding: 20,
          margin: 10,
        }}>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 22,
              color: 'gray',
              fontFamily: 'Montserrat-Medium',
            }}>
            Point Anda :
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {route.params.point}
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Hadiah')}
            style={{
              backgroundColor: 'red',
              padding: 15,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: 'white',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Lihat Hadiah
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          // backgroundColor: 'white',
          // height: 200,

          // elevation: 1,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'gray',
            fontFamily: 'Montserrat-MediumLight',
          }}>
          Jumlah Point Yang di Redeem
        </Text>

        <TextInput
          autoFocus={true}
          keyboardType="numeric"
          style={{
            borderBottomWidth: 1,
            width: 120,
            textAlign: 'center',
            fontSize: 50,
            color: 'black',
            fontFamily: 'Montserrat-Bold',
          }}
          value={point}
          onChangeText={(value) => setpoint(value)}
        />
      </View>
      <TouchableOpacity
        onPress={simpan}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'gray',
          height: 45,
          marginHorizontal: 10,
          borderRadius: 5,
        }}>
        <Text
          style={{
            // fontSize: 50,
            color: 'white',
            fontFamily: 'Montserrat-Medium',
          }}>
          REDEEM POINT ANDA
        </Text>
      </TouchableOpacity>
      {loading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            width: '100%',
            top: 0,
            opacity: 0.4,
            height: '100%',
          }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </View>
  );
}
