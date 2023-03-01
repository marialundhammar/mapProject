import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styleScreens from '../../styles/styleScreens';
import DrinkPreferences from '../ui/molecules/DrinkPreferences';
import Progressbar from '../ui/molecules/Progressbar';
import styleTexts from '../../styles/styleTexts';
import BurgerMenu from '../ui/atoms/BurgerMenu';
import StepOne from '../ui/organisms/StepOne';
import NavigationButton from '../ui/atoms/NavigatonButton';
import { LinearGradient } from 'expo-linear-gradient';
import styleButtons from '../../styles/styleButtons';

const OnboardingScreen = ({ navigation }) => {
  const step1 = true;

  const nextStepHandler = () => {
    if (step1) {
    }
  };

  return (
    <View style={styleScreens.onboardingScreen}>
      <BurgerMenu navigateTo={'Profile'} navigation={navigation} />
      <Progressbar />
      {step1 && <StepOne />}

      {}
      <View style={styleScreens.center}>
        <Pressable onPress={nextStepHandler}>
          <LinearGradient
            colors={['#F46D6D', '#CE7C7C']}
            style={styleButtons.buttonDefault}
          >
            <Text style={styleButtons.buttonDefaultText}>NÄSTA</Text>
          </LinearGradient>
        </Pressable>

        <NavigationButton
          navigation={navigation}
          navigateTo={'Map'}
          buttonText={'SKIPPA'}
          isFilled={false}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;
