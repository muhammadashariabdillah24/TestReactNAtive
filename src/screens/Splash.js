import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import Template from './Template/Template';
import {wait} from '../utils/timeOut';
import {HEIGHT} from '../utils/dimension';
import {fonts} from '../assets';

const Splash = ({navigation, route}) => {
  useEffect(() => {
    wait(3000).then(() => {
      navigation.replace('Home');
    });
  }, []);
  return (
    <Template>
      <Text style={styles.text}>Loading ....</Text>
    </Template>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: HEIGHT * 0.06,
    fontFamily: fonts.PoppinsRegular,
  },
});
export default Splash;
