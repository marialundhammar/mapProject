import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import styleButtons from '../../../styles/styleButtons';
import { LinearGradient } from 'expo-linear-gradient';
import styleComponents from '../../../styles/styleComponents';

let camera: Camera;

const ImageUpload = ({ onClick, turnOnCamera }) => {
  const [type, setType] = useState(CameraType.back);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [cameraRef, setCameraRef] = useState(null);

  async function requestCameraPermissions() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Camera permission not granted!');
    }
  }

  useEffect(() => {
    requestCameraPermissions();
  }, []);

  const takePic = async () => {
    /*     console.log('klick');
    const photo: any = await camera.takePictureAsync();
    setCapturedImage(photo);
    console.log(capturedImage); */
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <View>
      {/*      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View> */}

      {!turnOnCamera ? (
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
        <View style={{ flex: 1 }}>
          <Camera
            style={{ height: '100%', width: 400 }}
            type={type}
            ref={(ref) => setCameraRef(ref)}
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
                onPress={onClick}
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
      {/*       <Text>Image Upload</Text>
      <Pressable onPress={pickImage}>
        <Text>Upload Image</Text>
      </Pressable> */}
    </View>
  );
};

export default ImageUpload;
