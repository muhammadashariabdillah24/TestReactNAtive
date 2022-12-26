import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Modal} from 'react-native-paper';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {colors} from '../utils';

const ModalCustom = ({children, onDismiss, visible}) => {
  return (
    <Modal onDismiss={onDismiss} style={styles.styleModal} visible={visible}>
      {children}
    </Modal>
  );
};

export default ModalCustom;

const styles = StyleSheet.create({
  styleModal: {
    flex: 1,
  },
  container: {
    width: WIDTH * 0.9,
    height: HEIGHT * 0.5,
    backgroundColor: colors.white,
    borderTopLeftRadius: HEIGHT * 0.02,
    borderTopRightRadius: HEIGHT * 0.02,
    borderBottomLeftRadius: HEIGHT * 0.02,
    borderBottomRightRadius: HEIGHT * 0.02,
  },
});
