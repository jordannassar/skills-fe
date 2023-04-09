import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function BigButton({ text, bigBfunc}) {
  return (
    <View style={styles.saveButtonCont}>
      <TouchableOpacity style={styles.saveButton} onPress={() => bigBfunc()}>
        <Text style={styles.saveButtonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  saveButtonCont: {
    width: '100%',
    paddingLeft: '6%',
    paddingRight: '6%',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#CF6F5A',
    padding: 16,
    paddingHorizontal: 96,
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#171717',
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  saveButtonText: {
    color: '#FAF8F1',
    fontSize: 20,
    fontFamily: 'Roboto',
  },
});
