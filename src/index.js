import Admin from "./Screens/Admin";
import Employee from "./Screens/Employee";
import Login from "./Screens/Login";
import Manager from "./Screens/Manager";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import { useEffect } from "react";
const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(
        "Firebase Cloud Messaging Foreground Handler Data: ",
        remoteMessage
      );
      const data = remoteMessage.data;
      PushNotification.localNotification({
        ...data,
      });
    });
    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Manager" component={Manager} />
        <Stack.Screen name="Employee" component={Employee} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
