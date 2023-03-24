import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { isTemplateMiddle } from 'typescript';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import TimeLineEvent from '../atoms/TimeLineEvent';

const TimeLine = () => {
  const arrayOfEvents = [
    'Ni anlände',
    'första eventet hände',
    'testets',
    'testets',
    'testets',
    'testets',
    'testets',
    'testets',
    'testets',
    'testets',
    'testets',
    'testets',
    'testets',
    'testets',
    'testets',
    'testets',
  ];

  const [showAllEvents, setShowAllEvents] = useState(false);

  const handleOpenTimeLine = () => {
    setShowAllEvents(!showAllEvents);
  };

  return (
    <Pressable
      style={styleComponents.barContentContainer}
      onPress={handleOpenTimeLine}
    >
      <View>
        {showAllEvents
          ? arrayOfEvents.map((item, i) => (
              <TimeLineEvent timeLineEvent={item} key={i} />
            ))
          : arrayOfEvents
              .slice(0, 2)
              .map((item, i) => <TimeLineEvent timeLineEvent={item} key={i} />)}
      </View>
    </Pressable>
  );
};

export default TimeLine;
