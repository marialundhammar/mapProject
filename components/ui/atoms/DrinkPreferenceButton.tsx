import React, { useState } from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import styleButtons from '../../../styles/styleButtons';
import styleComponents from '../../../styles/styleComponents';

type DrinkPreferenceType = {
  text: string;
  type: string;
};

const DrinkPreferenceButton = ({ text, type }: DrinkPreferenceType) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const icon = null;

  const renderIcon = (type) => {
    switch (type) {
      case 'beer':
        return (
          <Image
            style={{ height: 50, width: 50 }}
            source={require('../../../assets/drinkPreferences/beer.png')}
          />
        );

      case 'wine':
        return (
          <Image
            style={{ height: 50, width: 50 }}
            source={require('../../../assets/drinkPreferences/wine-red.png')}
          />
        );

      case 'cocktail':
        return (
          <Image
            style={{ height: 50, width: 50 }}
            source={require('../../../assets/drinkPreferences/cocktail.png')}
          />
        );
      case 'whiskey':
        return (
          <Image
            style={{ height: 50, width: 50 }}
            source={require('../../../assets/drinkPreferences/pinne.png')}
          />
        );

      case 'cheap':
        return (
          <Image
            style={{ height: 50, width: 50 }}
            source={require('../../../assets/drinkPreferences/wine-sparkling-cheap.png')}
          />
        );

      case 'non-alcohole':
        return (
          <Image
            style={{ height: 50, width: 50 }}
            source={require('../../../assets/drinkPreferences/alkoholfri.png')}
          />
        );

      case 'pommes':
        return (
          <Image
            style={{ height: 50, width: 50 }}
            source={require('../../../assets/drinkPreferences/pommes.png')}
          />
        );

      case 'snacks':
        return (
          <Image
            style={{ height: 50, width: 50 }}
            source={require('../../../assets/drinkPreferences/snacks.png')}
          />
        );

      case 'expensive':
        return (
          <Image
            style={{ height: 50, width: 50 }}
            source={require('../../../assets/drinkPreferences/wine-sparkling-fancy.png')}
          />
        );
    }
  };

  return (
    <>
      <Pressable
        onPress={handleIsClicked}
        style={
          isClicked ? styleButtons.buttonClicked : styleButtons.buttonDrink
        }
      >
        <View style={styleComponents.center}>{renderIcon(type)}</View>
        <Text style={styleButtons.buttonDrinkText}>{text}</Text>
      </Pressable>
    </>
  );
};

export default DrinkPreferenceButton;
