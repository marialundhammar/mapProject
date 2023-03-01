import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import Map from '../ui/molecules/Map';
import NavigationButton from '../ui/atoms/NavigatonButton';
import { BarModal } from '../ui/molecules/BarModal';
import styleButtons from '../../styles/styleButtons';
import { arrayOfBars } from '../../configs/bars';
import TopHeader from '../ui/molecules/TopHeader';
import styleScreens from '../../styles/styleScreens';

const MapScreen = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

  const content =
    'sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nquia consequuntur magni dolores eos qui ratione voluptatem sequi n';
  const header = 'Header';

  return (
    <View>
      <TopHeader
        navigation={navigation}
        navigateTo={'Map'}
        showBackButton={true}
      />

      <View style={styleScreens.defaultScreen}>
        <BarModal
          showModal={showModal}
          content={content}
          header={header}
          image={arrayOfBars[0].image}
          showButton={true}
          navigation={navigation}
        />
        <Map navigation={navigation} />

        <View
          style={{
            justifyContent: 'center',
            position: 'absolute',

            zIndex: 1,
            backgroundColor: 'black',
          }}
        >
          <Pressable
            onPress={() => setShowModal(true)}
            style={styleButtons.buttonDefault}
          >
            <Text>Open Modal</Text>
          </Pressable>

          <NavigationButton
            navigation={navigation}
            navigateTo={'Bar'}
            buttonText={'GÅ TILL BAR'}
          />
        </View>
      </View>
    </View>
  );
};

export default MapScreen;
