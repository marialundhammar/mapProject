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
import ProfileNavigationBar from '../ui/molecules/ProfileNavigationBar';
import { arrayOfBarTours } from '../../configs/barTours';
import { profileImages } from '../../configs/profileImage';

const ProfileScreen = ({ navigation }) => {
  const navigateTo = 'Map';
  const { user, finishedTour, pageProfile } = useContext(ContextStore);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const photos = [];
  const [lightboxImageIndex, setLightboxImageIndex] = useState(null);
  const [completedBarTours, setCompletedBarTours] = useState([]);
  const [completedBarTourstrofee, setCompletedBarToursTrofee] = useState([]);
  const trofeeList = [];
  const [profileImage, setProfileImage] = useState('');

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

          if (data.profileImage) {
            setProfileImage(data.profileImage);
          }
        },
        (error) => {
          console.log('Error: ', error);
        }
      );
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
  const displayedTitles = [];

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

  const getTrofeeUri = () => {
    const arrayOfBarTitle = [];
    const completedBarTitle = [];

    arrayOfBarTours.forEach((item) => {
      arrayOfBarTitle.push(item.title);
    });

    completedBarTours.forEach((item) => {
      completedBarTitle.push(item.name);
    });
  };

  useEffect(() => {
    getAllImages();
    getTrofeeUri();
  }, []);

  let isTitleDisplayed = false;

  const getProfileImage = () => {
    const imagePath = profileImages.find((item) => item.title === profileImage);

    console.log('IMAGE', imagePath);

    return imagePath;
  };

  return (
    <View
      style={[
        {
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        styleScreens.defaultScreen,
      ]}
    >
      <>
        <TopHeader navigation={navigation} showBackButton={false} />
        <ProfileHeader
          amountOfTrofees={displayedTitles}
          imagePath={() => getProfileImage()}
        />

        <ScrollView horizontal={false}>
          <ProfileNavigationBar />
          <View style={{}}>
            {pageProfile === 'rounds' && (
              <View style={{ alignItems: 'center', width: '100%' }}>
                <TimeLineBarTours
                  navigation={navigation}
                  bartours={completedBarTours}
                />

                <>
                  {loading ? (
                    <ActivityIndicator size="large" color="#000" />
                  ) : photoUrls.length > 0 ? (
                    <View
                      style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 20,
                      }}
                    >
                      <View>
                        <Text style={styleTexts.h2}>Tidigare tagna bilder</Text>
                      </View>
                      <View
                        style={{
                          alignContent: 'center',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          padding: 12,
                          marginTop: 20,
                        }}
                      >
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
                    <Text style={styleTexts.h4}>
                      Inga foton tagna här ännu :({' '}
                    </Text>
                  )}
                </>
              </View>
            )}

            {pageProfile === 'profile' && (
              <View
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                  height: '100%',

                  flexDirection: 'column-reverse',
                }}
              >
                <Button
                  navigation={navigation}
                  navigateTo={'Home'}
                  buttonText={'NY BARRUNDA'}
                />

                <Pressable
                  style={styleButtons.buttonDefaultBorder}
                  onPress={handleLogOut}
                >
                  <Text style={styleTexts.h4}>Logga ut</Text>
                </Pressable>
              </View>
            )}

            {pageProfile === 'trofees' && (
              <View
                style={{
                  alignItems: 'center',
                  flex: 1,
                  paddingTop: 42,

                  width: '100%',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    margin: 8,
                  }}
                >
                  {completedBarTours
                    .filter((item) =>
                      arrayOfBarTours.some(
                        (barTour) => barTour.title === item.title
                      )
                    )
                    .map((item, i) => {
                      const isTitleDisplayed = displayedTitles.includes(
                        item.title
                      );
                      if (!isTitleDisplayed) {
                        displayedTitles.push(item.title);
                        return (
                          <View
                            style={{
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              margin: 14,
                            }}
                            key={i}
                          >
                            <Image
                              style={styleComponents.imageSmall}
                              source={
                                arrayOfBarTours.find(
                                  (barTour) => barTour.title === item.title
                                ).trofee
                              }
                            />
                            <Text style={styleTexts.h4}>{item.title}</Text>
                          </View>
                        );
                      } else {
                        return null;
                      }
                    })}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </>
    </View>
  );
};

export default ProfileScreen;
