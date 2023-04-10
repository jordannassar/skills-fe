import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import validateRegister from './validateRegister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import BigButton from '../components/Buttons/BigButton';

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [yearBorn, setYearBorn] = useState('');
  const [image, setImage] = useState('');
  const [Error, setError] = useState(false);

  async function _pickImage() {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.size < 10000000) {
      switch (result.mimeType) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/jpg':
          setImage(result);
          break;
        default: {
          setError('Please select an image file (.jpg, .png, jpeg)');
        }
      }
    } else {
      setError('Please select an image file less than 10MB');
    }
    formData.append('File', result);
  }
  useEffect(() => {
    setError(false);
  }, [fullName, email, password, confirmPassword, bio, yearBorn, image]);

  async function register() {
    const formData = new FormData();
    formData.append('email', email.toString());
    formData.append('password', password === confirmPassword ? password.toString() : null);
    formData.append('bio', bio.toString());
    formData.append('yearBorn', yearBorn);
    formData.append('name', fullName.toString());
    formData.append('file', {
      uri: image.uri,
      type: image.mimeType,
      name: image.name,
    });
    console.log(formData);
    try {
      const response = await fetch(`http://${process.env.ip}:3001/api/auth/register`, {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
      });
      console.log(response.ok);
      response.ok && AsyncStorage.setItem('session_token', response.headers.get('session_token'));
      !response.ok &&setError('Something went wrong. Please try again.');
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
    navigation.navigate('Home');
  }

  const handleRegister = async (e) => {
    console.log('register');
    try {
      const validate = await validateRegister(email, password, confirmPassword, bio, fullName, yearBorn, image);
      validate ? setError(validate) : register();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.formLabel}> REGISTER </Text>
      <Text style={{ fontSize: 16 }}> {Error ? Error : 'All fields are required.'} </Text>
      <View style={{ margin: 16 }}>
        <TextInput
          value={email}
          name="email"
          placeholder="Email"
          style={{ ...styles.inputStyle, width: 256, alignSelf: 'center' }}
          onChangeText={setEmail}
        />
        <TextInput
          value={fullName}
          name="fullName"
          placeholder="Full Name"
          style={{ ...styles.inputStyle, width: 192, alignSelf: 'center' }}
          onChangeText={setFullName}
        />
        <TextInput
          value={yearBorn}
          name="yearBorn"
          placeholder="Year of birth"
          maxLength={4}
          style={{ ...styles.inputStyle, width: '130%', borderRadius: 12, alignSelf: 'center' }}
          onChangeText={setYearBorn}
        />
        <TextInput
          value={bio}
          name="bio"
          placeholder="Bio"
          style={{ ...styles.inputStyle, width: 256 }}
          onChangeText={setBio}
          numberOfLines={3}
          maxLength={75}
        />
        <View style={{ marginVertical: 16 }}>
          <Text style={{ fontSize: 16, alignSelf: 'center', color: 'dimgray', marginBottom: 4 }}>
            Attach a profile picture below.{' '}
          </Text>
          <TouchableOpacity style={styles.button} onPress={_pickImage}>
            <Text style={{ ...styles.buttonText }} numberOfLines={1}>
              <Icon name="file" size={12} style={{ alignContent: 'center' }} /> {image ? image.name : 'Attach a file'}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          value={password}
          name="password"
          secureTextEntry={true}
          placeholder="Password"
          style={{ ...styles.inputStyle, width: 192, borderRadius: 12, alignSelf: 'center' }}
          onChangeText={setPassword}
        />
        <TextInput
          value={confirmPassword}
          name="confirmPassword"
          secureTextEntry={true}
          placeholder="Confirm Password"
          style={{ ...styles.inputStyle, width: 192, borderRadius: 12, alignSelf: 'center' }}
          onChangeText={setConfirmPassword}
        />
      </View>
      <View style={{ marginTop: 16 }}>
        <BigButton text="Register" bigBfunc={() => handleRegister()} />
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} style={{ left: '-35%', top: '175%', color: 'gray' }} />
      </TouchableOpacity>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8f1',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  formLabel: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  inputStyle: {
    margin: 10,
    width: 300,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F4F3EC',
    textAlign: 'center',
  },
  imageStyle: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#F4F3EC',
    borderRadius: 12,
    width: '50%',
    alignSelf: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  buttonText: {
    color: 'dimgray',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 12,
    borderRadius: 4,
    padding: 8,
    paddingHorizontal: 16,
  },
});

export default Register;
