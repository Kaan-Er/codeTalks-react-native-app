import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  newRoom: {
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
  newRoomText: {
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
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
  },
});
