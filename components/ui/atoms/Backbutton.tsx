import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import styleButtons from '../../../styles/styleButtons';
import { Ionicons } from '@expo/vector-icons';

interface BackButtonType {
  navigation: any;
}

const BackButton = ({ navigation }) => {
  function handleGoBack() {
    const { canGoBack } = navigation;
    if (canGoBack()) {
      navigation.goBack();
    } else {
      console.warn('Ingen skärm att gå tillbaka till :( ');
    }
  }

  return (
    <View>
      <Pressable onPress={handleGoBack}>
        <View style={{ padding: 4 }}>
          <Text style={styleButtons.buttonBackText}>
            <Ionicons name="arrow-back" size={24} color="#FFD3D3" />
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default BackButton;
