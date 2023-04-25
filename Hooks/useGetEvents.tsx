//ta ett event

//pushar events

//spara till firebase

//CurrentBarTour ska ha id, name, events, bars

//events: [{ id: '', text: '', type: 'enteredBar/challenge/leftBar', barId: '', createDate: '', mediaUrl:'', mediaType: '' }]

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useGetEvents = (user) => {
  const [events, setEvents] = useState([]);

  /*   await updateDoc(userDocRef, {
    finishedTours: [
      { date: new Date(), events: events, ...currentBarTour },
      ...prevBarTours,
    ],
    currentBarTour: {
      events: [],
    },
  }); */

  useEffect(() => {
    const userCollectionRef = collection(db, 'users');
    const userQuery = query(userCollectionRef, where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(
      userQuery,
      (querySnapshot) => {
        const userDoc = querySnapshot.docs[0];
        const data = userDoc.data();

        if (data.currentBarTour && data.currentBarTour.events) {
          setEvents(data.currentBarTour.events);
        }
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
    return unsubscribe;
  }, [user]);

  return events;
};

export default useGetEvents;
