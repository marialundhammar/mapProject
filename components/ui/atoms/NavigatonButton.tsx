import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext } from 'react';
import { View, Pressable, Text } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
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
}

const NavigationButton = ({
  navigation,
  navigateTo,
  buttonText,
  isFilled = true,
  currentBar,
  onClose,
}: NavigationButtonType) => {
  const { setCurrentBar, events, setEvents, user } = useContext(ContextStore);

  const currentTime = new Date().toLocaleTimeString();

  const handleNavigation = () => {
    navigation.navigate(navigateTo);

    if (currentBar) {
      setCurrentBar(currentBar);
      const event = `${currentTime} Ni anlände till ${currentBar.name}`;
      setEvents([event, ...events]);
      onClose();
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
