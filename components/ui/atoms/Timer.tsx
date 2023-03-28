import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styleTexts from '../../../styles/styleTexts';
import DoChallenge from '../molecules/DoChallange';
import NewChallenge from '../molecules/NewChallenge';

//useNavigation
const Timer = ({ navigation }) => {
  const INTERVALS = [2, 5, 10];
  const DURATION = 10;

  const [intervalIndex, setIntervalIndex] = useState(0);
  const [showNewChallenge, setShowNewChallenge] = useState(false);

  const [time, setTime] = useState(DURATION);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time === 0) {
      setTime(10);
      setShowNewChallenge(true);
    }
  }, [time]);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {!showNewChallenge && (
        <Text style={styleTexts.bodyText}> Ny utmaning om {time} </Text>
      )}
      {showNewChallenge && <DoChallenge navigation={navigation} />}
    </View>
  );
};

export default Timer;
