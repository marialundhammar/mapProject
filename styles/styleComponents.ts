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
    backgroundColor: '#1B274A',
    padding: 20,
    paddingBottom: 100,
  },

  progressItem: {
    borderColor: '#E68383',
    borderWidth: 1,
    height: 16,
    width: 110,
    borderRadius: 20,
    marginRight: 12,
  },

  progressItemFilled: {
    borderColor: '#E68383',
    backgroundColor: '#E68383',
    borderWidth: 1,
    height: 16,
    width: 110,
    borderRadius: 20,
    marginRight: 12,
  },

  progressBar: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },

  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B274A',
    height: 90,
    padding: 16,
    paddingTop: 46,
  },
  leftComponent: {
    flexDirection: 'column',
    marginLeft: 'auto',
  },

  bottomNavigation: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 120,
    paddingBottom: 40,
  },

  cardStyle: {
    borderWidth: 1,
    height: 100,
    width: 330,
    borderColor: '#E68383',
    borderRadius: 10,
    marginTop: 8,
    zIndex: -10,
  },

  cardStyleIsFilled: {
    borderWidth: 1,
    height: 120,
    width: 330,
    backgroundColor: '#E68383',
    borderRadius: 10,
    marginTop: 8,
    zIndex: -10,
  },
});

export default styleModals;
