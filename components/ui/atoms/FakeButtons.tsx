import React, { useContext, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import styleTexts from '../../../styles/styleTexts';

const FakeUserLocationButton = () => {
  const { setUserLocation, userLocation } = useContext(ContextStore);
  const [toggleCoords, setToggleCoords] = useState(false);

  const changeUserLocation = (lat: number, long: number) => {
    setUserLocation({ lat: lat, long: long });
    /*  else {
      setUserLocation({ lat: 55.59184715874535, long: 13.010633954699994 });
    }
    setToggleCoords(!toggleCoords); */
  };

  return (
    <View>
      <Pressable
        onPress={() =>
          changeUserLocation(55.59527933905798, 13.014008625214757)
        }
      >
        <Text style={styleTexts.h3}>COOOP</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          changeUserLocation(55.59475798918193, 13.015231712511566)
        }
      >
        <Text style={styleTexts.h3}>VIN VANJAS</Text>
      </Pressable>
    </View>
  );
};

export default FakeUserLocationButton;
