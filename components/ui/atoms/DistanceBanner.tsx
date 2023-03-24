import React from 'react';
import { View, Text } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';

interface DistanceBannerType {
  distance: number;
  barName: string;
}

const DistanceBanner = ({ distance, barName }: DistanceBannerType) => {
  const distanceMeter = Math.round(distance * 100) * 10;

  return (
    <View style={styleComponents.distanceBanner}>
      <Text style={styleTexts.bodyText}>
        Du är {distanceMeter} meter från {barName}
      </Text>
    </View>
  );
};

export default DistanceBanner;
