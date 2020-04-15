import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { GoogleSignin } from "react-native-google-signin";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
function configureGoogleSignin() {
  GoogleSignin.configure({
    webClientId:
      "753498206014-9tg1h7ogubpmus38047i58kdufasitjc.apps.googleusercontent.com",
  });
}
// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  const data = remoteMessage.data;
  console.log("FCM background handler ... " + data);
  PushNotification.localNotification({
    ...data,
  });
});
configureGoogleSignin();
AppRegistry.registerComponent(appName, () => App);
