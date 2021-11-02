import React, { useRef, useState } from 'react'
import { View, Text } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { photoCards, photoCards2 } from './src/constants/'
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getDatabase, ref, set } from "firebase/database";
import firebase from 'firebase';

import { Card, IconButton, OverlayLabel } from './src/components'
import styles from './App.styles'

const App = () => {
  
  const [cardIndex, setCardIndex] = useState(0);

  const useSwiperL = useRef(null)
  const useSwiperR = useRef(null)


  const handleOnSwipedLeft = () => {
    useSwiperL.current.swipeLeft()
      }
  
  const handleOnSwipedRight = () => {
    useSwiperR.current.swipeRight()
  }

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
          <View style={styles.leftSwiper}>
            <Swiper
              ref={useSwiperL}
              animateCardOpacity
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
              onSwipedRight={() => {
                useSwiperR.current.swipeRight()
                console.log(photoCards[cardIndex].name)
                setCardIndex(cardIndex+1)
              }}
              overlayLabels={{
                right: {
                  title: 'LIKE',
                  element: <OverlayLabel label="LIKE" color="#4CCC93" />,
                },
              }}
            />
          </View>
        <View style={styles.rightSwiper}>
          <Swiper
            ref={useSwiperR}
            animateCardOpacity
            cards={photoCards2}
            renderCard={card => <Card card={card} />}
            cardIndex={0}
            backgroundColor="white"
            stackSize={2}
            infinite
            showSecondCard
            disableRightSwipe
            disableBottomSwipe
            animateOverlayLabelsOpacity
            onSwipedLeft={() => {
              useSwiperL.current.swipeLeft()
              console.log(photoCards2[cardIndex].name)
              setCardIndex(cardIndex+1)
            }}
            overlayLabels={{
              right: {
                title: 'LIKE',
                element: <OverlayLabel label="NOPE" color="#E5566D" />,
                style: {
                  wrapper: styles.overlayWrapper,
                },
              },
              left: {
                title: 'LIKE',
                element: <OverlayLabel label="LIKE" color="#4CCC93" />,
              },
            }}
          />
      </View>
    </View>
      {/* <View style={styles.buttonsContainer}>
        <IconButton
          name="heart"
          onPress={handleOnSwipedRight}
          color="white"
          backgroundColor="#E5566D"
        />
        <IconButton
          name="heart"
          onPress={handleOnSwipedLeft}
          color="white"
          backgroundColor="#E5566D"
        />
        
      </View> */}
      {/* <View style={styles.copyright}>
        <Text style={styles.copyright}>
            All pictures were taken freely from Unsplash.com.
            Names on the Photos are the names of photographers who took pictures.
        </Text>
      </View> */}
    </View>
  )
}

export default App