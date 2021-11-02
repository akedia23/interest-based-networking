import React, { useRef, useState } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Swiper from "react-native-deck-swiper";
import { photoCards, photoCards2 } from "./src/constants/";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { getDatabase, ref, set } from "firebase/database";
import firebase from "firebase";

import { Card, IconButton, OverlayLabel } from "./src/components";
import styles from "./App.styles";

const handleSwipeRight = (cardIndex) => {};

const App = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const [leftEnlargedImage, setLeftEnlargedImage] = useState("DEFAULT");
  const [rightEnlargedImage, setRightEnlargedImage] = useState("DEFAULT");
  // const [enlargedImage, setEnlargedImage] = useState("DEFAULT");

  const useSwiperL = useRef(null);
  const useSwiperR = useRef(null);

  const handleOnSwipedLeft = (X, Y) => {
    useSwiperL.current.swipeLeft();
    console.log(photoCards[cardIndex].name);
    setCardIndex(cardIndex + 1);
  };
  const handleOnSwipedRight = (X, Y) => {
    useSwiperR.current.swipeRight();
    console.log(photoCards2[cardIndex].name);
    setCardIndex(cardIndex + 1);
  };

  return (
    <View>
      {leftEnlargedImage === "TAPPED" && (
        <View style={{ position: "absolute", zIndex: 2 }}>
          <TouchableOpacity
            onPress={() => {
              setLeftEnlargedImage("DEFAULT");
              // setEnlargedImage("DEFAULT");
            }}
          >
            <Image source={photoCards[cardIndex % photoCards.length].photo} />
          </TouchableOpacity>
        </View>
      )}
      {rightEnlargedImage === "TAPPED" && (
        <View style={{ position: "absolute", zIndex: 2 }}>
          <TouchableOpacity
            onPress={() => {
              setRightEnlargedImage("DEFAULT");
              // setEnlargedImage("DEFAULT");
            }}
          >
            <Image
              resizeMode={"contain"}
              source={photoCards2[cardIndex % photoCards2.length].photo}
            />
          </TouchableOpacity>
        </View>
      )}
      {/* {enlargedImage === "DEFAULT" && ( */}
      <View
        style={[styles.swiperContainer, { position: "absolute", zIndex: 0 }]}
      >
        <View style={[styles.leftSwiper, { zIndex: 0 }]}>
          <Swiper
            ref={useSwiperL}
            animateCardOpacity
            // containerStyle={styles.container}
            cards={photoCards}
            renderCard={(card) => <Card card={card} />}
            cardIndex={cardIndex}
            backgroundColor="white"
            stackSize={2}
            infinite
            showSecondCard
            disableLeftSwipe
            disableBottomSwipe
            animateOverlayLabelsOpacity
            onTapCard={() => {
              setLeftEnlargedImage("TAPPED");
              // setEnlargedImage("TAPPED");
            }}
            onSwipedRight={handleOnSwipedRight}
            overlayLabels={{
              right: {
                title: "LIKE",
                element: <OverlayLabel label="LIKE" color="#4CCC93" />,
              },
            }}
          />
        </View>
        <View style={(styles.rightSwiper, { zIndex: 0 })}>
          <Swiper
            ref={useSwiperR}
            animateCardOpacity
            // containerStyle={styles.container}
            cards={photoCards2}
            renderCard={(card) => <Card card={card} />}
            cardIndex={cardIndex}
            backgroundColor="white"
            stackSize={2}
            infinite
            showSecondCard
            disableRightSwipe
            disableBottomSwipe
            animateOverlayLabelsOpacity
            onTapCard={() => {
              setRightEnlargedImage("TAPPED");
              // setEnlargedImage("TAPPED");
            }}
            onSwipedLeft={handleOnSwipedLeft}
            overlayLabels={{
              right: {
                title: "LIKE",
                element: <OverlayLabel label="NOPE" color="#E5566D" />,
                style: {
                  wrapper: styles.overlayWrapper,
                },
              },
              left: {
                title: "LIKE",
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
  );
};

export default App;
