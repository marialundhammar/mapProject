import React from 'react';
import { View, Text } from 'react-native';
import Button from '../ui/atoms/NavigatonButton';

const ChallengeScreen = ({ navigation }) => {
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
      <Text>CHALLENGE 🌟</Text>
      <Button
        navigation={navigation}
        navigateTo={'Map'}
        buttonText={'GÅ TILLBAKA KARTA'}
      />
    </View>
  );
};

export default ChallengeScreen;
