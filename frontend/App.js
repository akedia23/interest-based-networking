import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import Main from "./src/screens/Main";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import firebase from "./src/firebase/firebase";
import SignOut from "./src/screens/SignOut";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        console.log(user.uid);
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

  return <SignOut />;
};

export default App;
