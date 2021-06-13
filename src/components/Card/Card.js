import React from 'react';
import {View, Text} from 'react-native';
import styles from './Card.styles';
import {formatDistance} from 'date-fns';
import {tr} from 'date-fns/locale';
import {parseISO} from 'date-fns/esm';

const Card = ({username, time, message}) => {
  const formatDate = formatDistance(parseISO(time), new Date(), {
    addSuffix: true,
    locale: tr,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.time}>{formatDate}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

export default Card;
