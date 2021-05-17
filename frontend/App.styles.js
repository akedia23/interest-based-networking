import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // flexDirection: 'row',
  },
  swiperContainer: {
    height: height - height/3,
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
})
