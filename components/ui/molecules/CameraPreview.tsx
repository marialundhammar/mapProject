import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import styleButtons from '../../../styles/styleButtons';
import { MaterialIcons } from '@expo/vector-icons';
import styleTexts from '../../../styles/styleTexts';
const CameraPreview = ({
  type,
  image,
  turnOnCamera,
  onClick,
  takePic,
  toggleCameraType,
  cameraRef,
}) => {
  return (
    <View>
      {turnOnCamera && !image && (
        <Camera
          style={{ flex: 1, marginTop: 0, width: 412 }}
          type={type}
          ref={cameraRef}
        >
          <View
            style={{
              alignSelf: 'center',
              flex: 1,
              alignItems: 'center',
              position: 'absolute',
              height: '12%',
              bottom: 0,
              width: '100%',
              opacity: 0.6,
              backgroundColor: '#E68383',
            }}
          ></View>
          <View
            style={{
              alignSelf: 'center',
              flex: 1,
              alignItems: 'center',
              position: 'absolute',
              height: '12%',
              bottom: 0,
              width: '100%',
            }}
          >
            <Pressable
              onPress={toggleCameraType}
              style={{
                bottom: 32,
                left: 60,
                borderRadius: 50,
                position: 'absolute',
              }}
            >
              <Text>
                <MaterialIcons
                  name="flip-camera-android"
                  size={42}
                  color="white"
                />
              </Text>
            </Pressable>

            <TouchableOpacity
              onPress={takePic}
              style={{
                width: 70,
                height: 70,
                bottom: 16,
                borderRadius: 50,
                backgroundColor: '#fff',
                position: 'absolute',
              }}
            />
          </View>
        </Camera>
      )}

      {image && !turnOnCamera && (
        <Image
          source={{ uri: image }}
          style={{ width: 390, height: 300, borderRadius: 8 }}
        />
      )}

      {!turnOnCamera && !image && (
        <LinearGradient
          colors={['#F46D6D', '#CE7C7C']}
          style={{ borderRadius: 8 }}
        >
          <View
            style={{
              width: 390,
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={[styleTexts.bodyText, { marginBottom: 12 }]}>
              Ta ett foto som bevis på att du utfört utmaningen{' '}
            </Text>

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
      )}
    </View>
  );
};

export default CameraPreview;
