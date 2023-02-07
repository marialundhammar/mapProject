import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import Map from '../ui/molecules/Map';
import NavigationButton from '../ui/atoms/NavigatonButton';
import { BarModal } from '../ui/molecules/BarModal';
import styleButtons from '../../styles/styleButtons';
import { arrayOfBars } from '../../configs/bars';

const MapScreen = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

  const content =
    'sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nquia consequuntur magni dolores eos qui ratione voluptatem sequi n';
  const header = 'Header';

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <BarModal
        showModal={showModal}
        setShowModal={setShowModal}
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
          alignItems: 'center',
          padding: 8,
        }}
      >
        <Pressable
          onPress={() => setShowModal(!showModal)}
          style={styleButtons.buttonDefault}
        >
          <Text>Open Modal</Text>
        </Pressable>

        <NavigationButton navigation={navigation} navigateTo={'Home'} />
      </View>
    </View>
  );
};

export default MapScreen;
