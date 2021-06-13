import React from 'react';
import {View, Text} from 'react-native';
import styles from './Room.styles';

const Room = ({name}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.roomNameText}>{name}</Text>
    </View>
  );
};

export default Room;
