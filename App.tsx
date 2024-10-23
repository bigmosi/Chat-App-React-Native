import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import PersonalInfo from './components/PersonalInfo';
import Styles from './components/Styles';
import Chat from './components/Chat';

export default function App() {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");

  const onPersonalInfoClosed = ( username: string, image: string ) => {
     setUsername(username);
     setImage(image);
  }

  let activeComponent = username != "" ? (
    <Chat username={username} image={image} />
  ) : (
    <PersonalInfo />
  )

  return (
    <SafeAreaView style={Styles.container}>
      { activeComponent }
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
