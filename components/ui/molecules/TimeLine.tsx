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
        date: item.createDate,
      });
    });
  } else {
    currentBarEvents.map((item) => {
      eventList.push({
        title: item.text,
        comment: item.comment,
        image: item.mediaUrl,
        date: item.createDate,
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
      <View style={{ width: '95%' }}>
        {eventList.length > 0 ? (
          <View>
            <>
              <Text style={[styleTexts.h3, { marginBottom: 8 }]}>
                Tidslinjen{' '}
              </Text>
            </>

            {showAllEvents || timeLinePage
              ? eventList.map((item, i) => (
                  <TimeLineEvent
                    timeLineTitle={item.title}
                    timeLineComment={item.comment}
                    timeLineImage={item.image}
                    key={i}
                    navigation={navigation}
                    events={undefined}
                    createDate={item.date}
                    completedBarTour={undefined}
                    isFirst={i === 0}
                    isLast={i === eventList.length}
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
                      completedBarTour={undefined}
                      createDate={item.date}
                      isFirst={i == 0}
                      isLast={i === eventList.length}
                    />
                  ))}

            <View style={{ alignItems: 'center' }}>
              {eventList.length > 3 && !showAllEvents && (
                <Text style={[styleTexts.bodyText]}> Se fler event </Text>
              )}

              {eventList.length < 3 && !showAllEvents && (
                <Text style={[styleTexts.bodyText]}> Stäng</Text>
              )}
            </View>
          </View>
        ) : (
          <>
            <Text style={styleTexts.h4}> Inga event gjorda ännu ..</Text>
          </>
        )}
      </View>
    </Pressable>
  );
};

export default TimeLine;
