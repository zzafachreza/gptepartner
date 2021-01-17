import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import {storeData, getData} from '../../utils/localStorage';
import axios from 'axios';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const validate = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // console.log('Email is Not Correct');
      setEmail(text);
      setValid(false);
      return false;
    } else {
      setEmail(text);
      setValid(true);
      // console.log('Email is Correct');
    }
  };

  const handleSave = () => {
    setLoading(true);
    const data = {
      email: email,
      password: password,
    };
    // console.log(data);

    axios
      .post('https://hikvisionindonesia.co.id/api/login.php', data)
      .then(function (response) {
        // console.log(response);
        setLoading(false);

        const data = response.data;
        // console.log(data);

        if (data.kode == 50) {
          showMessage({
            message: data.msg,
            type: 'danger',
          });
        } else {
          showMessage({
            message: 'Selamat datang ' + data.nama_lengkap,
            type: 'success',
          });

          storeData('user', data).then(() => {
            navigation.replace('MainApp');
          });
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  return (
    <ScrollView style={styles.page}>
      <Text
        style={{
          fontSize: 30,
          maxWidth: 250,
          marginLeft: 10,
          marginBottom: '10%',
          fontFamily: 'Montserrat-Medium',
        }}>
        Silahkan Anda Login Terlebih Dahulu
      </Text>

      <Input
        autoFocus={true}
        placeholder="masukan alamat email"
        autoCapitalize="none"
        leftIcon={{type: 'font-awesome', name: 'envelope'}}
        value={email}
        // onChangeText={(value) => setEmail(value)}
        color={valid == false ? 'red' : 'black'}
        onChangeText={(value) => validate(value)}
      />

      <Input
        placeholder="masukan password"
        leftIcon={{type: 'font-awesome', name: 'key'}}
        secureTextEntry={true}
        value={password}
        autoCapitalize="none"
        onChangeText={(value) => setPassword(value)}
      />

      {valid && (
        <TouchableOpacity
          onPress={handleSave}
          style={{
            backgroundColor: 'red',
            height: 45,
            marginTop: '5%',
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontFamily: 'Montserrat-Medium',
            }}>
            <Icon name="sign-in" size={20} color="white" />
            LOGIN
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => navigation.replace('Lupa')}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: 'grey',
            fontFamily: 'Nunito-Bold',
          }}>
          Lupa Password ? Klik disini
        </Text>
      </TouchableOpacity>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingTop: '30%',
  },
});
