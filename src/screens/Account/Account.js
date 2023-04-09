import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalFooter from '../../Footers/GlobalFooter';
import * as DocumentPicker from 'expo-document-picker';
import MediumButton from '../components/Buttons/MediumButton';

export default function Account({ navigation, AppState }) {
  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState(null);
  const [yearBorn, setYearBorn] = useState(null);
  const [name, setName] = useState(null);
  const [image, setImage] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [email, setEmail] = useState(null);

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
  }

  async function fetchUser() {
    try {
      const response = await fetch(`http://${process.env.ip}:3001/api/user/getreq`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          session_token: `${await AsyncStorage.getItem('session_token')}`,
        },
      });
      response.status === 403 && navigation.navigate('Login');

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(await data);
        setBio(await data.bio);
        setYearBorn(await data.yearBorn);
        setName(await data.name);
        setAvatarUrl(await data.avatarUrl);
        setEmail(await data.email);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.message);
    }
    setIsLoading(false);
  }
  
  useEffect(() => {
    setError(null);
  }, [bio, yearBorn, name, image]);

  async function updateUser() {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('bio', bio);
      formData.append('yearBorn', yearBorn);
      formData.append('name', name);
      formData.append('email', email);
      image &&
        formData.append('file', {
          uri: image.uri,
          type: image.mimeType,
          name: image.name,
        });
      const response = await fetch(`http://${process.env.ip}:3001/api/user/update`, {
        method: 'patch',
        headers: {
          'Content-Type': 'multipart/form-data',
          session_token: `${await AsyncStorage.getItem('session_token')}`,
        },
        body: formData,
      });
      response.status === 403 && navigation.navigate('Login');
      response.ok && fetchUser();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.message);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#FAF8F1',
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#CF6F5A"
          style={{ position: 'absolute', alignSelf: 'center', marginTop: '50%' }}
        />
      ) : (
        <View>
          <View style={styles.modalContent}>
            <Text
              style={{
                marginTop: '20%',
                position: 'relative',
                color: 'black',
                fontSize: 40,
                alignSelf: 'center',
                fontWeight: 'bold',
              }}
            >
              Account
            </Text>
            <Text
              value={name}
              style={{
                marginVertical: 16,
                position: 'relative',
                color: 'dimgray',
                fontSize: 16,
                alignSelf: 'center',
                width: '75%',
                textAlign: 'center',
              }}
              numberOfLines={2}
            >
              {Error ? Error : 'Here are all the details of your account. Click on any fields to edit them.'}
            </Text>

            <TouchableOpacity onPress={_pickImage}>
              <Image
                source={{ uri: image ? image.uri : avatarUrl }}
                style={{ height: 192, width: 192, marginVertical: 8, alignSelf: 'center' }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', marginTop: 8, marginBottom: 48 }}>
              <Text style={{ fontSize: 14, color: 'dimgray', alignSelf: 'center', textAlign: 'center' }}>Email</Text>
              <Text
                style={{ color: 'black', fontSize: 18 }}
                onPress={() => {
                  setError('You cannot change your email');
                }}
              >
                {email}{' '}
                <Icon
                  name="envelope"
                  size={18}
                  color="dimgray"
                  style={{
                    marginLeft: 8,
                  }}
                />
              </Text>
              <Text style={{ fontSize: 14, color: 'dimgray', alignSelf: 'center', textAlign: 'center' }}>
                Full name
              </Text>
              <TextInput
                value={name}
                style={{ position: 'relative', color: 'black', fontSize: 16, alignSelf: 'center' }}
                onChangeText={setName}
              />
              <Text style={{ fontSize: 14, color: 'dimgray', alignSelf: 'center', textAlign: 'center' }}>
                Year born
              </Text>
              <TextInput
                value={yearBorn.toString()}
                style={{ position: 'relative', fontSize: 14, alignSelf: 'center', color: 'black' }}
                onChangeText={setYearBorn}
              />
              <Text style={{ fontSize: 14, color: 'dimgray', alignSelf: 'center', textAlign: 'center' }}>Bio</Text>
              <TextInput
                style={{ fontSize: 14, color: 'black', alignSelf: 'center' }}
                value={bio}
                onChangeText={setBio}
              />
            </View>
          </View>
        </View>
      )}
      {!isLoading && (
        <View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: 8 }}>
              <MediumButton
                text="Log Out"
                medBfunc={() => {
                  AsyncStorage.removeItem('session_token');
                  navigation.navigate('Login');
                }}
              />
            </View>
            <MediumButton text="Update" medBfunc={() => updateUser()} />
          </View>
        </View>
      )}
      <GlobalFooter AppState={AppState} navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 8,
    marginTop: -2,
  },
  titleContainer: {
    alignItems: 'center',
    padding: 20,
  },
  requesterContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  requesterInfo: {
    justifyContent: 'space-between',
  },
  prerequisitesInfo: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    alignContent: 'space-around',
  },
  separator: {
    borderBottomColor: 'dimgray',
    opacity: 0.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 8,
  },
  button: {
    marginTop: 5,
    backgroundColor: '#CF6F5A',
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
});
