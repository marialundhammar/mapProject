import React from 'react';
import { ScrollView, View } from 'react-native';
import styleScreens from '../../styles/styleScreens';
import GroupCard from '../ui/atoms/GroupCard';
import Button from '../ui/atoms/NavigatonButton';

const arrayOfGroups = [
  { title: 'TALKATIVERUNDAN' },
  { title: 'Första-dejten-rundan' },
  { title: 'Första-dejten-rundan' },
  { title: 'Första-dejten-rundan' },
  { title: 'Första-dejten-rundan' },
  { title: 'Första-dejten-rundan' },
  { title: 'Första-dejten-rundan' },
  { title: 'Första-dejten-rundan' },
  { title: 'Första-dejten-rundan' },
  { title: 'Första-dejten-rundan' },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styleScreens.container}>
      <View style={styleScreens.halfScreen}>
        <Button
          navigation={navigation}
          navigateTo={'Onboarding'}
          buttonText={'SKAPA RUNDA'}
        />
      </View>
      <View style={styleScreens.halfScreen}>
        <ScrollView>
          {arrayOfGroups.map((group) => (
            <GroupCard text={group.title} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
