import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext } from 'react';
import { View, Pressable, Text } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import styleButtons from '../../../styles/styleButtons';
import { BarType } from '../../../types';

interface NavigationButtonType {
  navigation: any;
  navigateTo: string;
  buttonText?: string;
  isFilled?: boolean;
  currentBar?: BarType;
}

const NavigationButton = ({
  navigation,
  navigateTo,
  buttonText,
  isFilled = true,
  currentBar,
}: NavigationButtonType) => {
  const { setCurrentBar } = useContext(ContextStore);
  const handleNavigation = () => {
    navigation.navigate(navigateTo);

    if (currentBar) {
      setCurrentBar(currentBar);
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
