import React, { useContext, useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import useGetEvents from '../../../Hooks/useGetEvents';
import useEvents from '../../../Hooks/useGetEvents';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import TimeLineEvent from '../atoms/TimeLineEvent';
import Timer from '../atoms/Timer';

const TimeLine = ({
  navigation,
  events,
  profilePage,
  timeLinePage = false,
}) => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const { user } = useContext(ContextStore);

  const currentBarEvents = useGetEvents(user);
  const handleOpenTimeLine = () => {
    setShowAllEvents(!showAllEvents);
  };

  const eventList = [];

  if (profilePage) {
    events.map((item) => {
      eventList.push({
        title: item.text,
        comment: item.comment,
        image: item.mediaUrl,
      });
    });
  } else {
    currentBarEvents.map((item) => {
      eventList.push({
        title: item.text,
        comment: item.comment,
        image: item.mediaUrl,
      });
    });
  }

  return (
    <Pressable
      style={
        eventList.length > 0
          ? styleComponents.barContentContainer
          : { marginTop: 20 }
      }
      onPress={handleOpenTimeLine}
    >
      <View>
        {eventList.length > 0 ? (
          <View>
            <Text style={styleTexts.h3}>Tidslinjen </Text>
            {showAllEvents || timeLinePage
              ? eventList.map((item, i) => (
                  <TimeLineEvent
                    timeLineTitle={item.title}
                    timeLineComment={item.comment}
                    timeLineImage={item.image}
                    key={i}
                    navigation={navigation}
                    events={undefined}
                  />
                ))
              : eventList
                  .slice(0, 3)
                  .map((item, i) => (
                    <TimeLineEvent
                      timeLineTitle={item.title}
                      timeLineComment={item.comment}
                      timeLineImage={item.image}
                      key={i}
                      navigation={navigation}
                      events={undefined}
                    />
                  ))}
          </View>
        ) : (
          <>
            <Text style={styleTexts.h4}> Inga event gjorda ännu ..</Text>
          </>
        )}
      </View>

      {showAllEvents && (
        <Pressable onPress={handleOpenTimeLine}>
          <Text> Stäng</Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default TimeLine;
