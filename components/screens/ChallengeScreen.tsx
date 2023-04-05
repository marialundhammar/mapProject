import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { ContextStore } from '../../context/ContextStore';
import styleMargin from '../../styles/styleMargin';

import styleScreens from '../../styles/styleScreens';
import styleTexts from '../../styles/styleTexts';
import Button from '../ui/atoms/NavigatonButton';
import TextEditor from '../ui/atoms/TextEditor';
import CameraView from '../ui/molecules/CameraView';

const ChallengeScreen = ({ navigation }) => {
  const [turnOnCamera, setTurnOnCamera] = useState(false);
  const { currentChallenge } = useContext(ContextStore);

  const onClick = () => {
    setTurnOnCamera(!turnOnCamera);
  };

  return (
    <View style={styleScreens.defaultScreen}>
      {!turnOnCamera && (
        <>
          <Text style={styleTexts.h1}>UTMANING!!</Text>
          <View style={styleMargin.p10}>
            <Text style={styleTexts.h3}>{currentChallenge.name}</Text>
            <Text style={styleTexts.bodyText}>
              {currentChallenge.description}
            </Text>
          </View>
        </>
      )}
      <CameraView
        onClick={() => setTurnOnCamera(!turnOnCamera)}
        turnOnCamera={turnOnCamera}
      />
      {!turnOnCamera && (
        <>
          <TextEditor />

          <Button
            navigation={navigation}
            navigateTo={'Bar'}
            buttonText={'Skit i det här'}
            isFilled={false}
          />

          <Button
            navigation={navigation}
            navigateTo={'Bar'}
            buttonText={'SAVE FOR LATER'}
          />
        </>
      )}
    </View>
  );
};

export default ChallengeScreen;
