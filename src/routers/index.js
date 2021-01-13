import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import {
  Splash,
  GetStarted,
  Login,
  Register,
  Home,
  Account,
  Scanner,
  Hasil,
  Point,
  Redeem,
  EditProfile,
  GetRedeem,
  Info,
  Hadiah,
  Otp,
  Lupa,
  List,
  Notifikasi,
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../components';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Scanner" component={Scanner} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default function Router() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={({route, navigation}) => ({
          // get reference to navigation
          headerTitle: 'GPT ePartner',
          headerLeft: false,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'red',
            elevation: 0, // remove shadow on Android
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifikasi')}
              style={{
                // marginRight: 100,
                padding: 10,
                margin: 10,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'yellow',
              }}>
              <Icon name="bell" type="font-awesome" color="white" size={20} />
            </TouchableOpacity>
          ),
        })}
        // options={{
        //   // headerShown: false,

        //   headerRight: ({navigation}) => (
        //     <TouchableOpacity
        //       onPress={() => alert('test')}
        //       style={{
        //         // marginRight: 100,
        //         padding: 10,
        //         margin: 10,
        //         width: 100,
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         // backgroundColor: 'yellow',
        //       }}>
        //       <Icon name="bell" type="font-awesome" color="white" size={20} />
        //     </TouchableOpacity>
        //   ),
        // }}
      />

      <Stack.Screen name="Hasil" component={Hasil} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen
        name="Point"
        component={Point}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'red',
            elevation: 0, // remove shadow on Android
          },
        }}
      />
      <Stack.Screen
        name="Redeem"
        component={Redeem}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'red',
            elevation: 0, // remove shadow on Android
          },
        }}
      />
      <Stack.Screen
        name="GetRedeem"
        component={GetRedeem}
        options={{
          headerTitle: 'Redeem Point',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'red',
            elevation: 0, // remove shadow on Android
          },
        }}
      />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen
        name="Hadiah"
        component={Hadiah}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'red',
            elevation: 0, // remove shadow on Android
          },
        }}
      />
      <Stack.Screen
        name="Notifikasi"
        component={Notifikasi}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'red',
            elevation: 0, // remove shadow on Android
          },
        }}
      />
      <Stack.Screen
        name="List"
        component={List}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}} />
      <Stack.Screen
        name="Lupa"
        component={Lupa}
        options={{headerShown: false}}
      />

      {/* untuk main App */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
