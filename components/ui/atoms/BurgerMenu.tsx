import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styleTexts from '../../../styles/styleTexts';
import styleScreens from '../../../styles/styleScreens';
import styleComponents from '../../../styles/styleComponents';
const BurgerMenu = ({ navigation }) => {
  return (
    <View style={styleComponents.leftComponent}>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Feather name="menu" style={styleTexts.icons} />
      </Pressable>
    </View>
  );
};

export default BurgerMenu;
