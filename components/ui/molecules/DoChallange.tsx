import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { challenges2 } from '../../../configs/challenges';
import { ContextStore } from '../../../context/ContextStore';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import NavigationButton from '../atoms/NavigatonButton';

const DoChallenge = ({ navigation }) => {
  const currentTime = new Date().toLocaleTimeString();
  const { setCurrentChallenge } = useContext(ContextStore);

  const challenges = challenges2;

  const challenge = challenges2[Math.floor(Math.random() * challenges.length)];
  setCurrentChallenge(challenge);

  return (
    <View style={styleComponents.barContentContainer}>
      <Text style={styleTexts.h3}>{challenge.name} </Text>
      <Text style={styleTexts.bodyText}>{challenge.description} </Text>

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
