import React from 'react';
import { View } from 'react-native';
import Button from '../ui/atoms/NavigatonButton';

const HomeScreen = ({ navigation }) => {
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
