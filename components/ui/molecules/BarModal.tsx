import React from 'react';
import { Text, View, Pressable, Image } from 'react-native';
import Modal from 'react-native-modal';
import styleButtons from '../../../styles/styleButtons';
import styleText from '../../../styles/styleTexts';
import styleModals from '../../../styles/styleComponents';
import { StyleSheet } from 'react-native-web';
import { AntDesign } from '@expo/vector-icons';
import NavigationButton from '../atoms/NavigatonButton';
import styleComponents from '../../../styles/styleComponents';

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
  navigation: any;
  visible: boolean;
  onClose: () => void;
};

export const BarModal = ({
  navigation,
  content,
  header,
  image,
  showButton = false,
  visible,
  onClose,
}: ModalType) => {
  const imagePath = image ? image : null;

  return (
    <View>
      <Modal isVisible={visible} onBackdropPress={onClose}>
        <View style={styleComponents.modalStyle}>
          <View style={styleModals.header}>
            <Text style={styleText.h2}>{header}</Text>

            <Pressable style={styleButtons.closeIcon} onPress={onClose}>
              <AntDesign name="closecircleo" size={24} color="black" />
            </Pressable>
          </View>

          <View style={styleComponents.content}>
            {image && <Image source={imagePath} style={styleModals.image} />}
            <Text style={styleText.bodyText}>
              Du verkar befinna dig på {content?.name}, stämmer det?
            </Text>

            {showButton && (
              <NavigationButton
                navigation={navigation}
                navigateTo={'Bar'}
                buttonText={'Yes det stämmer'}
                isFilled={false}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};
