import React, { useContext } from 'react';
import { View } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import BackButton from '../atoms/Backbutton';

import ProfileNavigation from '../atoms/ProfileNavigation';
import BarMapNavigation from '../atoms/BarMapNavigation';
import { ContextStore } from '../../../context/ContextStore';

const TopHeader = ({ navigation, showBackButton }) => {
  const { currentBar } = useContext(ContextStore);

  return (
    <View>
      <View style={styleComponents.topHeader}>
        <View>{showBackButton && <BackButton navigation={navigation} />}</View>
        <ProfileNavigation navigation={navigation} />
      </View>

      {currentBar && <BarMapNavigation navigation={navigation} />}
    </View>
  );
};

export default TopHeader;
