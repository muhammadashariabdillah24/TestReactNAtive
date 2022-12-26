import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Template from './Template/Template';
import ButtonCustom from '../components/ButtonCustom';
import {colors} from '../utils';

const AddItem = () => {
  return (
    <Template>
      <ButtonCustom
        color={colors.blue}
        onPress={() => console.log('Kepencet')}
        title="Tambah Barang"
      />
    </Template>
  );
};

export default AddItem;

const styles = StyleSheet.create({});
