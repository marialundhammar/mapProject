import React, { useContext } from 'react';
import { Text, View, Pressable, Image } from 'react-native';
import Modal from 'react-native-modal';
import styleButtons from '../../../styles/styleButtons';
import styleText from '../../../styles/styleTexts';
import styleModals from '../../../styles/styleComponents';
import { AntDesign } from '@expo/vector-icons';
import NavigationButton from '../atoms/NavigatonButton';
import styleComponents from '../../../styles/styleComponents';
import { BarType } from '../../../types';
import { ContextStore } from '../../../context/ContextStore';
import DefaultButton from '../atoms/DefaultButton';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import useGetBarTours from '../../../Hooks/useGetBarTours';
import useGetEvents from '../../../Hooks/useGetEvents';

type ModalType = {
  content?: {
    lat: number;
    long: number;
    name: string;
    distance: number;
  } | null;
  header: string;
  showButton?: boolean;
  image?: any;
  navigation?: any;
  visible: boolean;
  onClose?: () => void;
  currentBar?: BarType;
  text?: string;
  finishedRound?: boolean;
  isFinished?: boolean;
};

export const BarModal = ({
  navigation,
  content,
  header,
  image,
  showButton = false,
  visible,
  onClose,
  currentBar,
  text,
  finishedRound,
  isFinished,
}: ModalType) => {
  const imagePath = image ? image : null;

  const {
    currentBarTour,
    setFinishedTour,
    setCurrentBarTour,
    setOnProfile,
    user,
    setPageHandler,
    visitedBars,
  } = useContext(ContextStore);

  const events = useGetEvents(user);
  let prevBarTours = useGetBarTours(user);
  const userCollectionRef = collection(db, 'users');
  const userQuery = query(userCollectionRef, where('uid', '==', user.uid));

  const handleFinishedBarTour = async () => {
    setOnProfile(true);
    setFinishedTour(true);
    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach(async (doc) => {
      const userDocRef = doc.ref;
      if (prevBarTours === undefined) {
        prevBarTours = [];
      }

      await updateDoc(userDocRef, {
        finishedTours: [
          { date: new Date(), events: events, ...currentBarTour },
          ...prevBarTours,
        ],
      });
    });
    setPageHandler('Profile');
    navigation.navigate('Profile');
  };

  return (
    <View>
      <Modal isVisible={visible} onBackdropPress={onClose}>
        <View style={styleComponents.modalStyle}>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <Pressable style={styleButtons.closeIcon} onPress={onClose}>
              <AntDesign name="closecircleo" size={24} color="#FFD3D3" />
            </Pressable>
          </View>
          <View style={styleModals.header}>
            <Text style={styleText.h1}>{header}</Text>
          </View>

          <View style={styleComponents.content}>
            {image && (
              <Image source={{ uri: imagePath }} style={styleModals.image} />
            )}
            {currentBar && (
              <Text style={styleText.bodyText}>
                Du verkar befinna dig på {content?.name}, stämmer det?
              </Text>
            )}
            {text && <Text style={styleText.bodyText}>{text}</Text>}

            <View style={styleComponents.centered}>
              {showButton && (
                <>
                  <DefaultButton
                    onClose={onClose}
                    text={'Nej gick bara förbi'}
                  />
                  <NavigationButton
                    navigation={navigation}
                    navigateTo={'Bar'}
                    buttonText={'Yes det stämmer'}
                    isFilled={false}
                    currentBar={currentBar}
                    onClose={onClose}
                  />
                </>
              )}
              {finishedRound && (
                <>
                  <DefaultButton
                    onClose={onClose}
                    text={'Ops, vill såklart fortsätta'}
                  />
                  <NavigationButton
                    navigation={navigation}
                    navigateTo={'Profile'}
                    buttonText={'Avsluta barrunda ändå'}
                    isFilled={false}
                    onClose={onClose}
                  />
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
