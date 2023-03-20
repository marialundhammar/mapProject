import { StyleSheet } from 'react-native-web';

const styleScreens = StyleSheet.create({
  defaultScreen: {
    backgroundColor: '#1B274A',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  onboardingScreen: {
    backgroundColor: '#1B274A',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },

  mapScreen: {
    backgroundColor: '#1B274A',
    width: '100%',
    height: '95%',
    flexDirection: 'column',
  },

  between: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 32,
    marginRight: 8,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B274A',
  },

  space: {
    marginBottom: 40,
  },

  bottom: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
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
  },
  halfScreenTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styleScreens;
