import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {storeData, getData} from '../../utils/localStorage';
import axios from 'axios';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Point({navigation, route}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios
      .post('https://hikvisionindonesia.co.id/api/reward.php', {
        id: route.params.id,
      })
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    axios
      .post('https://hikvisionindonesia.co.id/api/reward.php', {
        id: route.params.id,
      })
      .then((res) => {
        // console.log(res.data);
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

        height: 80,
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Montserrat-Medium',
          }}>
          {item.tanggal}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Montserrat-Medium',
          }}>
          Mendapatkan Point Sebesar
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'red',
          borderWidth: 2,
          borderColor: 'red',
          borderRadius: 20,

          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Montserrat-Medium',
            color: 'red',
          }}>
          + {item.point}
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
