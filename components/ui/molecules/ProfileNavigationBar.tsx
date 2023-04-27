import { useContext, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';

const ProfileNavigationBar = () => {
  const { setPageProfile, pageProfile } = useContext(ContextStore);
  const [isClicked, setIsClicked] = useState(false);

  const handleOnPress = (page: string) => {
    switch (page) {
      case 'profile':
        console.log('PROFILE');
        setPageProfile('profile');
        break;

      case 'rounds':
        console.log('ROUNDS');
        setPageProfile('rounds');
        break;

      case 'trofees':
        setPageProfile('trofees');
        break;
    }
  };

  return (
    <View
      style={[
        styleComponents.barNavigationBanner,
        {
          justifyContent: 'space-evenly',
          marginTop: 12,
          width: '100%',
          paddingTop: 6,
          paddingBottom: 6,
        },
      ]}
    >
      <View>
        <Pressable onPress={() => handleOnPress('profile')}>
          <Text
            style={
              pageProfile === 'profile' ? styleTexts.h3 : styleTexts.h3dark
            }
          >
            Profil
          </Text>
        </Pressable>
      </View>

      <View style={[styleComponents.barNavigationItem]}>
        <Pressable onPress={() => handleOnPress('rounds')}>
          <Text
            style={pageProfile === 'rounds' ? styleTexts.h3 : styleTexts.h3dark}
          >
            Rundor
          </Text>
        </Pressable>
      </View>
      <View style={[styleComponents.barNavigationItem]}>
        <Pressable onPress={() => handleOnPress('trofees')}>
          <Text
            style={
              pageProfile === 'trofees' ? styleTexts.h3 : styleTexts.h3dark
            }
          >
            Troféer
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileNavigationBar;
