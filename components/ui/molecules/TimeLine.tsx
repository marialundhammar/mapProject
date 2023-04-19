import React, { useContext, useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import useGetEvents from '../../../Hooks/useGetEvents';
import useEvents from '../../../Hooks/useGetEvents';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import TimeLineEvent from '../atoms/TimeLineEvent';
import Timer from '../atoms/Timer';

const TimeLine = ({ navigation }) => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const { user } = useContext(ContextStore);

  const events = useGetEvents(user);
  const handleOpenTimeLine = () => {
    setShowAllEvents(!showAllEvents);
  };

  const eventList = [];
  events.map((item) => {
    eventList.push({
      title: item.text,
      comment: item.comment,
      image: item.mediaUrl,
    });
  });

  return (
    <Pressable
      style={styleComponents.barContentContainer}
      onPress={handleOpenTimeLine}
    >
      <View>
        <Text style={styleTexts.h3}>Tidslinjen </Text>
        {/*         <Timer navigation={navigation} />
         */}

        {showAllEvents
          ? eventList.map((item, i) => (
              <TimeLineEvent
                timeLineTitle={item.title}
                timeLineComment={item.comment}
                timeLineImage={item.image}
                key={i}
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
                />
              ))}
      </View>
    </Pressable>
  );
};

export default TimeLine;
