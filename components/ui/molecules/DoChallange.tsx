import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { challenges2 } from '../../../configs/challenges';
import { ContextStore } from '../../../context/ContextStore';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import NavigationButton from '../atoms/NavigatonButton';

const DoChallenge = ({ navigation }) => {
  const { currentChallenge } = useContext(ContextStore);

  return (
    <View style={styleComponents.barContentContainer}>
      <Text style={styleTexts.h3}>{currentChallenge.name} </Text>
      <Text style={styleTexts.bodyText}>{currentChallenge.description} </Text>
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
