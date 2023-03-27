import React, { useContext, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { isTemplateMiddle } from 'typescript';
import { ContextStore } from '../../../context/ContextStore';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import TimeLineEvent from '../atoms/TimeLineEvent';
import Timer from '../atoms/Timer';

const TimeLine = () => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [reversedArray, setReveredArray] = useState([]);

  const { events, user } = useContext(ContextStore);

  const handleOpenTimeLine = () => {
    setShowAllEvents(!showAllEvents);
  };

  return (
    <Pressable
      style={styleComponents.barContentContainer}
      onPress={handleOpenTimeLine}
    >
      <View>
        <Timer />
        {showAllEvents
          ? events.map((item, i) => (
              <TimeLineEvent timeLineEvent={item} key={i} />
            ))
          : events
              .slice(0, 2)
              .map((item, i) => <TimeLineEvent timeLineEvent={item} key={i} />)}
      </View>
    </Pressable>
  );
};

export default TimeLine;
