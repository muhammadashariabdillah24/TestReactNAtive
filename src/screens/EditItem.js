import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import Template from './Template/Template';
import {HEIGHT} from '../utils/dimension';
import TextInputCustom from '../components/TextInputCustom';
import ButtonCustom from '../components/ButtonCustom';
import {updateItem} from '../services/ItemConsume/updateItem';
import {colors} from '../utils';
import {wait} from '../utils/timeOut';
import {navigate} from '../utils/navigators';
import moment from 'moment/moment';

const NAMA_BARANG = 'Nama Barang';
const STOK = 'Stok';
const JUMLAH_TERJUAL = 'Jumlah Terjual';
const JENIS_BARANG = 'Jenis Barang';

const EditItem = ({route}) => {
  const [namaBarang, setNamaBarang] = useState('');
  const [stok, setStok] = useState('');
  const [jumTerjual, setJumTerjual] = useState('');
  const [jenisBarang, setJenisBarang] = useState('');

  const handleUpdateItem = async () => {
    try {
      const today = moment().format('DD-MM-YYYY');
      const data = {
        nama_barang: namaBarang,
        stok: stok,
        jumlah_terjual: jumTerjual,
        tglTransaksi: today,
        jenis_barang: jenisBarang,
      };
      const id = route.params.id;
      const result = await updateItem(id, data);

      const {message, status} = result;

      if (status !== 'success') {
        return ToastAndroid.showWithGravity(
          message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }

      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

      wait(3000).then(() => {
        navigate('Home');
      });
    } catch (error) {
      return ToastAndroid.showWithGravity(
        error.message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };
  return (
    <Template>
      <View style={styles.wrapperForm}>
        <TextInputCustom
          placeholder={NAMA_BARANG}
          inlineImageLeft="cart"
          onChangeText={text => setNamaBarang(text)}
        />
        <TextInputCustom
          placeholder={STOK}
          inlineImageLeft="numeric"
          keyboardType="numeric"
          onChangeText={text => setStok(text)}
        />
        <TextInputCustom
          placeholder={JUMLAH_TERJUAL}
          inlineImageLeft="numeric"
          keyboardType="numeric"
          onChangeText={text => setJumTerjual(text)}
        />
        <TextInputCustom
          placeholder={JENIS_BARANG}
          inlineImageLeft="cart"
          onChangeText={text => setJenisBarang(text)}
        />

        <ButtonCustom
          title="Perbarui"
          onPress={() => handleUpdateItem()}
          color={colors.blue}
          buttonStyle={styles.buttonUpdateStyle}
        />
      </View>
    </Template>
  );
};

export default EditItem;

const styles = StyleSheet.create({
  wrapperForm: {
    paddingVertical: HEIGHT * 0.005,
  },
  buttonUpdateStyle: {
    height: HEIGHT * 0.06,
    borderTopLeftRadius: HEIGHT * 0.01,
    borderTopRightRadius: HEIGHT * 0.01,
    borderBottomLeftRadius: HEIGHT * 0.01,
    borderBottomRightRadius: HEIGHT * 0.01,
  },
});
