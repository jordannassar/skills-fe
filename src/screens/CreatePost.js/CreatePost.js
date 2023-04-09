import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import GlobalFooter from '../../Footers/GlobalFooter';
import * as DocumentPicker from 'expo-document-picker';
import Dropdown from '../components/Dropdown';
import BigButton from '../components/Buttons/BigButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CreatePost({ navigation, AppState }) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [file, setFile] = useState('');
  const formData = new FormData();
  const [link, setLink] = useState('');
  const [type, setType] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(false);
  const subjects = ['Math', 'Science', 'English', 'Not listed'];

  const PublishPost = async () => {
    try {
      console.log('category' + categoryName);
      formData.append('title', title);
      formData.append('details', details);
      formData.append('type', type);
      formData.append('categoryName', categoryName ? categoryName : 'Not listed');
      formData.append('file', {
        uri: file.uri,
        type: file.mimeType,
        name: file.name,
      });
      formData.append('link', link);

      if (title && details && type) {
        setIsLoading(true);
        const response = await fetch(`http://${process.env.ip}:3001/api/post/create`, {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
            session_token: `${await AsyncStorage.getItem('session_token')}`,
          },
          body: formData,
        });
        response.ok && setIsLoading(false);
        console.log(await response.json());
        response.status === 403 && navigation.navigate('Login');
        navigation.navigate('Home');
      } else {
        setIsLoading(false);
        setError('Please fill the title, details and type fields.');
      }
    } catch (error) {
      setIsLoading(false);
      navigation.navigate('Home');
    }
  };

  async function _pickDocument() {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      if (
        result.mimeType === 'application/vnd.ms-powerpoint' ||
        result.mimeType === 'application/pdf' ||
        result.mimeType === 'application/msword' ||
        result.mimeType === 'image/png' ||
        result.mimeType === 'image/jpeg' ||
        result.mimeType === 'image/jpg'
      ) {
        if (result.size < 10000000) {
          setFile(result);
        } else {
          setError('File is too big');
        }
      } else {
        setError('File type is not supported');
      }
    }
  }

  useEffect(() => {
    setError(false);
  }, [title, details, type, categoryName, link]);

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator
          size={48}
          color="#CF6F5A"
          style={{ marginTop: '65%', position: 'absolute', alignSelf: 'center' }}
        />
      ) : (
        <View>
          <View style={styles.body}>
            <ScrollView contentContainerStyle={styles.scrollViewCont}>
              <Text style={styles.title}>{Error ? Error : 'Creating a new post'} </Text>
              <Text
                style={{
                  color: '#7C7C7C',
                  fontSize: 16,
                  width: '75%',
                }}
              >
                Choose whether your post is an offer or a request and fill the form below.
              </Text>
              <View style={styles.itemCont}>
                <Dropdown
                  defaultText={'Subject'}
                  listItems={subjects}
                  onSelectAction={(categoryName) => {
                    setCategoryName(categoryName);
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    left: -8,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      marginTop: 8,
                      backgroundColor: type === 1 ? '#CF6F5A' : 'dimgray',
                      borderRadius: 12,
                      paddingHorizontal: 4,
                    }}
                    onPress={() => {
                      setType(1);
                    }}
                  >
                    <Text style={styles.buttonText}>Offer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginTop: 8,
                      backgroundColor: type === 2 ? '#CF6F5A' : 'dimgray',
                      borderRadius: 12,
                      paddingHorizontal: 4,
                      left: 4,
                    }}
                    onPress={() => {
                      setType(2);
                    }}
                  >
                    <Text style={styles.buttonText}>Request</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  marginLeft: '3%',
                }}
              >
                <TextInput
                  style={{ fontSize: 24 }}
                  value={title}
                  placeholder={'Title'}
                  onChangeText={(e) => {
                    setTitle(e);
                  }}
                ></TextInput>
                <TextInput
                  style={{ fontSize: 18, marginTop: 16 }}
                  value={details}
                  placeholder={'Details'}
                  onChangeText={(e) => {
                    setDetails(e);
                  }}
                  multiline={true}
                ></TextInput>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                height: 40,
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <TouchableOpacity style={{ ...styles.button, backgroundColor: 'dimgray' }} onPress={_pickDocument}>
                <Text style={styles.buttonText}>
                  <Icon name="file" size={16} /> {file.name ? file.name : 'Attach File'}
                </Text>
              </TouchableOpacity>
              <TextInput
                style={{ fontSize: 16, marginLeft: 8, marginTop: 8, width: '30%' }}
                value={link}
                placeholder={'Insert link'}
                multiline={true}
                onChangeText={(e) => {
                  setLink(e);
                }}
              ></TextInput>
            </View>
          </View>

          <View style={{ marginBottom: '35%' }}>
            <BigButton text="Publish" bigBfunc={PublishPost} />
          </View>

          <GlobalFooter AppState={AppState} navigation={navigation} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  attachedFile: {
    marginTop: 4,
    fontSize: 14,
    marginLeft: 4,
    color: 'grey',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF8F1',
  },
  body: {
    top: '7%',
    flex: 7,
    width: '100%',
    paddingLeft: '6%',
    paddingRight: '6%',
  },
  button: {
    padding: 8,
  },
  scrollViewCont: {
    marginTop: 24,
    marginBottom: 24,
  },
  welcomeCont: {
    paddingLeft: '6%',
    padding: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'darkblue',
    paddingLeft: 12,
    paddingRight: 16,
    paddingTop: 11,
    paddingBottom: 8,
    width: 130,
    height: 42,
    color: '#696767',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#CF6F5A',
    borderRadius: 12,
    width: '40%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 8,
    marginTop: -2,
    paddingHorizontal: 4,
  },
  itemCont: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingLeft: '3%',
    paddingRight: '3%',
    marginVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'semibold',
    width: '75%',
  },
  typeButton: {
    marginTop: 8,
    backgroundColor: '#CF6F5A',
    borderRadius: 12,
    paddingHorizontal: 4,
  },
});
