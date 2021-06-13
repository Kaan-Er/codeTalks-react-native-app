import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    color: '#717C82',
  },
  time: {
    color: '#717C82',
  },
  content: {
    marginVertical: 10,
  },
  message: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#444849',
  },
});
