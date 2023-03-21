import React, { FC, useContext, useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styleMap from '../../../styles/styleMap';
import { View } from 'react-native';
import * as Location from 'expo-location';
import { calculateDistanceFunction, delay } from '../../../utils/helpers';
import { BarModal } from './BarModal';
import DistanceBanner from '../atoms/DistanceBanner';
import mapStyle from '../../../assets/mapStyle';
import { ContextStore } from '../../../context/ContextStore';

interface CalculateDistanceFunctionType {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}

interface CalculateUserAndBarType extends CalculateDistanceFunctionType {
  name: string;
}

interface CloseBarsType {
  lat: number;
  long: number;
  name: string;
  distance: number;
}

const Map = ({ navigation }) => {
  const [status, setStatus] = useState('');
  const [userLocation, setUserLocation] = useState({
    lat: 55.595,
    long: 13.0099,
  });
  const [barName] = useState({ name: '', distance: 0 });
  const [showMarkerModal, setShowMarkerModal] = useState(false);
  const closeBars: CloseBarsType[] = [];
  const { barTour } = useContext(ContextStore);
  const [distanceBar, setDistanceBar] = useState({ distance: 0, name: '' });

  const bars = barTour[0].bars;

  const checkDistance = ({
    lat1,
    lon1,
    lat2,
    lon2,
    name,
  }: CalculateUserAndBarType) => {
    const distance = calculateDistanceFunction({ lat1, lon1, lat2, lon2 });
    closeBars.push({
      lat: lat1,
      long: lon1,
      name: name,
      distance: distance,
    });
  };

  //sort array of closebars in descending order and then take the first to display as distance
  const checkDistanceToAllBars = () => {
    bars.map((bar) => {
      checkDistance({
        lat1: userLocation.lat,
        lon1: userLocation.long,
        lat2: bar.lat,
        lon2: bar.long,
        name: bar.name,
      });
    });

    closeBars.sort((a, b) => {
      return a.distance - b.distance;
    });

    setDistanceBar({
      distance: closeBars[0].distance,
      name: closeBars[0].name,
    });
  };

  const onPressMarker = () => {
    setShowMarkerModal(true);
  };

  //onMount and every time userLocation is updated. Not sure if this is the correct way due to delay function??
  useEffect(() => {
    (async () => {
      //requestForeground -> only when the app is on, requestBackground while the app is running in the background
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setStatus('Permission to access location was denied');
        return;
      } else {
        let location = await Location.getCurrentPositionAsync({});
        await delay(1000);
        await setUserLocation({
          lat: location.coords.latitude,
          long: location.coords.longitude,
        });
      }

      checkDistanceToAllBars();
    })();
  }, []);
  //add userLocation

  return (
    <View style={{ flex: 1 }}>
      <DistanceBanner
        distance={distanceBar.distance}
        barName={distanceBar.name}
      />
      <MapView
        style={styleMap.container}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: 55.59542958317019,
          longitude: 13.009905375241077,
          //The region is defined by the center coordinates and the span of coordinates to display.
          latitudeDelta: 0.022,
          longitudeDelta: 0.021,
        }}
      >
        {bars.map((bar, i) => (
          <Marker
            coordinate={{
              latitude: bar.lat,
              longitude: bar.long,
            }}
            key={i}
            onPress={onPressMarker}
          />
        ))}
      </MapView>

      <BarModal
        showModal={showMarkerModal}
        showButton={true}
        navigation={navigation}
        content={''}
        header={''}
      />
    </View>
  );
};

export default Map;
