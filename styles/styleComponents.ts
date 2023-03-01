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

  progressItem: {
    borderColor: '#E68383',
    borderWidth: 1,
    height: 16,
    width: 100,
    borderRadius: 20,
    margin: 8,
  },

  progressItemFilled: {
    borderColor: '#E68383',
    backgroundColor: '#E68383',
    borderWidth: 1,
    height: 16,
    width: 100,
    borderRadius: 20,
    margin: 8,
  },

  progressBar: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default styleModals;
