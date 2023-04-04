import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { challenges2 } from '../../../configs/challenges';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import NavigationButton from '../atoms/NavigatonButton';

const DoChallenge = ({ navigation }) => {
  const currentTime = new Date().toLocaleTimeString();

  const eventName = challenges2[0].name;

  return (
    <View style={styleComponents.barContentContainer}>
      <Text style={styleTexts.h3}>{challenges2[0].name} </Text>
      <Text style={styleTexts.bodyText}>{challenges2[0].description} </Text>

      <View style={styleComponents.centered}>
        <NavigationButton
          navigation={navigation}
          navigateTo={'Challenge'}
          buttonText={'GÖR UTMANING'}
        />
      </View>
    </View>
  );
};

export default DoChallenge;
