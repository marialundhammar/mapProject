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
    padding: 8,
  },

  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 40,
    alignItems: 'center',
    width: '100%',
  },

  imageContainerBig: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  imageSmall: {
    width: 100,
    height: 100,
    borderRadius: 6,
    margin: 2,
  },

  timeLineEvent: {
    marginLeft: 2,
    borderRadius: 8,
    opacity: 0.9,
  },

  bottomContainerOpen: {
    paddingBottom: 20,
    justifyContent: 'center',
    width: '100%',
    padding: 8,
  },

  bottomContainer: {
    justifyContent: 'center',
    width: '100%',
    padding: 8,
    flex: 0.2,
  },

  centered: {
    alignItems: 'center',
  },

  start: {
    aligntItems: 'flex-start',
    flexDirection: 'row',
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

  barContentContainer: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 32,
    marginTop: 16,
    padding: 8,
  },

  topHeader: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: 'pink',
    alignItems: 'center',
    backgroundColor: '#000826',
    width: '100%',
    justifyContent: 'space-between',
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

  modalStyle: {
    backgroundColor: '#E68383',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 16,
    paddingVertical: 24,
  },

  distanceBanner: {
    backgroundColor: '#E68383',
    alignItems: 'center',
  },

  barNavigationBanner: {
    backgroundColor: '#E68383',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  barNavigationItem: {
    backgroundColor: '#E68383',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  cardStyle: {
    width: '100%',
    backgroundColor: '#000826',
    borderRadius: 10,
    marginTop: 8,
    zIndex: -10,
    paddingBottom: 10,
  },

  cardStyleIsFilled: {
    width: '100%',
    backgroundColor: '#000826',

    height: 110,
    borderRadius: 10,
    marginTop: 8,
    zIndex: -10,
    paddingBottom: 10,
  },

  cardStyleBar: {
    width: '100%',
    backgroundColor: '#445385',
    borderRadius: 10,
    marginTop: 8,
    zIndex: -10,
    borderWidth: 2,
    paddingBottom: 10,
  },

  height150: {
    height: 150,
  },
});

export default styleModals;
