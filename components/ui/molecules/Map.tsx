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
import { Audio } from 'expo-av';
import { useNotifications } from '../../../Hooks/useNotifications';
import styleTexts from '../../../styles/styleTexts';
import styleComponents from '../../../styles/styleComponents';

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
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState(null);
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

  const bars = currentBarTour.bars;
  /*   const getClosestBar = () => {
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
  }; */

  const getClosestBar = () => {
    const visitedBarNames = visitedBars.map((bar) => bar.name);
    const closeBars = bars
      .filter((bar) => !visitedBarNames.includes(bar.name)) // filter out visited bars
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

    return closeBars[0]; // return the second closest bar (i.e., the one with index 1)
  };

  /*   const getSecondClosestBar = () => {
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

    return closeBars[1];
  };
 */
  const playSound = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../../assets/yay.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  };

  const checkDistanceToAllBars = async () => {
    const closestBar = getClosestBar();
    //const secondClosest = getSecondClosestBar();
    console.log('visitedBars', visitedBars);

    console.log(`${closestBar.name} has not been visited yet.`);
    setDistanceBar({
      distance: closestBar.distance,
      name: closestBar.name,
    });

    if (closestBar.distance < 0.04 && currentBar === null) {
      const isAlreadyShown = closestBar.name === latestShownBarModal;

      /*       const isAlreadyShown = showedBarModals.some(
        (bar) => bar.name === closestBar.name
      ); */
      if (!isAlreadyShown) {
        setBarModal({ visible: true, content: closestBar });
        setLatestShownBarModal(closestBar.name);
        playSound();
        /* 
        delay(5000); */
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
      await setLoading(false);
    })();
  }, [userLocation]);
  //add userLocation

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const pinColorUser = '#000000';
  const pinColorBar = '#E68383';
  const pinColorVisited = 'blue';

  return (
    <>
      {loading && !currentBar ? (
        <View style={styleComponents.distanceBanner}>
          <Text style={styleTexts.bodyText}>Hämtar din position ...</Text>
        </View>
      ) : (
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
            const isVisited = visitedBars.some(
              (visitedBar) => visitedBar.name === bar.name
            );

            return (
              <Marker
                coordinate={{
                  latitude: bar.lat,
                  longitude: bar.long,
                }}
                key={i}
                pinColor={isVisited ? pinColorVisited : pinColorBar}
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
                  {isVisited && (
                    <Text style={styleTexts.miniText}>
                      Du har redan varit här
                    </Text>
                  )}
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
