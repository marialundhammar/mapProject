import React, { useContext, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import styleButtons from '../../../styles/styleButtons';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import { db } from '../../../firebase/firebase';
import { ContextStore } from '../../../context/ContextStore';
import { arrayOfBarTours } from '../../../configs/barTours';
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
};

const GroupCard = ({ text, numberOfBars, navigation }: GroupCardType) => {
  const [isClicked, setIsClicked] = useState(false);
  const { user, setBarTour } = useContext(ContextStore);

  const handleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const chooseBarTourHandler = () => {
    const userCollectionRef = collection(db, 'users');
    const userQuery = query(userCollectionRef, where('uid', '==', user.uid));
    const barTour = arrayOfBarTours.find((bar) => bar.title === text);

    setBarTour(barTour);

    getDocs(userQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userDocRef = doc.ref;
          return updateDoc(userDocRef, {
            barTour: barTour,
          });
        });
      })
      .catch((error) => {
        console.log('Errroooor: ', error);
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
        <Text style={styleTexts.h3}>{text}</Text>
        {numberOfBars && (
          <Text style={styleTexts.miniText}>Antal stopp {numberOfBars}</Text>
        )}
        {isClicked && numberOfBars && (
          <View>
            <Text style={styleTexts.miniText}>Show all bars here ...</Text>
            <Pressable onPress={chooseBarTourHandler}>
              <Text style={styleButtons.buttonDefaultText}>VÄLJ RUNDA</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default GroupCard;
