import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, Text, View, Image, Modal, PanResponder, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PostModal(props) {
  try {
    const { modalVisible, setModalVisible } = props;

    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dy } = gestureState;
        // Only set the pan responder if the user has moved more than 10 pixels
        // vertically, to avoid triggering it accidentally
        if (dy > 10 || dy < -10) {
          return true;
        }
        return false;
      },
      onPanResponderMove: (evt, gestureState) => {
        const { dy } = gestureState;
        if (dy > 0) {
          setModalVisible(false);
        }
      },
    });
    return (
      <View style={styles.modalContainer} {...panResponder.panHandlers}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={{ position: 'relative', color: 'black', fontSize: 28, alignSelf: 'center' }}>
                {props.post.title}
                <Text style={{ color: 'dimgray', fontSize: 14 }}>
                  {props.post.categoryName !== 'Not listed' ? ' ' + props.post.categoryName : null}{' '}
                </Text>
              </Text>
              <View style={{ ...styles.separator, marginVertical: 8 }} />
              <View style={{ alignItems: 'center' }}>
                <Text style={{ marginBottom: 8, color: 'dimgray' }}>{props.post.type === 1 ? 'Offer' : 'Request'}</Text>
                <Image
                  source={{ uri: props.post.userAvatarUrl }}
                  style={{ height: 96, width: 96 }}
                  resizeMode="contain"
                />
                <Text style={{ position: 'relative', textTransform: 'capitalize', fontSize: 16, marginTop: 8 }}>
                  {props.post.userName}
                </Text>

                <Text style={{ position: 'relative', fontSize: 14, color: 'dimgray' }}>{props.post.userYearBorn}</Text>
                {props.post.userBio && <Text style={{ position: 'relative' }}>"{props.post.userBio}"</Text>}
              </View>
              <View style={styles.separator} />
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                {props.post.imageLink && (
                  <TouchableOpacity
                    style={{
                      marginTop: 8,
                      backgroundColor: 'dimgray',
                      borderRadius: 12,
                      paddingHorizontal: 8,
                      marginHorizontal: 4,
                    }}
                    onPress={() => {
                      Linking.openURL(props.post.imageLink);
                    }}
                  >
                    <Text style={styles.buttonText}>
                      <Icon
                        name="image"
                        size={16}
                        color="#fff"
                        style={{
                          marginLeft: 8,
                        }}
                      />{' '}
                      Image
                    </Text>
                  </TouchableOpacity>
                )}

                {props.post.link && (
                  <TouchableOpacity
                    style={{
                      marginTop: 8,
                      backgroundColor: 'dimgray',
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      marginHorizontal: 4,
                    }}
                    onPress={() => {
                      Linking.openURL(props.post.link);
                    }}
                  >
                    <Text style={styles.buttonText}>
                      <Icon
                        name="link"
                        size={12}
                        color="#fff"
                        style={{
                          marginLeft: 8,
                        }}
                      />{' '}
                      Link
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={{ width: '60%', marginTop: 8 }}>
                <Text style={{ fontSize: 16, color: 'dimgray' }}>Details</Text>
                <Text style={{ fontSize: 14 }}>{props.post.details}</Text>
              </View>
              <View style={styles.separator} />

              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: '#CF6F5A',
                    borderRadius: 8,
                    paddingHorizontal: 24,
                    paddingVertical: 8,
                    marginHorizontal: 4,
                  }}
                  onPress={() => {
                    Linking.openURL('mailto:' + props.post.userEmail);
                  }}
                >
                  <Text style={{ ...styles.buttonText, fontSize: 16 }}>
                    {props.post.userEmail}{' '}
                    <Icon
                      name="envelope"
                      size={16}
                      color="#fff"
                      style={{
                        marginLeft: 8,
                      }}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  } catch (e) {
    console.log(e);
  }
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    'flex-direction': 'column',
    backgroundColor: 'rgba(0,0,0,0.1)',
    transform: [{ translateY: 0 }],
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '65%',
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderRadius: 20,
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
