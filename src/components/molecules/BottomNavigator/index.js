import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

export default function BottomNavigator({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName = 'home';
        if (label === 'Home') {
          iconName = 'home';
        } else if (label === 'Scanner') {
          iconName = 'barcode';
        } else if (label === 'Account') {
          iconName = 'user';
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <View
              style={{
                color: isFocused ? 'red' : '#919095',
                backgroundColor: isFocused ? 'white' : '#FFFFFF',
                paddingTop: 5,
                paddingBottom: 0,
                fontSize: 12,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <View
                style={{
                  position: iconName === 'barcode' ? 'absolute' : 'relative',
                  backgroundColor: iconName === 'barcode' ? 'red' : 'white',
                  // borderTopWidth: iconName === 'barcode' && isFocused ? 5 : 0,
                  borderWidth: 3,
                  // borderColor: 'red',
                  // padding: 10,
                  // position: 'absolute',
                  position: iconName === 'barcode' ? 'absolute' : 'relative',
                  borderColor: iconName === 'barcode' ? 'white' : 'white',
                  borderRadius: iconName === 'barcode' ? 50 : 0,
                  width: iconName === 'barcode' ? 90 : 80,
                  marginBottom: iconName === 'barcode' ? 0 : 0,
                  bottom: iconName === 'barcode' ? -45 : 0,
                  height: iconName === 'barcode' ? 90 : 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {iconName === 'barcode' ? (
                  <Icon
                    name={iconName}
                    type="font-awesome"
                    color={isFocused ? 'white' : 'white'}
                  />
                ) : (
                  <Icon
                    name={iconName}
                    type="font-awesome"
                    color={isFocused ? 'red' : '#919095'}
                  />
                )}
                <Text
                  style={{
                    color:
                      isFocused && iconName == 'barcode'
                        ? 'white'
                        : !isFocused && iconName == 'barcode'
                        ? 'white'
                        : isFocused
                        ? 'red'
                        : '#919095',
                  }}>
                  {label}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: (iconName) => ({
    // paddingTop: 5,
    // paddingBottom: 5,
    // fontSize: 12,
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
  }),
  box: (iconName) => ({}),
});
