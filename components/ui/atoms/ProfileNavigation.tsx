import React, { useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import { FontAwesome5 } from '@expo/vector-icons';
import { ContextStore } from '../../../context/ContextStore';
import { Entypo } from '@expo/vector-icons';

const ProfileNavigation = ({ navigation }) => {
  const { setOnBar, finishedTour, currentBar } = useContext(ContextStore);

  const onPressProfile = () => {
    setOnBar(false);
    if (!finishedTour) {
      navigation.navigate('Profile');
    }
  };
  const onPressMap = () => {
    setOnBar(false);
    navigation.navigate('Map');
  };
  const onPressHome = () => {
    setOnBar(false);
    navigation.navigate('Home');
  };

  return (
    <View style={styleComponents.leftComponent}>
      <Pressable onPress={onPressProfile}>
        <FontAwesome5 name="user" size={24} color="#FFD3D3" />
      </Pressable>
      {/*       <Pressable onPress={onPressMap}>
        <Entypo name="map" size={24} color="black" />
      </Pressable>
      <Pressable onPress={onPressHome}>
        <Entypo name="home" size={24} color="black" />
      </Pressable> */}
    </View>
  );
};

export default ProfileNavigation;
