import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ContextStore } from '../../context/ContextStore';
import styleScreens from '../../styles/styleScreens';
import styleTexts from '../../styles/styleTexts';
import BarMapNavigation from '../ui/atoms/BarMapNavigation';
import Button from '../ui/atoms/NavigatonButton';
import DoChallenge from '../ui/molecules/DoChallange';
import TimeLine from '../ui/molecules/TimeLine';
import TopHeader from '../ui/molecules/TopHeader';

const BarScreen = ({ navigation }) => {
  const navigateTo = 'Map';
  const { currentBar } = useContext(ContextStore);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '1B274A',
      }}
    >
      <ScrollView>
        <TopHeader navigation={navigation} showBackButton={false} />

        <View style={styleScreens.onboardingScreen}>
          <BarMapNavigation />

          <Text style={styleTexts.h2}>VÄLKOMMEN TILL {currentBar.name}</Text>
          <TimeLine navigation={navigation} />

          <DoChallenge navigation={navigation} />
        </View>
      </ScrollView>

      <Button
        navigation={navigation}
        navigateTo={'Map'}
        buttonText={'GÅ FRÅN BAR'}
        isFilled={false}
      />
    </View>
  );
};

export default BarScreen;
