import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';
import { getStorage } from 'firebase/storage';

//add to your .env file
const firebaseConfig = {
  apiKey: 'AIzaSyDqspkA5s9yEbxiRdGFHA-4x6HbY5HUolA',
  authDomain: 'appen-f07d7.firebaseapp.com',
  projectId: 'appen-f07d7',
  storageBucket: 'appen-f07d7.appspot.com',
  messagingSenderId: '436523406860',
  appId: '1:436523406860:web:f62f6965f9dfb7268b0029',
};

/* const firebaseConfig = {
  apiKey: 'AIzaSyAQunm5x4PRSf2rHbI_vbhQI2zAaBTKWNI',
  authDomain: 'appen-test-22bc9.firebaseapp.com',
  projectId: 'appen-test-22bc9',
  storageBucket: 'appen-test-22bc9.appspot.com',
  messagingSenderId: '786304024944',
  appId: '1:786304024944:web:4bcc1151f89e110d9f4fb5',
}; */
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

const storage = getStorage(app);

export { app as default, auth, db, storage };
