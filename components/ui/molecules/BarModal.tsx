import React, { useContext } from 'react';
import { Text, View, Pressable, Image } from 'react-native';
import Modal from 'react-native-modal';
import styleButtons from '../../../styles/styleButtons';
import styleText from '../../../styles/styleTexts';
import styleModals from '../../../styles/styleComponents';
import { AntDesign } from '@expo/vector-icons';
import NavigationButton from '../atoms/NavigatonButton';
import styleComponents from '../../../styles/styleComponents';
import { BarType } from '../../../types';
import { ContextStore } from '../../../context/ContextStore';
import DefaultButton from '../atoms/DefaultButton';

type ModalType = {
  content?: {
    lat: number;
    long: number;
    name: string;
    distance: number;
  } | null;
  header: string;
  showButton?: boolean;
  image?: any;
  navigation?: any;
  visible: boolean;
  onClose?: () => void;
  currentBar?: BarType;
};

export const BarModal = ({
  navigation,
  content,
  header,
  image,
  showButton = false,
  visible,
  onClose,
  currentBar,
}: ModalType) => {
  const imagePath = image ? image : null;

  console.log('image', image);

  return (
    <View>
      <Modal isVisible={visible} onBackdropPress={onClose}>
        <View style={styleComponents.modalStyle}>
          <View style={styleModals.header}>
            <Text style={styleText.h1}>{header}</Text>

            <Pressable style={styleButtons.closeIcon} onPress={onClose}>
              <AntDesign name="closecircleo" size={24} color="#FFD3D3" />
            </Pressable>
          </View>

          <View style={styleComponents.content}>
            {image && (
              <Image source={{ uri: imagePath }} style={styleModals.image} />
            )}
            {currentBar && (
              <Text style={styleText.bodyText}>
                Du verkar befinna dig på {content?.name}, stämmer det?
              </Text>
            )}

            {showButton && (
              <DefaultButton onClose={onClose} text={'Nej gick bara förbi'} />
            )}

            <View style={styleComponents.centered}>
              {showButton && (
                <NavigationButton
                  navigation={navigation}
                  navigateTo={'Bar'}
                  buttonText={'Yes det stämmer'}
                  isFilled={false}
                  currentBar={currentBar}
                  onClose={onClose}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
