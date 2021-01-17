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
import {Icon, ListItem, Button} from 'react-native-elements';
import {storeData, getData} from '../../utils/localStorage';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import OneSignal from 'react-native-onesignal';
import Carousel from 'react-native-snap-carousel';
import CountDown from 'react-native-countdown-component';
import Modal from 'react-native-modal';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Home({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(true);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const [user, setUser] = useState({});
  const [point, setPoint] = useState(0);
  const [data, setData] = useState([]);
  const [popup, setPopup] = useState('');
  const [popup2, setPopup2] = useState('');
  const [exp, setExp] = useState('');
  const [totalDuration, setTotalDuration] = useState(false);

  const tutup = () => {
    setModalVisible(false);
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
    OneSignal.setAppId('005361d7-6c23-47a0-ab5d-f2120576bbb7');
    OneSignal.setNotificationOpenedHandler((openedEvent) => {
      console.log('OneSignal: notification opened:', openedEvent);
      const {action, notification} = openedEvent;
      navigation.replace('Notifikasi');
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
    axios.get('https://hikvisionindonesia.co.id/api/popup2.php').then((res) => {
      setPopup2(res.data);
    });

    axios.get('https://hikvisionindonesia.co.id/api/tgl.php').then((res) => {
      setExp(res.data);
      // console.log(obj.now);
      setTimeout(() => {
        setTotalDuration(true);
      }, 1000);
    });
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const _renderItem = ({item, index}) => {
    return (
      <ImageBackground
        source={{uri: item.image}}
        style={{
          height: 200,
          padding: 50,
        }}>
        {/* <Text style={{fontSize: 30}}>{item.id}</Text> */}
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
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
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
            borderTopLeftRadius: 50,
          }}>
          <View
            style={{
              padding: 5,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 18,
                left: 20,
                fontFamily: 'Nunito-Bold',
                color: 'white',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              Info dan Promo Spesial
            </Text>
            {totalDuration && (
              <>
                <CountDown
                  size={15}
                  until={exp}
                  onFinish={() => alert('Finished')}
                  digitStyle={{
                    backgroundColor: '#FFF',
                  }}
                  ds
                  digitTxtStyle={{color: '#000'}}
                  timeLabelStyle={{color: '#FFF', fontWeight: 'bold'}}
                  separatorStyle={{color: '#FFF'}}
                  timeToShow={['H', 'M', 'S']}
                  disableHoursLimit
                  timeLabels={{h: 'Jam', m: 'Menit', s: 'Detik'}}
                  showSeparator
                />
              </>
            )}
          </View>
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
            paddingHorizontal: 20,
            paddingBottom: '10%',
            paddingTop: '2%',
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
      <Modal
        isVisible={isModalVisible2}
        animationIn="zoomInDown"
        animationOut="zoomOutDown"
        animationOutTiming={2000}
        deviceHeight={windowHeight}
        animationInTiming={1000}>
        <TouchableOpacity
          onPress={() => setModalVisible2(false)}
          style={{
            flex: 1,
          }}>
          <Icon name="times" type="font-awesome" color="red" size={35} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible2(false);
            navigation.navigate('Notifikasi');
          }}
          style={{
            position: 'absolute',
          }}>
          <FastImage
            style={{
              height: windowWidth,
              width: windowWidth,
              // flex: 1,
            }}
            source={{
              uri: popup2,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </Modal>
      {modalVisible && (
        <>
          <TouchableOpacity
            onPress={tutup}
            style={{
              position: 'absolute',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              top: windowHeight / 2 - 40,
              right: 20,
              padding: 5,
              // backgroundColor: 'white',
            }}>
            <Icon name="times" type="font-awesome" color="red" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('Notifikasi');
              setModalVisible2(true);
            }}
            style={{
              // flex: 1,
              position: 'absolute',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              top: windowHeight / 2,
              right: 0,
            }}>
            <FastImage
              style={{
                height: 100,
                width: 100,
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
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
});
