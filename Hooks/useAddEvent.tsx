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
      console.log(data);
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

  console.log('####', currentBar);

  const addEvents = async (type: string, bar) => {
    await fetchEvents();

    switch (type) {
      case 'leftBar':
        setLoading(true);
        saveEvents(`${currentTime} lämnade ${currentBar.name}`, type);

        break;
      case 'enteredBar':
        setLoading(true);
        saveEvents(`${currentTime} kom till baren `, type);
        break;

      default:
        setLoading(true);
        saveEvents('random event', type);
    }
  };

  return { loading, addEvents };
};

export default useAddEvent;
