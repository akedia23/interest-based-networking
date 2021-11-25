import React, { Component } from 'react';
import { StatusBar } from "expo-status-bar";
import { signOut } from "./SignOut";
// import firestore from '@react-native-firebase/firestore';


import styles from "../styles/Profile.styles";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';

// const getUser = async() => {
//   await firestore()
//   .collection('users')
//   .doc( route.params ? route.params.userId : user.uid)
//   .get()
//   .then((documentSnapshot) => {
//     if( documentSnapshot.exists ) {
//       console.log('User Data', documentSnapshot.data());
//       setUserData(documentSnapshot.data());
//     }
//   })
// }


const Profile = () => {
    return (
      <SafeAreaView>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
          showsVerticalScrollIndicator={false}>
          <Image style={styles.userImg}
            source={require('../../assets/bts.jpg')}/>
          <Text style={styles.userName}>User Name</Text>
          <Text style={styles.aboutUser}>User Bio</Text>
          <View style={styles.userBtnWrapper}>
            <StatusBar style="auto" />
            <TouchableOpacity style={styles.userBtn} onPress={signOut}>
              <Text>Sign Out</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
      </SafeAreaView>
    );
  }

  export default Profile;


