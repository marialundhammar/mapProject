import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileNavigation = ({ navigation }) => {
  return (
    <View style={styleComponents.leftComponent}>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <FontAwesome5 name="user" size={24} color="#FFD3D3" />
      </Pressable>
    </View>
  );
};

export default ProfileNavigation;
