import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '../constants'
const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')
export default StyleSheet.create({
  card: {
    /* Setting the height according to the screen height, it also could be fixed value or based on percentage. In this example, this worked well on Android and iOS. */
    height: height - 300,
    width: width/2.25,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  image: {
    borderRadius: 5,
    flex: 1,
    width: '100%',
  },
  photoDescriptionContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.white,
    fontFamily: 'Avenir',
    textShadowColor: colors.black,
    textShadowRadius: 10,
  },
})