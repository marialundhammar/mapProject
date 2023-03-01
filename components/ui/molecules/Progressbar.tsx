import React from 'react';
import { Text, View } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import styleScreens from '../../../styles/styleScreens';
import ProgressbarItem from '../atoms/ProgressItem';

const Progressbar = () => {
  return (
    <View style={styleScreens.center}>
      <View style={styleComponents.progressBar}>
        <ProgressbarItem isFilled={true} />
        <ProgressbarItem isFilled={false} />
        <ProgressbarItem isFilled={false} />
      </View>
    </View>
  );
};

export default Progressbar;
