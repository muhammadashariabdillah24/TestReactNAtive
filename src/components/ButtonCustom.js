import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {fonts} from '../assets';
import {colors} from '../utils';
import {HEIGHT} from '../utils/dimension';

const width = Dimensions.get('window').width;

const ButtonCustom = ({
  title = 'Button',
  onPress,
  color = colors.primary,
  buttonStyle,
}) => {
  return (
    <TouchableOpacity
      style={[buttonStyle, styles.button, {backgroundColor: color}]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: HEIGHT * 0.02,
    borderTopRightRadius: HEIGHT * 0.02,
    borderBottomLeftRadius: HEIGHT * 0.02,
    borderBottomRightRadius: HEIGHT * 0.02,
    elevation: 5,
  },
  text: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.white,
  },
});
export default ButtonCustom;
