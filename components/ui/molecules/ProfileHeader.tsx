import { collection, query, where, getDocs } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import mapStyle from '../../../assets/mapStyle';
import { ContextStore } from '../../../context/ContextStore';
import { db } from '../../../firebase/firebase';
import styleTexts from '../../../styles/styleTexts';

const ProfileHeader = () => {
  const { user } = useContext(ContextStore);
  const [userData, setUserData] = useState({ username: '', finishedTours: [] });

  const getUserInfo = async (user) => {
    const userCollectionRef = collection(db, 'users');
    const userQuery = query(userCollectionRef, where('uid', '==', user.uid));

    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.username) {
        setUserData({
          username: data.username,
          finishedTours: data.finishedTours,
        });
      }
    });
  };

  getUserInfo(user);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '30%',
            backgroundColor: 'grey',
            height: '100%',
            borderRadius: 12,
            marginRight: 4,
          }}
        ></View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={styleTexts.h3}> Hallå där</Text>
            <Text style={styleTexts.h2}> {userData.username}</Text>
          </View>

          <View style={{ width: '90%' }}>
            <Text style={styleTexts.h5}>
              👉 Du har totalt genomfört {userData.finishedTours.length}{' '}
              barrundor
            </Text>
            <Text style={styleTexts.h5}>👉 Genomfört x antal utmaningar </Text>
            <Text style={styleTexts.h5}>👉 Samlat på dig x antal troféer </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ProfileHeader;
