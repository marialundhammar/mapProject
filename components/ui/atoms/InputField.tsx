import React from 'react';
import { TextInput } from 'react-native';
import styleTexts from '../../../styles/styleTexts';

const InputField = ({ placeholder, value }) => {
  return (
    <TextInput
      style={styleTexts.textInput}
      placeholder={placeholder}
      value={value}
      /*        onChangeText={(text) => setUsername(text)} */
    />
  );
};

export default InputField;
