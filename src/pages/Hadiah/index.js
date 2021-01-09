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

export default function Hadiah({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);

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

  const renderItem = ({item}) => (
    <View
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
        <View style={{flex: 2}}>
          <Image
            source={{uri: item.image}}
            style={{flex: 1, width: '80%', height: 100}}
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
