import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 170,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  roomNameText: {
    fontSize: 20,
    letterSpacing: 1.2,
    color: '#FFA347',
  },
});
