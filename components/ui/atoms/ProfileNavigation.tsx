import React, { useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import { FontAwesome5 } from '@expo/vector-icons';
import { ContextStore } from '../../../context/ContextStore';

const ProfileNavigation = ({ navigation }) => {
  const { setOnBar } = useContext(ContextStore);
  const onPress = () => {
    setOnBar(false);
    navigation.navigate('Profile');
  };
  return (
    <View style={styleComponents.leftComponent}>
      <Pressable onPress={onPress}>
        <FontAwesome5 name="user" size={24} color="#FFD3D3" />
      </Pressable>
    </View>
  );
};

export default ProfileNavigation;
