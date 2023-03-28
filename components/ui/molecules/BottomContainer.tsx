import React, { useContext, useEffect, useState } from 'react';
import { View, Pressable, Text, Easing } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import styleButtons from '../../../styles/styleButtons';
import styleComponents from '../../../styles/styleComponents';
import styleScreens from '../../../styles/styleScreens';
import styleTexts from '../../../styles/styleTexts';
import Button from '../atoms/Button';
import { Animated } from 'react-native';
import TimeLine from './Timeline';

const BottomContainer = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [roundStarted, setRoundIsStarted] = useState(false);
  const { currentBarTour } = useContext(ContextStore);
  const [animation] = useState(new Animated.Value(0));

  const arrayOfBars = currentBarTour.bars;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [isOpen]);

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
                  <Button buttonText={'AVSLUTA'} />
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
