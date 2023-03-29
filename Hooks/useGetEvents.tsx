//ta ett event

//pushar events

//spara till firebase

//CurrentBarTour ska ha id, name, events, bars

//events: [{ id: '', text: '', type: 'enteredBar/challenge/leftBar', barId: '', createDate: '', mediaUrl:'', mediaType: '' }]

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useGetEvents = (user) => {
  const [events, setEvents] = useState([]);
  const fetchEvents = () => {
    const userCollectionRef = collection(db, 'users');
    const userQuery = query(userCollectionRef, where('uid', '==', user.uid));

    getDocs(userQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.events) {
            setEvents(data.events);
          }
        });
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return events;
};

export default useGetEvents;
