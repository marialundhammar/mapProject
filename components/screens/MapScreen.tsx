import React from 'react';
import { View } from 'react-native';
import Map from '../ui/molecules/Map';
import NavigationButton from '../ui/atoms/NavigatonButton';

const MapScreen = ({ navigation }) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Map navigation={navigation} />

      <NavigationButton navigation={navigation} navigateTo={'Home'} />
    </View>
  );
};

export default MapScreen;
