import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Button,
  TextInput,
} from "react-native";
import React from "react";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import TimeDropdown from "./dropdowns/TimeDropdown";
import DayDropdown from "./dropdowns/DayDropdown";
import GasDropdown from "./dropdowns/GasDropdown";
import PaymentDropdown from "./dropdowns/PaymentDropdown";
import tw from "tailwind-react-native-classnames";

export default function GasService({ navigation }) {
  return (
    <ImageBackground
      source={require("../images/pumpfivebackground.jpeg")}
      style={styles.image}
    >
      <SafeAreaView style={styles.container}>
        <View style={buttonstyles.backbutton}>
          <Button
            title="Back"
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>

        <Text style={styles.text}>Checkout</Text>

        <View style={styles.container}>
          <View style={styles.tireservice}>
            <Text style={styles.boxfontshead}>Tire Service</Text>
            {/* <Text style={styles.subheadings}>Schedule</Text> */}
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <View>
                <Text style={styles.boxfontsbody}>Number of Tires</Text>
                <TextInput
                  style={styles.input}
                  placeholder="# of Tires"
                  keyboardType="default"
                />
              </View>
              <View>
                <View>
                  <Text style={styles.boxfontsbody}>Tire Size</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Tire Size"
                    keyboardType="default"
                  />
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <View>
                <Text style={styles.boxfontsbody}>Schedule Time</Text>
                <TimeDropdown></TimeDropdown>
              </View>
              <View>
                <Text style={styles.boxfontsbody}>Schedule Day</Text>
                <DayDropdown></DayDropdown>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.personalinfo}>
          <View style={styles.container}>
            <Text style={styles.boxfontshead}>Personal Info</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              keyboardType="default"
            />

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              keyboardType="default"
            />

            <TextInput
              style={styles.input}
              placeholder="Address"
              keyboardType="default"
            />
          </View>
        </View>

        {/* <View style={styles.paymentinfo}>
          <Text style={styles.boxfontshead}>Payment Information</Text>
          <PaymentDropdown />
        </View> */}

        <View style={styles.promobutton}>
          <TextInput
            style={styles.promoinput}
            placeholder="Promo Code"
            keyboardType="default"
          />

          <View style={buttonstyles.button}>
            <Button
              title="Order"
              color="white"
              onPress={() => navigation.navigate("OrderSummary")}
            ></Button>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const UselessTextInput = () => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);

  return (
    <View>
      {/* <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        /> */}
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Amount of Gas (per gallon)"
        keyboardType="numeric"
      />
    </View>
  );
};

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
    width: "15%",
    height: 40,
    top: 65,
    right: 15,
    backgroundColor: "#DAAC3F",
    position: "absolute",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  text: {
    color: "white",
    fontSize: 48,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    top: 60,
  },

  services: {
    flexDirection: "column",
    justifyContent: "space-around",
  },

  tireservice: {
    position: "absolute",
    width: 350,
    height: 200,
    left: 21,
    top: -270,
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
  },

  personalinfo: {
    position: "absolute",
    width: 350,
    height: 190,
    left: 21,
    top: -50,
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
  },

  paymentinfo: {
    position: "absolute",
    width: 350,
    height: 100,
    left: 21,
    top: 160,
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
    textAlign: "center",
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

  subheadings: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 30,
    textAlign: "left",
    top: 5,
    left: 10,
  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 5,
    backgroundColor: "white",
  },
  promoinput: {
    height: 40,
    width: "50%",
    margin: 5,
    borderWidth: 1,
    padding: 5,
    backgroundColor: "white",
  },
  promobutton: {
    // position: 'absolute',
    left: 21,
    top: 280,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
