import React, { useContext, useEffect, useState } from 'react';
import { View, Pressable, Text, Easing } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import styleButtons from '../../../styles/styleButtons';
import styleComponents from '../../../styles/styleComponents';
import styleScreens from '../../../styles/styleScreens';
import styleTexts from '../../../styles/styleTexts';
import Button from '../atoms/Button';
import { Animated } from 'react-native';

const BottomContainer = ({ navigation }) => {
  const [roundStarted, setRoundStarted] = useState(false);
  const { currentBarTour } = useContext(ContextStore);
  const [animation] = useState(new Animated.Value(0));

  console.log(currentBarTour.description);

  const arrayOfBars = currentBarTour.bars;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [roundStarted]);

  return (
    <View
      style={
        roundStarted
          ? styleComponents.bottomContainer
          : styleComponents.bottomContainerOpen
      }
    >
      {!roundStarted && (
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
            {arrayOfBars.map((bar) => (
              <Text style={styleTexts.bodyText}>{bar.name} | </Text>
            ))}
          </View>

          <View style={styleComponents.centered}>
            <Button
              buttonText={"LET'S GO"}
              onStartRound={() => setRoundStarted(true)}
              startedRound={roundStarted}
            />
            <Button buttonText={'GENERERA NY RUNDA'} isFilled={false} />
          </View>
        </>
      )}

      {roundStarted && (
        <>
          <Animated.View
            style={[
              styleComponents.bottomContainerOpen,
              { transform: [{ translateY: animation }] },
            ]}
          >
            <Pressable onPress={() => setRoundStarted(false)}>
              <Text style={styleTexts.h2}>{currentBarTour.title}</Text>
              <View style={styleComponents.centered}>
                <Button buttonText={'AVSLUTA'} />
              </View>
            </Pressable>
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default BottomContainer;
