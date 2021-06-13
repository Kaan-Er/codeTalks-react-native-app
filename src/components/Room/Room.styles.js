import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffca99',
    width: Dimensions.get('window').width / 2.2,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  roomNameText: {
    fontSize: 20,
    letterSpacing: 1.2,
    color: '#FFA347',
  },
  icon: {
    color: '#FFA347',
  },
});
