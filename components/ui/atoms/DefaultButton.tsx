import React from 'react';
import { View, Pressable, Text } from 'react-native';
import styleButtons from '../../../styles/styleButtons';

type DefaultButtonType = {
  text: string;
  onClose?: () => void;
};

const Button = ({ text, onClose }: DefaultButtonType) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        marginTop: 36,
        borderRadius: 8,
        borderColor: '#FFD3D3',
        height: 50,
        width: 224,
      }}
    >
      <Pressable onPress={onClose} style={styleButtons.buttonDefault}>
        <Text style={styleButtons.buttonDefaultText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
