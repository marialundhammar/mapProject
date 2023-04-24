import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useGetBarTours = (user) => {
  const [barTours, setBarTours] = useState([]);

  useEffect(() => {
    const userCollectionRef = collection(db, 'users');
    const userQuery = query(userCollectionRef, where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(
      userQuery,
      (querySnapshot) => {
        const userDoc = querySnapshot.docs[0];
        const data = userDoc.data();

        setBarTours(data.finishedTours);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
    return unsubscribe;
  }, [user]);

  return barTours;
};

export default useGetBarTours;
