import React from "react";
import { View, Text, Button, Image, TextInput } from "react-native";

const PersonalInfo = () => {
    return (
       <View>
        <Image source={require("../assets/wired-brain-coffee-logo.png")} />
          <View>
            <Text>Please enter your name</Text>
            <TextInput />
          </View>
          <Button title="Start Chatting!" />
       </View>
    );
}

export default PersonalInfo;
