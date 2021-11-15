import React, { useRef, useState, useContext } from "react";
import { View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { photoCards, photoCards2 } from "../constants/";
import { TouchableOpacity, Image } from "react-native";

import { Card, OverlayLabel } from "../components";
import styles from "../styles/App.styles";
import { UserContext } from "../contexts";

const Main = () => {
    const [cardIndex, setCardIndex] = useState(0);
    const [leftEnlargedImage, setLeftEnlargedImage] = useState("DEFAULT");
    const [rightEnlargedImage, setRightEnlargedImage] = useState("DEFAULT");
    // const [enlargedImage, setEnlargedImage] = useState("DEFAULT");
    
    const userId = useContext(UserContext).userId;
    const swipes = useContext(UserContext).swipes;
    console.log(swipes);
  
    const useSwiperL = useRef(null);
    const useSwiperR = useRef(null);
  
    const handleOnSwipedLeft = (X, Y) => {
      useSwiperL.current.swipeLeft();
      console.log(photoCards2[cardIndex % photoCards2.length].name);
      swipes.push(photoCards2[cardIndex % photoCards2.length].name);
      setCardIndex(cardIndex + 1);
    };
    const handleOnSwipedRight = (X, Y) => {
      useSwiperR.current.swipeRight();
      console.log(photoCards[cardIndex % photoCards.length].name);
      swipes.push(photoCards[cardIndex % photoCards.length].name);
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
              disableTopSwipe
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
              disableTopSwipe
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
      </View>
    );
  };
  
  export default Main;
  