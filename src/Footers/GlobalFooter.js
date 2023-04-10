import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GlobalFooter({ navigation }) {
  return (
    <View style={styles.footerCont}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Icon name="home" size={30} color="#CF6F5A" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CreatePost')} style={styles.item}>
        <Icon name="plus-square-o" size={30} color="#CF6F5A" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.item}>
        <Icon name="user" size={30} color="#CF6F5A" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FAF8F1',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
  },
  footerCont: {
    position: 'absolute',
    bottom: '5%',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
});
