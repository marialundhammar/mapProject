import { useContext, useState } from 'react';
import DistanceBanner from '../components/ui/atoms/DistanceBanner';
import { ContextStore } from '../context/ContextStore';
import { BarType } from '../types';

import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

interface CalculateDistanceFunctionType {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}

interface SaveEventsType {
  events: string[];
  currentBarName?: string;
}

interface CalculateUserAndBarType extends CalculateDistanceFunctionType {
  name: string;
}

export const calculateDistanceFunction = ({
  lat1,
  lon1,
  lat2,
  lon2,
}: CalculateDistanceFunctionType) => {
  var p = 0.017453292519943295;
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a));
};

export const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const saveEvents = (user, events) => {
  const userCollectionRef = collection(db, 'users');
  const userQuery = query(userCollectionRef, where('uid', '==', user.uid));

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
