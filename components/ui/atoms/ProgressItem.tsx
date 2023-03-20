import React, { useContext, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import styleComponents from '../../../styles/styleComponents';
import styleScreens from '../../../styles/styleScreens';

const ProgressbarItem = ({ isFilled, index }) => {
  const { step, setStep } = useContext(ContextStore);

  const handlePress = () => {
    if (step === index) {
      return;
    } else if (step > index) {
      setStep(index);
    } else {
      setStep(index);
    }
  };
  return (
    <Pressable
      onPress={handlePress}
      style={
        isFilled
          ? styleComponents.progressItemFilled
          : styleComponents.progressItem
      }
    ></Pressable>
  );
};

export default ProgressbarItem;
