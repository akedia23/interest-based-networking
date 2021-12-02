import React, { Component, useContext, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { signOut } from "./SignOut";
import firebase, { firestore } from "../firebase/firebase";
import { UserContext } from "../constants/contexts";



import styles from "../styles/Profile.styles";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';


const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { userId, matches } = useContext(UserContext);

  const MatchesList = () => {
    const matchesText = matches.map((match) =>
      <Text style={styles.matchedUsersText} key={"match-" + match}>
        {match}
      </Text>
    );
    return <View>{matchesText}</View>;
  }


  firestore.collection('users').doc(userId).get()
  .then(docSnapshot => {
    console.log("User data:", docSnapshot.data());
    setFirstName(docSnapshot.data()["firstName"]);
    setLastName(docSnapshot.data()["lastName"]);
  });
  
    return (
      <SafeAreaView>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
          showsVerticalScrollIndicator={false}>
          <Image style={styles.userImg}
            source={require('../../assets/bts.jpg')}/>
          <Text style={styles.userName}>{firstName != null ? firstName || 'Test' : 'Test'} {lastName != null ? lastName || 'User' : 'User'}</Text>
          <View style={styles.userBtnWrapper}>
            <StatusBar style="auto" />
            <TouchableOpacity style={styles.userBtn} onPress={signOut}>
              <Text>Sign Out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.matchesContainer}>
            <Text style={styles.matchesText}>Matches</Text>
          </View>
          <MatchesList/>
          {/* <Text style={styles.matchedUsersText}>{matches[0]}</Text> */}
      </ScrollView>
      </SafeAreaView>
    );
  }

  export default Profile;


