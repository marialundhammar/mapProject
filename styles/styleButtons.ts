import { StyleSheet, TouchableHighlight } from 'react-native-web';

const styleButtons = StyleSheet.create({
  //Buttons
  buttonDefault: {
    height: 50,
    width: 224,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 8,
    paddingTop: 12,
  },

  buttonDefaultBorder: {
    height: 50,
    width: 224,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 8,
    paddingTop: 12,

    borderColor: '#FFD3D3',
    borderWidth: 1,
  },
  buttonDisable: {
    height: 50,
    width: 224,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 8,
    paddingTop: 12,
    marginTop: 24,
    opacity: 0.4,
  },

  //ButtonText
  buttonDefaultText: {
    fontWeight: 'bold',
    fontFamily: 'Passion-One',
    fontSize: 20,
    color: '#FFD3D3',
  },

  closeIcon: {},

  buttonDrink: {
    borderColor: '#445385',
    borderWidth: 1,
    height: 100,
    width: 100,
    margin: 8,
    borderRadius: 20,
  },

  buttonDrinkText: {
    fontSize: 12,
    color: '#FFD3D3',
    textAlign: 'center',
  },

  buttonClicked: {
    backgroundColor: '#E68383',
    height: 100,
    width: 100,
    margin: 8,
    borderRadius: 20,
  },

  icon: {
    fontSize: 46,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 10,
  },
});

export default styleButtons;
