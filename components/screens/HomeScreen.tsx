import React from 'react';
import { View } from 'react-native';
import styleScreens from '../../styles/styleScreens';
import Button from '../ui/atoms/NavigatonButton';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styleScreens.defaultScreen}>
      <Button
        navigation={navigation}
        navigateTo={'Onboarding'}
        buttonText={'SKAPA RUNDA'}
      />
    </View>
  );
};

export default HomeScreen;
