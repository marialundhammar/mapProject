import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { arrayOfBarTours } from '../../configs/barTours';
import styleScreens from '../../styles/styleScreens';
import styleTexts from '../../styles/styleTexts';
import GroupCard from '../ui/atoms/GroupCard';
import Button from '../ui/atoms/NavigatonButton';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styleScreens.container}>
      <View style={styleScreens.halfScreenTop}>
        <Button
          navigation={navigation}
          navigateTo={'Onboarding'}
          buttonText={'SKAPA RUNDA'}
        />
      </View>

      <View style={styleScreens.halfScreenBottom}>
        <Text style={styleTexts.h3}>RUNDOR</Text>
        <ScrollView>
          {arrayOfBarTours.map((group, i) => (
            <GroupCard
              navigation={navigation}
              text={group.title}
              numberOfBars={group.numbersOfBars}
              key={i}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
