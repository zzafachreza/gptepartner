import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Avatar,
  Accessory,
  Divider,
  ListItem,
  // Icon,
  Button,
} from 'react-native-elements';
import {storeData, getData} from '../../utils/localStorage';

export default function Account({navigation}) {
  const [user, setUser] = useState({});
  const [iLogo, setiLogo] = useState('');

  useEffect(() => {
    getData('user').then((res) => {
      setUser(res);
      // console.log(user);
      setiLogo(res.nama_lengkap.substring(0, 1));
    });
  }, []);

  const handleSave = () => {
    storeData('user', null);

    navigation.replace('GetStarted');
  };

  return (
    <View
      style={{
        padding: 10,
        // backgroundColor: 'blue',

        flex: 1,
        flexDirection: 'column',
      }}>
      <View
        style={{
          padding: 10,
          // backgroundColor: 'yellow',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <View
          style={{
            // borderWidth: 1,
            backgroundColor: 'gray',
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <Text
            style={{
              fontSize: 50,
              color: 'white',
            }}>
            {iLogo}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            top: 10,
          }}>
          {user.nama_lengkap}
        </Text>
        <Divider style={{backgroundColor: 'red', height: 1}} />
        <Text
          style={{
            fontSize: 16,
            top: 10,
          }}>
          {user.tlp}
        </Text>

        <Button
          onPress={() => navigation.navigate('EditProfile', user)}
          title="Update Profile"
          icon={
            <Icon
              style={{
                marginRight: 5,
              }}
              name="pencil"
              size={15}
              color="white"
            />
          }
          buttonStyle={{
            backgroundColor: 'red',
            height: 45,
            marginTop: '5%',
            borderRadius: 10,
            marginBottom: 20,

            padding: 20,
          }}
        />
      </View>
      <View
        style={{
          padding: 10,
          // backgroundColor: 'green',
          flex: 1,
        }}>
        <ListItem bottomDivider>
          <Icon name="envelope" type="font-awesome" color="red" size={20} />
          <ListItem.Content>
            <ListItem.Title>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Email
              </Text>
            </ListItem.Title>
            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider>
          <Icon name="home" type="font-awesome" color="red" size={20} />
          <ListItem.Content>
            <ListItem.Title>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Alamat
              </Text>
            </ListItem.Title>
            <ListItem.Subtitle>{user.alamat}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <Button
          onPress={handleSave}
          title="Sign Out"
          icon={
            <Icon
              style={{
                marginRight: 5,
              }}
              name="sign-out"
              size={15}
              color="white"
            />
          }
          buttonStyle={{
            backgroundColor: 'grey',
            height: 45,
            marginTop: '5%',
            borderRadius: 10,
            marginBottom: 20,
            padding: 20,
            margin: 5,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
