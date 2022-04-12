import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Switch } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

const { manifest } = Constants;
//const uri = `http://${manifest.debuggerHost.split(":").shift()}:3001`;

export default function SettingScreen() {
  const [whiteTheme, setWhiteTheme] = useState(false);
  const toggleSwitch = () => setWhiteTheme((previousState) => !previousState);

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.paddingSidesTop}>
        <Text>
          Theme settings are supposed to go here. Unfortunately, all my attempts
          at using theming solutions (styled, React Navigation, Redux) have
          failed.
        </Text>

        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={whiteTheme ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={whiteTheme}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  paddingSidesTop: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
  },
});