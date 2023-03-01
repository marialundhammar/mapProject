import React from 'react';
import { View } from 'react-native';
import styleScreens from '../../../styles/styleScreens';
import DrinkPreferenceButton from '../atoms/DrinkPreferenceButton';

const DrinkPreferences = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <DrinkPreferenceButton text={'Vin'} icon={'🍷'} />
      <DrinkPreferenceButton text={'Öl'} icon={'🍺'} />
      <DrinkPreferenceButton text={'Coctail'} icon={'🍹'} />
      <DrinkPreferenceButton text={'Pinne'} icon={'🥃'} />
      <DrinkPreferenceButton text={'Billigt Bubbel'} icon={'🥂'} />
      <DrinkPreferenceButton text={'Alkoholfritt'} icon={'🧉'} />
      <DrinkPreferenceButton text={'Pommes'} icon={'🍟'} />
      <DrinkPreferenceButton text={'Kaffe'} icon={'☕️'} />
      <DrinkPreferenceButton text={'Dyrt bubbel'} icon={'🍾'} />
    </View>
  );
};

export default DrinkPreferences;
