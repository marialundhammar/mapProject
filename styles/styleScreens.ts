import { StyleSheet } from 'react-native-web';

const styleScreens = StyleSheet.create({
  defaultScreen: {
    backgroundColor: '#1B274A',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  onboardingScreen: {
    backgroundColor: '#1B274A',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    padding: 16,
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
    marginTop: 40,
    marginBottom: 20,
  },
});

export default styleScreens;
