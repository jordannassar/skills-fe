import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect, createContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import GlobalFooter from '../../Footers/GlobalFooter';
import Dropdown from '../components/Dropdown';
import Post from '../components/Post';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const homeContext = createContext(homeContext);

export default function Home({ navigation, AppState }) {
  const [type, setType] = useState(0);
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useIsFocused();
  const [Error, setError] = useState(false);

  async function fetchAllPosts() {
    try {
      console.log('fetching');

      const response = await fetch(`http://${process.env.ip}:3001/api/post/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          session_token: `${await AsyncStorage.getItem('session_token')}`,
        },
      });
      response.status === 403 && navigation.navigate('Login');
      response.ok && setIsLoading(false);
      //(await response.message.json()) === '' && navigation.navigation('Login');
      setAllPosts(await response.json());
    } catch (error) {
      setIsLoading(false);
      setError('Something went wrong. Please try again.');
      console.log(error);
    }
  }

  function allPostsFilter(posts) {
    switch (type) {
      case 0:
        if (categoryName !== 'All Subjects') {
          return posts.filter((post) => post.categoryName === categoryName);
        } else {
          return posts.filter((post) => post);
        }
      case 1:
        if (categoryName !== 'All Subjects') {
          return posts.filter((post) => post.categoryName === categoryName && post.type === type);
        } else {
          return posts.filter((post) => post.type === type);
        }
      case 2:
        if (categoryName !== 'All Subjects') {
          return posts.filter((post) => post.categoryName === categoryName && post.type === type);
        } else {
          return posts.filter((post) => post.type === type);
        }
    }
  }
  //usefocuseffect is used to fetch data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchAllPosts();
    }, [])
  );
  useEffect(() => {
    allPostsFilter(allPosts);
  }, [categoryName, type]);

  const [categoryName, setCategoryName] = useState('All Subjects');
  const subjects = ['All Subjects', 'Math', 'Science', 'English', 'Not listed'];

  return (
    <homeContext.Provider value={{ allPosts, setAllPosts }}>
      <View style={styles.screen}>
        <View style={styles.body}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: '50%',
            }}
            nestedScrollEnabled={true}
          >
            <View style={styles.welcomeCont}>
              <Text style={{ fontSize: 28 }}>
                {type === 0 ? 'All Posts' : type === 1 ? 'Offers' : 'Requests'} of {categoryName}
              </Text>
              <Text
                style={{
                  color: '#7C7C7C',
                  fontSize: 16,
                }}
              >
                {Error ? Error : 'Offer or request tutoring regarding a subject'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                gap: 10,
                marginVertical: 16,
              }}
            >
              <Dropdown
                defaultText={'Subjects'}
                listItems={subjects}
                onSelectAction={(name) => {
                  setCategoryName(name);
                  console.log(categoryName);
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  style={{
                    marginTop: 8,
                    backgroundColor: type === 0 ? '#CF6F5A' : 'dimgray',
                    borderRadius: 12,
                    paddingHorizontal: 4,
                    marginHorizontal: 4,
                    marginLeft: 16,
                  }}
                  onPress={() => {
                    console.log(0);
                    setType(0);
                  }}
                >
                  <Text style={styles.buttonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginTop: 8,
                    backgroundColor: type === 1 ? '#CF6F5A' : 'dimgray',
                    borderRadius: 12,
                    paddingHorizontal: 4,
                    marginLeft: 4,
                  }}
                  onPress={() => {
                    console.log(1);
                    setType(1);
                  }}
                >
                  <Text style={styles.buttonText}>Offers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginTop: 8,
                    backgroundColor: type === 2 ? '#CF6F5A' : 'dimgray',
                    borderRadius: 12,
                    paddingHorizontal: 4,
                    marginHorizontal: 4,
                  }}
                  onPress={() => {
                    console.log(2);
                    setType(2);
                  }}
                >
                  <Text style={styles.buttonText}>Requests</Text>
                </TouchableOpacity>
              </View>
            </View>
            {allPosts &&
              Object.keys(allPostsFilter(allPosts)).map((key) => {
                return (
                  <TouchableOpacity key={key} style={{ ...styles.noteCont, ...styles.shadowProp }}>
                    <Post post={allPostsFilter(allPosts)[key]} />
                  </TouchableOpacity>
                );
              })}
            {isLoading && (
              <ActivityIndicator
                size={48}
                color="#CF6F5A"
                style={{ marginTop: '50%', position: 'absolute', alignSelf: 'center' }}
              />
            )}
          </ScrollView>
        </View>
        <GlobalFooter AppState={AppState} navigation={navigation} fetchAllPosts={fetchAllPosts} />
      </View>
    </homeContext.Provider>
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
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF8F1',
  },
  body: {
    top: '7%',
    marginTop: 0,
    flex: 8,
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  noteCont: {
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
});
