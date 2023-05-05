import React, { useContext, useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import useGetEvents from '../../../Hooks/useGetEvents';
import useEvents from '../../../Hooks/useGetEvents';
import styleButtons from '../../../styles/styleButtons';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import TimeLineEvent from '../atoms/TimeLineEvent';
import Timer from '../atoms/Timer';
import { AntDesign } from '@expo/vector-icons';

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

  if (bartours) {
    bartours.map((item) => {
      console.log('completedBartorus', item.completedBarTour);
      eventList.push({
        title: `Runda:  ${item.title}`,
        visitedBars: item.bars.length,
        date: item.date,
        events: item.events,
        completedBarTour: item.completedBarTour,
      });
    });
  }

  return (
    <Pressable
      style={{ justifyContent: 'center', margin: 12 }}
      onPress={handleOpenTimeLine}
    >
      {bartours.length > 0 && (
        <View>
          <Text
            style={[
              styleTexts.h3,
              { marginBottom: 12, marginTop: 12, margin: 4 },
            ]}
          >
            Tidigare barrundor{' '}
          </Text>

          {showAllEvents
            ? eventList.map((item, i) => (
                <TimeLineEvent
                  timeLineTitle={item.title}
                  bartour={true}
                  /*        timeLineEvents={item.events} */
                  navigation={navigation}
                  events={item.events}
                  date={item.date}
                  completedBarTour={item.completedBarTour}
                />
              ))
            : eventList.slice(0, 3).map((item, i) => (
                <TimeLineEvent
                  timeLineTitle={item.title}
                  bartour={true}
                  /*                   timeLineEvents={item.events}
                   */ navigation={navigation}
                  events={item.events}
                  date={item.date}
                  completedBarTour={item.completedBarTour}
                />
              ))}
        </View>
      )}

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Pressable
          onPress={handleOpenTimeLine}
          style={styleButtons.buttonDefaultBorder}
        >
          {!showAllEvents ? (
            <View style={{ flexDirection: 'row' }}>
              <Text style={styleTexts.h4}>Se fler barrundor</Text>
              <Text>
                <AntDesign name="arrowdown" size={24} color="white" />
              </Text>
            </View>
          ) : (
            <Text></Text>
          )}
        </Pressable>
      </View>
    </Pressable>
  );
};

export default TimeLineBarTours;
