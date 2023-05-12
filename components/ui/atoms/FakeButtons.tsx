import React, { useContext, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';
import styleTexts from '../../../styles/styleTexts';
import { arrayOfBars } from '../../../configs/bars';
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
          changeUserLocation(arrayOfBars[9].lat, arrayOfBars[9].long)
        }
      >
        <Text style={styleTexts.h3}>Taproom</Text>
      </Pressable>
      <Pressable
        style={{ borderWidth: 2, borderColor: 'pink' }}
        onPress={() =>
          changeUserLocation(arrayOfBars[10].lat, arrayOfBars[10].long)
        }
      >
        <Text style={styleTexts.h3}>Scandwich</Text>
      </Pressable>
      <Pressable
        style={{ borderWidth: 2, borderColor: 'pink' }}
        onPress={() =>
          changeUserLocation(arrayOfBars[11].lat, arrayOfBars[11].long)
        }
      >
        <Text style={styleTexts.h3}>Terassen</Text>
      </Pressable>
    </View>
  );
};

export default FakeUserLocationButton;
