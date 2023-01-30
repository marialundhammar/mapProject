import React from 'react';
import { View } from 'react-native';
import Map from '../components/Map';

const MapScreen = ({ navigation }) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Map />
    </View>
  );
};

export default MapScreen;
