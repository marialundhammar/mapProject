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

import styleComponents from '../../styles/styleComponents';
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
        backgroundColor: '#1B274A',
        width: '100%',
      }}
    >
      <TopHeader
        navigation={navigation}
        showBackButton={false}
        showBarMap={true}
      />

      {onBar ? (
        <>
          <ScrollView>
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                paddingTop: 42,
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <BarContent />

              <TimeLine navigation={navigation} />

              {showChallenge && (
                <View style={{ paddingTop: 24, width: '95%' }}>
                  <Text style={styleTexts.h4}>
                    Medan du väntar på nästa utmaning, gör denna?{' '}
                  </Text>
                  <DoChallenge navigation={navigation} />
                </View>
              )}

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '95%',
                }}
              >
                <PhotoStream path={`${user.email}/${currentBar.name}`} />
              </View>
            </View>
          </ScrollView>
          <View style={{ alignItems: 'center', padding: 12 }}>
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
