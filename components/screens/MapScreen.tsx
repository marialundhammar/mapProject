import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, SafeAreaView, View } from 'react-native';
import Map from '../ui/molecules/Map';
import { BarModal } from '../ui/molecules/BarModal';
import { arrayOfBars } from '../../configs/bars';
import TopHeader from '../ui/molecules/TopHeader';
import styleScreens from '../../styles/styleScreens';
import BottomContainer from '../ui/molecules/BottomContainer';
import FakeUserLocationButton from '../ui/atoms/FakeButtons';
import DistanceBanner from '../ui/atoms/DistanceBanner';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import styleComponents from '../../styles/styleComponents';

const MapScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, height: '100%', backgroundColor: '#000826' }}
    >
      <TopHeader navigation={navigation} showBackButton={false} />

      <View style={styleScreens.mapScreen}>
        <FakeUserLocationButton />

        <View style={{ flex: 1 }}>
          <Map navigation={navigation} />
          <View
            style={{
              justifyContent: 'center',
            }}
          >
            <BottomContainer navigation={navigation} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
