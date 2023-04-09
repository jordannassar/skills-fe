import { View, Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export const MediumButton = ({text, medBfunc}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => medBfunc()}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MediumButton;

const styles = StyleSheet.create({
  buttonText: {
    color: '#FAF8F1',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  button: {
    width: 200,
    height: 40,
    borderRadius: 2,
    backgroundColor: '#CF6F5A',
    paddingHorizontal: 32,
    paddingVertical: 4,
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#171717',
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
