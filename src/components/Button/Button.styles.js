import {StyleSheet} from 'react-native';

const base_style = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
});

export default {
  primary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: '#FFA040',
    },
    title: {
      ...base_style.title,
      color: '#fff',
    },
  }),
  secondary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
    },
    title: {
      ...base_style.title,
      color: '#FF6F00',
    },
  }),
};
