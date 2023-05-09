import React, { useContext, useState } from 'react';
import Svg, { Line } from 'react-native-svg';

import { Text, View, Image, Pressable, Dimensions } from 'react-native';
import styleTexts from '../../../styles/styleTexts';
import styleComponents from '../../../styles/styleComponents';
import { BarModal } from '../molecules/BarModal';
import styleButtons from '../../../styles/styleButtons';
import { Entypo } from '@expo/vector-icons';
import { ContextStore } from '../../../context/ContextStore';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const TimeLineEvent = ({
  timeLineTitle,
  timeLineComment = '',
  timeLineImage = null,
  bartour = false,
  navigation,
  events,
  date = { seconds: 0, nanoseconds: 0 },
  completedBarTour,
  createDate = '',
  isFirst = false,
  isLast = false,
}) => {
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const { setPageHandler } = useContext(ContextStore);
  const [showBarTourEvents, setShowBarTourEvents] = useState(false);

  console.log('completed', completedBarTour);
  const { width } = Dimensions.get('window');

  const handleNavigate = () => {
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
  console.log('createdate', createDate, events);

  return (
    <View>
      <View
        style={
          timeLineImage || bartour
            ? styleComponents.timeLineEvent
            : { marginTop: 0 }
        }
      >
        <Pressable
          style={{
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              width: '15%',
              height: 60,
            }}
          >
            <Text style={{ marginTop: 10 }}>
              <Feather name="circle" size={24} color="#E68383" />
            </Text>
          </View>

          <View
            style={
              bartour
                ? null
                : [styleComponents.timeLineEvent, { marginTop: 14 }]
            }
          >
            <Text style={[styleTexts.miniText]}>{createDate}</Text>
            <Text style={[styleTexts.h4]}>{timeLineTitle}</Text>
            <View style={{ flexDirection: 'row' }}>
              {timeLineImage && (
                <Image
                  source={{ uri: timeLineImage }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                    marginRight: 8,
                    marginTop: 8,
                  }}
                />
              )}
              {timeLineComment && (
                <View style={[styleTexts.bodyText]}>
                  <Text style={styleTexts.bodyText}>
                    Kommentar: {timeLineComment}
                  </Text>
                </View>
              )}
            </View>
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
              flexDirection: 'column',

              /*      justifyContent: 'center',
            alignItems: 'center', */
            }}
          >
            <View
              style={{
                flexDirection: 'row',
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
        </Pressable>
      </View>
      {bartour && (
        <Text
          style={{
            color: '#1B274A',
            fontSize: 32,
            marginLeft: 4,
            marginBottom: 4,
            fontWeight: 'bold',
          }}
        >
          |
        </Text>
      )}
    </View>
  );
};

export default TimeLineEvent;
