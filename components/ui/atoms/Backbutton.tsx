import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Pressable, Text } from 'react-native';
import styleButtons from '../../../styles/styleButtons';
import { Ionicons } from '@expo/vector-icons';
import { ContextStore } from '../../../context/ContextStore';

interface BackButtonType {
  navigation: any;
}

const BackButton = ({ navigation }) => {
  const { setPageHandler, pageHandler } = useContext(ContextStore);

  function handleGoBack() {
    const { canGoBack } = navigation;
    if (canGoBack()) {
      navigation.goBack();
      if (pageHandler === 'BarTourTimeline') {
        setPageHandler('Profile');
        console.log('PROFILE');
      }

      if (pageHandler === 'Onboarding') {
        setPageHandler('Home');
        console.log('HOME');
      } else {
      }
    } else {
    }
  }

  return (
    <View>
      <Pressable
        onPress={handleGoBack}
        style={{ borderWidth: 4, borderColor: 'green' }}
      >
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
