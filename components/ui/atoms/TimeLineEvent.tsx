import React, { useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import styleTexts from '../../../styles/styleTexts';
import styleComponents from '../../../styles/styleComponents';
import { BarModal } from '../molecules/BarModal';
import TimeLine from '../molecules/TimeLine';

const TimeLineEvent = ({
  timeLineTitle,
  timeLineComment = '',
  timeLineImage = null,
  bartour = false,
  timeLineEvents = [],
  navigation,
  events = [],
  date = '',
}) => {
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showBarTourEvents, setShowBarTourEvents] = useState(false);

  const handleNavigate = () => {
    if (bartour) {
      setShowBarTourEvents(true);
    }
    if (!bartour) {
      setChallengeModal({ visible: true, content: 'hejhejhej' });
    }
  };

  const [challengeModal, setChallengeModal] = useState({
    visible: false,
    content: null,
  });

  const toggleEvents = () => {
    console.log('toggle');
    console.log('timeline', events);
    setShowBarTourEvents(!showBarTourEvents);
  };

  return (
    <View
      style={
        timeLineImage || bartour ? styleComponents.cardStyle : { marginTop: 2 }
      }
    >
      <Text style={[styleTexts.h4, { padding: 4 }]}>{timeLineTitle}</Text>

      <Pressable onPress={handleNavigate}>
        <View style={{ flexDirection: 'row', padding: 4 }}>
          {timeLineImage && (
            <Image
              source={{ uri: timeLineImage }}
              style={{ width: 100, height: 50, margin: 8 }}
            />
          )}
          {timeLineComment && (
            <View style={[styleTexts.bodyText]}>
              <Text style={styleTexts.bodyText}>
                Kommentar: {timeLineComment}
              </Text>
            </View>
          )}

          <Pressable
            style={{
              width: '100%',
              height: '100%',
            }}
            onPress={toggleEvents}
          >
            {bartour && (
              <View style={[styleTexts.bodyText]}>
                {events && showBarTourEvents && (
                  <TimeLine navigation={navigation} />
                )}
                <Text>hej</Text>
              </View>
            )}
          </Pressable>
        </View>
      </Pressable>

      <BarModal
        header={timeLineTitle}
        visible={challengeModal.visible}
        image={timeLineImage}
        onClose={() =>
          setChallengeModal((current) => ({ ...current, visible: false }))
        }
      />
    </View>
  );
};

export default TimeLineEvent;
