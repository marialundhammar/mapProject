import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ContextStore } from '../../context/ContextStore';
import styleScreens from '../../styles/styleScreens';
import styleTexts from '../../styles/styleTexts';
import Button from '../ui/atoms/NavigatonButton';
import DoChallenge from '../ui/molecules/DoChallange';
import TimeLine from '../ui/molecules/TimeLine';
import TopHeader from '../ui/molecules/TopHeader';
import Map from '../ui/molecules/Map';
import BarContent from '../ui/molecules/BarContent';
import { challenges2 } from '../../configs/challenges';
import PhotoStream from '../ui/molecules/PhotoStream';

const BarScreen = ({ navigation }) => {
  const { user, currentBar, onBar, setCurrentChallenge, completedChallenges } =
    useContext(ContextStore);

  const [showChallenge, setShowChallenge] = useState(true);

  const checkIfCompleted = (challenge: {
    id: string;
    name: string;
    description: string;
    type: string;
    mediaType: string;
  }) => {
    return completedChallenges.some((checkChallenge) => {
      return checkChallenge.name === challenge.name;
    });
  };

  useEffect(() => {
    let challenge = challenges2[Math.floor(Math.random() * challenges2.length)];

    while (checkIfCompleted(challenge)) {
      challenge = challenges2[Math.floor(Math.random() * challenges2.length)];
    }
    setCurrentChallenge(challenge);

    if (completedChallenges.length == challenges2.length - 1) {
      setShowChallenge(false);
    }
  }, [completedChallenges]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000826',
        width: '100%',
      }}
    >
      <TopHeader navigation={navigation} showBackButton={false} />

      {onBar ? (
        <>
          <ScrollView>
            <View
              style={{
                flex: 1,
                paddingTop: 42,
                width: '100%',
              }}
            >
              <BarContent />

              <TimeLine
                navigation={navigation}
                events={undefined}
                profilePage={undefined}
              />

              {showChallenge && (
                <View style={{ paddingTop: 24, width: '95%' }}>
                  <Text style={styleTexts.h3}>
                    Mellan ölklunkarna, gör en utmaning?{' '}
                  </Text>
                  <DoChallenge navigation={navigation} />
                </View>
              )}

              <View
                style={{
                  width: '100%',
                  marginTop: 24,
                }}
              >
                <PhotoStream path={`${user.email}/${currentBar.name}`} />
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              alignItems: 'center',
              paddingBottom: 32,
              paddingTop: 2,
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Button
              navigation={navigation}
              navigateTo={'Map'}
              buttonText={'GÅ FRÅN BAR'}
              isFilled={true}
              currentBar={currentBar}
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
