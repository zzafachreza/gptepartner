import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  ImageBackground,
} from 'react-native';
// import {FlatListSlider} from 'react-native-flatlist-slider';
import {Icon, ListItem} from 'react-native-elements';
import {storeData, getData} from '../../utils/localStorage';
import axios from 'axios';

import Carousel from 'react-native-snap-carousel';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Home({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [user, setUser] = useState({});
  const [point, setPoint] = useState(0);
  const [data, setData] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    getData('user').then((res) => {
      setUser(res);
      axios
        .post('https://hikvisionindonesia.co.id/api/point.php', {id: res.id})
        .then(function (response) {
          // console.log(response);
          setPoint(response.data);
        });
      axios
        .get('https://hikvisionindonesia.co.id/api/slider.php')
        .then((res) => {
          // console.log(res.data);
          setData(res.data);
        });
    });

    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getData('user').then((res) => {
      setUser(res);
      axios
        .post('https://hikvisionindonesia.co.id/api/point.php', {id: res.id})
        .then(function (response) {
          // console.log(response);
          setPoint(response.data);
        });
      axios
        .get('https://hikvisionindonesia.co.id/api/slider.php')
        .then((res) => {
          // console.log(res.data);
          setData(res.data);
        });
    });
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // console.log('lebar' + windowWidth);

  const _renderItem = ({item, index}) => {
    return (
      <ImageBackground
        source={{uri: item.image}}
        style={{
          height: 200,
          padding: 50,
          // marginBottom: 100,
          // marginLeft: 20,
          // marginRight: 20,
        }}>
        {/* <Text style={{fontSize: 30}}>{item.id}</Text> */}
        <Text
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: 10,
            position: 'absolute',
            bottom: 0,
            right: 0,
            opacity: 0.9,
            justifyContent: 'center',
            alignSelf: 'flex-start',
          }}>
          {item.desc}
        </Text>
      </ImageBackground>
    );
  };

  return (
    <ScrollView
      style={styles.page}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['red']}
        />
      }>
      <View
        style={{
          backgroundColor: 'red',
          height: 100,
          padding: 20,
          marginBottom: 50,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 50,
          elevation: 2,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            bottom: 10,
            fontFamily: 'Montserrat-Medium',
          }}>
          Selamat datang,
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 22,

            bottom: 10,
            fontFamily: 'Montserrat-Bold',
          }}>
          {user.nama_lengkap}
        </Text>

        <View
          style={{
            height: 80,
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 2,
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 2,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontFamily: 'Montserrat-Regular',
              }}>
              Point Anda
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 30,
                left: 10,
                fontWeight: 'bold',
              }}>
              {point}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('GetRedeem', {point: point, id: user.id})
            }
            style={{
              flex: 3,
              backgroundColor: 'white',
              // elevation: 1,
              // zIndex: 100,
              // borderRadius: 50,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Icon
              name="cloud-upload"
              type="font-awesome"
              color="red"
              size={35}
            />
            <Text
              style={{
                fontFamily: 'Nunito-Light',
                color: 'red',
              }}>
              Redeem
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          backgroundColor: 'red',
          paddingTop: 5,
          elevation: 1,
          // bottom: 5,
          borderTopLeftRadius: 35,
        }}>
        <View
          style={{
            padding: 5,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              right: 10,
              fontFamily: 'Nunito-Bold',
              color: 'white',
            }}>
            Info dan Promo Spesial
          </Text>
        </View>

        {/* <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}> */}
      </View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        data={data}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        renderItem={_renderItem}
        activeDotIndex
        autoplay={true}
        autoplayDelay={2000}
        autoplayInterval={3000}
        activeAnimationType="spring"
        loop={true}
        // onSnapToItem = { index => this.setState({activeIndex:index}) }
      />

      <View
        style={{
          backgroundColor: 'red',
          height: windowHeight / 3,
          // margin: 10,
          paddingHorizontal: 20,
          paddingBottom: '10%',
          paddingTop: '2%',
          // borderBottomLeftRadius: 30,
          // borderBottomRightRadius: 30,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Point', {id: user.id})}>
          <ListItem bottomDivider>
            <Icon
              name="credit-card"
              type="font-awesome"
              color="red"
              size={30}
            />
            <ListItem.Content>
              <ListItem.Title>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  History Point Saya
                </Text>
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Redeem', {id: user.id})}>
          <ListItem bottomDivider>
            <Icon name="gift" type="font-awesome" color="red" size={30} />
            <ListItem.Content>
              <ListItem.Title>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  History Redeem Saya
                </Text>
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
});
