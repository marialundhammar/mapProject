import React, { useContext, useState } from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import styleScreens from '../../styles/styleScreens';
import Progressbar from '../ui/molecules/Progressbar';
import StepOne from '../ui/organisms/StepOne';
import NavigationButton from '../ui/atoms/NavigatonButton';
import { LinearGradient } from 'expo-linear-gradient';
import styleButtons from '../../styles/styleButtons';
import StepTwo from '../ui/organisms/StepTwo';
import StepThree from '../ui/organisms/StepThree';
import TopHeader from '../ui/molecules/TopHeader';
import { ContextStore } from '../../context/ContextStore';

const OnboardingScreen = ({ navigation }) => {
  const { step, setStep } = useContext(ContextStore);

  const nextStepHandler = () => {
    if (step === 1) {
      setStep(2);
    }

    if (step === 2) {
      setStep(3);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#000826' }}>
      <View style={styleScreens.onboardingScreen}>
        <Progressbar />
        {step === 1 ? (
          <StepOne />
        ) : step === 2 ? (
          <StepTwo />
        ) : (
          <StepThree navigation={navigation} />
        )}

        {!(step === 3) && (
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
    </SafeAreaView>
  );
};

export default OnboardingScreen;
