import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import styleComponents from '../../../styles/styleComponents';
import styleScreens from '../../../styles/styleScreens';
import styleTexts from '../../../styles/styleTexts';

const BarContent = () => {
  const { currentBar } = useContext(ContextStore);

  return (
    <>
      <View style={{ paddingBottom: 12, width: '100%', padding: 8 }}>
        <Text style={styleTexts.h2}>VÄLKOMMEN TILL {currentBar.name}</Text>
        <Text style={styleTexts.bodyText}>{currentBar.description}</Text>
        <View style={{ paddingTop: 24 }}>
          <Image
            source={currentBar.image}
            style={{ width: '100%', height: 200 }}
          />
        </View>
      </View>
    </>
  );
};

export default BarContent;
