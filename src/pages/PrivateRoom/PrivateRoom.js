import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import styles from './PrivateRoom.styles';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import parseContentData from '../../utils/parseContentData';

const PrivateRoom = ({route}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setMessage('');
    setLoading(false);
  };

  const hanleNewMessage = async () => {
    setLoading(true);
    await database()
      .ref(`rooms/${route.params.room.id}/messages/`)
      .push({
        room: route.params.room.name,
        roomId: route.params.room.id,
        message: message,
        userId: auth().currentUser.uid,
        username: auth().currentUser.email.split('@')[0],
        date: new Date().toISOString(),
      });
    setLoading(false);
    setModalVisible(false);
  };

  useEffect(() => {
    database()
      .ref(`rooms/${route.params.room.id}/messages/`)
      .on('value', snapshot => {
        if (!snapshot.val()) {
          return;
        }
        setMessages(parseContentData(snapshot.val()));
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {route.params.room.name} odası kuruldu!
        </Text>
      </View>
      <View style={styles.messages}>
        <FlatList
          data={messages}
          renderItem={({item}) => (
            <Card
              username={item.username}
              message={item.message}
              time={item.date}
              keyExtractor={item => item.id}
            />
          )}
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.newMessage}
          onPress={toggleModal}
          onPressOut={toggleModal}>
          <Text style={styles.newMessageText}>+</Text>
        </TouchableOpacity>
        <Modal
          isVisible={isModalVisible}
          swipeDirection="down"
          onBackdropPress={toggleModal}>
          <View style={styles.modalContainer}>
            <TextInput
              onChangeText={setMessage}
              value={message}
              multiline={true}
              style={styles.input}
              placeholder="Mesajın.."
              placeholderTextColor="#ccc"
            />
            <View style={styles.button}>
              <Button
                text="Gönder"
                onPress={hanleNewMessage}
                loading={loading}
                theme="primary"
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default PrivateRoom;
