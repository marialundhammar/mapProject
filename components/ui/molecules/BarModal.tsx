import React, { useState } from 'react';
import { Text, View, Button, Pressable, Image } from 'react-native';
import Modal from 'react-native-modal';
import styleButtons from '../../../styles/styleButtons';
import styleText from '../../../styles/styleTexts';
import styleModals from '../../../styles/styleModals';
import { StyleSheet } from 'react-native-web';
import { AntDesign } from '@expo/vector-icons';
import NavigationButton from '../atoms/NavigatonButton';

type ModalType = {
  showModal: boolean;
  content: string;
  header: string;
  showButton?: boolean;
  image?: any;
  navigation: any;
};

export const BarModal = ({
  navigation,
  showModal,
  content,
  header,
  image,
  showButton = false,
}: ModalType) => {
  const imagePath = image ? image : null;

  //storage state 
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalStyle}>
          <View style={styleModals.header}>
            <Text style={styleText.h2}>{header}</Text>

            <Pressable
              style={styleButtons.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign name="closecircleo" size={24} color="black" />
            </Pressable>
          </View>

          <View style={styleModals.content}>
            {image && <Image source={imagePath} style={styleModals.image} />}
            <Text style={styleText.bodyText}>{content}</Text>

            {showButton && (
              <NavigationButton navigation={navigation} navigateTo={'Bar'} />
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
