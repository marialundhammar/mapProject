import React, { useContext, useEffect } from 'react';
import { ScrollView, View, Text, Image, SafeAreaView } from 'react-native';
import { arrayOfBarTours } from '../../configs/barTours';
import styleScreens from '../../styles/styleScreens';
import styleTexts from '../../styles/styleTexts';
import GroupCard from '../ui/atoms/GroupCard';
import Button from '../ui/atoms/NavigatonButton';
import TopHeader from '../ui/molecules/TopHeader';
import { ContextStore } from '../../context/ContextStore';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export default function HomeScreen({ navigation }) {
  const { user } = useContext(ContextStore);

  return (
    <View style={styleScreens.container}>
      <TopHeader navigation={navigation} showBackButton={false} />

      <View style={styleScreens.halfScreenTop}>
        <Button
          navigation={navigation}
          navigateTo={'Onboarding'}
          buttonText={'SKAPA RUNDA'}
        />
      </View>

      <View
        style={{
          flex: 1,
          width: '100%',
          position: 'absolute',
          zIndex: 200,
          bottom: -200,
          marginLeft: '5%',
          height: '70%',
          paddingTop: 20,
        }}
      >
        <Text style={styleTexts.h1}>FÖRESLAGNA RUNDOR</Text>

        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: 20,
          }}
        ></SafeAreaView>

        <ScrollView
          style={{
            height: '90%',
            marginBottom: 200,

            width: '90%',
          }}
        >
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

      <View
        style={{
          height: 300,
          width: '102%',
          position: 'absolute',
          zIndex: -200,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E68383',
        }}
      ></View>

      <Image
        style={{
          height: 400,
          width: '105%',
          position: 'absolute',
          bottom: '20%',
        }}
        source={require('../../assets/gubbarna.png')}
      />
    </View>
  );
}
