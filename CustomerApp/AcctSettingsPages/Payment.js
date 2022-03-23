import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Button,
  TextInput,
  UselessTextInput,
  Image,
} from "react-native";
import React, { Component } from "react";
import firebase from "firebase";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { getCards } from "../../firebasefunctions";
import { ListItem } from "react-native-elements";
import { auth } from "../../firebase";
// import TimeDropdown from "../dropdowns/TimeDropdown";
// import DayDropdown from "../dropdowns/DayDropdown";
// import GasDropdown from "../dropdowns/GasDropdown";
// import PaymentDropdown from '../dropdowns/PaymentDropdown';

// var useremail=auth.currentUser?.email;
export default class Payment extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection("Credit_Cards");
    this.state = {
      isLoading: true,
      cards: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getCardData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCardData = (querySnapshot) => {
    const cards = [];
    querySnapshot.forEach((res) => {
      const { createdAt, cvv, email, expiry, number, type } = res.data();
      if (email == auth.currentUser?.email) {
        cards.push({
          key: res.id,
          createdAt,
          cvv,
          email,
          expiry,
          number,
          type,
        });
      }
    });
    this.setState({
      cards,
      isLoading: false,
    });
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }

    var count = 0;
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
                      onPress={() => this.props.navigation.goBack()}
                    />
                  </View>
                </View>
                {/* <View style={{ bottom: "45%", left: "5%" }}>
                <Text style={styles.boxfontsbody}>{auth.currentUser?.email}</Text>
                <Text style={styles.boxfontsbody}>Member no. 773123456789</Text>
                <Text style={styles.boxfontsbody}>414-***-****</Text>
              </View> */}

                {/* <View style={{ bottom: "55%",}}>
                <Text style={styles.creditdebit}>Credit/Debit Card (Add up to 3)</Text>
              </View>  */}
                {this.state.cards.map((res, i) => {
                  var image;
                  var text;
                  var lastfour;

                  count += 1;
                  if (res.type == "visa") {
                    image = require("../../icons/visa.png");
                    text = "Visa ";
                  } else if (res.type == "master-card") {
                    image = require("../../icons/mastercard.png");
                    text = "Mastercard ";
                  }

                  var cardarray = res.number.split(" ");
                  lastfour = cardarray[3];

                  return (
                    //It will go here
                    <View style={styles.BoundingBox}>
                      <View
                        style={{
                          top: "12%",
                          left: "2%",
                          bottom: "25%",

                          textAlign: "center",
                        }}
                      >
                        <View>
                          <Text style={styles.bofadeeznutsbold}>
                            Card {count}
                          </Text>
                        </View>
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image source={image} />
                        </View>
                        <View>
                          <Text style={styles.bofadeeznuts}>
                            {text}ending in {lastfour}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.bofadeeznuts}>
                            Exp: {res.expiry}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}

                <View style={buttonstyles.paybutton}>
                  <Button
                    title="+ Add Payment Method"
                    color="black"
                    onPress={() => this.props.navigation.navigate("AddCard")}
                  />
                  <Button title="Get Cards" color="black" onPress={getCards} />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
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
    height: "7%",
    top: "85%",
    right: "10%",
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

  //Payment Management Bold Header
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

  //Bounding Box
  BoundingBox: {
    //If overlay occurs with cars, delete position: absolute,
    width: "100%",
    height: "30%",
    bottom: "30%",
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },

  //bofadeeznuts
  //Visa Ending in ####, Exp:
  bofadeeznuts: {
    color: "black",
    fontSize: 25,
    // lineHeight: 20,
    //fontWeight: "bold",
    textAlign: "center",
  },
  bofadeeznutsbold: {
    color: "black",
    fontSize: 35,
    // lineHeight: 35,
    fontWeight: "bold",
    textAlign: "center",
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
  loader: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  rectangle: {
    height: "50%",
    width: "40%",
    backgroundColor: "white",
    position: "absolute",
    // zIndex: 99,
    top: "50%",
    left: "40%",
    borderWidth: 1,
  },
});
