import React, {useEffect} from 'react';
import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';

export default function Scanner({navigation}) {
  const barcodeReceived = (result) => {
    // alert(result);

    navigation.navigate('Hasil', {barcode: result});
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <Text>Scanner</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
