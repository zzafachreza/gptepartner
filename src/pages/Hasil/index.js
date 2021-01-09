import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';
import {storeData, getData} from '../../utils/localStorage';

export default function Hasil({navigation, route}) {
  const data = route.params;
  const [user, setUser] = useState({});
  const [barang, setBarang] = useState('');

  useEffect(() => {
    getData('user').then((res) => {
      setIdUser(res.id);
    });

    axios
      .post('https://hikvisionindonesia.co.id/api/get.php', {
        key: data.barcode,
      })
      .then((res) => {
        console.log(res.data.nama);
        setBarang(res.data.nama);
        setpoint(res.data.point);
      });
  }, []);

  const [loading, setLoading] = useState(false);
  const [iduser, setIdUser] = useState(0);
  const [no_seri, setno_seri] = useState(data.barcode);
  const [keterangan, setketerangan] = useState('CCTV OKE YA');
  const [point, setpoint] = useState(0);

  const simpan = () => {
    // navigation.replace('Point');

    setLoading(true);

    const insertdata = {
      id: iduser,
      no_seri: no_seri,
      keterangan: keterangan,
      point: point,
    };

    // console.log(insertdata);

    axios
      .post('https://hikvisionindonesia.co.id/api/getreward.php', insertdata)
      .then((res) => {
        // console.log(res);

        if (res.data.kode == 50) {
          showMessage({
            message: res.data.msg,
            type: 'danger',
          });
          setLoading(false);
        } else {
          showMessage({
            message: res.data.msg,
            type: 'success',
          });

          navigation.replace('MainApp');
          setLoading(false);
        }
      });
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
          padding: 20,
          margin: 10,
        }}>
        <Text
          style={{
            fontSize: 22,
            color: 'gray',
            fontFamily: 'Montserrat-Medium',
          }}>
          Nomor Seri :
        </Text>
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'Montserrat-SemiBold',
          }}>
          {/* {iduser} */}
          {data.barcode}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          // height: 200,
          elevation: 1,
          padding: 20,
          margin: 10,
        }}>
        <Text
          style={{
            fontSize: 22,
            color: 'gray',
            fontFamily: 'Montserrat-Medium',
          }}>
          Nama Product :
        </Text>
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'Montserrat-SemiBold',
          }}>
          {barang}
        </Text>
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
          Point Yang di dapat
        </Text>
        <Text
          style={{
            fontSize: 50,
            color: 'black',
            fontFamily: 'Montserrat-Bold',
          }}>
          {point}
        </Text>
      </View>
      <TouchableOpacity
        onPress={simpan}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
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
          DAPATKAN POINT
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
