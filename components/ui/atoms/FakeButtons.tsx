import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ContextStore } from '../../../context/ContextStore';

const FakeUserLocationButton = ({ fakeLat, fakeLong }) => {
  const { setUserLocation, userLocation } = useContext(ContextStore);

  const changeUserLocation = () => {
    setUserLocation({ lat: fakeLat, long: fakeLong });
  };

  return (
    <View>
      <Pressable onPress={changeUserLocation}>
        <Text>
          Change Userlocation to {fakeLat}, {fakeLong}
        </Text>
        <Text>
          --->{userLocation.lat}, {userLocation.long}
        </Text>
      </Pressable>
    </View>
  );
};

export default FakeUserLocationButton;
