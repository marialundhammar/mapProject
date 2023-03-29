import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import Button from '../ui/atoms/NavigatonButton';
import styleButtons from '../../styles/styleButtons';
import TopHeader from '../ui/molecules/TopHeader';
import styleScreens from '../../styles/styleScreens';
import { getAuth, signOut } from 'firebase/auth';
import { ContextStore } from '../../context/ContextStore';
import TimeLine from '../ui/molecules/TimeLine';

const ProfileScreen = ({ navigation }) => {
  const navigateTo = 'Map';
  const { user } = useContext(ContextStore);

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('user signed out');
        navigation.navigate('LogIn');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(user);

  return (
    <View>
      <TopHeader navigation={navigation} showBackButton={false} />
      <View style={styleScreens.defaultScreen}>
        <View>
          <TimeLine navigation={navigation} />

          <Button
            navigation={navigation}
            navigateTo={'Map'}
            buttonText={'GÅ TILL KARTA'}
          />
        </View>
        <Pressable
          style={styleButtons.buttonDefaultBorder}
          onPress={handleLogOut}
        >
          <Text>Logga ut</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;
