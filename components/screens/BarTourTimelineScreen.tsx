import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import TimeLine from '../ui/molecules/TimeLine';
import styleScreens from '../../styles/styleScreens';
import TopHeader from '../ui/molecules/TopHeader';
import { LinearGradient } from 'expo-linear-gradient';

type TimelineEventProps = {};

const TimelineEvent = ({ event }: TimelineEventProps) => {
  return <Text>{event.text}</Text>;
};

type BarTourTimelineScreenProps = {
  navigation: any;
};

const BarTourTimelineScreen = ({ navigation }: BarTourTimelineScreenProps) => {
  const route = useRoute();
  const events = route.params.events;

  return (
    <View>
      <LinearGradient colors={['#020B29', '#334F96']}>
        <TopHeader
          navigation={navigation}
          showBackButton={true}
          showBarMap={false}
          showProfile={false}
        />

        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <TimeLine
            events={events}
            navigation={navigation}
            profilePage={true}
            timeLinePage={true}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default BarTourTimelineScreen;
