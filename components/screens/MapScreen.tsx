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
  const [showModal] = useState(false);

  const content =
    'sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nquia consequuntur magni dolores eos qui ratione voluptatem sequi n';
  const header = 'Header';

  return (
    <View>
      <TopHeader navigation={navigation} showBackButton={true} />

      <FakeUserLocationButton
        fakeLat={55.59184715874535}
        fakeLong={13.010633954699994}
      />

      <View style={styleScreens.mapScreen}>
        <Map navigation={navigation} />
        <BarModal
          showModal={showModal}
          content={content}
          header={header}
          image={arrayOfBars[0].image}
          showButton={true}
          navigation={navigation}
        />
        <BottomContainer navigation={navigation} />
      </View>
    </View>
  );
};

export default MapScreen;
