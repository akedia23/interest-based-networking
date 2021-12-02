import React, { useRef, useState, useContext } from "react";
import { View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { photoCards, photoCards2 } from "../constants/";
import { TouchableOpacity, Image } from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";

import { Card, OverlayLabel } from "../components";
import styles from "../styles/App.styles";
import { UserContext } from "../constants/contexts";
import { MMKV } from "../constants/asyncStorage";
import { getRandomInt } from "../utils";


const Main = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const [totalSwipes, setTotalSwipes] = useState(0);
  const [leftEnlargedImage, setLeftEnlargedImage] = useState("DEFAULT");
  const [rightEnlargedImage, setRightEnlargedImage] = useState("DEFAULT");
  const [randomSwipeCount, setRandomSwipeCount] = useState(getRandomInt(5, 10));
  // const [enlargedImage, setEnlargedImage] = useState("DEFAULT");

  const userId = useContext(UserContext).userId;
  const swiped = useContext(UserContext).swiped;
  const notSwiped = useContext(UserContext).notSwiped;

  const useSwiperL = useRef(null);
  const useSwiperR = useRef(null);

  const handleOnSwipedLeft = (X, Y) => {
    useSwiperL.current.swipeLeft();
    addSwipedAndNotSwiped(userId, photoCards2, photoCards);
  };

  const handleOnSwipedRight = (X, Y) => {
    useSwiperR.current.swipeRight();
    addSwipedAndNotSwiped(userId, photoCards, photoCards2);
  };

  const addSwipedAndNotSwiped = (userId, swipedCards, notSwipedCards) => {
    swiped.push(swipedCards[cardIndex % swipedCards.length].name);
    notSwiped.push(notSwipedCards[cardIndex % notSwipedCards.length].name);
    setTotalSwipes(totalSwipes + 1);

    sendSwipes(totalSwipes, userId, swiped, notSwiped);

    MMKV.setArray("swiped", swiped);
    MMKV.setArray("notSwiped", notSwiped);

    setCardIndex(cardIndex + 1);
  };

  const sendSwipes = (totalSwipes, userId, swipedCards, notSwipedCards) => {
    const params = {
      id: userId,
      swiped: swipedCards,
      notSwiped: notSwipedCards,
    };

    if (totalSwipes >= 5) {
      setTotalSwipes(0);
      fetch("http://192.168.1.32:5000/addSwipes", {
        method: "POST",
        // cache: "no-cache",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((response) => response.text())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
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
            cardHorizontalMargin={10}
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
            cardHorizontalMargin={10}
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
