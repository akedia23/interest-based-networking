import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Main from "./src/screens/Main";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import firebase from "./src/firebase/firebase";
import SignOut from "./src/screens/SignOut";
import { UserContext } from "./src/constants/contexts";
import { MMKV } from "./src/constants/asyncStorage";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="LandingPage"
        component={Main}
        // initialParams={{ userId: props.userId }}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

const getAsyncSwipes = (choice) => {
  let choiceArray = MMKV.getArray(choice);
  if (!choiceArray) {
    choiceArray = []
  }
  return choiceArray;
} 

const App = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const [userId, setUserId] = useState("");

  const swiped = getAsyncSwipes("swiped");
  const notSwiped = getAsyncSwipes("notSwiped");

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        setUserId(user.uid);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });
  }, [loading]);

  if (loading) {
    return (
      <View>
        <Text>Loading Tether...</Text>
      </View>
    );
  }

  if (!authenticated) {
    return <Login />;
  }

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ userId, swiped, notSwiped }}>
        <MyTabs />
      </UserContext.Provider>
    </NavigationContainer>
  );
};

export default App;
