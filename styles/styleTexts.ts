import { StyleSheet } from 'react-native-web';

const styleTexts = StyleSheet.create({
  //h2

  h2: {
    fontSize: 30,
  },
  h3: {
    fontWeight: 'bold',
    fontFamily: 'Passion-One',
    fontSize: 24,
    color: '#FFD3D3',
    marginBottom: 20,
    marginLeft: 12,
  },

  bodyText: {
    fontSize: 16,
    paddingVertical: 24,
    color: '#FFD3D3',
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#FFD3D3',
    padding: 10,
    marginTop: 20,
    fontSize: 16,
    width: 224,
    borderRadius: 8,
    height: 40,
    /*  fontFamily: 'Assistant-Regular', */
    color: '#FFD3D3',
  },

  icons: {
    color: '#FFD3D3',
    fontSize: 35,
  },
});

export default styleTexts;
