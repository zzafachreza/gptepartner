import React, {useState} from 'react';
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
import axios from 'axios';

export default function Register({navigation}) {
  const [nama, setNama] = useState('');
  const [telepon, setTelepon] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alamat, setAlamat] = useState('');
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
      nama: nama,
      telepon: telepon,
      email: email,
      password: password,
      alamat: alamat,
    };
    // console.log(data);

    axios
      .post('https://hikvisionindonesia.co.id/api/register.php', data)
      .then(function (response) {
        // console.log(response);
        setLoading(false);

        let err = response.data.split('#');
        // console.log(err[0]);
        if (err[0] == 50) {
          showMessage({
            message: err[1],
            type: 'danger',
          });
        } else {
          // showMessage({
          //   message: response.data,
          //   type: 'success',
          // });
          navigation.replace('Otp', {
            otp: telepon,
          });
        }
      })
      .catch(function (error) {
        // console.log(error);
      });

    // setTimeout(() => {
    //   alert('aa');
    // }, 3000);
  };

  return (
    <ScrollView style={styles.page}>
      <Text
        style={{
          fontSize: 30,
          marginLeft: 10,
          marginBottom: '10%',
        }}>
        Silahkan Daftar Terlebih dahulu Sebelum Login
      </Text>

      <Input
        autoFocus={true}
        label="Nama Lengkap : "
        placeholder="masukan nama lengkap"
        leftIcon={{type: 'font-awesome', name: 'user'}}
        value={nama}
        onChangeText={(value) => setNama(value)}
      />

      <Input
        keyboardType="email-address"
        label="E-mail : "
        autoCapitalize="none"
        placeholder="masukan alamat email"
        leftIcon={{type: 'font-awesome', name: 'envelope'}}
        value={email}
        // onChangeText={(value) => setEmail(value)}
        onChangeText={(value) => validate(value)}
        color={valid == false ? 'red' : 'black'}
      />

      <Input
        label="Password : "
        placeholder="masukan password"
        leftIcon={{type: 'font-awesome', name: 'key'}}
        secureTextEntry={true}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />

      <Input
        keyboardType="phone-pad"
        label="Nomor Telepon : "
        placeholder="masukan nomor telepon"
        leftIcon={{type: 'font-awesome', name: 'phone'}}
        value={telepon}
        onChangeText={(value) => setTelepon(value)}
      />

      <Input
        label="Alamat : "
        placeholder="masukan alamat"
        leftIcon={{type: 'font-awesome', name: 'map'}}
        value={alamat}
        onChangeText={(value) => setAlamat(value)}
        multiline={true}
      />

      {valid && (
        // <Button
        //   onPress={handleSave}
        //   buttonStyle={{
        //     backgroundColor: 'red',
        //     height: 45,
        //     marginTop: '5%',
        //     marginBottom: 20,
        //   }}
        //   icon={
        //     <Icon
        //       style={{
        //         marginRight: 5,
        //       }}
        //       name="bookmark"
        //       size={15}
        //       color="white"
        //     />
        //   }
        //   title="REGISTER"
        // />
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
            <Icon name="bookmark" size={20} color="white" />
            REGISTER
          </Text>
        </TouchableOpacity>
      )}

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
    paddingTop: '10%',
  },
});
