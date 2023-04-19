import { View, Image, Text, Animated } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { ContextStore } from '../../../context/ContextStore';
import { storage } from '../../../firebase/firebase';
import { useFocusEffect } from '@react-navigation/native';
import styleTexts from '../../../styles/styleTexts';
import Lightbox from 'react-native-lightbox';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Animated.event now requires a second argument for options',
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false',
]);

const PhotoStream = ({ path }) => {
  const [photoUrls, setPhotoUrls] = useState([]);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(null);

  const { user, currentBar } = useContext(ContextStore);

  const getAllImages = async () => {
    const listRef = ref(storage, `images/${path}`);

    try {
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return url;
        })
      );

      await setPhotoUrls(urls);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(() => {
    getAllImages();
  });

  const handleImagePress = (index) => {
    setLightboxImageIndex(index);
  };

  const renderLightboxContent = (index) => {
    return (
      <Image
        source={{ uri: photoUrls[index] }}
        style={{ flex: 1 }}
        resizeMode="contain"
      />
    );
  };

  return (
    <>
      {photoUrls.length > 0 && (
        <>
          <Text style={styleTexts.h3}>Sist du var här såg det ut såhär </Text>
          <View style={styleComponents.imageContainer}>
            {photoUrls.reverse().map((photoUrls, i) => (
              <Lightbox
                key={i}
                onOpen={() => handleImagePress(i)}
                renderContent={() => renderLightboxContent(i)}
                style={{ padding: 2 }}
              >
                <Image
                  key={i}
                  source={{ uri: photoUrls }}
                  style={styleComponents.imageSmall}
                />
              </Lightbox>
            ))}
          </View>
        </>
      )}
    </>
  );
};

export default PhotoStream;
