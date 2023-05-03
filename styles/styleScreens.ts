import { StyleSheet } from 'react-native-web';

const styleScreens = StyleSheet.create({
  defaultScreen: {
    backgroundColor: '#000826',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  onboardingScreen: {
    backgroundColor: '#000826',
    width: '100%',
    height: '100%',
    padding: 8,
    flexDirection: 'column',
  },

  mapScreen: {
    backgroundColor: '#000826',
    width: '100%',
    height: '95%',
    flexDirection: 'column',
  },

  between: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    marginRight: 8,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000826',
  },

  space: {
    marginBottom: 40,
  },

  bottom: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  container: {
    backgroundColor: '#1B274A',
    flex: 1,
    flexDirection: 'column',
  },
  halfScreenBottom: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: '#E68383',
  },
  halfScreenTop: {
    position: 'absolute',
    top: '20%',
    right: '20%',
  },
});

export default styleScreens;
