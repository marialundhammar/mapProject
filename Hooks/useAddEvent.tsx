import { useState, useEffect, useContext } from 'react';
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import useGetEvents from './useGetEvents';
import { ContextStore } from '../context/ContextStore';
import { BarType } from '../types';

interface AddEventType {
  type: string;
  bar: BarType;
  textInputValue?: string;
  image?: string;
}

const useAddEvent = (user) => {
  const userCollectionRef = collection(db, 'users');
  const userQuery = query(userCollectionRef, where('uid', '==', user.uid));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const prevEvents = useGetEvents(user);
  const currentTime = new Date().toLocaleTimeString();
  const { currentBar, setCurrentBar, currentChallenge } =
    useContext(ContextStore);

  const fetchEvents = async () => {
    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.events) {
        setEvents(data.events);
      }
    });
  };

  const saveEvents = async (text, type, textInputValue = '', imageUri = '') => {
    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach(async (doc) => {
      const userDocRef = doc.ref;
      await updateDoc(userDocRef, {
        events: [
          {
            id: '',
            text: text,
            type: type,
            barId: '',
            createDate: currentTime,
            mediaUrl: imageUri,
            comment: textInputValue,
          },
          ...prevEvents,
        ],
      });
    });
    setLoading(false);
  };

  const addEvents = async (
    type: string,
    bar: BarType,
    textInputValue?: string,
    image?: string
  ) => {
    await fetchEvents();

    switch (type) {
      case 'leftBar':
        saveEvents(`${currentTime} - lämnade ${currentBar.name}`, type);
        break;
      case 'enteredBar':
        saveEvents(`${currentTime} - kom till baren  ${bar.name} `, type);
        break;

      case 'challenge':
        saveEvents(
          `Kl. ${currentTime} genomförde utmaningen:  ${currentChallenge.name}`,
          type,
          textInputValue,
          image
        );
        break;

      default:
        saveEvents('random event', type);
    }

    //modify so that the same challenge will not be displayed again
  };

  return { loading, addEvents };
};

export default useAddEvent;
