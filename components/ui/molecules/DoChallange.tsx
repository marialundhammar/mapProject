import React from 'react';
import { View, Text } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import NavigationButton from '../atoms/NavigatonButton';

const DoChallenge = ({ navigation }) => {
  return (
    <View style={styleComponents.barContentContainer}>
      <NavigationButton
        navigation={navigation}
        navigateTo={'Challenge'}
        buttonText={'GÖR UTMANING'}
      />
    </View>
  );
};

export default DoChallenge;
