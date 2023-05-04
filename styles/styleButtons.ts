import { StyleSheet, TouchableHighlight } from 'react-native-web';

const styleButtons = StyleSheet.create({
  //Buttons
  buttonDefault: {
    height: 50,
    width: 224,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 8,
    paddingTop: 12,
  },

  buttonBorder: {
    borderWidth: 1,
    borderColor: 'white',
  },

  buttonDefaultBorder: {
    height: 50,
    width: 224,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 8,
    paddingTop: 12,
    borderColor: '#FFD3D3',
    borderWidth: 1,
    backgroundColor: '#000826',
  },

  buttonDefaultSmallPink: {
    height: 34,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: '#E68383',
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

  buttonBlue: {
    height: 50,
    width: 224,
    backgroundColor: '#1B274A',
  },

  //ButtonText
  buttonDefaultText: {
    fontWeight: 'bold',
    fontFamily: 'Passion-One',
    fontSize: 20,
    color: '#FFD3D3',
  },

  buttonDrink: {
    borderColor: '#445385',
    borderWidth: 1,
    height: 100,
    width: 100,
    margin: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDrinkText: {
    margin: 6,
    fontSize: 12,
    color: '#FFD3D3',
    textAlign: 'center',
  },

  buttonClicked: {
    borderWidth: 4,
    borderColor: '#445385',
    height: 100,
    width: 100,
    margin: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonBackText: {
    fontSize: 18,
    color: '#FFD3D3',
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
