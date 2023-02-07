import { StyleSheet } from 'react-native-web';

const styleModals = StyleSheet.create({
  image: {
    width: 320,
    height: 280,
    borderRadius: 8,
  },

  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingBottom: 24,
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styleModals;
