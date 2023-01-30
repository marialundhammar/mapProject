import React from 'react';
import { View, Text } from 'react-native';
import Map from './components/Map';

export default function App() {
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
}
