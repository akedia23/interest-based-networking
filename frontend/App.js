import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Main from "./src/screens/Main";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import firebase from "./src/firebase/firebase";
import SignOut from "./src/screens/SignOut";
import Profile from "./src/screens/Profile";
import { UserContext } from "./src/constants/contexts";
import { MMKV } from "./src/constants/asyncStorage";
import { StackRouter } from "react-navigation";

const Stack = createStackNavigator();
const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tether" component={Main} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const getAsyncSwipes = (choice) => {
  let choiceArray = MMKV.getArray(choice);
  if (!choiceArray) {
    choiceArray = [];
  }
  return choiceArray;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const [userId, setUserId] = useState("");
  const [matches, setMatches] = useState([]);

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
    return (
      <NavigationContainer>
        <LoginNavigator />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ userId, swiped, notSwiped, matches, setMatches }}>
        <MyTabs />
      </UserContext.Provider>
    </NavigationContainer>
  );
};

export default App;
