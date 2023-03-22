import React, { useContext, useState } from 'react';
import { Text, View, Button, Pressable, Image } from 'react-native';
import Modal from 'react-native-modal';
import styleButtons from '../../../styles/styleButtons';
import styleText from '../../../styles/styleTexts';
import styleModals from '../../../styles/styleComponents';
import { StyleSheet } from 'react-native-web';
import { AntDesign } from '@expo/vector-icons';
import NavigationButton from '../atoms/NavigatonButton';
import { ContextStore } from '../../../context/ContextStore';

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

  // const {  setShowModal } = useState();

  return (
    <View>
      <Modal isVisible={visible} onBackdropPress={onClose}>
        <View style={styles.modalStyle}>
          <View style={styleModals.header}>
            <Text style={styleText.h2}>{header}</Text>

            <Pressable style={styleButtons.closeIcon} onPress={onClose}>
              <AntDesign name="closecircleo" size={24} color="black" />
            </Pressable>
          </View>

          <View style={styleModals.content}>
            {image && <Image source={imagePath} style={styleModals.image} />}
            <Text style={styleText.bodyText}>{content?.name}</Text>

            {showButton && (
              <NavigationButton
                navigation={navigation}
                navigateTo={'Bar'}
                buttonText={'Yes det stämmer'}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  //Modal
  modalStyle: {
    backgroundColor: 'lightgrey',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 16,
    paddingVertical: 24,
  },
});
