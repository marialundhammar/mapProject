import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import styleButtons from '../../../styles/styleButtons';

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
        <View>
          <Camera
            style={{ height: 600, width: 400 }}
            type={type}
            ref={cameraRef}
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

export default CameraPreview;
