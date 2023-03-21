import React from 'react';
import { View, Text } from 'react-native';
import styleTexts from '../../../styles/styleTexts';

interface DistanceBannerType {
  distance: number;
  barName: string;
}

const DistanceBanner = ({ distance, barName }: DistanceBannerType) => {
  return (
    <View>
      <Text style={styleTexts.bodyText}>
        Du är {distance} från {barName}
      </Text>
    </View>
  );
};

export default DistanceBanner;
