import React from 'react';
import { View, Pressable, Text } from 'react-native';
import styleButtons from '../../../styles/styleButtons';

type NavigationButtonType = {
  navigation: any;
  navigateTo: string;
};

const Button = ({ navigation, navigateTo }: NavigationButtonType) => {
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
