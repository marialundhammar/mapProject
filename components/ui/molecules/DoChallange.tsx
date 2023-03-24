import React from 'react';
import { View, Text } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import NavigationButton from '../atoms/NavigatonButton';

const DoChallenge = ({ navigation }) => {
  return (
    <View style={styleComponents.barContentContainer}>
      <Text style={styleTexts.bodyText}>Medans du väntar, gör detta? </Text>
      <NavigationButton
        navigation={navigation}
        navigateTo={'Challenge'}
        buttonText={'GÖR UTMANING'}
      />
    </View>
  );
};

export default DoChallenge;
