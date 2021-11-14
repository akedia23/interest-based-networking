import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";

import styles from "../styles/Login.styles";
import firebase from "../firebase/firebase";

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then((resp) => {
      console.log("Sign out successful.");
    })
    .catch((err) => {
      console.log(err);
    })
};

const SignOut = () => {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.loginBtn} onPress={signOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignOut;
