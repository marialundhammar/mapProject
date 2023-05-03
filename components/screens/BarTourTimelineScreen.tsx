import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import TimeLine from '../ui/molecules/TimeLine';
import styleScreens from '../../styles/styleScreens';
import TopHeader from '../ui/molecules/TopHeader';
import { LinearGradient } from 'expo-linear-gradient';

type TimelineEventProps = { event: any };

const TimelineEvent = ({ event }: TimelineEventProps) => {
  return <Text>{event.text}</Text>;
};

type RouteParams = {
  events: any;
};

type BarTourTimelineScreenProps = {
  navigation: any;
  route: RouteProp<{ params: RouteParams }, 'params'>;
};

const BarTourTimelineScreen = ({
  navigation,
  route,
}: BarTourTimelineScreenProps) => {
  const { events } = route.params;

  console.log('events', events);

  return (
    <View>
      <LinearGradient colors={['#020B29', '#334F96']}>
        <TopHeader navigation={navigation} showBackButton={true} />

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
