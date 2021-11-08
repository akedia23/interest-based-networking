import React, { useRef, useState } from "react";
import { View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { photoCards, photoCards2 } from "./src/constants/";
import { TouchableOpacity, Image } from "react-native";

import { Card, OverlayLabel } from "./src/components";
import styles from "./src/styles/App.styles";
import Main from "./src/screens/Main";

const handleSwipeRight = (cardIndex) => {};

const App = () => {
  return <Main></Main>;
};

export default App;
