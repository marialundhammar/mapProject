import React from 'react';
import { View } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import BackButton from '../atoms/Backbutton';

import BurgerMenu from '../atoms/BurgerMenu';
import NavigationButton from '../atoms/NavigatonButton';

const TopHeader = ({ navigation, showBackButton }) => {
  return (
    <View style={styleComponents.topHeader}>
      <View>{showBackButton && <BackButton navigation={navigation} />}</View>
      <BurgerMenu navigation={navigation} />
    </View>
  );
};

export default TopHeader;
