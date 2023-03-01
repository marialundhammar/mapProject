import React from 'react';
import { View, Text } from 'react-native';
import Button from '../ui/atoms/NavigatonButton';
import TopHeader from '../ui/molecules/TopHeader';

const ProfileScreen = ({ navigation }) => {
  const navigateTo = 'Map';
  return (
    <View>
      <TopHeader navigation={navigation} showBackButton={false} />

      <View>
        <Text>PROFILE 👻</Text>
        <Button
          navigation={navigation}
          navigateTo={'Map'}
          buttonText={'GÅ TILL KARTA'}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
