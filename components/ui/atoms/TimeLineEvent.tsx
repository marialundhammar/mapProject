import React, { useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import styleTexts from '../../../styles/styleTexts';
import styleComponents from '../../../styles/styleComponents';
import { BarModal } from '../molecules/BarModal';

const TimeLineEvent = ({
  timeLineTitle,
  timeLineComment = '',
  timeLineImage = null,
}) => {
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const handleNavigate = () => {
    console.log('hejhejhej');
    setChallengeModal({ visible: true, content: 'hejhejhej' });
    console.log('timeLineImage', timeLineImage);
  };

  const [challengeModal, setChallengeModal] = useState({
    visible: false,
    content: null,
  });

  return (
    <View style={timeLineImage ? styleComponents.cardStyle : { marginTop: 2 }}>
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
