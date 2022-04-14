import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen";
import SettingScreen from "./src/screens/SettingScreen";
import CryptoScreen from "./src/screens/CryptoScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider style={styles.AndroidSafeArea}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="ETFs"
            component={HomeScreen}
            options={{
              tabBarLabel: "ETFs",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="chart-areaspline"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Crypto List"
            component={CryptoScreen}
            options={{
              tabBarLabel: "Crypto List",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="bitcoin"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingScreen}
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cog" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
