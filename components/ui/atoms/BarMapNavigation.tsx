import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styleComponents from '../../../styles/styleComponents';

const BarMapNavigation = () => {
  return (
    <View style={styleComponents.barNavigationBanner}>
      <Pressable>
        <Text>Karta</Text>
      </Pressable>
      <Pressable>
        <Text>Bar</Text>
      </Pressable>
    </View>
  );
};

export default BarMapNavigation;
