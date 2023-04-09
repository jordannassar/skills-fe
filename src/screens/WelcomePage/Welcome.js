import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MediumButton from '../components/Buttons/MediumButton';
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePressRegister = () => {
    navigation.navigate('Register');
  };
  const handleLogin = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      if (email === storedEmail && password === storedPassword) {
        navigation.navigate('Home');
      } else {
        alert('Incorrect email or password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.titleText}>Sign in or make an account below </Text>
      <TextInput placeholder="Email" style={styles.box} onChangeText={(text) => setEmail(text)} value={email} />
      <TextInput
        placeholder="Password"
        style={styles.box}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.registerOpt}>
        <Text onPress={() => handlePressRegister()}>Register</Text>
      </TouchableOpacity>

      <MediumButton medBfunc={handleLogin} text="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F1',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginLeft: 24,
    marginTop: 58,
  },
  titleText: {
    marginLeft: 24,
    marginBottom: 71,
  },
  box: {
    width: 250,
    height: 40,
    backgroundColor: '#F4F3EC',
    marginLeft: 70,
    marginTop: 16,
    borderRadius: 10,
  },
  registerOpt: {
    marginTop: 16,
    marginLeft: 70,
    marginBottom: 20,
    color: '#7C7C7C',
  },
});
export default Login;
