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
          changeUserLocation(55.59512476877623, 13.016939408784317)
        }
      >
        <Text style={styleTexts.h3}>Jord</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          changeUserLocation(55.59667918264727, 13.014283064563864)
        }
      >
        <Text style={styleTexts.h3}>Söderberg</Text>
      </Pressable>
    </View>
  );
};

export default FakeUserLocationButton;
