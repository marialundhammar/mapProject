import React from 'react';
import { View, Pressable, Text } from 'react-native';
import styleButtons from '../styles/styleButtons';

const Button = ({ navigation, navigateTo }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}
    >
      <Pressable
        style={styleButtons.buttonNavigation}
        onPress={() => navigation.navigate(navigateTo)}
      >
        <Text style={styleButtons.buttonNavigationText}>
          Go to {navigateTo}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;
