import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { Text, View } from 'react-native';

const Map = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MapView
        style={{
          flex: 1,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: 55.59542958317019,
          longitude: 13.009905375241077,
          //The region is defined by the center coordinates and the span of coordinates to display.
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
      >
        <Marker
          coordinate={{
            latitude: 55.59542958317019,
            longitude: 13.009905375241077,
          }}
          title="Marker"
        />
      </MapView>
    </View>
  );
};

export default Map;
