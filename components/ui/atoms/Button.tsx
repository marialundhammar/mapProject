import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext } from 'react';
import { View, Pressable, Text } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import useAddEvent from '../../../Hooks/useAddEvent';
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
  const { user, currentBarTour } = useContext(ContextStore);

  const { addEvents } = useAddEvent(user);

  const handlePressable = () => {
    onStartedRound();
    onIsOpen();
    addEvents('started', currentBarTour);
  };

  return (
    <View
      style={{
        padding: 8,
      }}
    >
      {!isOpen && (
        <Pressable
          onPress={handlePressable}
          style={{ borderWidth: 4, borderColor: 'green' }}
        >
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
