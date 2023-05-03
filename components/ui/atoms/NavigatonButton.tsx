import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import useAddEvent from '../../../Hooks/useAddEvent';
import styleButtons from '../../../styles/styleButtons';
import { BarType } from '../../../types';
import DefaultButton from './DefaultButton';

interface NavigationButtonType {
  navigation: any;
  navigateTo: string;
  buttonText?: string;
  isFilled?: boolean;
  currentBar?: BarType;
  onClose?: () => void;
  challenge?: any;
}

const NavigationButton = ({
  navigation,
  navigateTo,
  buttonText,
  isFilled = true,
  currentBar,
  onClose,
  challenge,
}: NavigationButtonType) => {
  const { setCurrentBar, user, currentBarTour, setOnBar, setOnHome } =
    useContext(ContextStore);
  const [bar, setBar] = useState(null);

  const { addEvents } = useAddEvent(user);
  const { setCurrentChallenge, setPageHandler } = useContext(ContextStore);

  if (challenge) {
    setCurrentChallenge(challenge);
  }

  const handleNavigation = async () => {
    navigation.navigate(navigateTo);

    if (buttonText === 'SKAPA RUNDA') {
      setOnHome(false);
    }

    if (buttonText === 'Yes det stämmer') {
      await setCurrentBar(currentBar);
      setPageHandler('Bar');

      onClose();
      addEvents('enteredBar', currentBar);
    }

    if (buttonText === 'GÅ FRÅN BAR') {
      addEvents('leftBar', currentBar);
      setPageHandler('Map');
      setCurrentBar(null);
    }
  };

  return (
    <View
      style={{
        padding: 8,
      }}
    >
      <Pressable onPress={handleNavigation}>
        <LinearGradient
          colors={isFilled ? ['#F46D6D', '#CE7C7C'] : []}
          style={
            isFilled
              ? styleButtons.buttonDefault
              : styleButtons.buttonDefaultBorder
          }
        >
          <Text style={styleButtons.buttonDefaultText}> {buttonText}</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default NavigationButton;
