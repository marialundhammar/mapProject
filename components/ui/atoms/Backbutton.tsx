import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import styleButtons from '../../../styles/styleButtons';

interface BackButtonType {
  navigation: any;
}

const BackButton = ({ navigation }) => {
  function handleGoBack() {
    const { canGoBack } = navigation;
    if (canGoBack()) {
      navigation.goBack();
    } else {
      console.warn("There's no screen to go back to!");
    }
  }

  return (
    <View>
      <Pressable onPress={handleGoBack}>
        <Text style={styleButtons.buttonBackText}> Tillbaka</Text>
      </Pressable>
    </View>
  );
};

export default BackButton;
