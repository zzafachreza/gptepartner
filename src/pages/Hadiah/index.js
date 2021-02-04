import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {storeData, getData} from '../../utils/localStorage';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Hadiah({navigation, route}) {
  const [point, setPoint] = useState(0);
  const oldPoint = route.params;

  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios.get('https://hikvisionindonesia.co.id/api/hadiah.php').then((res) => {
      // console.log(res.data);
      setData(res.data);
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const simpan = () => {
    setLoading(true);
    // alert(point);
    // navigation.replace('Redeem');

    if (oldPoint.z < point) {
      setLoading(false);
      showMessage({
        message: 'Maaf point Anda tidak mencukupi !',
        type: 'warning',
      });
    } else {
      axios
        .post('https://hikvisionindonesia.co.id/api/getredeem.php', {
          id: route.params.id,
          id_hadiah: oldPoint.id_hadiah,
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
            navigation.replace('MainApp', {id: oldPoint.id});
          }
        });
    }
  };

  useEffect(() => {
    axios.get('https://hikvisionindonesia.co.id/api/hadiah.php').then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['red']}
          />
        }
        style={{
          padding: 10,
        }}>
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
              fontFamily: 'Montserrat-SemiBold',
              marginBottom: 20,
            }}>
            Point Anda : {oldPoint.z}
          </Text>
          <Text
            style={{
              fontSize: 20,
            }}>
            Masukan Jumlah Point Yang Akan Diredeem
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
            value={point}
            onChangeText={(value) => setPoint(value)}
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
              REDEEM
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    </>
  );
}

const styles = StyleSheet.create({});
