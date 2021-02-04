import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  Alert,
} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

import axios from 'axios';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
export default function GetRedeem({navigation, route}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [point, setpoint] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios.get('https://hikvisionindonesia.co.id/api/hadiah.php').then((res) => {
      // console.log(res.data);
      setData(res.data);
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    axios.get('https://hikvisionindonesia.co.id/api/hadiah.php').then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  const ambil = (id_hadiah, z) => {
    if (route.params.point < z) {
      setLoading(false);
      showMessage({
        message: 'Maaf point Anda tidak mencukupi !',
        type: 'warning',
      });
    } else {
      if (z > 1) {
        Alert.alert(
          'GPT ePartner',
          'Anda yakin akan redeem sebesar ' + z + ' Point ?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => simpan(id_hadiah, z)},
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          'GPT ePartner',
          'Anda yakin akan redeem Point Cash Back Tunai ?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () =>
                navigation.navigate('Hadiah', {
                  z: route.params.point,
                  id: route.params.id,
                  id_hadiah: id_hadiah,
                }),
            },
          ],
          {cancelable: false},
        );
      }
    }
  };

  const simpan = (id_hadiah, x) => {
    setLoading(true);
    // navigation.replace('Redeem');

    if (route.params.point < x) {
      setLoading(false);
      showMessage({
        message: 'Maaf point Anda tidak mencukupi !',
        type: 'warning',
      });
    } else {
      axios
        .post('https://hikvisionindonesia.co.id/api/getredeem.php', {
          id: route.params.id,
          id_hadiah: id_hadiah,
          point: x,
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

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => ambil(item.id, item.point)}
      style={{
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        elevation: 1,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
        flexDirection: 'row',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'red',
          borderWidth: 2,
          borderColor: 'gray',
          borderRadius: 20,

          flex: 1,
        }}>
        {item.point == 1 ? (
          <Image
            source={require('../../assets/dolar.png')}
            style={{
              width: 50,
              height: 50,
            }}
          />
        ) : (
          <>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Montserrat-Medium',
                color: 'red',
              }}>
              {item.point}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Montserrat-bold',
              }}>
              Point
            </Text>
          </>
        )}
      </View>

      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'Montserrat-Medium',
          }}>
          Mendapatkan Hadiah
        </Text>
        <View
          style={{
            flex: 2,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item.image}}
            style={{width: 150, resizeMode: 'contain', aspectRatio: 1}}
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Montserrat-Medium',
            color: 'red',
          }}>
          {item.nama}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Montserrat-Medium',
            color: 'grey',
          }}>
          {item.keterangan}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
          padding: 10,
          margin: 10,
        }}>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'yellow',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
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
            // backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </View>
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
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
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
    </View>
  );
}
