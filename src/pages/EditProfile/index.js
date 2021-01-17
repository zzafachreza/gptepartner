import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';

export default function EditProfile({navigation, route}) {
  const [user, setUser] = useState({});

  const [nama, setNama] = useState('');
  const [telepon, setTelepon] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alamat, setAlamat] = useState('');
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const [idUser, setIduser] = useState('');

  useEffect(() => {
    const data = route.params;
    // console.log(data);
    setNama(data.nama_lengkap);
    setTelepon(data.tlp);
    setEmail(data.email);
    setAlamat(data.alamat);
    setIduser(data.id);
  }, []);

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
      id: idUser,
      nama: nama,
      telepon: telepon,
      email: email,
      password: password,
      alamat: alamat,
    };
    // console.log(data);

    axios
      .post('https://hikvisionindonesia.co.id/api/profile.php', data)
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
          showMessage({
            message: response.data,
            type: 'success',
          });
          navigation.replace('GetStarted');
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  return (
    <ScrollView style={styles.page}>
      <Input
        autoFocus={true}
        label="Nama Lengkap : "
        placeholder="masukan nama lengkap"
        leftIcon={{type: 'font-awesome', name: 'user'}}
        value={nama}
        onChangeText={(value) => setNama(value)}
      />

      <Input
        label="Nomor Telepon : "
        placeholder="masukan nomor telepon"
        leftIcon={{type: 'font-awesome', name: 'phone'}}
        value={telepon}
        keyboardType="number-pad"
        onChangeText={(value) => setTelepon(value)}
      />

      <Input
        label="E-mail : (Tidak Dapat Diubah)"
        placeholder="masukan alamat email"
        keyboardType="email-address"
        leftIcon={{type: 'font-awesome', name: 'envelope'}}
        value={email}
        editable={false}
        onChangeText={(value) => validate(value)}
        color={'red'}
      />

      <Input
        label="Password : "
        placeholder="kosongkan jika tidak ganti password"
        leftIcon={{type: 'font-awesome', name: 'key'}}
        secureTextEntry={true}
        value={password}
        autoCapitalize="none"
        onChangeText={(value) => setPassword(value)}
      />

      <Input
        label="Alamat : "
        placeholder="masukan alamat"
        leftIcon={{type: 'font-awesome', name: 'map'}}
        value={alamat}
        multiline={true}
        onChangeText={(value) => setAlamat(value)}
      />

      <Button
        onPress={handleSave}
        buttonStyle={{
          backgroundColor: 'red',
          height: 45,
          marginTop: '5%',
          marginBottom: 20,
        }}
        icon={
          <Icon
            style={{
              marginRight: 5,
            }}
            name="bookmark"
            size={15}
            color="white"
          />
        }
        title="SIMPAN"
      />

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
