import React, { useContext, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import styleButtons from '../../../styles/styleButtons';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import { db } from '../../../firebase/firebase';
import { ContextStore } from '../../../context/ContextStore';
import { arrayOfBarTours } from '../../../configs/barTours';
import { Ionicons } from '@expo/vector-icons';
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

type GroupCardType = {
  text: string;
  numberOfBars?: number;
  navigation?: any;
  area?: string;
};

const GroupCard = ({ text, numberOfBars, navigation, area }: GroupCardType) => {
  const [isClicked, setIsClicked] = useState(false);
  const { user, setCurrentBarTour, setFinishedTour } = useContext(ContextStore);

  const handleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  console.log('AREA', area);

  const chooseBarTourHandler = () => {
    const userCollectionRef = collection(db, 'users');
    const userQuery = query(userCollectionRef, where('uid', '==', user.uid));
    const barTour = arrayOfBarTours.find((bar) => bar.title === text);

    setFinishedTour(false);

    setCurrentBarTour(barTour);

    getDocs(userQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userDocRef = doc.ref;
          return updateDoc(userDocRef, {
            currentBarTour: barTour,
          });
        });
      })
      .catch((error) => {
        console.log('Error: ', error);
      });

    navigation.navigate('Map');
  };

  return (
    <Pressable
      onPress={handleIsClicked}
      style={
        isClicked
          ? styleComponents.cardStyleIsFilled
          : styleComponents.cardStyle
      }
    >
      <View style={{ padding: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styleTexts.h3}>{text}</Text>
          {numberOfBars && (
            <Text
              style={[styleTexts.miniText, { marginTop: 4, marginRight: 12 }]}
            >
              Antal stopp {numberOfBars}
            </Text>
          )}
        </View>

        {numberOfBars && (
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <Text style={styleTexts.miniText}>
              <Ionicons name="md-location-sharp" size={16} color="#FFD3D3" />
            </Text>
            <Text style={styleTexts.miniText}> {area}</Text>
          </View>
        )}
        {isClicked && numberOfBars && (
          <View style={{ alignItems: 'center' }}>
            <Pressable
              onPress={chooseBarTourHandler}
              style={styleButtons.buttonDefaultSmallPink}
            >
              <Text style={styleTexts.h4}>VÄLJ RUNDA</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default GroupCard;
