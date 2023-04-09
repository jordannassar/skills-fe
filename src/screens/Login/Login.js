import React, { useEffect, useState } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BigButton from '../components/Buttons/BigButton';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handlePressRegister = () => {
    navigation.navigate('Register');
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('session_token');
    token && navigation.navigate('Home');
  };
  useEffect(() => {
    checkToken();
  }, []);

  const handleLogin = async () => {
    if (password && email) {
      setIsLoading(true);
      try {
        console.log('logging');
        const response = await fetch(`http://${process.env.ip}:3001/api/auth/login`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        console.log(response);
        console.log(response.headers.get('session_token'));
        console.log(response.status);
        (await response.ok) && (await AsyncStorage.setItem('session_token', response.headers.get('session_token')));
        (await response.ok) && (await AsyncStorage.setItem('userid', response.headers.get('userid')));
        response.ok && (await navigation.navigate('Home'));
        response.status === 404 && setIsLoading(false);
        response.status === 404 && setErrorMessage('Invalid email or password');
      } catch (error) {
        setErrorMessage('Something went wrong. Please try again.');
      }
    } else {
      setErrorMessage('Please fill in all fields');
    }
  };

  return isLoading ? (
    <ActivityIndicator
      size={48}
      color="#CF6F5A"
      style={{ marginTop: '65%', position: 'absolute', alignSelf: 'center' }}
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.titleText}>
        Skills is a project designed for students
        {'\n'}and teachers.
      </Text>

      <View style={{ marginTop: '20%' }}>
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            color: 'dimgray',
            marginBottom: 4,
          }}
        >
          {!errorMessage ? 'Log into your account' : errorMessage}
        </Text>
        <TextInput
          placeholder="Email"
          style={styles.box}
          onChangeText={(text) => {
            setErrorMessage(null);
            setEmail(text);
          }}
          value={email}
        />
        <TextInput
          placeholder="Password"
          style={styles.box}
          onChangeText={(text) => {
            setErrorMessage(null);
            setPassword(text);
          }}
          value={password}
          secureTextEntry
        />
      </View>
      <View style={{ top: '35%' }}>
        <BigButton
          text="Log in"
          bigBfunc={() => {
            handleLogin();
          }}
        />
        <TouchableOpacity style={styles.registerOpt} onPress={() => handlePressRegister()}>
          <Text style={{ fontSize: 12, textAlign: 'center', color: 'dimgray' }}>
            Don't have an account?{'\n'}
            <Text style={{ color: 'black' }}>register. </Text>
          </Text>
        </TouchableOpacity>
      </View>
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
    marginLeft: '6%',

    marginTop: '20%',
  },
  titleText: {
    marginLeft: '6%',
    fontSize: 16,
  },
  box: {
    width: 250,
    height: 40,
    backgroundColor: '#F4F3EC',
    marginLeft: 70,
    marginTop: 12,
    borderRadius: 12,
    textAlign: 'center',
  },
  registerOpt: {
    marginTop: 12,
  },
});
export default Login;
