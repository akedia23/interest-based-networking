import React, { Component } from 'react';
import { StatusBar } from "expo-status-bar";
import { signOut } from "./SignOut";

import styles from "../styles/Profile.styles";

import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

const Profile = () => {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.info}>UX Designer / Mobile developer</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Opcion 1</Text>  
              </TouchableOpacity>      
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Opcion 1</Text>  
              </TouchableOpacity>         
              <StatusBar style="auto" />
              <TouchableOpacity style={styles.buttonContainer} onPress={signOut}>
                <Text>Sign Out</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }

  export default Profile;


