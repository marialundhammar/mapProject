import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { ContextStore } from '../../context/ContextStore';
import styleScreens from '../../styles/styleScreens';
import styleTexts from '../../styles/styleTexts';
import Button from '../ui/atoms/NavigatonButton';
import DoChallenge from '../ui/molecules/DoChallange';
import TimeLine from '../ui/molecules/TimeLine';
import TopHeader from '../ui/molecules/TopHeader';
import Map from '../ui/molecules/Map';
import BarContent from '../ui/molecules/BarContent';
import { challenges2, challengeKaffe } from '../../configs/challenges';
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
    let challenge =
      challengeKaffe[Math.floor(Math.random() * challengeKaffe.length)];

    while (checkIfCompleted(challenge)) {
      challenge =
        challengeKaffe[Math.floor(Math.random() * challengeKaffe.length)];
    }
    setCurrentChallenge(challenge);

    if (completedChallenges.length == challenges2.length - 1) {
      setShowChallenge(false);
    }
  }, [completedChallenges]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#000826',
      }}
    >
      <TopHeader navigation={navigation} showBackButton={false} />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          backgroundColor: '#000826',
          width: '100%',
        }}
      >
        {onBar ? (
          <>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  paddingTop: 42,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <BarContent />
                {showChallenge && (
                  <View style={{ paddingTop: 36, width: '98%' }}>
                    <Text style={styleTexts.h3}>Utmaning </Text>
                    <DoChallenge navigation={navigation} />
                  </View>
                )}

                <TimeLine
                  navigation={navigation}
                  events={undefined}
                  profilePage={undefined}
                />
                <View>
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
    </SafeAreaView>
  );
};

export default BarScreen;
