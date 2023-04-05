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

const useAddEvent = (user) => {
  const userCollectionRef = collection(db, 'users');
  const userQuery = query(userCollectionRef, where('uid', '==', user.uid));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const prevEvents = useGetEvents(user);
  const currentTime = new Date().toLocaleTimeString();
  const { currentBar, setCurrentBar } = useContext(ContextStore);

  const fetchEvents = async () => {
    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.events) {
        setEvents(data.events);
      }
    });
  };

  const saveEvents = async (text, type) => {
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
            mediaUrl: '',
          },
          ...prevEvents,
        ],
      });
    });
    setLoading(false);
  };

  const addEvents = async (type: string, bar: BarType) => {
    await fetchEvents();

    switch (type) {
      case 'leftBar':
        saveEvents(`${currentTime} lämnade ${currentBar.name}`, type);
        break;
      case 'enteredBar':
        saveEvents(`${currentTime} kom till baren `, type);
        break;

      case 'challenge':
        saveEvents(`${currentTime} genomförde utmaningen`, type);

      default:
        saveEvents('random event', type);
    }
  };

  return { loading, addEvents };
};

export default useAddEvent;
