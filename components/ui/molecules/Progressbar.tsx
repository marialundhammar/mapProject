import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import styleScreens from '../../../styles/styleScreens';
import ProgressbarItem from '../atoms/ProgressItem';

const Progressbar = ({ stepOne, stepTwo, stepThree }) => {
  return (
    <View style={styleScreens.center}>
      <View style={styleComponents.progressBar}>
        <ProgressbarItem isFilled={stepOne} />
        <ProgressbarItem isFilled={stepTwo} />
        <ProgressbarItem isFilled={stepThree} />
      </View>
    </View>
  );
};

export default Progressbar;
