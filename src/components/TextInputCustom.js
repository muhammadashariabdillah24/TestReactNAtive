import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {colors} from '../utils';

const TextInputCustom = ({
  placeholder,
  keyboardType,
  inlineImageLeft,
  onChangeText,
  styleTextInput,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.black03}
      keyboardType={keyboardType}
      inlineImageLeft={inlineImageLeft}
      inlineImagePadding={HEIGHT * 0.02}
      onChangeText={onChangeText}
      style={[styles.container, styleTextInput]}
    />
  );
};

export default TextInputCustom;

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 0.8,
    borderRadius: HEIGHT * 0.01,
    borderColor: colors.black03,
    borderWidth: HEIGHT * 0.001,
    marginBottom: HEIGHT * 0.02,
  },
});
