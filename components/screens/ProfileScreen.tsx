import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Button from '../ui/atoms/NavigatonButton';
import styleButtons from '../../styles/styleButtons';
import TopHeader from '../ui/molecules/TopHeader';
import styleScreens from '../../styles/styleScreens';
import { getAuth, signOut } from 'firebase/auth';
import { ContextStore } from '../../context/ContextStore';
import TimeLine from '../ui/molecules/TimeLine';
import PhotoStream from '../ui/molecules/PhotoStream';
import ProfileHeader from '../ui/molecules/ProfileHeader';
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase';
import useGetEvents from '../../Hooks/useGetEvents';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { useFocusEffect } from '@react-navigation/native';
import Lightbox from 'react-native-lightbox';
import { LogBox } from 'react-native';
import styleComponents from '../../styles/styleComponents';
import styleTexts from '../../styles/styleTexts';
import TimeLineBarTours from '../ui/molecules/TimeLineBarTours';

const ProfileScreen = ({ navigation }) => {
  const navigateTo = 'Map';
  const { user, finishedTour } = useContext(ContextStore);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const photos = [];
  const [lightboxImageIndex, setLightboxImageIndex] = useState(null);
  const [completedBarTours, setCompletedBarTours] = useState([]);

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('user signed out');
        navigation.navigate('LogIn');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImagePress = (index) => {
    setLightboxImageIndex(index);
  };

  const getBarTours = () => {
    useEffect(() => {
      const userCollectionRef = collection(db, 'users');
      const userQuery = query(userCollectionRef, where('uid', '==', user.uid));
      const unsubscribe = onSnapshot(
        userQuery,
        (querySnapshot) => {
          const userDoc = querySnapshot.docs[0];
          const data = userDoc.data();

          console.log('data', data.finishedTours);

          if (data.finishedTours) {
            setCompletedBarTours(data.finishedTours);
          }
        },
        (error) => {
          console.log('Error: ', error);
        }
      );
      console.log('completed tours', completedBarTours.length);
      return unsubscribe;
    }, [user]);
  };

  getBarTours();

  const renderLightboxContent = (index) => {
    return (
      <Image
        source={{ uri: photoUrls[index] }}
        style={{ flex: 1 }}
        resizeMode="contain"
      />
    );
  };
  const getAllImages = async () => {
    const listRef = ref(storage, `images/${user.email}`);

    try {
      const listResult = await listAll(listRef);
      const urls = [];

      for (const folderRef of listResult.prefixes) {
        const folderResult = await listAll(folderRef);
        const folderUrls = await Promise.all(
          folderResult.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return url;
          })
        );
        urls.push(...folderUrls);
      }

      setPhotoUrls(urls.reverse());
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <View
      style={[
        {
          height: '100%',
          width: '95%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        styleScreens.defaultScreen,
      ]}
    >
      <>
        <ScrollView horizontal={false}>
          <TopHeader navigation={navigation} showBackButton={false} />
          <ProfileHeader />
          <View
            style={{
              width: '95%',
              alignItems: 'center',
              flex: 1,

              justifyContent: 'center',
            }}
          >
            <>
              <TimeLineBarTours
                navigation={navigation}
                bartours={completedBarTours}
              />
            </>
            <>
              {loading ? (
                <ActivityIndicator size="large" color="#000" /> // Show loading indicator while images are being fetched
              ) : photoUrls.length > 0 ? (
                <View>
                  <View style={styleComponents.imageContainer}>
                    {photoUrls.reverse().map((photoUrl, i) => (
                      <Lightbox
                        key={i}
                        onOpen={() => handleImagePress(i)}
                        renderContent={() => renderLightboxContent(i)}
                        style={{ padding: 2 }}
                      >
                        <Image
                          key={i}
                          source={{ uri: photoUrl }}
                          style={styleComponents.imageSmall}
                        />
                      </Lightbox>
                    ))}
                  </View>
                </View>
              ) : (
                <Text>No photos found</Text>
              )}
            </>
            <View>
              <Button
                navigation={navigation}
                navigateTo={'Home'}
                buttonText={'GÅ TILL hem'}
              />
            </View>
            <Pressable
              style={styleButtons.buttonDefaultBorder}
              onPress={handleLogOut}
            >
              <Text>Logga ut</Text>
            </Pressable>
          </View>
        </ScrollView>
      </>
    </View>
  );
};

export default ProfileScreen;
