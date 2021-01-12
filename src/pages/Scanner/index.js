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
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {storeData, getData} from '../../utils/localStorage';
import axios from 'axios';
import {TextInput} from 'react-native-gesture-handler';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Scanner({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('');

  const pencarian = () => {
    setLoading(true);
    // alert(key);
    axios
      .post('https://hikvisionindonesia.co.id/api/get_name.php', {
        key: key,
      })
      .then((res) => {
        // console.log(res.data);
        setLoading(false);
        setData(res.data);
      });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('List', {
          id: item.id,
        })
      }
      style={{
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'white',
        elevation: 1,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          padding: 10,
        }}>
        <View style={{flex: 2}}></View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Montserrat-Medium',
            color: 'black',
          }}>
          {item.nama}
        </Text>
        {/* <Text
          style={{
            fontSize: 18,
            fontFamily: 'Montserrat-Medium',
            color: 'black',
          }}>
          {item.harga}
        </Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View
        style={{
          padding: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 20,
            // padding: 10,
          }}>
          <TextInput
            style={{
              flex: 2,
              borderWidth: 1,
              paddingLeft: 10,
              height: 45,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              borderColor: 'grey',
              fontSize: 18,
              fontFamily: 'Ninito-Light',
            }}
            autoFocus={true}
            autoCapitalize="none"
            placeholder="masukan nama barang"
            value={key}
            onChangeText={(value) => setKey(value)}
          />

          <TouchableOpacity
            onPress={pencarian}
            style={{
              flex: 1,
              backgroundColor: 'black',
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontFamily: 'Ninito-Light',
              }}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>
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
            opacity: 0.6,
            height: '100%',
          }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
