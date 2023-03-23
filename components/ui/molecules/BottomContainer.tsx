import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import styleButtons from '../../../styles/styleButtons';
import styleComponents from '../../../styles/styleComponents';
import Button from '../atoms/Button';

const BottomContainer = ({ navigation }) => {
  const [roundStarted, setRoundStarted] = useState(false);

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
          <Text>RUNDAN</Text>
          <Button
            buttonText={"LET'S GO"}
            onStartRound={() => setRoundStarted(true)}
            startedRound={roundStarted}
          />
          <Button buttonText={'GENERERA NY RUNDA'} isFilled={false} />
        </>
      )}

      {roundStarted && (
        <>
          <Text>RUNDAN</Text>
          <Button buttonText={'AVSLUTA'} />
        </>
      )}
    </View>
  );
};

export default BottomContainer;
