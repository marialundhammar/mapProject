import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ContextStore } from '../../context/ContextStore';
import styleComponents from '../../styles/styleComponents';
import styleScreens from '../../styles/styleScreens';
import styleTexts from '../../styles/styleTexts';
import BarMapNavigation from '../ui/atoms/BarMapNavigation';
import Button from '../ui/atoms/NavigatonButton';
import Timer from '../ui/atoms/Timer';
import BottomContainer from '../ui/molecules/BottomContainer';
import DoChallenge from '../ui/molecules/DoChallange';
import TimeLine from '../ui/molecules/TimeLine';
import TopHeader from '../ui/molecules/TopHeader';

const BarScreen = ({ navigation }) => {
  const navigateTo = 'Map';
  const { currentBar } = useContext(ContextStore);

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <ScrollView>
        <TopHeader navigation={navigation} showBackButton={false} />

        <View style={styleScreens.onboardingScreen}>
          <BarMapNavigation />

          <Text style={styleTexts.h2}>VÄLKOMMEN TILL {currentBar.name}</Text>
          <TimeLine />

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
