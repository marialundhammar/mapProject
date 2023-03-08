import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styleTexts from '../../../styles/styleTexts';
import Button from '../atoms/Button';
import Slider from '@react-native-community/slider';
import styleScreens from '../../../styles/styleScreens';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import styleButtons from '../../../styles/styleButtons';

const StepTwo = () => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value) => {
    console.log(value);
    setSliderValue(value);
  };

  return (
    <View
      style={{
        /*   position: 'sticky', */
        bottom: 0,
        height: 500,
        width: '100%',
        zIndex: 100,
      }}
    >
      <View style={styleScreens.space}>
        <Text style={styleTexts.h3}>Var vill du barhoppa?</Text>
        <View style={styleScreens.center}>
          <Button buttonText={'Använd min position'} isFilled={true} />
          <Button buttonText={'Sök startposition'} isFilled={false} />
        </View>
      </View>

      <View>
        <Text style={styleTexts.h3}>Ungefär hur många barstopp?</Text>

        <View style={styleScreens.between}>
          <Text style={styleTexts.miniText}>typ ett</Text>
          <Slider
            style={{ width: 200, height: 5 }}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#E68383"
            maximumTrackTintColor="#FFD3D3"
            value={sliderValue}
            onValueChange={handleSliderChange}
            thumbTintColor="#E68383"
          />
          <Text style={styleTexts.miniText}>dödsmånga</Text>
        </View>
      </View>
    </View>
  );
};

export default StepTwo;
