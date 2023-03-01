import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import styleScreens from '../../../styles/styleScreens';

const ProgressbarItem = ({ isFilled }) => {
  const handlePress = () => {
    console.log('HJEHEJEJ');
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
