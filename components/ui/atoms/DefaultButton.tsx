import React from 'react';
import { View, Pressable, Text } from 'react-native';
import styleButtons from '../../../styles/styleButtons';

type DefaultButtonType = {
  text: string;
};

const Button = ({ text }: DefaultButtonType) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}
    >
      <Pressable style={styleButtons.buttonDefault}>
        <Text style={styleButtons.buttonDefaultText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
