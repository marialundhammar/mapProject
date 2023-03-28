import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import styleButtons from '../../../styles/styleButtons';

interface NavigationButtonType {
  buttonText: string;
  isFilled?: boolean;
  onIsOpen?: () => void;
  isOpen?: boolean;
  onStartedRound?: () => void;
}

const Button = ({
  buttonText,
  isFilled = true,
  onIsOpen,
  isOpen,
  onStartedRound,
}: NavigationButtonType) => {
  const handlePressable = () => {
    onStartedRound();
    onIsOpen();
  };

  return (
    <View
      style={{
        padding: 8,
      }}
    >
      {!isOpen && (
        <Pressable onPress={handlePressable}>
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
      )}
    </View>
  );
};

export default Button;
