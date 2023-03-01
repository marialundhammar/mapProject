import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styleTexts from '../../../styles/styleTexts';
import styleScreens from '../../../styles/styleScreens';
const BurgerMenu = ({ navigation, navigateTo }) => {
  return (
    <View style={styleScreens.left}>
      <Pressable onPress={() => navigation.navigate(navigateTo)}>
        <Feather name="menu" style={styleTexts.icons} />
      </Pressable>
    </View>
  );
};

export default BurgerMenu;
