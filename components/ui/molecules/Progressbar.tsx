import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import styleComponents from '../../../styles/styleComponents';
import styleScreens from '../../../styles/styleScreens';
import ProgressbarItem from '../atoms/ProgressItem';

const Progressbar = () => {
  const { step } = useContext(ContextStore);

  return (
    <View style={styleScreens.center}>
      <View style={styleComponents.progressBar}>
        <ProgressbarItem isFilled={step >= 1 ? true : false} index={1} />
        <ProgressbarItem isFilled={step >= 2 ? true : false} index={2} />
        <ProgressbarItem isFilled={step === 3 ? true : false} index={3} />
      </View>
    </View>
  );
};

export default Progressbar;
