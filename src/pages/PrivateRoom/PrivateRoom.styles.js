import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB74D',
  },
  header: {
    borderWidth: 1,
    borderColor: '#FFDFAF',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 1.2,
    padding: 10,
  },
  button: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
  },
  item: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  newMessage: {
    padding: 10,
    margin: 20,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#FFA347',
    borderRadius: 80,
    width: 60,
    alignItems: 'center',
    backgroundColor: '#FFA040',
  },
  newMessageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  newMessage: {
    padding: 10,
    margin: 20,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#FFA347',
    borderRadius: 80,
    width: 60,
    alignItems: 'center',
    backgroundColor: '#FFA347',
  },
  newMessageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: '50%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
    width: '100%',
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
    fontSize: 18,
  },
});
