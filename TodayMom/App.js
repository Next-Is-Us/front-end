import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Nickname from "./screens/Nickname";
import Start from "./screens/Start.jsx";
import { Button, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import Invite from "./screens/Invite.jsx";
import Status from "./screens/Status.jsx";
import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import MomHomeScreen from "./screens/MomHomeScreen.js";

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen
            name="Start"
            component={Start}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="Status"
            component={Status}
            options={({ navigation }) => ({
              headerShown: true,
              headerBackground: () => (
                <Image
                  source={require("./assets/images/StatusBack.png")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              ),
              headerTitle: "",
              headerLeft: () => (
                <View style={styles.leftHeaderContainer}>
                  <TouchableOpacity
                    onPress={() => console.log("Home Icon tapped")}
                  >
                    <Image
                      source={require("./assets/images/tmicon.png")}
                      style={(resizeMode = "contain")}
                    />
                  </TouchableOpacity>
                  <Image
                    source={require("./assets/images/todaymom.png")}
                    style={styles.icon2}
                  />
                </View>
              ),
              headerRight: () => (
                <View style={styles.rightHeaderContainer}>
                  <TouchableOpacity
                    onPress={() => console.log("Profile Icon tapped")}
                  >
                    <Image
                      source={require("./assets/images/profile.png")}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => console.log("Notification Icon tapped")}
                  >
                    <Image
                      source={require("./assets/images/noti.png")}
                      style={[styles.icon, { marginLeft: 16 }]}
                    />
                  </TouchableOpacity>
                </View>
              ),
              headerStyle: {
                height: 100,
              },
            })}
          /> */}

          <Stack.Screen name="MomHome" component={MomHomeScreen} options={{ headerShown: false }}/>

          <Stack.Screen
            name="Nickname"
            component={Nickname}
            options={({ navigation }) => ({
              headerTitle: "",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={require("./assets/images/leftallow.png")}
                    style={{ width: 25, height: 25 }}
                  />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
              },
            })}
          />
          <Stack.Screen
            name="Invite"
            component={Invite}
            options={({ navigation }) => ({
              headerTitle: "",
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={require("./assets/images/leftallow.png")}
                    style={{ width: 25, height: 25 }}
                  />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  leftHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    paddingBottom: 14,
    paddingTop: 14,
  },
  rightHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    paddingBottom: 14,
    paddingTop: 14,
  },
  icon: {},
  icon2: {
    marginLeft: 8,
    resizeMode: "contain",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 8,
  },
});

export default App;
