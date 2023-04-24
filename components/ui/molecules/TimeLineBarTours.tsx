import React, { useContext, useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import useGetEvents from '../../../Hooks/useGetEvents';
import useEvents from '../../../Hooks/useGetEvents';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import TimeLineEvent from '../atoms/TimeLineEvent';
import Timer from '../atoms/Timer';

const TimeLineBarTours = ({ navigation, bartours }) => {
  const [showAllEvents, setShowAllEvents] = useState(false);

  const handleOpenTimeLine = () => {
    console.log('HAJJJ');

    setShowAllEvents(!showAllEvents);
  };

  const eventList = [];
  bartours.map((item) => {
    eventList.push({
      title: item.title,
    });
  });

  return (
    <Pressable
      style={styleComponents.barContentContainer}
      onPress={handleOpenTimeLine}
    >
      <View>
        <Text style={styleTexts.h3}>Tidslinjen </Text>

        {showAllEvents
          ? eventList.map((item, i) => (
              <TimeLineEvent
                timeLineTitle={item.title}
                bartour={true}
                navigation={navigation}
              />
            ))
          : eventList
              .slice(0, 3)
              .map((item, i) => (
                <TimeLineEvent
                  timeLineTitle={item.title}
                  bartour={true}
                  navigation={navigation}
                />
              ))}
      </View>
    </Pressable>
  );
};

export default TimeLineBarTours;
