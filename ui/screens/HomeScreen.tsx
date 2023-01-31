import React from 'react';
import { View } from 'react-native';
import Button from '../components/NavigatonButton';

const HomeScreen = ({ navigation }) => {
  const navigateTo = 'Map';
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button navigation={navigation} navigateTo={'Map'} />
    </View>
  );
};

export default HomeScreen;
