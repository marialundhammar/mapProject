import React from 'react';
import { View, Text } from 'react-native';
import styleScreens from '../../../styles/styleScreens';
import styleTexts from '../../../styles/styleTexts';
import NavigationButton from '../atoms/NavigatonButton';

const StepThree = ({ navigation }) => {
  return (
    <View>
      <Text style={styleTexts.h3}>STEP THREE </Text>
      <View style={styleScreens.center}>
        <NavigationButton
          navigation={navigation}
          navigateTo={'Map'}
          buttonText={'SPARA'}
        />
      </View>
    </View>
  );
};

export default StepThree;
