import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import styleButtons from '../../../styles/styleButtons';
import { LinearGradient } from 'expo-linear-gradient';
import styleComponents from '../../../styles/styleComponents';
import * as MediaLibrary from 'expo-media-library';
import { storage } from '../../../firebase/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ContextStore } from '../../../context/ContextStore';

const CameraView = ({ onClick, turnOnCamera }) => {
  const [type, setType] = useState(CameraType.back);
  const [hasCamerapermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);
  const [image, setImage] = useState(null);
  const { user, setNewPhotoUploaded } = useContext(ContextStore);

  const [imageList, setImageList] = useState([]);

  const cameraRef = useRef(null);

  useEffect(() => {});

  useEffect(() => {
    (async () => {
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

  if (hasCamerapermission === undefined) {
    return <Text>Requesting permission .. </Text>;
  } else if (hasCamerapermission === false) {
    return <Text>No access, please change in settinga</Text>;
  }

  const uploadImage = async (data) => {
    const fileName = `${new Date().getTime()}.jpg`;

    const storageRef = ref(storage, `images/${user.email}/${fileName}`);
    const response = await fetch(data.uri);
    const blob = await response.blob();
    const uploadResult = await uploadBytes(storageRef, blob, {
      contentType: 'image/jpeg',
    });

    setNewPhotoUploaded(true);
  };

  const takePic = async () => {
    if (cameraRef) {
      try {
        const options = {
          quality: 0.5,
          base64: true,
          mirrorImage: true,
          type: 'image/png',
        };
        const data = await cameraRef.current.takePictureAsync(options);
        setImage(data.uri);
        uploadImage(data);
        onClick();
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <View>
      {!turnOnCamera && !image ? (
        <LinearGradient
          colors={['#F46D6D', '#CE7C7C']}
          style={{ borderRadius: 8 }}
        >
          <View
            style={{
              width: 370,
              height: 250,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Pressable
              onPress={onClick}
              style={[styleButtons.buttonDefault, styleButtons.buttonBorder]}
            >
              <Text style={styleButtons.buttonDefaultText}>
                Sätt igång kamera
              </Text>
            </Pressable>
          </View>
        </LinearGradient>
      ) : (
        <Image source={{ uri: image }} style={{ width: 370, height: 250 }} />
      )}

      {turnOnCamera && !image && (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ height: '100%', width: 400 }}
            type={type}
            ref={(ref) => (cameraRef.current = ref)}
          >
            <View>
              <Pressable onPress={toggleCameraType}>
                <Text>Flip Camera</Text>
              </Pressable>
            </View>
            <View
              style={{
                alignSelf: 'center',
                flex: 1,
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={takePic}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: '#fff',
                  position: 'absolute',
                }}
              />
            </View>
          </Camera>
        </View>
      )}
    </View>
  );
};

export default CameraView;
