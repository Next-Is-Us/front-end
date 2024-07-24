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
import MomRecordConditionScreen from "./screens/MomRecordConditionScreen.js";
import InfoWrite from "./screens/InfoWrite.jsx";
import NewWrite from "./screens/NewWrite.js";
import { PostProvider } from "./screens/PostContext.js";
import ViewContent from "./screens/ViewContent.js";
import MomRecordConditionAdditionScreen from "./screens/MomRecordConditionAdditionScreen.js";
import NotificationScreen from "./screens/NotificationScreen.js";
import MyPageScreen from "./screens/MyPageScreen.js";
import ChildrenHomeScreen from "./screens/ChildrenHomeScreen.js";

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <PostProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="InfoWrite">
            <Stack.Screen
              name="Start"
              component={Start}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewWrite"
              component={NewWrite}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewContent"
              component={ViewContent}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="InfoWrite"
              component={InfoWrite}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MomHome"
              component={MomHomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChildrenHome"
              component={ChildrenHomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelectCondition"
              component={MomRecordConditionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WriteCondition"
              component={MomRecordConditionAdditionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notification"
              component={NotificationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyPage"
              component={MyPageScreen}
              options={{ headerShown: false }}
            />

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
      </PostProvider>
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
