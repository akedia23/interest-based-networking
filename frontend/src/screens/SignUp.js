import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";

import styles from "../styles/Login.styles";
import firebase from "../firebase/firebase";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = () => {
    if (password !== confirmPassword) {
      Alert.alert("Password do not match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log("Account creation successful!");
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="First Name."
          placeholderTextColor="#003f5c"
          onChangeText={(firstName) => setEmail(firstName)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Last Name."
          placeholderTextColor="#003f5c"
          onChangeText={(lastName) => setEmail(lastName)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={signUp}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
