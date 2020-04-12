import { View, StyleSheet, Text, Image } from "react-native";
import React from "react";
import Button from "../../../Components/Button";
import LogoutButton from "../../../Components/LogoutButton";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={s.container}>
        <Image
          source={require("../../../Assets/profileImage.png")}
          style={s.profileImage}
        />
        <View style={s.infoContainer}>
          <View style={s.infoBody}>
            <Text style={s.infoTitle}>Username</Text>
            <Text style={s.infoValue}>martino</Text>
          </View>
        </View>
        <View style={s.infoContainer}>
          <View style={s.infoBody}>
            <Text style={s.infoTitle}>Full Name</Text>
            <Text style={s.infoValue}>Selena Martin</Text>
          </View>
        </View>
        <View style={s.infoContainer}>
          <View style={s.infoBody}>
            <Text style={s.infoTitle}>Gender</Text>
            <Text style={s.infoValue}>Female</Text>
          </View>
        </View>
        <View style={s.infoContainer}>
          <View style={s.infoBody}>
            <Text style={s.infoTitle}>Phone No.</Text>
            <Text style={s.infoValue}>+84 903884454</Text>
          </View>
        </View>
        <View style={s.infoContainer}>
          <View style={s.infoBody}>
            <Text style={s.infoTitle}>Date Of Birth</Text>
            <Text style={s.infoValue}>09/01/1998</Text>
          </View>
        </View>
        <View style={s.infoContainer}>
          <View style={s.infoBody}>
            <Text style={s.infoTitle}>Language</Text>
            <Text style={s.infoValue}>English</Text>
          </View>
        </View>
        <View style={s.btnLogOut}>
        <TouchableOpacity style={s.btnLogOut} onPress= {() => navigation.popToTop()}><Text style={s.txtLogOut}>Log Out</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    marginLeft: "15%",
    marginRight: "15%",
    alignItems: "center",
    // backgroundColor: "#254c70",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 40
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    shadowColor: "#f4fafc",
    shadowOffset: { width: 20, height: 30 },
    shadowOpacity: 1,
    borderRadius: 15,
    marginTop: 20,
    padding: 10,
    height: 45,
  },
  infoBody: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoTitle: {
    color: '#d5d5d5'
  },
  infoValue: {
    fontWeight: "bold",
  },
  btnLogOut: {
    marginTop: 20,
    backgroundColor: '#70d0d4',
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  txtLogOut:{
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 17,
  }
});
