import { LinearGradient } from 'expo-linear-gradient';
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
    // <LinearGradient colors={['#334F96', '#020B29']} style={{ borderRadius: 8 }}>
    <View
      style={{
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 16,
        padding: 8,
        marginBottom: 46,
        borderColor: '#445385',
      }}
    >
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
    // </LinearGradient>
  );
};

export default DoChallenge;
