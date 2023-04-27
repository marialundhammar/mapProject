import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Pressable,
  Text,
  Easing,
  Dimensions,
  ScrollView,
  PanResponder,
} from 'react-native';
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
  const {
    currentBarTour,
    setFinishedTour,
    setCurrentBarTour,
    setOnProfile,
    user,
  } = useContext(ContextStore);
  const [animation] = useState(new Animated.Value(0));
  const arrayOfBars = currentBarTour.bars;
  const userCollectionRef = collection(db, 'users');
  const userQuery = query(userCollectionRef, where('uid', '==', user.uid));
  const events = useGetEvents(user);

  /*   useEffect(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [isOpen]); */

  useEffect(() => {
    if (isOpen) {
      setTranslateY(0);
    } else {
      setTranslateY(Dimensions.get('window').height);
    }
  }, [isOpen]);

  let prevBarTours = useGetBarTours(user);
  const d = new Date();

  const [translateY, setTranslateY] = useState(Dimensions.get('window').height);

  const handleFinishedTour = async () => {
    setOnProfile(true);
    setFinishedTour(true);
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
    navigation.navigate('Profile');
  };

  const sectionHeights = [200, 300, 400];
  const snapToOffsets = sectionHeights.map((height, index) =>
    sectionHeights.slice(0, index + 1).reduce((a, b) => a + b)
  );

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Only respond to upward swipes
      return gestureState.dy < 0;
    },
    onPanResponderMove: (evt, gestureState) => {
      // Set the translateY value based on the gesture movement
      setTranslateY(Dimensions.get('window').height + gestureState.dy);
    },
    onPanResponderRelease: (evt, gestureState) => {
      // If the gesture distance is greater than half of the container height, open it fully
      if (Math.abs(gestureState.dy) > Dimensions.get('window').height / 2) {
        setIsOpen(true);
        setTranslateY(0);
      } else {
        // Otherwise, close it back to the initial position
        setIsOpen(false);
        setTranslateY(Dimensions.get('window').height);
      }
    },
  });

  return (
    <ScrollView>
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
              <View
                style={{
                  flexWrap: 'wrap',
                }}
              >
                <Text style={styleTexts.h2}>{currentBarTour.title}</Text>
                <Text style={styleTexts.bodyText}>
                  Antal stopp {currentBarTour.numbersOfBars}
                </Text>
              </View>
              {currentBarTour.description && (
                <Text style={[styleTexts.bodyText, { flexWrap: 'wrap' }]}>
                  {currentBarTour.description}
                </Text>
              )}

              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {arrayOfBars.map((bar, i) => (
                  <Text style={[styleTexts.bodyText]} key={i}>
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
                  <TimeLine
                    navigation={navigation}
                    events={undefined}
                    profilePage={false}
                  />
                </View>
              )}
            </>
          )}

          {isOpen && (
            <>
              <Animated.View
                {...panResponder.panHandlers}
                style={[{ transform: [{ translateY: translateY }] }]}
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
                          AVSLUTA RUNDA
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
    </ScrollView>
  );
};

export default BottomContainer;
