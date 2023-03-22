import React, { useState } from 'react';
import { View } from 'react-native';
import Map from '../ui/molecules/Map';
import { BarModal } from '../ui/molecules/BarModal';
import { arrayOfBars } from '../../configs/bars';
import TopHeader from '../ui/molecules/TopHeader';
import styleScreens from '../../styles/styleScreens';
import BottomContainer from '../ui/molecules/BottomContainer';
import FakeUserLocationButton from '../ui/atoms/FakeButtons';

const MapScreen = ({ navigation }) => {
  return (
    <View>
      <TopHeader navigation={navigation} showBackButton={true} />

      <FakeUserLocationButton />

      <View style={styleScreens.mapScreen}>
        <Map navigation={navigation} />

        <BottomContainer navigation={navigation} />
      </View>
    </View>
  );
};

export default MapScreen;
