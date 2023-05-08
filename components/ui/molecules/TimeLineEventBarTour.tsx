import React, { useContext, useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import styleTexts from '../../../styles/styleTexts';
import styleComponents from '../../../styles/styleComponents';
import { BarModal } from '../molecules/BarModal';
import styleButtons from '../../../styles/styleButtons';
import { Entypo } from '@expo/vector-icons';
import { ContextStore } from '../../../context/ContextStore';
import { FontAwesome5 } from '@expo/vector-icons';

const TimeLineEventBarTour = ({
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
  const { setPageHandler, pageHandler } = useContext(ContextStore);
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

  const handleNavigateTimeLine = () => {
    setPageHandler('BarTourTimeLine');

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
            ? [
                styleComponents.timeLineEvent,
                { backgroundColor: '#000826', padding: 8, marginBottom: 16 },
              ]
            : { marginTop: 0 }
        }
      >
        <Pressable
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',

            marginBottom: 8,
          }}
        >
          <View style={bartour ? null : [styleComponents.timeLineEvent]}>
            <Text style={[styleTexts.h4]}>{timeLineTitle}</Text>
          </View>

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
              alignItems: 'center',

              justifyContent: 'center',
            }}
          >
            {timeLineImage && (
              <Image
                source={{ uri: timeLineImage }}
                style={{ width: 100, height: 100, borderRadius: 8 }}
              />
            )}
            {timeLineComment && (
              <View style={[styleTexts.bodyText]}>
                <Text style={styleTexts.bodyText}>
                  Kommentar: {timeLineComment}
                </Text>
              </View>
            )}
            {!bartour && (
              <Text
                style={{
                  color: '#1B274A',
                  fontSize: 32,
                  marginLeft: 4,
                  fontWeight: 'bold',
                }}
              >
                |
              </Text>
            )}

            {bartour && (
              <>
                <View>
                  <Pressable
                    onPress={handleNavigateTimeLine}
                    style={styleButtons.buttonDefaultSmallPink}
                  >
                    <View>
                      <Text style={styleTexts.h5}>Visa mer</Text>
                    </View>
                  </Pressable>
                </View>
              </>
            )}
          </View>

          <BarModal
            header={timeLineTitle}
            visible={challengeModal.visible}
            image={timeLineImage}
            onClose={() =>
              setChallengeModal((current) => ({ ...current, visible: false }))
            }
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TimeLineEventBarTour;
