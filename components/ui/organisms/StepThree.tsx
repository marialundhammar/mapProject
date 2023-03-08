import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import styleScreens from '../../../styles/styleScreens';
import styleTexts from '../../../styles/styleTexts';
import GroupCard from '../atoms/GroupCard';
import NavigationButton from '../atoms/NavigatonButton';

const arrayOfGroups = [
  { title: 'tjejkväll' },
  { title: 'datenight <3' },
  { title: 'Party med polarna' },
  { title: 'Jöbbet' },
  { title: 'Jöbbet' },
  { title: 'Jöbbet' },
  { title: 'Jöbbet' },
];
const StepThree = ({ navigation }) => {
  return (
    <View
      style={{
        /*   position: 'sticky', */
        bottom: 0,
        height: 500,
        width: '100%',
        zIndex: 100,
      }}
    >
      <Text style={styleTexts.h3}>Vilka är ni?</Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          /*   position: 'sticky', */
        }}
      >
        <ScrollView>
          {arrayOfGroups.map((group, i) => (
            <GroupCard text={group.title} key={i} />
          ))}
        </ScrollView>
      </View>

      <View style={styleComponents.bottomNavigation}>
        <NavigationButton
          navigation={navigation}
          navigateTo={'Map'}
          buttonText={'SPARA'}
        />
      </View>
    </View>
  );
};

export default StepThree;
