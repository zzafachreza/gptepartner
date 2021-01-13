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
} from 'react-native';
import {storeData, getData} from '../../utils/localStorage';
import axios from 'axios';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Notifikasi({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios
      .get('https://hikvisionindonesia.co.id/api/notifikasi.php')
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    axios
      .get('https://hikvisionindonesia.co.id/api/notifikasi.php')
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);

  const renderItem = ({item}) => (
    <View
      style={{
        // padding: 10,
        margin: 10,
        backgroundColor: 'white',
        elevation: 2,
        // borderWidth: 1,
        // borderColor: 'red',
        borderRadius: 10,
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          padding: 0,
        }}>
        <View>
          <Image
            source={{uri: item.image}}
            style={{
              flex: 1,
              width: '100%',
              height: 200,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          />
        </View>
        <View
          style={{
            padding: 5,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: 'Montserrat-Medium',
              color: 'red',
            }}>
            {item.judul}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Montserrat-Medium',
              color: 'grey',
            }}>
            {item.tanggal}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Montserrat-Medium',
              color: 'black',
            }}>
            {item.keterangan}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
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
  );
}

const styles = StyleSheet.create({});
