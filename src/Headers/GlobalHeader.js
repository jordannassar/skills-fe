import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import AccountModal from '../screens/Modals/AccountModal.js';

export default function GlobalHeader() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.headerCont}>
      <View style={styles.iconCont}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Image style={styles.logo} source={require('../assets/images/profile.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.logo} source={require('../assets/images/search.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.logo} source={require('../assets/images/notifications.png')} />
        </TouchableOpacity>
      </View>
      <AccountModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
}
const styles = StyleSheet.create({
  headerCont: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginBottom: 0,
    justifyContent: 'space-between',
    paddingLeft: '7%',
    paddingRight: '7%',
    alignContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  logo: {
    height: 27,
    width: 30,
  },
  iconCont: {
    padding: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '100%',
  },
});
