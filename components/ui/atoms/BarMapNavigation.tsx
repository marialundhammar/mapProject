import React, { useContext, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import styleComponents from '../../../styles/styleComponents';
import styleMargin from '../../../styles/styleMargin';
import styleTexts from '../../../styles/styleTexts';

const BarMapNavigation = ({ navigation }) => {
  const { setOnBar, onBar } = useContext(ContextStore);

  return (
    <View style={styleComponents.barNavigationBanner}>
      <View style={styleComponents.barNavigationItem}>
        <Pressable onPress={() => setOnBar(false)}>
          <Text
            style={
              onBar
                ? [styleTexts.h3, styleMargin.p10]
                : [styleTexts.h3dark, styleMargin.p10]
            }
          >
            Karta
          </Text>
        </Pressable>
      </View>

      <View style={styleComponents.barNavigationItem}>
        <Pressable onPress={() => setOnBar(true)}>
          <Text
            style={
              !onBar
                ? [styleTexts.h3, styleMargin.p10]
                : [styleTexts.h3dark, styleMargin.p10]
            }
          >
            Bar
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BarMapNavigation;
