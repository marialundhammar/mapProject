import React from 'react';
import { View, Text } from 'react-native';
import Button from '../ui/atoms/NavigatonButton';

const ProfileScreen = ({ navigation }) => {
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
      <Text>PROFILE 👻</Text>
      <Button
        navigation={navigation}
        navigateTo={'Map'}
        buttonText={'GÅ TILL KARTA'}
      />
    </View>
  );
};

export default ProfileScreen;
