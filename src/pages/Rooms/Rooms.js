import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, TextInput} from 'react-native';
import Room from '../../components/Room';
import styles from './Rooms.styles';
import Button from '../../components/Button';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import parseContentData from '../../utils/parseContentData';

const Rooms = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setRoomName('');
    setLoading(false);
  };

  const handleNewRoom = async () => {
    if (!!roomName) {
      setLoading(true);
      await database()
        .ref('rooms/')
        .push({
          name: roomName,
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
    navigation.navigate('PrivateRoom', {room});
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
          <TouchableOpacity onPress={() => enterRoom(item)}>
            <Room name={item.name} keyExtractor={item => item.id} />
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
        isVisible={isModalVisible}
        swipeDirection="down"
        onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <TextInput
            onChangeText={setRoomName}
            value={roomName}
            multiline={true}
            style={styles.input}
            placeholder="Oda adı.."
            placeholderTextColor="#ccc"
          />
          <View style={styles.button}>
            <Button
              text="Ekle"
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
