import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { challenges2 } from '../../../configs/challenges';
import { ContextStore } from '../../../context/ContextStore';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import NavigationButton from '../atoms/NavigatonButton';

const DoChallenge = ({ navigation, showChallenge }) => {
  const { currentChallenge } = useContext(ContextStore);

  return (
    <View
      style={{
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 16,
        padding: 8,
        marginBottom: 46,
        backgroundColor: showChallenge ? '#2A3D78' : '#A65ED2',
      }}
    >
      {showChallenge ? (
        <>
          <Text style={styleTexts.h3}>{currentChallenge.name} </Text>
          <Text style={styleTexts.bodyText}>
            {currentChallenge.description}{' '}
          </Text>
          <View style={styleComponents.centered}>
            <NavigationButton
              navigation={navigation}
              navigateTo={'Challenge'}
              buttonText={'GÖR UTMANING'}
            />
          </View>
        </>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{
              height: 100,
              width: 100,
            }}
            source={require('../../../assets/pofileImages/livstrom.png')}
          />
          <Text
            style={[
              styleTexts.h3,
              { flexWrap: 'wrap', width: '60%', margin: 8 },
            ]}
          >
            WOW, äkta queen!! Du har redan gjort alla utmaningar
          </Text>
        </View>
      )}
    </View>
    // </LinearGradient>
  );
};

export default DoChallenge;
