import React, { useContext, useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import BackButton from '../atoms/Backbutton';
import { Entypo } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';
import ProfileNavigation from '../atoms/ProfileNavigation';
import BarMapNavigation from '../atoms/BarMapNavigation';
import { ContextStore } from '../../../context/ContextStore';
import { FontAwesome5 } from '@expo/vector-icons';
import styleButtons from '../../../styles/styleButtons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const TopHeader = ({ navigation, showBackButton }) => {
  const {
    finishedTour,
    currentBar,
    currentBarTour,
    pageHandler,
    setPageHandler,
    roundStarted,
  } = useContext(ContextStore);
  const { canGoBack } = navigation;

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
    setPageHandler('Profile');
    navigation.navigate('Profile');
  };

  const onPressMap = () => {
    if (currentBar) {
      navigation.navigate('Bar');
      setPageHandler('Bar');
    }
    if (!currentBar) {
      setPageHandler('Map');
      navigation.navigate('Map');
    }
  };

  const onPressGenerate = () => {
    navigation.navigate('Home');
    setPageHandler('Home');
  };
  const onPressLogOut = () => {
    handleLogOut();
    setPageHandler('LogIn');
  };

  const handleGoBack = () => {
    if (canGoBack()) {
      navigation.goBack();
    }
    if (pageHandler === 'BarTourTimeline') {
      setPageHandler('Profile');
    }
    if (pageHandler === 'Onboarding') {
      setPageHandler('Home');
    } else {
      console.warn('Ingen skärm att gå tillbaka till :( ');
    }
  };

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#000826',
          height: 80,
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          padding: 24,
        }}
      >
        {(pageHandler === 'Home' || pageHandler === 'Map') && (
          <Pressable onPress={onPressProfile}>
            <FontAwesome5 name="user" size={24} color="#FFD3D3" />
          </Pressable>
        )}

        {pageHandler === 'Profile' && !finishedTour && currentBarTour && (
          <Pressable onPress={onPressMap} style={{}}>
            <Entypo name="map" size={28} color="#FFD3D3" />
          </Pressable>
        )}

        {showBackButton && !roundStarted && (
          <>
            <BackButton navigation={navigation} />
          </>
        )}
        {pageHandler === 'Map' && !currentBarTour && (
          <Pressable onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color="#FFD3D3" />
          </Pressable>
        )}
        {pageHandler === 'Home' && (
          <Pressable onPress={onPressLogOut}>
            <Feather name="log-out" size={28} color="#FFD3D3" />
          </Pressable>
        )}

        {pageHandler === 'Profile' && finishedTour && (
          <Pressable onPress={onPressGenerate}>
            <FontAwesome5 name="dice" size={24} color="#FFD3D3" />
          </Pressable>
        )}

        {pageHandler === 'Profile' && !currentBarTour && (
          <Pressable onPress={onPressGenerate}>
            <FontAwesome5 name="dice" size={24} color="#FFD3D3" />
          </Pressable>
        )}
        {pageHandler === 'Profile' && (
          <Pressable onPress={onPressLogOut}>
            <Feather name="log-out" size={28} color="#FFD3D3" />
          </Pressable>
        )}
        {pageHandler === 'Bar' && (
          <Pressable onPress={onPressProfile}>
            <FontAwesome5 name="user" size={24} color="#FFD3D3" />
          </Pressable>
        )}
      </View>
      {currentBar && (
        <View style={{ width: '100%' }}>
          <BarMapNavigation navigation={navigation} />
        </View>
      )}
    </>
  );
};

export default TopHeader;
