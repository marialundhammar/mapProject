import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';

//add to your .env file
const firebaseConfig = {
  apiKey: 'AIzaSyDqspkA5s9yEbxiRdGFHA-4x6HbY5HUolA',
  authDomain: 'appen-f07d7.firebaseapp.com',
  projectId: 'appen-f07d7',
  storageBucket: 'appen-f07d7.appspot.com',
  messagingSenderId: '436523406860',
  appId: '1:436523406860:web:f62f6965f9dfb7268b0029',
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

import firebase from 'firebase/app';
import 'firebase/firestore';

export { app as default, auth, db };
