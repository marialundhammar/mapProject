import { collection, query, where, getDocs } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import mapStyle from '../../../assets/mapStyle';
import { ContextStore } from '../../../context/ContextStore';
import { db } from '../../../firebase/firebase';
import styleTexts from '../../../styles/styleTexts';

const ProfileHeader = () => {
  const { user } = useContext(ContextStore);
  const [username, setUsername] = useState('');

  const getUserInfo = async (user) => {
    const userCollectionRef = collection(db, 'users');
    const userQuery = query(userCollectionRef, where('uid', '==', user.uid));

    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.username) {
        setUsername(data.username);
      }
    });
    console.log('usernmae', username);
  };

  getUserInfo(user);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            width: 120,
            backgroundColor: 'grey',
            height: 140,
            borderRadius: 12,
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
            <Text style={styleTexts.h2}> {username}</Text>
          </View>

          <View>
            <Text style={styleTexts.h4}>
              {' '}
              👉 Du har totalt besökt {username}
            </Text>
            <Text style={styleTexts.h4}>👉 Genomfört {username}</Text>
            <Text style={styleTexts.h4}>👉 Samlat på dig {username}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ProfileHeader;
