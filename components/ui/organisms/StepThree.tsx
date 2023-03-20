import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styleComponents from '../../../styles/styleComponents';
import styleTexts from '../../../styles/styleTexts';
import GroupCard from '../atoms/GroupCard';
import NavigationButton from '../atoms/NavigatonButton';
import { arrayOfGroups } from '../../../configs/groups';
import { ContextStore } from '../../../context/ContextStore';

const StepThree = ({ navigation }) => {
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
      <Text style={styleTexts.h3}>Vilka är ni?</Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          /*   position: 'sticky', */
        }}
      >
        <ScrollView>
          {arrayOfGroups.map((group, i) => (
            <GroupCard text={group.title} key={i} />
          ))}
        </ScrollView>
      </View>

      <View style={styleComponents.bottomNavigation}>
        <NavigationButton
          navigation={navigation}
          navigateTo={'Map'}
          buttonText={'SPARA'}
        />
      </View>
    </View>
  );
};

export default StepThree;
