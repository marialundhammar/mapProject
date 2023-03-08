import React from 'react';
import { View, Pressable, Text } from 'react-native';
import styleButtons from '../../../styles/styleButtons';
import styleComponents from '../../../styles/styleComponents';
import NavigationButton from '../atoms/NavigatonButton';

const BottomContainer = ({ navigation }) => {
  return (
    <View style={styleComponents.content}>
      <NavigationButton
        navigation={navigation}
        navigateTo={'Bar'}
        buttonText={'GÅ TILL BAR'}
      />
    </View>
  );
};

export default BottomContainer;
