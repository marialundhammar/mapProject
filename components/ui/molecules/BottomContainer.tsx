import React, { useContext, useEffect, useState } from 'react';
import { View, Pressable, Text, Easing } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import styleButtons from '../../../styles/styleButtons';
import styleComponents from '../../../styles/styleComponents';
import styleScreens from '../../../styles/styleScreens';
import styleTexts from '../../../styles/styleTexts';
import Button from '../atoms/Button';
import { Animated } from 'react-native';
import TimeLine from './TimeLine';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainerRefContext } from '@react-navigation/native';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import useGetBarTours from '../../../Hooks/useGetBarTours';
import useGetEvents from '../../../Hooks/useGetEvents';

const BottomContainer = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [roundStarted, setRoundIsStarted] = useState(false);
  const [finishedToursArray, setFinishedToursArray] = useState([]);
  const { currentBarTour, setFinishedTour, setCurrentBarTour, user } =
    useContext(ContextStore);
  const [animation] = useState(new Animated.Value(0));

  const arrayOfBars = currentBarTour.bars;

  const userCollectionRef = collection(db, 'users');
  const userQuery = query(userCollectionRef, where('uid', '==', user.uid));

  const events = useGetEvents(user);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [isOpen]);

  let prevBarTours = useGetBarTours(user);
  const d = new Date();

  const handleFinishedTour = async () => {
    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach(async (doc) => {
      const userDocRef = doc.ref;

      if (prevBarTours === undefined) {
        prevBarTours = [];
      }

      await updateDoc(userDocRef, {
        finishedTours: [
          { date: new Date(), events: events, ...currentBarTour },
          ...prevBarTours,
        ],
      });
    });

    console.log(
      'date',
      finishedToursArray,
      d.getDate(),
      d.getMonth() + 1,
      d.getFullYear()
    );

    navigation.navigate('Profile');
  };

  return (
    <View
      style={
        isOpen
          ? styleComponents.bottomContainer
          : styleComponents.bottomContainerOpen
      }
    >
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        {!isOpen && (
          <>
            <View style={styleScreens.start}>
              <Text style={styleTexts.h2}>{currentBarTour.title}</Text>
              <Text style={styleTexts.bodyText}>
                antal stopp {currentBarTour.numbersOfBars}
              </Text>
            </View>
            {currentBarTour.description && (
              <Text style={styleTexts.bodyText}>
                {currentBarTour.description}
              </Text>
            )}

            <View style={styleComponents.start}>
              {arrayOfBars.map((bar, i) => (
                <Text style={styleTexts.bodyText} key={i}>
                  {bar.name} |{' '}
                </Text>
              ))}
            </View>

            {!roundStarted && (
              <View style={styleComponents.centered}>
                <Button
                  buttonText={"LET'S GO"}
                  onIsOpen={() => setIsOpen(true)}
                  isOpen={isOpen}
                  onStartedRound={() => setRoundIsStarted(true)}
                />
                <Button buttonText={'GENERERA NY RUNDA'} isFilled={false} />
              </View>
            )}

            {roundStarted && (
              <View>
                <TimeLine navigation={navigation} />
              </View>
            )}
          </>
        )}

        {isOpen && (
          <>
            <Animated.View
              style={[
                styleComponents.bottomContainerOpen,
                { transform: [{ translateY: animation }] },
              ]}
            >
              <Pressable onPress={() => setIsOpen(false)}>
                <Text style={styleTexts.h2}>{currentBarTour.title}</Text>
                <View style={styleComponents.centered}>
                  <Pressable onPress={handleFinishedTour}>
                    <LinearGradient
                      colors={['#F46D6D', '#CE7C7C']}
                      style={styleButtons.buttonDefault}
                    >
                      <Text style={styleButtons.buttonDefaultText}>
                        {' '}
                        AVSLUTA
                      </Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </Pressable>
            </Animated.View>
          </>
        )}
      </Pressable>
    </View>
  );
};

export default BottomContainer;
