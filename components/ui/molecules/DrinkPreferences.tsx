import React from 'react';
import { View, Text } from 'react-native';
import DrinkPreferenceButton from '../atoms/DrinkPreferenceButton';

const DrinkPreferences = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 24,
      }}
    >
      <DrinkPreferenceButton text={'Vin'} type={'wine'} />
      <DrinkPreferenceButton text={'Öl'} type={'beer'} />
      <DrinkPreferenceButton text={'Coctail'} type={'cocktail'} />
      <DrinkPreferenceButton text={'Pinne'} type={'whiskey'} />
      <DrinkPreferenceButton text={'Billigt Bubbel'} type={'cheap'} />
      <DrinkPreferenceButton text={'Alkoholfritt'} type={'non-alcohole'} />
      <DrinkPreferenceButton text={'Pommes'} type={'pommes'} />
      <DrinkPreferenceButton text={'Snacks'} type={'snacks'} />
      <DrinkPreferenceButton text={'Dyrt bubbel'} type={'expensive'} />
    </View>
  );
};

export default DrinkPreferences;
