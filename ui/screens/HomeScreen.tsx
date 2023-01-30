import React from 'react';
import { View, Pressable, Text } from 'react-native';

const App = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate('Map');
    console.log('helloooo');
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Pressable onPress={() => navigation.navigate('Map')}>
        <Text> Check this map out </Text>
      </Pressable>
    </View>
  );
};

export default App;
