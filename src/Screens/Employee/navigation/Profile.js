import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LogoutButton from "../../../Components/LogoutButton";
import DrawerButton from "../../../Components/DrawerButton";
import Profile from "../Profile";

const ProfileStack = createStackNavigator();

function ProfileRoutes({ navigation }) {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTitle: "Profile",
        headerRight: () => <LogoutButton navigation={navigation} />,
        headerLeft: () => <DrawerButton navigation={navigation} />,
        headerStyle: { height: 45 },
      }}
      initialRouteName="Profile"
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
}

export default ProfileRoutes;
