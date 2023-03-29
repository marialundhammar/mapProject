import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { ContextStore } from '../../context/ContextStore';
import useAddEvents from '../../Hooks/useAddEvent';
import styleScreens from '../../styles/styleScreens';
import styleTexts from '../../styles/styleTexts';
import BarMapNavigation from '../ui/atoms/BarMapNavigation';
import Button from '../ui/atoms/NavigatonButton';
import DoChallenge from '../ui/molecules/DoChallange';
import TimeLine from '../ui/molecules/TimeLine';
import TopHeader from '../ui/molecules/TopHeader';
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import useGetEvents from '../../Hooks/useGetEvents';

const BarScreen = ({ navigation }) => {
  const navigateTo = 'Map';
  const { currentBar, user } = useContext(ContextStore);

  const events = useGetEvents(user);
  const loading = useAddEvents(user, currentBar.name);

  console.log('this is loading', loading);
  const handleAddEvents = () => {
    console.log('hejhej');
  };

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
        <Pressable onPress={handleAddEvents}>
          <Text>TEST ADD</Text>
        </Pressable>
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
