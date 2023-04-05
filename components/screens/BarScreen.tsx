import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { ContextStore } from '../../context/ContextStore';
import styleScreens from '../../styles/styleScreens';
import styleTexts from '../../styles/styleTexts';
import Button from '../ui/atoms/NavigatonButton';
import DoChallenge from '../ui/molecules/DoChallange';
import TimeLine from '../ui/molecules/TimeLine';
import TopHeader from '../ui/molecules/TopHeader';
import useGetEvent from '../../Hooks/useGetEvents';
import Map from '../ui/molecules/Map';
import styleComponents from '../../styles/styleComponents';
import BarContent from '../ui/molecules/BarContent';
import { challenges2 } from '../../configs/challenges';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

import { storage } from '../../firebase/firebase';

const BarScreen = ({ navigation }) => {
  const navigateTo = 'Map';
  const {
    user,
    currentBar,
    onBar,
    setCurrentChallenge,
    currentChallenge,
    setNewPhotoUploaded,
    newPhotoUploaded,
  } = useContext(ContextStore);

  const [photoUrls, setPhotoUrls] = useState([]);

  const events = useGetEvent(user);

  useEffect(() => {
    const challenge =
      challenges2[Math.floor(Math.random() * challenges2.length)];
    setCurrentChallenge(challenge);
  }, []);

  useEffect(() => {
    getAllImages();
  }, [newPhotoUploaded]);

  const getAllImages = async () => {
    const listRef = ref(storage, `images/${user.email}`);

    try {
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return url;
        })
      );
      setPhotoUrls(urls);
    } catch (error) {
      console.error(error);
    }

    setNewPhotoUploaded(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#1B274A',
      }}
    >
      <TopHeader navigation={navigation} showBackButton={false} />

      {onBar ? (
        <>
          <ScrollView>
            <View></View>
            <View style={styleScreens.onboardingScreen}>
              <Text style={styleTexts.h2}>
                VÄLKOMMEN TILL {currentBar.name}
              </Text>

              <BarContent />
              <TimeLine navigation={navigation} />

              <DoChallenge navigation={navigation} />
              <View style={styleComponents.imageContainerBig}>
                <Text style={styleTexts.h3}>
                  Sist du var här såg det ut såhär
                </Text>
                <View style={styleComponents.imageContainer}>
                  {photoUrls.map((photoUrls, i) => (
                    <Image
                      source={{ uri: photoUrls }}
                      style={styleComponents.imageSmall}
                    />
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styleComponents.centered}>
            <Button
              navigation={navigation}
              navigateTo={'Map'}
              buttonText={'GÅ FRÅN BAR'}
              isFilled={true}
            />
          </View>
        </>
      ) : (
        <>
          <Map navigation={navigation} />
        </>
      )}
    </View>
  );
};

export default BarScreen;
