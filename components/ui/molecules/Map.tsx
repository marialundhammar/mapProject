import React, { useContext, useEffect, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import styleMap from '../../../styles/styleMap';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import { calculateDistanceFunction, delay } from '../../../utils/helpers';
import { BarModal } from './BarModal';
import DistanceBanner from '../atoms/DistanceBanner';
import mapStyle from '../../../assets/mapStyle';
import { ContextStore } from '../../../context/ContextStore';
import { BarType } from '../../../types';

import { useNotifications } from '../../../Hooks/useNotifications';
import styleTexts from '../../../styles/styleTexts';

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
  const [statusBackground, setStatusBackground] = useState('');
  const [userLocationBackground, setUserLocationBackground] = useState({
    lat: 0,
    long: 0,
  });
  const [showMarkerModal, setShowMarkerModal] = useState(false);
  const [markerLocation, setMarkerLocation] = useState({ x: 0, y: 0 });
  const [barModal, setBarModal] = useState({ visible: false, content: null });
  const {
    currentBarTour,
    setCurrentBar,
    userLocation,
    setUserLocation,
    currentBar,
    onBar,
    user,
  } = useContext(ContextStore);
  const [distanceBar, setDistanceBar] = useState({ distance: 0, name: '' });
  const [markerBar, setMarkerBar] = useState('');
  const [closestBarModalShown, setClosestBarModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { sendNotificationOnBar } = useNotifications();
  const LOCATION_TASK_NAME = 'background-location-task';
  const mapView = useRef(null);

  const bars = currentBarTour.bars;
  const getClosestBar = () => {
    const closeBars = bars
      .map((bar) => ({
        lat: bar.lat,
        long: bar.long,
        name: bar.name,
        description: bar.description,
        image: bar.image,
        distance: calculateDistanceFunction({
          lat1: userLocation.lat,
          lon1: userLocation.long,
          lat2: bar.lat,
          lon2: bar.long,
        }),
      }))
      .sort((a, b) => {
        return a.distance - b.distance;
      });

    return closeBars[0];
  };

  const checkDistanceToAllBars = async () => {
    const closestBar = getClosestBar();

    console.log('BARMODAL', barModal.visible);

    setDistanceBar({
      distance: closestBar.distance,
      name: closestBar.name,
    });
    if (closestBar.distance < 0.4 && currentBar === null) {
      setBarModal({ visible: true, content: closestBar });
      sendNotificationOnBar();
      //setShowNotification(true);
    }
  };

  if (showNotification) {
    setShowNotification(false);
  }

  useEffect(() => {
    (async () => {
      //requestForeground -> only when the app is on, requestBackground while the app is running in the background
      /*       let { status } = await Location.requestForegroundPermissionsAsync();
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
      } */

      checkDistanceToAllBars();
    })();
  }, [userLocation]);
  //add userLocation

  const pinColorUser = '#000000';
  const pinColorBar = '#E68383';

  return (
    <>
      {!currentBar && (
        <DistanceBanner
          distance={distanceBar.distance}
          barName={distanceBar.name}
        />
      )}

      <View style={{ flex: 1 }}>
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
              pinColor={pinColorBar}
            >
              <Callout
                tooltip={true}
                style={{
                  backgroundColor: '#E68383',
                  padding: 10,
                  margin: 0,
                  borderRadius: 5,
                  borderWidth: 0,
                }}
              >
                <Text style={styleTexts.h3}>{bar.name}</Text>
              </Callout>
            </Marker>
          ))}

          <Marker
            //fake users location
            coordinate={{
              latitude: userLocation.lat,
              longitude: userLocation.long,
            }}
            pinColor={pinColorUser}
          />
        </MapView>

        {/*     {showMarkerModal && (
          <View
            style={{
              position: 'absolute',
              top: markerLocation.y,
              left: markerLocation.x,
              backgroundColor: '#FFFFFF',
              borderRadius: 8,
              padding: 8,
            }}
          >
            <Text style={styleTexts.h3}>{markerBar}</Text>
          </View>
        )} */}

        <BarModal
          showButton={true}
          navigation={navigation}
          content={barModal.content}
          header={'Hallå där!'}
          visible={barModal.visible}
          onClose={() =>
            setBarModal((current) => ({ ...current, visible: false }))
          }
          currentBar={getClosestBar()}
        />
      </View>
    </>
  );
};

export default Map;
