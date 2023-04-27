import React, { useContext, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import { FontAwesome5 } from '@expo/vector-icons';
import { ContextStore } from '../../../context/ContextStore';
import { Entypo } from '@expo/vector-icons';

const ProfileNavigation = ({ navigation }) => {
  const { setOnBar, finishedTour, currentBar, setOnProfile, onProfile } =
    useContext(ContextStore);

  const onPressProfile = () => {
    setOnProfile(true);
    setOnBar(false);
    if (!finishedTour) {
      navigation.navigate('Profile');
    }
  };

  const onPressMap = () => {
    setOnProfile(false);
    if (!finishedTour) {
      navigation.navigate('Map');
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styleComponents.leftComponent}>
      {!onProfile && !finishedTour && (
        <Pressable onPress={onPressProfile}>
          <FontAwesome5 name="user" size={24} color="#FFD3D3" />
        </Pressable>
      )}

      {onProfile && !finishedTour && (
        <Pressable onPress={onPressMap}>
          <Entypo name="map" size={24} color="#FFD3D3" />
        </Pressable>
      )}

      {
        finishedTour && <Text></Text>
        /* (
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={24} color="#FFD3D3" />
        </Pressable>
      ) */
      }
    </View>
  );
};

export default ProfileNavigation;
