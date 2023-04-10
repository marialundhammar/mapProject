import { View, Image } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import React, { useContext, useEffect, useState } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { ContextStore } from '../../../context/ContextStore';
import { storage } from '../../../firebase/firebase';

const PhotoStream = ({ path }) => {
  const [photoUrls, setPhotoUrls] = useState([]);

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

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <View style={styleComponents.imageContainer}>
      {photoUrls.map((photoUrls, i) => (
        <Image
          key={i}
          source={{ uri: photoUrls }}
          style={styleComponents.imageSmall}
        />
      ))}
    </View>
  );
};

export default PhotoStream;
