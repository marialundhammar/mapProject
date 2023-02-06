import React from 'react';
import { View, Text } from 'react-native';
import Button from '../ui/atoms/NavigatonButton';

const BarScreen = ({ navigation }) => {
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
      <Text>You're at a bar 🍻 </Text>
      <Button navigation={navigation} navigateTo={'Map'} />
    </View>
  );
};

export default BarScreen;
