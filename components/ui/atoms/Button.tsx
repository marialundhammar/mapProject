import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import styleButtons from '../../../styles/styleButtons';

interface NavigationButtonType {
  buttonText?: string;
  isFilled?: boolean;
}

const Button = ({ buttonText, isFilled = true }: NavigationButtonType) => {
  return (
    <View
      style={{
        padding: 8,
      }}
    >
      <Pressable>
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

export default Button;
