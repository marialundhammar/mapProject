import events from "events";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useContext, useState } from "react";
import { ContextStore } from "../context/ContextStore";
import { db } from "../firebase/firebase";
import useGetBarTours from "./useGetBarTours";

  let prevBarTours = useGetBarTours(user);


const useFinishTour = ({ navigation }) => {
    
    const {
        currentBarTour,
        setFinishedTour,
        setCurrentBarTour,
        setOnProfile,
        user,
        setPageHandler,
        visitedBars,
      } = useContext(ContextStore);
    console.log('DU har gjort hela rundan');
    const userCollectionRef = collection(db, 'users');
    const userQuery = query(userCollectionRef, where('uid', '==', user.uid));

    const [showFinishedModal, setShowFinishedModal] = useState({
        visible: false,
        content: '',
    });
    
    


    setOnProfile(true);
    setFinishedTour(true);
    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach(async (doc) => {
      const userDocRef = doc.ref;
      if (prevBarTours === undefined) {
        prevBarTours = [];
      }

      await updateDoc(userDocRef, {
        finishedTours: [
          { date: new Date(), events: events, ...currentBarTour },
          ...prevBarTours,
        ],
      });
    });
    setPageHandler('Profile');
    navigation.navigate('Profile');
    setShowFinishedModal({ visible: true, content: 'FINITOO' });


    return (
        
    
    )
}