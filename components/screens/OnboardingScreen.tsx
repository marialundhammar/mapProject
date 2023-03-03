import React, { useState } from 'react';
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
import StepTwo from '../ui/organisms/StepTwo';
import StepThree from '../ui/organisms/StepThree';
import Loading from '../ui/organisms/Loading';
import TopHeader from '../ui/molecules/TopHeader';

const OnboardingScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);

  const nextStepHandler = () => {
    if (step === 1) {
      setStep(2);
      setStepTwo(true);
    }

    if (step === 2) {
      setStep(3);
      setStepThree(true);
    }
  };

  return (
    <View>
      <TopHeader navigation={navigation} showBackButton={false} />

      <View style={styleScreens.onboardingScreen}>
        <Progressbar
          stepOne={stepOne}
          stepTwo={stepTwo}
          stepThree={stepThree}
        />
        {step === 1 ? (
          <StepOne />
        ) : step === 2 ? (
          <StepTwo />
        ) : (
          <StepThree navigation={navigation} />
        )}

        {!stepThree && (
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
        )}
      </View>
    </View>
  );
};

export default OnboardingScreen;
