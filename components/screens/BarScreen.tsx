import React from 'react';
import { View, Text } from 'react-native';
import styleScreens from '../../styles/styleScreens';
import Button from '../ui/atoms/NavigatonButton';
import TopHeader from '../ui/molecules/TopHeader';

const BarScreen = ({ navigation }) => {
  const navigateTo = 'Map';
  return (
    <View>
      <TopHeader navigation={navigation} showBackButton={false} />

      <View style={styleScreens.defaultScreen}>
        <Text>You're at a bar 🍻 </Text>
        <Button
          navigation={navigation}
          navigateTo={'Challenge'}
          buttonText={'GÅ TILL CHALLENGE'}
        />
        <Button
          navigation={navigation}
          navigateTo={'Map'}
          buttonText={'GÅ TILLBAKA TILL KARTA'}
          isFilled={false}
        />
      </View>
    </View>
  );
};

export default BarScreen;
