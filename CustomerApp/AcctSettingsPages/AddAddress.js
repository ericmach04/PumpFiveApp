import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import firebase from "firebase";
import { auth } from "../../firebase";
import { addAddress } from "../../firebasefunctions";

export default class AddAddress extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("Addresses");
    this.state = {
      email: "",
      streetnumber: "",
      city: "",
      state: "",
      zip: "",
      isLoading: false,
    };
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  addAddress() {
    if (
      this.state.streetnumber === "" ||
      this.state.city === "" ||
      this.state.state === "" ||
      this.state.zip === ""
    ) {
      alert("Please fill out all fields");
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef
        .add({
          email: auth.currentUser?.email,
          streetnumber: this.state.streetnumber,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip,
        })
        .then((res) => {
          this.setState({
            email: "",
            streetnumber: "",
            city: "",
            state: "",
            zip: "",
            isLoading: false,
          });
          this.props.navigation.navigate("Addresses");
        })
        .catch((err) => {
          console.error("Error found: ", err);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  // const [email, setEmail] = useState('')
  // const [streetnumber, setStreetnumber] = useState('')
  // const [city, setCity] = useState('')
  // const [state, setState] = useState('')
  // const [zip, setZip] = useState('')

  // const addAddressToDB = () => {
  //     addAddress({
  //         email: auth.currentUser?.email,
  //         streetnumber: streetnumber,
  //         city: city,
  //         state: state,
  //         zip: zip,
  //     })

  // }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../../images/pumpfivebackground.jpeg")}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={styles.box1}>
              <Text style={styles.h1}>Add Address</Text>
              <View style={styles.backbutton}>
                <Button
                  title="Back"
                  color="white"
                  onPress={() => this.props.navigation.goBack()}
                />
              </View>

              <Text style={styles.email}>Street Address: *</Text>
              <TextInput
                style={styles.input}
                placeholder={"Enter Street Address"}
                value={this.state.streetnumber}
                onChangeText={(val) =>
                  this.inputValueUpdate(val, "streetnumber")
                }
                // value = {streetnumber}
                // onChangeText={text => setStreetnumber(text)}
                // placeholder="Enter Street Address"
                // keyboardType="default"
              />

              <Text style={styles.email}>City: *</Text>
              <TextInput
                style={styles.input}
                placeholder={"Enter City"}
                value={this.state.city}
                onChangeText={(val) => this.inputValueUpdate(val, "city")}
                // value = {city}
                // onChangeText={text => setCity(text)}
                // placeholder="Enter City"
                // keyboardType="default"
              />

              <Text style={styles.email}>State: *</Text>
              <TextInput
                style={styles.input}
                placeholder={"Enter State"}
                value={this.state.state}
                onChangeText={(val) => this.inputValueUpdate(val, "state")}
                // value = {state}
                // onChangeText={text => setState(text)}
                // placeholder="Enter State"
                // keyboardType="default"
              />

              <Text style={styles.email}>Zip Code: *</Text>
              <TextInput
                style={styles.input}
                placeholder={"Enter Zip Code"}
                value={this.state.zip}
                onChangeText={(val) => this.inputValueUpdate(val, "zip")}
                // value = {zip}
                // onChangeText={text => setZip(text)}
                // placeholder="Enter Zip Code"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.paybutton}>
              <Button
                title="Add Address"
                color="black"
                onPress={() => this.addAddress()}
                //   onPress={() => navigation.navigate("AddCard")}
              />
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  box1: {
    position: "absolute",
    width: "90%",
    height: "80%",
    top: "10%",
    left: "5%",
    backgroundColor: "#CDCABF",
    borderWidth: 3,
    borderRadius: 20,
  },
  h1: {
    position: "absolute",
    top: 40,
    left: 40,
    fontWeight: "bold",
    fontSize: 36,
    lineHeight: 42,
  },
  box2: {
    position: "absolute",
    // width: "50%",
    // height: 69,
    // left: "1%",
    top: "20%",
  },
  h2: {
    fontSize: 20,
    lineHeight: 23,
    display: "flex",
  },
  box3: {
    position: "absolute",
    width: 252,
    height: 28,
    left: 40,
    top: 275,
  },
  head3: {
    fontSize: 24,
    fontWeight: "bold",
  },
  box4: {
    position: "absolute",
    width: 212,
    height: 84,
    left: 40,
    top: 347,
  },
  button: {
    width: 100,
    height: 40,
    top: 5,
    left: 220,
    backgroundColor: "#DAAC3F",
    position: "absolute",
    borderWidth: 1,
  },
  backbutton: {
    width: "18%",
    height: 40,
    // top: 65,
    right: 0,
    backgroundColor: "#DAAC3F",
    position: "absolute",
  },
  paybutton: {
    width: "77%",
    height: "5%",
    bottom: "25%",
    left: "10%",
    backgroundColor: "#DAAC3F",
    position: "absolute",
  },
  email: {
    top: "20%",
    color: "black",

    fontSize: 20,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",

    left: "2%",
  },
  input: {
    height: "4%",
    margin: "1%",
    width: "90%",
    borderWidth: 1,
    padding: "1%",
    backgroundColor: "white",
    top: "20%",
    left: "2%",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
