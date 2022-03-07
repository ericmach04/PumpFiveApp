import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Button,
  TextInput,
  UselessTextInput,
  Image,
} from "react-native";
import React from "react";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
// import TimeDropdown from "../dropdowns/TimeDropdown";
// import DayDropdown from "../dropdowns/DayDropdown";
// import GasDropdown from "../dropdowns/GasDropdown";
// import PaymentDropdown from '../dropdowns/PaymentDropdown';

export default function Payment({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../images/pumpfivebackground.jpeg")}
        style={styles.image}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.Memberships}>
              <View
                style={{
                  top: -0,
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Text style={styles.text}>Payment Management</Text>
                <View style={buttonstyles.backbutton}>
                  <Button
                    title="Back"
                    color="white"
                    onPress={() => navigation.goBack()}
                  />
                </View>
              </View>
              <View style={{ top: -235, left: 20 }}>
                <Text style={styles.boxfontsbody}>a1234@gmail.com</Text>
                <Text style={styles.boxfontsbody}>Member no. 773123456789</Text>
                <Text style={styles.boxfontsbody}>414-***-****</Text>
              </View>

              <View style={{ top: -230, left: 19 }}>
                <Text style={styles.creditdebit}>Credit/Debit Card</Text>
              </View>

              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <View style={{ top: -219, left: 10 }}>
                  <Image source={require("../../icons/bofa.png")} />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                ></View>
                <View style={{ top: -215, left: -15 }}>
                  <Text style={styles.bofadeeznuts}>Bank of America</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View style={{ top: -215, left: -20 }}>
                    <Image source={require("../../icons/visa.png")} />

                    <View style={{ top: 15, left: -230 }}>
                      <Image source={require("../../icons/chase.png")} />
                      <Text style={styles.chasemoneynotchics}>Chase</Text>
                    </View>

                    <View style={{ top: -45, left: -2 }}>
                      <Image source={require("../../icons/mastercard.png")} />
                    </View>
                  </View>
                </View>
              </View>

              <View style={buttonstyles.paybutton}>
                <Button
                  title="+ Add Payment Method"
                  color="black"
                  onPress={() => navigation.navigate("AcctSettings")}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

// function GasScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       {/* <Text>Home Screen</Text> */}
//       <Button
//         title="BookNow"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

const buttonstyles = StyleSheet.create({
  button: {
    width: "30%",
    height: 40,
    bottom: 5,
    left: 230,
    // top: 270,
    borderWidth: 1,
    backgroundColor: "#DAAC3F",
    position: "absolute",
  },
  backbutton: {
    width: "18%",
    height: 40,
    // top: 65,
    right: 0,
    backgroundColor: "#DAAC3F",
    position: "absolute",
  },
  // + Add Payment Button
  paybutton: {
    width: "77%",
    height: 40,
    top: 380,
    right: 60,
    backgroundColor: "#DAAC3F",
    position: "absolute",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  UserAccount: {
    flexDirection: "column",
    justifyContent: "space-around",
  },

  Memberships: {
    position: "absolute",
    width: 350,
    height: 620,
    left: 21,
    top: 90,
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
  },

  text: {
    color: "black",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    top: 40,
  },

  //CreditDebit
  creditdebit: {
    color: "black",
    fontSize: 25,
    lineHeight: 30,
    //fontWeight: "bold",
    textAlign: "left",
    top: 5,
    left: 10,
  },

  //bofadeeznuts
  bofadeeznuts: {
    color: "black",
    fontSize: 25,
    lineHeight: 30,
    //fontWeight: "bold",
    textAlign: "left",
  },

  //chasemoneynotchics
  chasemoneynotchics: {
    color: "black",
    fontSize: 25,
    lineHeight: 30,
    top: -35,
    left: 40,
  },

  boxfontshead: {
    color: "black",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "left",
    top: 5,
    left: 5,
  },

  boxfontsbody: {
    color: "black",
    fontSize: 18,
    lineHeight: 30,
    textAlign: "left",
    top: 5,
    left: 5,
    fontFamily: "Times New Roman",
  },

  boxfontshead2: {
    color: "black",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  services: {
    flexDirection: "column",
    justifyContent: "space-around",
  },

  gasservice: {
    position: "absolute",
    width: 350,
    height: 175,
    left: 21,
    top: -275,
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
  },

  tireservice: {
    position: "absolute",
    width: 350,
    height: 175,
    left: 21,
    top: -80,
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
  },

  detailingservice: {
    position: "absolute",
    width: 350,
    height: 175,
    left: 21,
    top: 115,
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
  },

  boxfontshead: {
    color: "black",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "left",
    top: 5,
    left: 5,
  },

  boxfontsbody: {
    color: "black",
    fontSize: 18,
    lineHeight: 30,
    textAlign: "left",
    top: 5,
    left: 5,
  },
  loginview: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: 100,
    height: 40,
    top: 5,
    right: 10,
    left: 5,
    backgroundColor: "#DAAC3F",
  },
});
