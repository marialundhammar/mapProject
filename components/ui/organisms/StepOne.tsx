import React from 'react';
import { View, Text } from 'react-native';

import styleTexts from '../../../styles/styleTexts';

import DrinkPreferences from '../molecules/DrinkPreferences';

const StepOne = () => {
  return (
    <View
      style={{
        /*   position: 'sticky', */
        bottom: 0,
        height: 420,
        width: '100%',
        zIndex: 100,
      }}
    >
      <Text style={styleTexts.h3}>Vad gillar du? </Text>
      <DrinkPreferences />
    </View>
  );
};

export default StepOne;
