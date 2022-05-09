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
    TouchableWithoutFeedback,
    Keyboard,
  } from "react-native";
  import React, { Component } from "react";
  import firebase from "firebase";
  import { auth } from "../firebase";
  import { useState } from "react";
  import { NavigationContainer } from "@react-navigation/native";
  import { createStackNavigator } from "@react-navigation/stack";
  // import { iteratorSymbol } from "immer/dist/internal";
  
  //car info Page - In Progresss
  
  export default class Admin extends Component {
    constructor() {
      super();
      this.docs = firebase.firestore().collection("Prices");
      this.state = {
        inside: "",
        outside: "",
        both: "",
        isLoading: true,
        prices: [],
      };
    }
  
    handleSignOut = () => {
      auth
        .signOut()
        .then(() => {
          this.props.navigation.navigate("Login");
        })
        .catch((error) => alert(error.message));
    };
  
    componentDidMount() {
      const dbRef = firebase
        .firestore()
        .collection("Prices")
        .doc("Detailing_Prices");
      
      dbRef.get().then((res) => {
        if (res.exists) {
          const prices = res.data();
          this.setState({
            key: res.id,
            inside: prices.inside,
            outside: prices.outside,
            both: prices.both,
            isLoading: false,
          });
        } else {
          console.log("Document does not exist!");
        }
        console.log("This.state.key: ", this.state.key);
      });
      this.unsubscribe = this.docs.onSnapshot(this.getPrices);
    }
  
    componentWillUnmount() {
      this.unsubscribe();
    }
  
    inputValueUpdate = (val, prop) => {
      const state = this.state;
      // console.log("state: ", state)
      state[prop] = val;
      this.setState(state);
    };
  
    getPrices = (querySnapshot) => {
      const prices = [];
      var inside = ''
      var outside = ''
      var both = ''
      const dbRef = firebase
        .firestore()
        .collection("Prices")
        .doc("Detailing_Prices");
      
      dbRef.get().then((res) => {
        inside = res.data().inside
        outside = res.data().outside
        both = res.data().both
        // console.log("Email1: ", email)
        // console.log("Email2: ", auth.currentUser?.email)
        prices.push({
          key: res.id,
          inside,
          outside,
          both,
        //   diesel,
        });
        this.setState({
            prices,
            isLoading: false,
          });
      });
      // console.log(cars);
      
    };
  
    updatePrices() {
      // this.setState({
      //   isLoading: true,
      // });
      const updateDBRef = firebase
        .firestore()
        .collection("Prices")
        .doc("Detailing_Prices");
      // console.log("DB ref: ", updateDBRef)
      // console.log("This.state: ", this.state)
      updateDBRef
        .set({
          inside: this.state.inside,
          outside: this.state.outside,
          both: this.state.both,
        //   diesel: this.state.diesel,
        })
        .then((docRef) => {
          this.setState({
            // key: '',
            // regular: '',
            // premium: '',
            // diesel: '',
            isLoading: false,
          });
          //   this.props.navigation.navigate('UserScreen');
        })
        .catch((error) => {
          console.error("Error: ", error);
          this.setState({
            isLoading: false,
          });
        });
    }
    render() {
      return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <ImageBackground
              source={require("../images/pumpfivebackground.jpeg")}
              style={styles.image}
            >
              <SafeAreaView style={styles.container}>
                <View style={styles.Memberships}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Text style={styles.text}>Welcome, Talethea!</Text>
                    {/* <View style={buttonstyles.backbutton}>
                      <Button
                        title="Back"
                        color="white"
                        //   onPress={() => console.log('Clicked')}
                        onPress={() => navigation.goBack()}
                      />
                    </View> */}
                  </View>
  
                  <Text style={styles.gastext}>
                    Enter Today's Inside Detailing Price: *
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder={"Inside"}
                    value={this.state.inside}
                    onChangeText={(val) => this.inputValueUpdate(val, "inside")}
                    keyboardType="numeric"
                  />
  
                  <Text style={styles.gastext}>
                    Enter Today's Outside Detailing Price: *
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder={"Outside"}
                    value={this.state.outside}
                    onChangeText={(val) => this.inputValueUpdate(val, "outside")}
                    keyboardType="numeric"
                  />
                  <Text style={styles.gastext}>
                    Enter Today's Detailing Price for Both: *
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder={"Both"}
                    value={this.state.both}
                    onChangeText={(val) => this.inputValueUpdate(val, "both")}
                    keyboardType="numeric"
                  />
  
                  {this.state.prices.map((res, i) => {
                    return (
                      <View key={i}>
                        <Text style={styles.gastext2}>
                          Current Inside Price: {res.inside}
                        </Text>
                        <Text style={styles.gastext2}>
                          Current Outside Price: {res.outside}
                        </Text>
                        <Text style={styles.gastext2}>
                          Current Price for Both: {res.both}
                        </Text>
                      </View>
                    );
                  })}
                  <View style={buttonstyles.paybutton}>
                    <Button
                      title="Update Prices"
                      color="black"
                      onPress={() => this.updatePrices()}
                    />
                  </View>
                  <View style={styles.loginview}>
                    <Button
                      title="Logout"
                      color="white"
                      onPress={this.handleSignOut}
                    />
                  </View>
                </View>
              </SafeAreaView>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
  //   }
  
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
    paybutton: {
      width: "77%",
      height: "7%",
      top: "63%",
      right: "12%",
      backgroundColor: "#DAAC3F",
      position: "absolute",
      borderRadius: 10,
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
  
    //Enter Todays Gas Price: *
    gastext: {
      top: "-10%",
      color: "black",
  
      fontSize: 16,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "left",
  
      left: "1%",
    },
    gastext2: {
      // bottom: "90%",
      color: "black",
  
      fontSize: 20,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "left",
      top: "-8%",
      left: "15%",
    },
  
    //Gas input boxes
    input: {
      height: "5%",
      margin: "1%",
      borderWidth: 1,
      width: "40%",
      padding: "1%",
      backgroundColor: "white",
      top: "-11%",
      left: "1%",
      borderRadius: 10,
    },
  
    //Car Information Bold Header
    text: {
      color: "black",
      fontSize: 40,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "center",
      flex: 1,
      top: "12%",
    },
  
    //Bounding Box
    BoundingBox: {
      //If overlay occurs with cars, delete position: absolute,
      width: "100%",
      height: "30%",
      bottom: "20%",
      backgroundColor: "#CDCABF",
      borderWidth: 2,
      borderColor: "#000000",
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
    },
  
    // Addresses
    addrfontshead: {
      color: "black",
      fontSize: 24,
      lineHeight: 30,
      fontWeight: "bold",
      textAlign: "center",
      top: 20,
      left: 5,
    },
  
    //Your Membership:
    memfontshead: {
      color: "black",
      fontSize: 24,
      lineHeight: 30,
      fontWeight: "bold",
      textAlign: "center",
      top: 40,
      left: 5,
    },
  
    //mem2
    mem2fontsbody: {
      color: "black",
      lineHeight: 30,
      textAlign: "center",
      top: 40,
      right: -15,
    },
  
    //mml
    mmlfontsbody: {
      color: "black",
      lineHeight: 30,
      textAlign: "center",
      top: 60,
      right: -15,
    },
  
    //lic
    licfontsbody: {
      color: "black",
      lineHeight: 30,
      textAlign: "center",
      top: 50,
      right: -15,
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
      top: "-1%",
      left: "37%",
      borderRadius: 10,
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
  });
  