import React from 'react';
import { View, Text } from 'react-native';

import styleTexts from '../../../styles/styleTexts';

import DrinkPreferences from '../molecules/DrinkPreferences';

const StepOne = () => {
  return (
    <View>
      <Text style={styleTexts.h3}>Vad gillar du? </Text>
      <DrinkPreferences />
    </View>
  );
};

export default StepOne;
