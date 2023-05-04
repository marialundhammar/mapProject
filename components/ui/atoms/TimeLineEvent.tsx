import React, { useContext, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import styleTexts from '../../../styles/styleTexts';
import styleComponents from '../../../styles/styleComponents';
import { BarModal } from '../molecules/BarModal';
import styleButtons from '../../../styles/styleButtons';
import { Entypo } from '@expo/vector-icons';
import { ContextStore } from '../../../context/ContextStore';

const TimeLineEvent = ({
  timeLineTitle,
  timeLineComment = '',
  timeLineImage = null,
  bartour = false,
  navigation,
  events,
  date = { seconds: 0, nanoseconds: 0 },
  completedBarTour,
}) => {
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const { setPageHandler } = useContext(ContextStore);
  const [showBarTourEvents, setShowBarTourEvents] = useState(false);

  console.log('completed', completedBarTour);

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

  const handleNavigateTimeLine = () => {
    setPageHandler('BarTourTimeline');
    navigation.navigate('BarTourTimeline', { events: events });
  };

  const newDate = new Date(date.seconds * 1000);

  const dateString = newDate.toLocaleString('sv-SE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View>
      <View
        style={
          timeLineImage || bartour
            ? styleComponents.timeLineEvent
            : { marginTop: 2 }
        }
      >
        <Text style={[styleTexts.h4]}>{timeLineTitle}</Text>
        {bartour && (
          <>
            <Text style={[styleTexts.h4]}>Genomfördes: {dateString}</Text>

            {completedBarTour ? (
              <Text style={styleTexts.h4}>
                Du gjorde hela rundan!!{completedBarTour}
              </Text>
            ) : null}
          </>
        )}

        <View
          style={{
            flexDirection: 'row',
            padding: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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

          <View
            style={{
              flexDirection: 'row',
              padding: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {bartour && (
              <>
                <View>
                  <Pressable
                    onPress={handleNavigateTimeLine}
                    style={styleButtons.buttonDefaultSmallPink}
                  >
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={styleTexts.h5}>Visa mer</Text>
                    </View>
                  </Pressable>
                </View>
              </>
            )}
          </View>
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
      <Text>
        <Entypo name="flow-line" size={24} color="#000826" />
      </Text>
    </View>
  );
};

export default TimeLineEvent;
