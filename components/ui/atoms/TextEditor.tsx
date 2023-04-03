import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';

const TextEditor = () => {
  return (
    <View style={styleComponents.barContentContainer}>
      <TextInput
        style={styleTexts.bodyTextdsfdgfhgjh}
        multiline={true}
        numberOfLines={4}
      />
    </View>
  );
};

export default TextEditor;
