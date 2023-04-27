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
    console.log('bartour', bartour);

    setChallengeModal({ visible: true, content: 'hejhejhej' });
  };

  const [challengeModal, setChallengeModal] = useState({
    visible: false,
    content: null,
  });

  const toggleEvents = () => {
    setShowBarTourEvents(!showBarTourEvents);
  };

  return (
    <View
      style={
        timeLineImage || bartour ? styleComponents.cardStyle : { marginTop: 2 }
      }
    >
      <Text style={[styleTexts.h4, { padding: 4 }]}>{timeLineTitle}</Text>

      <View style={{ flexDirection: 'row', padding: 4 }}>
        <Pressable onPress={handleNavigate}>
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
        </Pressable>

        <Pressable onPress={toggleEvents}>
          {bartour && (
            <View style={{ borderWidth: 3, width: '100%' }}>
              {events && showBarTourEvents ? (
                <View>
                  <TimeLine
                    navigation={navigation}
                    events={events}
                    profilePage={true}
                  />
                </View>
              ) : (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Text>Visa kvällens bravader tidslinje</Text>
                </View>
              )}
            </View>
          )}
        </Pressable>
      </View>

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
