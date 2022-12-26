import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../utils';
import {fonts} from '../assets';
import {GlobalContext} from '../Store/globalContext';
import Template from './Template/Template';
import {getItem} from '../services/ItemConsume/getItem';
import Card from '../components/Card';
import {navigate} from '../utils/navigators';
import {deleteItem} from '../services/ItemConsume/deleteItem';
import TextInputCustom from '../components/TextInputCustom';
import {HEIGHT, WIDTH} from '../utils/dimension';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalCustom from '../components/ModalCustom';
import {Button} from 'react-native-paper';
import {searchItem} from '../services/ItemConsume/searchItem';
import {orderByDateTransaction} from '../services/ItemConsume/orderByDateTransaction';
import {orderByItemName} from '../services/ItemConsume/orderByItemName';

const SEARCH_ITEM = 'Cari ...';
const TEXT_DATA_EMPTY = 'Tidak ada item';

const Home = () => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  const [searchItemName, setSearchItemName] = useState('');
  const [isVisibleModalFilter, setIsVisibleModalFilter] = useState(false);
  const [dataItem, setDataItem] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [typeAPI, setTypeAPI] = useState('');

  useEffect(() => {}, [typeAPI]);

  const handleGetItem = async () => {
    try {
      const result = await getItem();

      const {message, status} = result;
      if (status !== 'success') {
        return ToastAndroid.showWithGravity(
          message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }

      setDataItem(result.data);
      return result;
    } catch (error) {
      return ToastAndroid.showWithGravity(
        error.message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };
  useEffect(() => {
    renderTypeApi();
  }, []);

  const handleSearch = async () => {
    try {
      const result = await searchItem(searchItemName);

      console.log(`API SEARCH ${JSON.stringify(result)}`);

      const {message, status} = result;
      if (status !== 'success') {
        return ToastAndroid.showWithGravity(
          message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }

      setTypeAPI('SEARCH ITEM');
      setDataItem(result.data);
      return result;
    } catch (error) {
      return ToastAndroid.showWithGravity(
        error.message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };

  const handleOrderByDateTransaction = async () => {
    try {
      const result = await orderByDateTransaction();

      const {message, status} = result;
      if (status !== 'success') {
        return ToastAndroid.showWithGravity(
          message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }

      setTypeAPI('ORDER BY DATE');
      setDataItem(result.data);
      return result;
    } catch (error) {
      return ToastAndroid.showWithGravity(
        error.message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };

  const handleOrderByItemName = async () => {
    try {
      const result = await orderByItemName();

      const {message, status} = result;
      if (status !== 'success') {
        return ToastAndroid.showWithGravity(
          message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }

      setTypeAPI('ORDER BY ITEM NAME');
      setDataItem(result.data);
      return result;
    } catch (error) {
      return ToastAndroid.showWithGravity(
        error.message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };

  const handleOpenModalFilter = () => {
    setIsVisibleModalFilter(true);
  };

  const handleCloseModalFilter = () => {
    setIsVisibleModalFilter(false);
  };

  const handleDeleteItem = async id => {
    try {
      const result = await deleteItem(id);

      const {message, status} = result;
      if (status !== 'success') {
        return ToastAndroid.showWithGravity(
          message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }

      return ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } catch (error) {
      return ToastAndroid.showWithGravity(
        error.message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };

  const renderItem = ({item}) => {
    return (
      <Card
        text={item.namaBarang}
        onPressUpdate={() =>
          navigate('EditItem', {
            id: item._id,
          })
        }
        onPressDelete={() => handleDeleteItem(item._id)}
      />
    );
  };

  const renderTypeApi = () => {
    if (typeAPI === 'SEARCH ITEM') {
      handleSearch();
    } else if (typeAPI === 'ORDER BY ITEM NAME') {
      handleOrderByItemName();
    } else if (typeAPI === 'ORDER BY DATE') {
      handleOrderByDateTransaction();
    } else {
      handleGetItem();
    }
  };

  const renderListItem = () => {
    return (
      <FlatList
        data={dataItem}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyItem()}
      />
    );
  };

  const renderSearchItem = () => {
    return (
      <View style={styles.wrapperSearch}>
        <TextInputCustom
          placeholder={SEARCH_ITEM}
          onChangeText={text => setSearchItemName(text)}
          styleTextInput={styles.textInputStyle}
        />

        <TouchableOpacity
          style={[styles.buttonSearchStyle, {marginLeft: WIDTH * 0.03}]}
          onPress={handleSearch}>
          <Icon name="magnify" size={HEIGHT * 0.03} color={colors.white} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderButtonFilter = () => {
    return (
      <TouchableOpacity
        style={[styles.buttonSearchStyle, {marginVertical: HEIGHT * 0.02}]}
        onPress={handleOpenModalFilter}>
        <Icon name="filter-variant" size={HEIGHT * 0.03} color={colors.white} />
      </TouchableOpacity>
    );
  };

  const renderEmptyItem = () => {
    return (
      <View style={styles.styleEmptyItem}>
        <Text style={styles.textEmpty}>{TEXT_DATA_EMPTY}</Text>
      </View>
    );
  };
  const renderSearch = () => {
    return (
      <View style={styles.wrapperSearchAndButtonSearch}>
        {renderButtonFilter()}
        {renderSearchItem()}
      </View>
    );
  };

  const renderChooseButtonFilter = () => {
    return (
      <View style={styles.wrapperButtonFilter}>
        <Button
          icon="briefcase"
          mode="outlined"
          style={styles.buttonFilter}
          onPress={handleOrderByItemName}>
          Barang
        </Button>
        <Button
          icon="calendar"
          mode="outlined"
          style={styles.buttonFilter}
          onPress={handleOrderByDateTransaction}>
          Tanggal Transaksi
        </Button>
      </View>
    );
  };

  const renderModalFilter = () => {
    return (
      <ModalCustom
        onDismiss={handleCloseModalFilter}
        visible={isVisibleModalFilter}>
        <View style={styles.wrapperChooseButtonFilter}>
          <Text style={styles.textFilter}>Filter</Text>
          {renderChooseButtonFilter()}
        </View>
      </ModalCustom>
    );
  };
  return (
    <Template>
      {renderSearch()}
      {renderListItem()}
      {renderModalFilter()}
    </Template>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.black,
  },
  wrapperFilterAndSearch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: WIDTH * 0.03,
  },
  wrapperSearchAndButtonSearch: {
    justifyContent: 'center',
  },
  wrapperSearch: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonSearchStyle: {
    height: HEIGHT * 0.06,
    width: WIDTH * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
    borderTopLeftRadius: HEIGHT * 0.01,
    borderTopRightRadius: HEIGHT * 0.01,
    borderBottomLeftRadius: HEIGHT * 0.01,
    borderBottomRightRadius: HEIGHT * 0.01,
    elevation: 0,
  },
  textInputStyle: {
    width: WIDTH * 0.7,
  },
  wrapperChooseButtonFilter: {
    borderRadius: HEIGHT * 0.02,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
    width: WIDTH * 0.9,
    height: HEIGHT * 0.4,
  },
  wrapperButtonFilter: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textFilter: {
    textAlign: 'left',
    marginLeft: WIDTH * 0.03,
    marginVertical: HEIGHT * 0.03,
    fontSize: HEIGHT * 0.04,
    fontFamily: fonts.PoppinsRegular,
  },
  buttonFilter: {
    marginBottom: HEIGHT * 0.02,
  },
  styleEmptyItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    textAlign: 'center',
    fontSize: HEIGHT * 0.03,
    fontFamily: fonts.PoppinsRegular,
  },
});
export default Home;
