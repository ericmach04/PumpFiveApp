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
        small: "",
        medium: "",
        large: "",
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
        .doc("Tire_Prices");
      
      dbRef.get().then((res) => {
        if (res.exists) {
          const prices = res.data();
          this.setState({
            key: res.id,
            small: prices.small,
            medium: prices.medium,
            large: prices.large,
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
      var small=''
      var medium=''
      var large=''
      const dbRef = firebase
        .firestore()
        .collection("Prices")
        .doc("Tire_Prices");
      
      dbRef.get().then((res) => {
        small = res.data().small
        medium = res.data().medium
        large = res.data().large
        // console.log("Email1: ", email)
        // console.log("Email2: ", auth.currentUser?.email)
        prices.push({
          key: res.id,
          small,
          medium,
          large,
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
        .doc("Tire_Prices");
      // console.log("DB ref: ", updateDBRef)
      // console.log("This.state: ", this.state)
      updateDBRef
        .set({
          small: this.state.small,
          medium: this.state.medium,
          large: this.state.large,
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
                   
                  </View>
  
                  <Text style={styles.gastext}>
                    Enter Today's Small Tire Price: *
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder={"small"}
                    value={this.state.small}
                    onChangeText={(val) => this.inputValueUpdate(val, "small")}
                    keyboardType="numeric"
                  />
  
                  <Text style={styles.gastext}>
                    Enter Today's Medium Tire Price: *
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder={"medium"}
                    value={this.state.medium}
                    onChangeText={(val) => this.inputValueUpdate(val, "medium")}
                    keyboardType="numeric"
                  />
  
                  <Text style={styles.gastext}>
                    Enter Today's Large Tire Price: *
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder={"large"}
                    value={this.state.large}
                    onChangeText={(val) => this.inputValueUpdate(val, "large")}
                    keyboardType="numeric"
                  />
  
                  {this.state.prices.map((res, i) => {
                    return (
                      <View>
                        <Text style={styles.gastext2}>
                          Current Regular Price: {res.small}
                        </Text>
                        <Text style={styles.gastext2}>
                          Current Premium Price: {res.medium}
                        </Text>
                        <Text style={styles.gastext2}>
                          Current Diesel Price: {res.large}
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
  
      fontSize: 20,
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
  