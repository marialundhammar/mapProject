import React, { useContext, useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import useGetEvents from '../../../Hooks/useGetEvents';
import useEvents from '../../../Hooks/useGetEvents';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import TimeLineEvent from '../atoms/TimeLineEvent';
import Timer from '../atoms/Timer';

interface barTourType {
  title?: string;
  visitedBars?: [];
  date?: string;
}

const TimeLineBarTours = ({ navigation, bartours }) => {
  const [showAllEvents, setShowAllEvents] = useState(false);

  const handleOpenTimeLine = () => {
    setShowAllEvents(!showAllEvents);
  };

  const eventList = [];
  bartours.map((item) => {
    console.log('items events', item.events);

    eventList.push({
      title: item.title,
      visitedBars: item.bars.length,
      date: item.date,
      events: item.events,
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
                timeLineEvents={item.events}
                navigation={navigation}
                events={item.events}
                date={item.date}
              />
            ))
          : eventList
              .slice(0, 2)
              .map((item, i) => (
                <TimeLineEvent
                  timeLineTitle={item.title}
                  bartour={true}
                  timeLineEvents={item.events}
                  navigation={navigation}
                  events={item.events}
                  date={item.date}
                />
              ))}
      </View>
    </Pressable>
  );
};

export default TimeLineBarTours;
