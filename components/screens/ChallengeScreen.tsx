import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styleScreens from '../../styles/styleScreens';
import Button from '../ui/atoms/NavigatonButton';
import TextEditor from '../ui/atoms/TextEditor';
import ImageUpload from '../ui/molecules/ImageUpload';

const ChallengeScreen = ({ navigation }) => {
  const [turnOnCamera, setTurnOnCamera] = useState(false);

  const onClick = () => {
    setTurnOnCamera(!turnOnCamera);
  };

  return (
    <View style={styleScreens.defaultScreen}>
      <ImageUpload
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
