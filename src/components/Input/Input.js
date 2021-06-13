import React from 'react';
import {View, TextInput} from 'react-native';
import styles from './Input.styles';

const Input = ({placeholder, value, secureTextEntry = false, onChangeText}) => {
  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        placeholderTextColor="#fff"
      />
    </View>
  );
};

export default Input;
