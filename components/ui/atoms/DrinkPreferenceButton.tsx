import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import styleButtons from '../../../styles/styleButtons';

type DrinkPreferenceType = {
  text: string;
  icon: any;
};

const DrinkPreferenceButton = ({ text, icon }: DrinkPreferenceType) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <Pressable
        onPress={handleIsClicked}
        style={
          isClicked ? styleButtons.buttonClicked : styleButtons.buttonDrink
        }
      >
        <Text style={styleButtons.icon}>{icon}</Text>
        <Text style={styleButtons.buttonDrinkText}>{text}</Text>
      </Pressable>
    </>
  );
};

export default DrinkPreferenceButton;
