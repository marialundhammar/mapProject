import React from 'react';
import { Text, View } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import styleScreens from '../../../styles/styleScreens';

const ProgressbarItem = ({ isFilled }) => {
  return (
    <View
      style={
        isFilled
          ? styleComponents.progressItemFilled
          : styleComponents.progressItem
      }
    ></View>
  );
};

export default ProgressbarItem;
