import { collection, query, where, getDocs } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import mapStyle from '../../../assets/mapStyle';
import { ContextStore } from '../../../context/ContextStore';
import { db } from '../../../firebase/firebase';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';

const ProfileHeader = ({ amountOfTrofees, imagePath }) => {
  const { user } = useContext(ContextStore);
  const [userData, setUserData] = useState({
    username: '',
    finishedTours: [],
    profileImage: '',
  });

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
          profileImage: imagePath,
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
          width: '100%',
          paddingBottom: 12,
        }}
      >
        <View
          style={{
            width: '30%',
            height: '90%',
            borderRadius: 70,
            marginRight: 12,
          }}
        >
          <Image
            source={require('../../../assets/pofileImages/livstrom.png')}
            style={{ width: 120, height: 110, marginTop: 10 }}
          />
        </View>

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
            {userData.finishedTours ? (
              <Text style={styleTexts.h5}>
                👉 Du har totalt genomfört {userData.finishedTours.length}{' '}
                barrundor
              </Text>
            ) : (
              <Text style={styleTexts.h5}>
                {' '}
                👉 Inga genomförda barrundor ännu
              </Text>
            )}
            {amountOfTrofees.length > 1 ? (
              <Text style={styleTexts.h5}>
                👉 Samlat på dig {amountOfTrofees.length} stycken troféer{' '}
              </Text>
            ) : (
              <Text style={styleTexts.h5}>
                {' '}
                👉 Inga troféer insamlade hittills
              </Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default ProfileHeader;
