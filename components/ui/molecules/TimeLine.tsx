import React, { useContext, useState } from 'react';
import { Pressable, View } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import styleComponents from '../../../styles/styleComponents';
import TimeLineEvent from '../atoms/TimeLineEvent';
import Timer from '../atoms/Timer';

const TimeLine = ({ navigation }) => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const { events } = useContext(ContextStore);

  const handleOpenTimeLine = () => {
    setShowAllEvents(!showAllEvents);
  };

  return (
    <Pressable
      style={styleComponents.barContentContainer}
      onPress={handleOpenTimeLine}
    >
      <View>
        <Timer navigation={navigation} />
        {showAllEvents
          ? events.map((item, i) => (
              <TimeLineEvent timeLineEvent={item} key={i} />
            ))
          : events
              .slice(0, 3)
              .map((item, i) => <TimeLineEvent timeLineEvent={item} key={i} />)}
      </View>
    </Pressable>
  );
};

export default TimeLine;
