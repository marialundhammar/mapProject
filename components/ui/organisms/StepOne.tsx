import React from 'react';
import { View, Text } from 'react-native';
import styleMargin from '../../../styles/styleMargin';

import styleTexts from '../../../styles/styleTexts';

import DrinkPreferences from '../molecules/DrinkPreferences';

const StepOne = () => {
  return (
    <View
      style={{
        /*   position: 'sticky', */
        bottom: 0,
        height: 500,
        width: '100%',
        zIndex: 100,
      }}
    >
      <View style={{ marginLeft: 0 }}>
        <Text style={[styleTexts.h3, styleMargin.m10]}>Vad gillar du? </Text>
      </View>
      <DrinkPreferences />
    </View>
  );
};

export default StepOne;
