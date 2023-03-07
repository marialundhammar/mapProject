import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';

const GroupCard = ({ text }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleIsClicked = () => {
    setIsClicked(!isClicked);
  };
  return (
    <Pressable
      onPress={handleIsClicked}
      style={
        isClicked
          ? styleComponents.cardStyleIsFilled
          : styleComponents.cardStyle
      }
    >
      <Text style={styleTexts.h3}>{text}</Text>
    </Pressable>
  );
};

export default GroupCard;
