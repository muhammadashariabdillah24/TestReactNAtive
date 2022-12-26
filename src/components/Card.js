import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {colors} from '../utils';
import ButtonCustom from './ButtonCustom';

const Card = ({uri, text, onPressUpdate, onPressDelete}) => {
  return (
    <Pressable style={styles.container}>
      {/* <Image source={{uri: uri}} style={styles.imageItem} /> */}
      <Text style={styles.textItem}>{text}</Text>
      <View style={styles.wrapperButtonUpdateAndDelete}>
        <ButtonCustom
          title="Perbarui"
          color={colors.blue}
          onPress={onPressUpdate}
          buttonStyle={styles.buttonStyle}
        />
        <ButtonCustom
          title="Hapus"
          color={colors.red}
          onPress={onPressDelete}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    padding: HEIGHT * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH * 0.9,
    height: HEIGHT * 0.3,
    borderRadius: HEIGHT * 0.02,
    borderColor: colors.black03,
    borderWidth: HEIGHT * 0.001,
  },
  // imageItem: {
  //   width: WIDTH * 0.2,
  //   height: HEIGHT * 0.3,
  //   borderRadius: HEIGHT * 0.05,
  // },
  textItem: {
    color: colors.black,
    fontSize: HEIGHT * 0.02,
    fontWeight: 'bold',
  },
  wrapperButtonUpdateAndDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    height: HEIGHT,
  },
  buttonStyle: {
    marginBottom: HEIGHT * 0.02,
    width: WIDTH * 0.3,
    height: HEIGHT * 0.12,
  },
});
