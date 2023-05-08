import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import * as MediaLibrary from 'expo-media-library';
import Button from '../ui/atoms/NavigatonButton';
import CameraPreview from '../ui/molecules/CameraPreview';
import TextEditor from '../ui/atoms/TextEditor';
import { ContextStore } from '../../context/ContextStore';
import { storage } from '../../firebase/firebase';
import styleButtons from '../../styles/styleButtons';
import useAddEvent from '../../Hooks/useAddEvent';
import styleScreens from '../../styles/styleScreens';
import styleComponents from '../../styles/styleComponents';
import styleTexts from '../../styles/styleTexts';

import * as ImageManipulator from 'expo-image-manipulator';

const ChallengeScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const {
    currentChallenge,
    user,
    currentBar,
    completedChallenges,
    setCompletedChallenges,
    setOnProfile,
  } = useContext(ContextStore);
  const [type, setType] = useState(CameraType.back);
  const [turnOnCamera, setTurnOnCamera] = useState(false);
  const [image, setImage] = useState(null);
  const [takenPhoto, setTakenPhoto] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [textInputValue, setTextInputValue] = useState('');

  const { addEvents } = useAddEvent(user);

  useEffect(() => {
    (async () => {
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  const handleSaveChallenge = async () => {
    navigation.navigate('Bar');
    const fileName = `${new Date().getTime()}.jpg`;
    const storageRef = ref(
      storage,
      `images/${user.email}/${currentBar.name}/${fileName}`
    );

    const resizedPhoto = await ImageManipulator.manipulateAsync(
      takenPhoto.uri,
      [{ resize: { width: 800 } }],
      { compress: 0.2 }
    );

    const response = await fetch(resizedPhoto.uri);

    const blob = await response.blob();
    await uploadBytes(storageRef, blob, {
      contentType: 'image/jpeg',
    }).then((snapshot) => {});
    const url = await getDownloadURL(storageRef);

    console.log('URL', url);

    await setImage(url);

    addEvents('challenge', currentBar, textInputValue, url);
    setIsSaveDisabled(true);
    const newCompletedChallenges = [...completedChallenges, currentChallenge];
    await setCompletedChallenges(newCompletedChallenges);
  };

  const takePic = async () => {
    try {
      const options = {
        quality: 0.1,
        base64: true,
        mirrorImage: true,
        type: 'image/png',
      };
      const data = await cameraRef.current.takePictureAsync(options);

      setImage(data.uri);
      setTakenPhoto(data);
      setTurnOnCamera(false);
      setIsSaveDisabled(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  if (hasCameraPermission === null) {
    return <Text>Requesting permission .. </Text>;
  }

  if (hasCameraPermission === false) {
    return <Text>No access, please change in settings</Text>;
  }

  return (
    <SafeAreaView style={styleScreens.defaultScreen}>
      {!turnOnCamera && (
        <View
          style={[
            styleComponents.start,
            {
              flexDirection: 'columns',
              justifyContent: 'center',
              marginBottom: 12,
              width: '92%',
            },
          ]}
        >
          <Text style={styleTexts.h2}>{currentChallenge.name}</Text>
          <Text style={styleTexts.h3}>{currentChallenge.description}</Text>
        </View>
      )}

      <CameraPreview
        type={type}
        image={image}
        turnOnCamera={turnOnCamera}
        onClick={() => setTurnOnCamera(!turnOnCamera)}
        takePic={takePic}
        toggleCameraType={toggleCameraType}
        cameraRef={cameraRef}
      />
      {!turnOnCamera && (
        <>
          <View style={styleComponents.barContentContainer}>
            <TextInput
              style={[styleTexts.bodyText, styleComponents.height150]}
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => setTextInputValue(text)}
              onSubmitEditing={() => Keyboard.dismiss()}
              placeholder="Skriv en kommentar till bilden så du inte glömmer bort 🧠 "
              placeholderTextColor={'white'}
            />
          </View>

          {!isSaveDisabled ? (
            <Pressable onPress={handleSaveChallenge} disabled={isSaveDisabled}>
              <LinearGradient
                colors={['#F46D6D', '#CE7C7C']}
                style={styleButtons.buttonDefault}
              >
                <Text style={styleButtons.buttonDefaultText}>
                  SAVE FOR LATER
                </Text>
              </LinearGradient>
            </Pressable>
          ) : (
            <Text style={[styleTexts.h4, { marginBottom: 12, width: '95%' }]}>
              Du måste ladda upp en bild först för att kunna spara utmaningen,
              vad är annars poängen?{' '}
            </Text>
          )}
          <Button
            navigation={navigation}
            navigateTo={'Bar'}
            buttonText={'Skit i det här'}
            isFilled={false}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default ChallengeScreen;
