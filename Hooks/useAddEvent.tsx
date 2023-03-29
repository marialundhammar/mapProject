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

const useAddEvents = (user, text) => {
  const userCollectionRef = collection(db, 'users');
  const userQuery = query(userCollectionRef, where('uid', '==', user.uid));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(userQuery);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.events) {
          setEvents(data.events);
        }
      });
    };
    fetchEvents();
  }, [user]);

  useEffect(() => {
    if (text && events.length > 0) {
      setLoading(true);
      const saveEvents = async () => {
        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach(async (doc) => {
          const userDocRef = doc.ref;
          await updateDoc(userDocRef, { events: [text, ...events] });
        });
        setLoading(false);
      };
      saveEvents();
    }
  }, [text, events]);

  return loading;
};

export default useAddEvents;
