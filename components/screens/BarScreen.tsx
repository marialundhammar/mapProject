import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ContextStore } from '../../context/ContextStore';
import styleScreens from '../../styles/styleScreens';
import styleTexts from '../../styles/styleTexts';
import Button from '../ui/atoms/NavigatonButton';
import DoChallenge from '../ui/molecules/DoChallange';
import TimeLine from '../ui/molecules/TimeLine';
import TopHeader from '../ui/molecules/TopHeader';
import useGetEvent from '../../Hooks/useGetEvents';
import Map from '../ui/molecules/Map';
import styleComponents from '../../styles/styleComponents';
import BarContent from '../ui/molecules/BarContent';
import { challenges2 } from '../../configs/challenges';
import PhotoStream from '../ui/molecules/PhotoStream';

const BarScreen = ({ navigation }) => {
  const { user, currentBar, onBar, setCurrentChallenge } =
    useContext(ContextStore);

  const events = useGetEvent(user);

  useEffect(() => {
    const challenge =
      challenges2[Math.floor(Math.random() * challenges2.length)];
    setCurrentChallenge(challenge);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#1B274A',
      }}
    >
      <TopHeader navigation={navigation} showBackButton={false} />

      {onBar ? (
        <>
          <ScrollView>
            <View style={styleScreens.onboardingScreen}>
              <Text style={styleTexts.h2}>
                VÄLKOMMEN TILL {currentBar.name}
              </Text>

              <BarContent />
              <TimeLine navigation={navigation} />

              <DoChallenge navigation={navigation} />
              <View style={styleComponents.imageContainerBig}>
                <Text style={styleTexts.h3}>
                  Sist du var här såg det ut såhär
                </Text>

                <View style={styleComponents.imageContainer}>
                  <PhotoStream path={`${user.email}/${currentBar.name}`} />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styleComponents.centered}>
            <Button
              navigation={navigation}
              navigateTo={'Map'}
              buttonText={'GÅ FRÅN BAR'}
              isFilled={true}
            />
          </View>
        </>
      ) : (
        <>
          <Map navigation={navigation} />
        </>
      )}
    </View>
  );
};

export default BarScreen;
