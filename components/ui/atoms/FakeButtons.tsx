import React, { useContext, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';

const FakeUserLocationButton = () => {
  const { setUserLocation, userLocation } = useContext(ContextStore);
  const [toggleCoords, setToggleCoords] = useState(false);

  const changeUserLocation = () => {
    if (toggleCoords) {
      setUserLocation({ lat: 55.592296775105524, long: 13.01675573718772 });
    } else {
      setUserLocation({ lat: 55.59184715874535, long: 13.010633954699994 });
    }
    setToggleCoords(!toggleCoords);
  };

  return (
    <View>
      <Pressable onPress={changeUserLocation}>
        <Text>
          {userLocation.lat}, {userLocation.long}
        </Text>
      </Pressable>
    </View>
  );
};

export default FakeUserLocationButton;
