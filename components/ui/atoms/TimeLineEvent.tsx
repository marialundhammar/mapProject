import React from 'react';
import { Text, View } from 'react-native';
import styleTexts from '../../../styles/styleTexts';
import { Entypo } from '@expo/vector-icons';
import styleMargin from '../../../styles/styleMargin';

const TimeLineEvent = ({ timeLineEvent }) => {
  return (
    <View>
      <Text style={[styleTexts.bodyText]}>
        <Entypo name="circle" size={14} color="#FFD3D3" />
        {timeLineEvent}
      </Text>
    </View>
  );
};

export default TimeLineEvent;
