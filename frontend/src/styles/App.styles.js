import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'stretch',

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
    height: height,
    width: width/2,
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    // alignItems: 'space-between',

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
  },
  leftSwiper: {
    // alignSelf: "flex-start",
    // marginLeft: 10,
    flex: 1,
    // justifyContent: 'flex-start'
  },
  rightSwiper: {
    // alignSelf: "flex-end",
    // marginLeft: 10,
    flex: 1,
    // justifyContent: 'flex-end'
  },
  image: {
    width: width,
    height: "100%"
  }
})
