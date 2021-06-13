import React from 'react';
import {TouchableOpacity, View, Text, ActivityIndicator} from 'react-native';
import styles from './Button.styles';

const Button = ({text, onPress, loading = false, theme}) => {
  return (
    <TouchableOpacity
      style={styles[theme].container}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles[theme].button_container}>
          <Text style={styles[theme].title}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
