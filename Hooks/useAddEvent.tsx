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
  const events = useGetEvents(user);
  const [updatedEvents, setUpdatedEvents] = useState([]);
  const [eventsLoaded, setEventsLoaded] = useState(false);

  const saveEvents = async () => {
    await addEvent();
    getDocs(userQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userDocRef = doc.ref;
          return updateDoc(userDocRef, { events: events });
        });
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  const addEvent = () => {
    setUpdatedEvents([text, ...events]);
  };

  useEffect(() => {
    saveEvents();
  }, []);

  return eventsLoaded;
};

export default useAddEvents;
