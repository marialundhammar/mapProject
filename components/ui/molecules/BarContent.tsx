import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import styleComponents from '../../../styles/styleComponents';
import styleScreens from '../../../styles/styleScreens';
import styleTexts from '../../../styles/styleTexts';

const BarContent = () => {
  const { currentBar } = useContext(ContextStore);

  console.log(currentBar.image);

  return (
    <>
      <View style={styleComponents.centered}>
        <Image source={currentBar.image} style={{ width: 400, height: 200 }} />
      </View>
      <Text style={styleTexts.bodyText}>{currentBar.description}</Text>
    </>
  );
};

export default BarContent;
