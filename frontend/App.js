import React, { useRef } from 'react'
import { View, Text } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { photoCards } from './src/constants'
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Card, IconButton, OverlayLabel } from './src/components'
import styles from './App.styles'

const App = () => {
  const useSwiper = useRef(null).current

  const handleOnSwipedLeft = () => useSwiper.swipeLeft()
  const handleOnSwipedRight = () => useSwiper.swipeRight()

  return (
    <View
      style={styles.container}
    >
      <View style={styles.swiperContainer}>
        
        <Swiper
          ref={useSwiper}
          animateCardOpacity
          // containerStyle={styles.swiperContainer}
          cards={photoCards}
          renderCard={card => <Card card={card} />}
          cardIndex={0}
          backgroundColor="white"
          stackSize={2}
          infinite
          showSecondCard
          disableLeftSwipe
          disableBottomSwipe
          animateOverlayLabelsOpacity
          overlayLabels={{
            right: {
              title: 'LIKE',
              element: <OverlayLabel label="LIKE" color="#4CCC93" />,
              style: {
                wrapper: {
                  ...styles.overlayWrapper,
                  alignItems: 'flex-start',
                  marginLeft: 30,
                },
              },
            },
          }}
        />
        
      {/* </View> */}
      {/* <View style={styles.swiperContainer}> */}

       
        <Swiper
          ref={useSwiper}
          animateCardOpacity
          containerStyle={styles.swiperContainer}
          cards={photoCards}
          renderCard={card => <Card card={card} />}
          cardIndex={0}
          backgroundColor="white"
          stackSize={2}
          showSecondCard
          disableRightSwipe
          disableTopSwipe
          disableBottomSwipe
          animateOverlayLabelsOpacity
          overlayLabels={{
            left: {
              title: 'NOPE',
              element: <OverlayLabel label="NOPE" color="#E5566D" />,
              style: {
                wrapper: styles.overlayWrapper,
              },
            },
            right: {
              title: 'LIKE',
              element: <OverlayLabel label="LIKE" color="#4CCC93" />,
              style: {
                wrapper: {
                  ...styles.overlayWrapper,
                  alignItems: 'flex-start',
                  marginLeft: 30,
                },
              },
            },
          }}
          
        />
        
        
      </View>

      
      <View style={styles.buttonsContainer}>
        <IconButton
          name="heart"
          onPress={handleOnSwipedLeft}
          color="white"
          backgroundColor="#E5566D"
        />
        <IconButton
          name="heart"
          onPress={handleOnSwipedRight}
          color="white"
          backgroundColor="#E5566D"
        />
        
      </View>
      <View style={styles.swipeTextContainer}>
        <Text
          style={styles.copyright}
        >
            All pictures were taken freely from Unsplash.com.
            Names on the Photos are the names of photographers who took pictures.
        </Text>
      </View>
    </View>
  )
}

export default App