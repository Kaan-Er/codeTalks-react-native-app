import React from 'react';
import {View, Text} from 'react-native';
import styles from './Room.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Room = ({name, icon}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.roomNameText}>{name}</Text>
      <Icon name={icon} size={26} style={styles.icon} />
    </View>
  );
};

export default Room;

//lock lock-open-variant
