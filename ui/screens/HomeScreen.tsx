import React from 'react';
import { View, Pressable, Text } from 'react-native';
import styleButtons from '../styles/styleButtons';

const HomeScreen = ({ navigation }) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Pressable
        style={styleButtons.buttonDefault}
        onPress={() => navigation.navigate('Map')}
      >
        <Text style={styleButtons.buttonDefaultText}> Check this map out </Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
