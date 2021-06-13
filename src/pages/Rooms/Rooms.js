import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, TextInput} from 'react-native';
import Room from '../../components/Room';
import styles from './Rooms.styles';
import Button from '../../components/Button';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import parseContentData from '../../utils/parseContentData';
import {showMessage} from 'react-native-flash-message';

const Rooms = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [privateModal, setPrivateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState(null);
  const [key, setKey] = useState(null);
  const [rooms, setRooms] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setRoomName('');
    setPassword(null);
    setLoading(false);
  };

  const togglePrivateModal = () => {
    setPrivateModal(!privateModal);
    setKey(null);
    setLoading(false);
  };

  const handleNewRoom = async () => {
    if (!!roomName) {
      setLoading(true);
      await database()
        .ref('rooms/')
        .push({
          name: roomName,
          password: password,
          messages: null,
          userId: auth().currentUser.uid,
          username: auth().currentUser.email.split('@')[0],
          date: new Date().toISOString(),
        });
      setLoading(false);
      setModalVisible(false);
    }
  };

  const enterRoom = room => {
    setLoading(true);
    navigation.navigate('PrivateRoom', {room});
    setLoading(false);
  };

  const showPrivateModal = room => {
    setSelectedRoom(room);
    setPrivateModal(true);
  };

  const controlRoomPassword = () => {
    setLoading(true);
    if (selectedRoom.password === key) {
      navigation.navigate('PrivateRoom', {room: selectedRoom});
      setLoading(false);
      setPrivateModal(false);
      setKey(null);
      setSelectedRoom(null);
    } else {
      showMessage({
        message: 'Wrong password!',
        type: 'danger',
        style: {alignItems: 'center'},
      });
      setLoading(false);
      setKey(null);
      setPrivateModal(false);
      setSelectedRoom(null);
    }
  };

  useEffect(() => {
    database()
      .ref('rooms/')
      .on('value', snapshot => {
        if (!snapshot.val()) {
          return;
        }
        setRooms(parseContentData(snapshot.val()));
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        contentContainerStyle={styles.item}
        data={rooms}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              !!item.password ? showPrivateModal(item) : enterRoom(item)
            }>
            <Room
              name={item.name}
              icon={item.password ? 'lock' : 'lock-open-variant'}
              keyExtractor={item => item.id}
            />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.newRoom}
        onPress={toggleModal}
        onPressOut={toggleModal}>
        <Text style={styles.newRoomText}>+</Text>
      </TouchableOpacity>
      <Modal
        isVisible={privateModal}
        swipeDirection="down"
        onBackdropPress={togglePrivateModal}>
        <View style={styles.modalContainer}>
          <TextInput
            onChangeText={setKey}
            value={key}
            multiline={true}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#82838c"
          />
          <View style={styles.button}>
            <Button
              text="Enter"
              onPress={controlRoomPassword}
              loading={loading}
              theme="primary"
            />
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={isModalVisible}
        swipeDirection="down"
        onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <TextInput
            onChangeText={setRoomName}
            value={roomName}
            multiline={true}
            style={styles.input}
            placeholder="Room name*"
            placeholderTextColor="#82838c"
          />
          <TextInput
            onChangeText={setPassword}
            value={password}
            multiline={true}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#82838c"
          />
          <View style={styles.button}>
            <Button
              text="Save"
              onPress={handleNewRoom}
              loading={loading}
              theme="primary"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Rooms;
