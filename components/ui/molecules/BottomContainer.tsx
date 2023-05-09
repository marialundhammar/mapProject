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
import { BarModal } from './BarModal';
import useAddEvent from '../../../Hooks/useAddEvent';

const BottomContainer = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    currentBarTour,
    setFinishedTour,
    setCurrentBarTour,
    setOnProfile,
    user,
    setPageHandler,
    visitedBars,
    setVisitedBars,
    setRoundIsStarted,
    roundStarted,
  } = useContext(ContextStore);
  const [animation] = useState(new Animated.Value(0));
  const arrayOfBars = currentBarTour.bars;
  const userCollectionRef = collection(db, 'users');
  const userQuery = query(userCollectionRef, where('uid', '==', user.uid));
  const events = useGetEvents(user);

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
  const [showFinishedModal, setShowFinishedModal] = useState({
    visible: false,
    content: '',
  });

  const { addEvents } = useAddEvent(user);

  const handleFinishedTour = async () => {
    if (visitedBars.length === currentBarTour.numbersOfBars) {
      await addEvents('ended');
      setRoundIsStarted(false), setOnProfile(true);
      setFinishedTour(true);
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
              events: events,
              completedBarTour: true,
              ...currentBarTour,
            },
            ...prevBarTours,
          ],
          currentBarTour: {
            events: [],
          },
        });
      });
      setPageHandler('Profile');

      navigation.navigate('Profile');
      setShowFinishedModal({
        visible: true,
        content: 'Du klarade hela rundan!! och har därmed förtjänat en trofé',
      });
    } else {
      console.log('Några stopp kvar');
      setShowFinishedModal({
        visible: true,
        content: `Du har ju bara besökt ${visitedBars.length} bar. Du har ${
          currentBarTour.numbersOfBars - visitedBars.length
        } kvar `,
      });
    }
  };

  const sectionHeights = [200, 300, 400];
  const snapToOffsets = sectionHeights.map((height, index) =>
    sectionHeights.slice(0, index + 1).reduce((a, b) => a + b)
  );

  return (
    <>
      <ScrollView>
        <View
          style={
            isOpen
              ? styleComponents.bottomContainer
              : styleComponents.bottomContainerOpen
          }
        >
          <Pressable onPress={roundStarted ? () => setIsOpen(!isOpen) : null}>
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
                      {i === arrayOfBars.length - 1
                        ? bar.name
                        : `${bar.name} | `}
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

                    <Pressable
                      style={styleButtons.buttonDefaultBorder}
                      onPress={() => navigation.navigate('Home')}
                    >
                      <Text style={styleButtons.buttonDefaultText}>
                        GENERERA NY RUNDA
                      </Text>
                    </Pressable>
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
                  style={[{ transform: [{ translateY: translateY }] }]}
                >
                  <Pressable onPress={() => setIsOpen(false)}>
                    <Text
                      style={[
                        styleTexts.h2,
                        {
                          marginBottom: 12,
                        },
                      ]}
                    >
                      {currentBarTour.title}
                    </Text>
                    <View style={[styleComponents.centered, { marginTop: 8 }]}>
                      <Pressable onPress={handleFinishedTour}>
                        <LinearGradient
                          colors={['#F46D6D', '#CE7C7C']}
                          style={styleButtons.buttonDefault}
                        >
                          <Text style={styleButtons.buttonDefaultText}>
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

      <BarModal
        header={
          visitedBars.length === currentBarTour.numbersOfBars
            ? 'YOU MADE IT!!'
            : 'Redan Game Over?? '
        }
        text={showFinishedModal.content}
        visible={showFinishedModal.visible}
        onClose={() =>
          setShowFinishedModal((current) => ({ ...current, visible: false }))
        }
        finishedRound={true}
        navigation={navigation}
      />
    </>
  );
};

export default BottomContainer;
