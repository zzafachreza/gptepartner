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
  Image,
  ActivityIndicator,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
// import {FlatListSlider} from 'react-native-flatlist-slider';
import {Icon, ListItem} from 'react-native-elements';
import {storeData, getData} from '../../utils/localStorage';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import OneSignal from 'react-native-onesignal';

import Carousel from 'react-native-snap-carousel';
import ImageModal from 'react-native-image-modal';
import Draggable from 'react-native-draggable';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Home({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [user, setUser] = useState({});
  const [point, setPoint] = useState(0);
  const [data, setData] = useState([]);
  const [popup, setPopup] = useState('');

  const tutup = () => {
    Alert.alert(
      'GPT ePartner',
      'Sembunyikan ini ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => setModalVisible(false)},
      ],
      {cancelable: false},
    );
  };

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
    // OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('005361d7-6c23-47a0-ab5d-f2120576bbb7');

    OneSignal.setNotificationOpenedHandler((openedEvent) => {
      console.log('OneSignal: notification opened:', openedEvent);
      const {action, notification} = openedEvent;
      navigation.replace('Notifikasi');
    });

    OneSignal.addSubscriptionObserver((event) => {
      console.log('OneSignal: subscription changed:', event);
    });

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

    axios.get('https://hikvisionindonesia.co.id/api/popup.php').then((res) => {
      setPopup(res.data);
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
    <>
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
            height: windowHeight / 10,
            padding: 20,
            // marginBottom: 0,
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
        </View>
        <View
          style={{
            height: windowHeight / 10,
            // paddingLeft: 30,
            // margin: 1,
            // elevation: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            // backgroundColor: 'yellow',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              // backgroundColor: 'yellow',
              justifyContent: 'center',
              // alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
              }}>
              Point Anda
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 30,
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
              flex: 1,
              backgroundColor: 'white',
              justifyContent: 'center',
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
                fontSize: 16,
              }}>
              Redeem
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'red',

            elevation: 1,
            // bottom: 5,
            borderTopLeftRadius: 50,
          }}>
          <View
            style={{
              padding: 5,
              // alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                left: 20,
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
            height: windowHeight / 3.5,
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
      {modalVisible && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Notifikasi');
            setTimeout(() => {
              setModalVisible(false);
            }, 1500);
          }}
          onLongPress={() => tutup()}
          style={{
            flex: 1,
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            // backgroundColor: 'white',
            width: '100%',
            top: 0,
            // opacity: 0.4,
            height: '100%',
          }}>
          <FastImage
            style={{
              height: 100,
              width: 100,
              // backgroundColor: '#ddd',

              flex: 1,
            }}
            source={{
              uri: popup,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    // backgroundColor: 'white',
    borderRadius: 20,
    // padding: 120,
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
