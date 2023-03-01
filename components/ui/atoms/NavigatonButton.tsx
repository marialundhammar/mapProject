import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import styleButtons from '../../../styles/styleButtons';

interface NavigationButtonType {
  navigation: any;
  navigateTo: string;
  buttonText?: string;
  isFilled?: boolean;
}

const NavigationButton = ({
  navigation,
  navigateTo,
  buttonText,
  isFilled = true,
}: NavigationButtonType) => {
  return (
    <View
      style={{
        padding: 8,
      }}
    >
      <LinearGradient
        colors={isFilled ? ['#F46D6D', '#CE7C7C'] : []}
        style={
          isFilled
            ? styleButtons.buttonDefault
            : styleButtons.buttonDefaultBorder
        }
      >
        <Pressable onPress={() => navigation.navigate(navigateTo)}>
          <Text style={styleButtons.buttonDefaultText}> {buttonText}</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

export default NavigationButton;
