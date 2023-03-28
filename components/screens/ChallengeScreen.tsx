import React from 'react';
import { View, Text } from 'react-native';
import styleScreens from '../../styles/styleScreens';
import Button from '../ui/atoms/NavigatonButton';
import ImageUpload from '../ui/molecules/ImageUpload';

const ChallengeScreen = ({ navigation }) => {
  return (
    <View style={styleScreens.defaultScreen}>
      <Text>CHALLENGE 🌟</Text>

      <ImageUpload />
      <Button
        navigation={navigation}
        navigateTo={'Map'}
        buttonText={'GÅ TILLBAKA KARTA'}
      />
      <Button
        navigation={navigation}
        navigateTo={'Bar'}
        buttonText={'GÅ TILLBAKA TILL BAR'}
        isFilled={false}
      />
    </View>
  );
};

export default ChallengeScreen;
