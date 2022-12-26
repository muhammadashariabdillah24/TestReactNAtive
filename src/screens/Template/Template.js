import React, {useContext} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {GlobalContext} from '../../Store/globalContext';
import {colors} from '../../utils';
import {HEIGHT, WIDTH} from '../../utils/dimension';
// import {GlobalContext} from '../Store/globalContext';

const Template = ({children}) => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.body,
          {backgroundColor: dark ? colors.dark : colors.white},
        ]}>
        {children}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    height: '100%',
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Template;
