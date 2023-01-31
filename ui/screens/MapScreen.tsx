import React from 'react';
import { View } from 'react-native';
import Map from '../components/Map';
import NavigationButton from '../components/NavigatonButton';

const MapScreen = ({ navigation }) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Map />

      <NavigationButton navigation={navigation} navigateTo={'Home'} />
    </View>
  );
};

export default MapScreen;
