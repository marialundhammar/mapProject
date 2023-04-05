import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { ContextStore } from '../../context/ContextStore';
import useAddEvents from '../../Hooks/useAddEvent';
import styleScreens from '../../styles/styleScreens';
import styleTexts from '../../styles/styleTexts';
import Button from '../ui/atoms/NavigatonButton';
import DoChallenge from '../ui/molecules/DoChallange';
import TimeLine from '../ui/molecules/TimeLine';
import TopHeader from '../ui/molecules/TopHeader';

import useGetEvent from '../../Hooks/useGetEvents';
import Map from '../ui/molecules/Map';
import styleComponents from '../../styles/styleComponents';
import BarContent from '../ui/molecules/BarContent';
import { challenges2 } from '../../configs/challenges';

const BarScreen = ({ navigation }) => {
  const navigateTo = 'Map';
  const { user, currentBar, onBar, setCurrentChallenge, currentChallenge } =
    useContext(ContextStore);

  const events = useGetEvent(user);

  useEffect(() => {
    const challenge =
      challenges2[Math.floor(Math.random() * challenges2.length)];
    setCurrentChallenge(challenge);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#1B274A',
      }}
    >
      <TopHeader navigation={navigation} showBackButton={false} />

      {onBar ? (
        <>
          <ScrollView>
            <View></View>
            <View style={styleScreens.onboardingScreen}>
              <Text style={styleTexts.h2}>
                VÄLKOMMEN TILL {currentBar.name}
              </Text>

              <BarContent />
              <TimeLine navigation={navigation} />

              <DoChallenge navigation={navigation} />
            </View>
          </ScrollView>
          <View style={styleComponents.centered}>
            <Button
              navigation={navigation}
              navigateTo={'Map'}
              buttonText={'GÅ FRÅN BAR'}
              isFilled={true}
            />
          </View>
        </>
      ) : (
        <>
          <Map navigation={navigation} />
        </>
      )}
    </View>
  );
};

export default BarScreen;
