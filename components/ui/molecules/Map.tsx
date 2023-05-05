import React, { useContext, useEffect, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import styleMap from '../../../styles/styleMap';
import { View, Text } from 'react-native';
import { calculateDistanceFunction, delay } from '../../../utils/helpers';
import { BarModal } from './BarModal';
import DistanceBanner from '../atoms/DistanceBanner';
import mapStyle from '../../../assets/mapStyle';
import { ContextStore } from '../../../context/ContextStore';
import { BarType } from '../../../types';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

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
    roundStarted,
    visitedBars,
  } = useContext(ContextStore);
  const [distanceBar, setDistanceBar] = useState({ distance: 0, name: '' });
  const [markerBar, setMarkerBar] = useState('');
  const [closestBarModalShown, setClosestBarModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showedBarModals, setShowedBarModals] = useState([]);
  const [latestShownBarModal, setLatestShownBarModal] = useState('');

  const { sendNotificationOnBar } = useNotifications();
  const LOCATION_TASK_NAME = 'background-location-task';
  const mapView = useRef(null);
  /* 
  TaskManager.defineTask('locationTask', async ({ data, error }) => {
    if (error) {
      console.log('TaskManager error:', error);
      return;
    }
    if (data) {
      console.log('data', data);
    
      const { latitude, longitude } = data.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`); 
      // Do something with the location data
    }
  });

  const startLocationTracking = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    await Location.startLocationUpdatesAsync('locationTask', {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 60 * 1000, // 1 minute
      distanceInterval: 0, // minimum distance
      deferredUpdatesInterval: 0, // minimum time between updates
      foregroundService: {
        notificationTitle: 'Location tracking',
        notificationBody: 'Location tracking is running',
      },
    });
  };
  startLocationTracking();*/

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
    console.log('distance', closestBar.distance, currentBar);

    if (closestBar.distance < 0.02 && currentBar === null) {
      console.log('visited bars', visitedBars);

      const isAlreadyShown = closestBar.name === latestShownBarModal;

      /*       const isAlreadyShown = showedBarModals.some(
        (bar) => bar.name === closestBar.name
      ); */
      if (!isAlreadyShown) {
        setBarModal({ visible: true, content: closestBar });
        setLatestShownBarModal(closestBar.name);
        console.log('HAJJJ');

        //delay(2000);
        //setShowedBarModals([...showedBarModals, closestBar]);
      }

      //sendNotificationOnBar();
      //setShowNotification(true);
    }
  };

  if (showNotification) {
    setShowNotification(false);
  }

  useEffect(() => {
    (async () => {
      //requestForeground -> only when the app is on, requestBackground while the app is running in the background
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setStatus('Permission to access location was denied');
        return;
      } else {
        let location = await Location.getCurrentPositionAsync({});
        await delay(5000);
        await setUserLocation({
          lat: location.coords.latitude,
          long: location.coords.longitude,
        });
      }

      checkDistanceToAllBars();
    })();
  }, [userLocation]);
  //add userLocation

  const pinColorUser = '#000000';
  const pinColorBar = '#E68383';
  const pinColorVisited = '#6C87CB';

  return (
    <>
      {!currentBar && (
        <DistanceBanner
          distance={distanceBar.distance}
          barName={distanceBar.name}
        />
      )}

      <View
        style={
          onBar
            ? { flex: 0.9, width: '100%' }
            : {
                flex: 1,
                width: '100%',
              }
        }
      >
        <MapView
          style={styleMap.container}
          customMapStyle={mapStyle}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          initialRegion={{
            latitude: 55.59542958317019,
            longitude: 13.009905375241077,
            latitudeDelta: 0.022,
            longitudeDelta: 0.021,
          }}
        >
          {bars.map((bar, i) => {
            // Check if the current bar is in the visitedBars array
            const isVisited = visitedBars.some(
              (visitedBar) => visitedBar.id === bar.id
            );

            // Set the pinColor based on whether the bar has been visited
            const pinColor = isVisited ? pinColorVisited : pinColorBar;

            return (
              <Marker
                coordinate={{
                  latitude: bar.lat,
                  longitude: bar.long,
                }}
                key={i}
                pinColor={pinColor}
              >
                <Callout
                  tooltip={true}
                  style={{
                    backgroundColor: '#E68383',
                    padding: 6,
                    margin: 0,
                    borderRadius: 5,
                    borderWidth: 0,
                  }}
                >
                  <Text style={styleTexts.h3}>{bar.name}</Text>
                </Callout>
              </Marker>
            );
          })}

          {/*<Marker
    coordinate={{
      latitude: userLocation.lat,
      longitude: userLocation.long,
    }}
    pinColor={pinColorUser}
  />*/}
        </MapView>

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
