import React from 'react';
import { View, Text } from 'react-native';
import Button from '../ui/atoms/NavigatonButton';
import styleScreens from '../../styles/styleScreens';
import DrinkPreferences from '../ui/molecules/DrinkPreferences';
import Progressbar from '../ui/atoms/Progressbar';
import styleTexts from '../../styles/styleTexts';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styleScreens.defaultScreen}>
      <Progressbar />
      <Text style={styleTexts.h3}>Vad gillar du? </Text>
      <DrinkPreferences />
      <Button
        navigation={navigation}
        navigateTo={'Onboarding'}
        buttonText={'NÄSTA'}
      />
      <Button
        navigation={navigation}
        navigateTo={'Map'}
        buttonText={'SKIPPA'}
        isFilled={false}
      />
    </View>
  );
};

export default OnboardingScreen;
