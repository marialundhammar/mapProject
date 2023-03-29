import React from 'react';
import { View, Text } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import NavigationButton from '../atoms/NavigatonButton';

const DoChallenge = ({ navigation }) => {
  const currentTime = new Date().toLocaleTimeString();

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
