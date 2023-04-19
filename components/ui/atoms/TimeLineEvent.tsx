import React from 'react';
import { Text, View, Image } from 'react-native';
import styleTexts from '../../../styles/styleTexts';
import { Entypo } from '@expo/vector-icons';
import styleMargin from '../../../styles/styleMargin';
import styleComponents from '../../../styles/styleComponents';

const TimeLineEvent = ({
  timeLineTitle,
  timeLineComment = '',
  timeLineImage = null,
}) => {
  return (
    <View style={styleComponents.cardStyle}>
      <Text style={styleTexts.h4}>{timeLineTitle}</Text>

      {timeLineComment && (
        <View style={[styleTexts.bodyText]}>
          <Text style={styleTexts.bodyText}>Kommentar: {timeLineComment}</Text>
        </View>
      )}

      {timeLineImage && (
        <Image
          source={{ uri: timeLineImage }}
          style={{ width: 100, height: 50 }}
        />
      )}
    </View>
  );
};

export default TimeLineEvent;
