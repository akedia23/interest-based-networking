import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#859a9b',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  swiperContainer: {
    height: height - height,
    width: width/2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',

  },
  buttonsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '18%',
  },
  copyright: {
    textAlign: 'center',
    fontSize: 10,
    color: 'black',
    paddingBottom: 20,
    fontFamily: 'Avenir',
  },
  overlayWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: -30,
  },
  leftSwiper: {
    justifyContent: "flex-start"
  },
  rightSwiper: {
    justifyContent: "flex-end"
  },
  image: {
    width: width,
    height: "100%"
  }
})
