import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')


export default StyleSheet.create({
  overlayLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 5,
    borderRadius: 10,
    width: width/2.25
  },
  overlayLabelText: {
    fontSize: 25,
    fontFamily: 'Avenir',
    textAlign: 'center',
  },
})
