import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PostModal from '../Modals/PostModal';
import { Image, View } from 'react-native';

export default function Post(props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(!modalVisible);
      }}
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image
        source={{ uri: props.post.userAvatarUrl }}
        style={{ height: 72, width: 72, marginRight: 8 }}
        resizeMode="contain"
      />
      <View
        style={{
          top: -8,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: '#1E1D1D',
          }}
        >
          {props.post.title}
          <Text
            style={{
              fontSize: 12,
              color: 'dimgray',
            }}
          >
            {' '}
            {props.post.categoryName ? props.post.categoryName : null}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 12,
            textTransform: 'capitalize',
            color: '#1E1D1D',
          }}
          numberOfLines={1}
        >
          {props.post.userName}
          <Text
            style={{
              fontSize: 12,
              color: 'dimgray',
            }}
            numberOfLines={1}
          >
            {', ' + props.post.userYearBorn}
          </Text>
        </Text>
      </View>
      {modalVisible && <PostModal post={props.post} modalVisible={modalVisible} setModalVisible={setModalVisible} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
