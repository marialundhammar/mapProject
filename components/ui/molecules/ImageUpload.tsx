import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
let camera: Camera;

const ImageUpload = () => {
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
    console.log('klick');
    const photo: any = await camera.takePictureAsync();
    setCapturedImage(photo);
    console.log(capturedImage);
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

      <View style={{ height: 300, width: 360 }}>
        <Camera
          style={{ flex: 1 }}
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
              onPress={takePic}
              style={{
                width: 70,
                height: 70,
                bottom: 0,
                borderRadius: 50,
                backgroundColor: '#fff',
              }}
            />
          </View>
        </Camera>
      </View>
      {/*       <Text>Image Upload</Text>
      <Pressable onPress={pickImage}>
        <Text>Upload Image</Text>
      </Pressable> */}
    </View>
  );
};

export default ImageUpload;
