import React from 'react';
import { View, Pressable, Text } from 'react-native';
import styleButtons from '../../../styles/styleButtons';

type NavigationButtonType = {
  navigation: any;
  navigateTo: string;
};

const NavigationButton = ({ navigation, navigateTo }: NavigationButtonType) => {
  return (
    <View
      style={{
        padding: 8,
      }}
    >
      <Pressable
        style={styleButtons.buttonDefault}
        onPress={() => navigation.navigate(navigateTo)}
      >
        <Text style={styleButtons.buttonDefaultText}>Go to {navigateTo}</Text>
      </Pressable>
    </View>
  );
};

export default NavigationButton;
