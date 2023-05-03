import React, { useContext, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import { FontAwesome5 } from '@expo/vector-icons';
import { ContextStore } from '../../../context/ContextStore';
import { Entypo } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';

const ProfileNavigation = ({ navigation }) => {
  const { setOnBar, finishedTour, currentBar, setOnProfile, onProfile } =
    useContext(ContextStore);

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('user signed out');
        navigation.navigate('LogIn');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onPressProfile = () => {
    navigation.navigate('Profile');
    setOnProfile(true);
  };

  const onPressMap = () => {
    navigation.navigate('Map');
  };

  const onPressGenerate = () => {
    navigation.navigate('Home');
  };
  const onPressLogOut = () => {
    handleLogOut();
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        },
      ]}
    >
      <Pressable onPress={onPressLogOut}>
        <Text>
          <Entypo name="log-out" size={24} color="#FFD3D3" />
        </Text>
      </Pressable>
      {onProfile ? (
        <Pressable onPress={onPressProfile}>
          <FontAwesome5 name="user" size={24} color="#FFD3D3" />
        </Pressable>
      ) : (
        <Pressable onPress={onPressMap}>
          <Entypo name="map" size={24} color="#FFD3D3" />
        </Pressable>
      )}

      {finishedTour && (
        <Pressable onPress={onPressGenerate}>
          <FontAwesome5 name="dice" size={24} color="#FFD3D3" />
        </Pressable>
      )}
    </View>
  );
};

export default ProfileNavigation;
