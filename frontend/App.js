import React, { useRef, useState } from "react";
import { View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { photoCards, photoCards2 } from "./src/constants/";
import { TouchableOpacity, Image } from "react-native";

import { Card, OverlayLabel } from "./src/components";
import styles from "./src/styles/App.styles";
import Main from "./src/screens/Main";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LandingPage" component={Main} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
