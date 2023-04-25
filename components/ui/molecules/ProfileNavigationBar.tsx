import { useContext } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import styleComponents from '../../../styles/styleComponents';

const ProfileNavigationBar = () => {
  const { setPageProfile } = useContext(ContextStore);
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
        { justifyContent: 'space-evenly', marginTop: 12, padding: 10 },
      ]}
    >
      <View>
        <Pressable onPress={() => handleOnPress('profile')}>
          <Text>Profil</Text>
        </Pressable>
      </View>

      <View style={[styleComponents.barNavigationItem]}>
        <Pressable onPress={() => handleOnPress('rounds')}>
          <Text>Rundor</Text>
        </Pressable>
      </View>
      <View style={[styleComponents.barNavigationItem]}>
        <Pressable onPress={() => handleOnPress('trofees')}>
          <Text>Troféer</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileNavigationBar;
