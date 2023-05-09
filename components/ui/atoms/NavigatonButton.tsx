import { LinearGradient } from 'expo-linear-gradient';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import { db } from '../../../firebase/firebase';
import useAddEvent from '../../../Hooks/useAddEvent';
import useGetBarTours from '../../../Hooks/useGetBarTours';
import useGetEvents from '../../../Hooks/useGetEvents';
import styleButtons from '../../../styles/styleButtons';
import { BarType } from '../../../types';
import DefaultButton from './DefaultButton';

interface NavigationButtonType {
  navigation: any;
  navigateTo: string;
  buttonText?: string;
  isFilled?: boolean;
  currentBar?: BarType;
  onClose?: () => void;
  challenge?: any;
}

const NavigationButton = ({
  navigation,
  navigateTo,
  buttonText,
  isFilled = true,
  currentBar,
  onClose,
  challenge,
}: NavigationButtonType) => {
  const {
    setCurrentBar,
    user,
    currentBarTour,
    setOnBar,
    setOnHome,
    setVisitedBars,
    visitedBars,
    setRoundIsStarted,
  } = useContext(ContextStore);

  const { addEvents } = useAddEvent(user);
  const { setCurrentChallenge, setPageHandler, setOnProfile, setFinishedTour } =
    useContext(ContextStore);
  const userCollectionRef = collection(db, 'users');
  const userQuery = query(userCollectionRef, where('uid', '==', user.uid));
  const events = useGetEvents(user);
  let prevBarTours = useGetBarTours(user);

  const prevVisitedBars = visitedBars;

  if (challenge) {
    setCurrentChallenge(challenge);
  }

  const handleNavigation = async () => {
    if (buttonText === 'SKAPA RUNDA') {
      setOnHome(false);
      setPageHandler('Onboarding');
    }

    if (buttonText === 'Yes det stämmer') {
      await setCurrentBar(currentBar);
      setPageHandler('Bar');
      console.log('currentbar', currentBar);

      onClose();
      addEvents('enteredBar', currentBar);
    }

    if (buttonText === 'GÅ FRÅN BAR') {
      addEvents('leftBar', currentBar);
      setVisitedBars([currentBar, ...prevVisitedBars]);
      setPageHandler('Map');
      setCurrentBar(null);
      prevVisitedBars.push(currentBar);

      const uniqueBars = visitedBars.filter((item, index) => {
        return visitedBars.findIndex((obj) => obj.name === item.name) === index;
      });
      setVisitedBars(uniqueBars);
    }

    if (buttonText === 'Avsluta barrunda ändå') {
      await addEvents('ended');
      setRoundIsStarted(false), onClose();
      setCurrentBar(null);
      setOnProfile(true);
      setFinishedTour(true);
      const currentTime = new Date().toLocaleTimeString();

      const newEvents = [
        { text: `Barrunda avslutades✨!`, createDate: currentTime },
        ...events,
      ];

      const querySnapshot = await getDocs(userQuery);
      querySnapshot.forEach(async (doc) => {
        const userDocRef = doc.ref;
        if (prevBarTours === undefined) {
          prevBarTours = [];
        }

        await updateDoc(userDocRef, {
          finishedTours: [
            {
              date: new Date(),
              events: newEvents,
              completedBarTour: false,
              ...currentBarTour,
            },
            ...prevBarTours,
          ],
          currentBarTour: {
            events: [],
          },
        });
      });
    }
    setPageHandler('Profile');

    navigation.navigate(navigateTo);
  };

  return (
    <View
      style={{
        padding: 8,
      }}
    >
      <Pressable onPress={handleNavigation}>
        <LinearGradient
          colors={isFilled ? ['#F46D6D', '#CE7C7C'] : []}
          style={
            isFilled
              ? styleButtons.buttonDefault
              : styleButtons.buttonDefaultBorder
          }
        >
          <Text style={styleButtons.buttonDefaultText}> {buttonText}</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default NavigationButton;
