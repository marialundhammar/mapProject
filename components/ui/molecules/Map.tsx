import React, { FC, useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styleMap from '../../../styles/styleMap';
import { Button, View, Text } from 'react-native';
import * as Location from 'expo-location';
import { arrayOfBars } from '../../../configs/bars';
import { calculateDistanceFunction, delay } from '../../../utils/helpers';
import { BarType } from '../../../types';

interface CalculateDistanceFunctionType {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}

interface CalculateUserAndBarType extends CalculateDistanceFunctionType {
  name: string;
}

const Map = ({ navigation }) => {
  const [status, setStatus] = useState('');
  const [userLocation, setUserLocation] = useState({ lat: 0, long: 0 });
  const [locationTracking, setLocationTracking] = useState(false);
  const [barName, setbarName] = useState('');
  const arrayOfNearbyBars: BarType[] = [];

  const checkDistance = ({
    lat1,
    lon1,
    lat2,
    lon2,
    name,
  }: CalculateUserAndBarType) => {
    const distance = calculateDistanceFunction({ lat1, lon1, lat2, lon2 });
    if (distance < 0.03) {
      setbarName(name);
      //navigation.navigate('Bar');
    }
    if (distance < 0.5) {
      arrayOfNearbyBars.push({ lat: lat1, long: lon1, name: name });
    }
  };

  const updateUserLocation = async (lat: number, long: number) => {
    setUserLocation({
      lat: lat,
      long: long,
    });
  };

  const checkDistanceToAllBars = () => {
    arrayOfBars.map((bar) => {
      checkDistance({
        lat1: userLocation.lat,
        lon1: userLocation.long,
        lat2: bar.lat,
        lon2: bar.long,
        name: bar.name,
      });
    });

    console.log(arrayOfNearbyBars);
  };

  //onMount
  useEffect(() => {
    (async () => {
      //requestForeground -> only when the app is on, requestBackground while the app is running in the background
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setStatus('Permission to access location was denied');
        return;
      } else {
        let location = await Location.getCurrentPositionAsync({});
        await updateUserLocation(
          location.coords.latitude,
          location.coords.longitude
        );
        setLocationTracking(true);
      }
    })();
  }, []);

  //this is done when map is mounted
  useEffect(() => {
    (async () => {
      //requestForeground -> only when the app is on, requestBackground while the app is running in the background
      if (locationTracking) {
        let location = await Location.getCurrentPositionAsync({});
        await delay(1000);
        console.log(userLocation);
      }
    })();
  }, [userLocation]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {barName && <Text>Close to the bar: {barName} </Text>}

      <Button title="distance" onPress={checkDistanceToAllBars}></Button>
      <MapView
        style={styleMap.container}
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
        {arrayOfBars.map((bar, i) => (
          <Marker
            coordinate={{
              latitude: bar.lat,
              longitude: bar.long,
            }}
            key={i}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;
