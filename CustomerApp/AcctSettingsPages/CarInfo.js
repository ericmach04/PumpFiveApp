import {
  StyleSheet,
  Alert,
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
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import firebase from "firebase";
import { useState } from "react";
import { getCards } from "../../firebasefunctions";
import { auth } from "../../firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//car info Page - In Progresss

export default class CarInfo extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection("Car_Info");
    this.state = {
      isLoading: true,
      addresses: [],
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getCarData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  deleteUser(deletekey) {
    const dbRef = firebase.firestore().collection('Car_Info').doc(deletekey)

    Alert.alert(
      'Delete ',
      'Are you sure you want to delete this car?',
      [
        {text: 'Yes', onPress: () => {
          dbRef.delete().then((res) => {
            console.log('Item removed from database')
        })
        }},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  // openTwoButtonAlert(deletekey){
  //   Alert.alert(
  //     'Delete ',
  //     'Are you sure you want to delete this car?',
  //     [
  //       {text: 'Yes', onPress: () => this.deleteUser(deletekey)},
  //       {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
  //     ],
  //     { 
  //       cancelable: true 
  //     }
  //   );
  // }

  // onPress(txt) {
  //   // console.log(txt);
  //   return txt
  // }

  getCarData = (querySnapshot) => {
    const cars = [];
    querySnapshot.forEach((res) => {
      const { email, make, model, color, year, license } = res.data();
      // console.log("Email1: ", email)
      // console.log("Email2: ", auth.currentUser?.email)
      if (email == auth.currentUser?.email) {
        cars.push({
          key: res.id,
          email,
          make,
          model,
          color,
          year,
          license,
        });
      }
    });
    // console.log(cars);
    this.setState({
      cars,
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
          {/* <SafeAreaView style={styles.container}> */}
            {/* <View style={styles.Memberships}> */}
            <View style={styles.box1}>
              {/* <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              > */}
                <Text style={styles.h1}>Car Information</Text>
                <View style={buttonstyles.backbutton}>
                  <Button
                    title="Back"
                    color="white"
                    //   onPress={() => console.log('Clicked')}
                    onPress={() => this.props.navigation.goBack()}
                  />
                </View>
            
              <View style={styles.scrollbox}>
              <ScrollView style={styles.scroll1}>

              {
              this.state.cars.map((res, i) => {
                count += 1;

                return (
                  <View style={styles.BoundingBox} key={i}>
                    <Text style={styles.bofadeeznutsbold}>Car #{count}</Text>
                    <View style={{ top: "10%", left: "2%" }}>
                      <Text style={styles.bofadeeznuts}>
                        {res.year} {res.color} {res.make} {res.model}
                      </Text>
                      <Text style={styles.bofadeeznuts}>
                        License Plate: {res.license}
                      </Text>
                     
                      <View style={{flexDirection: "row", justifyContent: "space-around", left: 5,}}>
                        <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('EditCarInfo', {
                                  userkey: res.key
                                });
                              }}
                        >
                          <Text style={styles.bofadeeznutsunderline}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.deleteUser(res.key)}>
                          <Text style={styles.bofadeeznutsunderline}>Delete</Text>
                        </TouchableOpacity>
                       
                      </View>
                    </View>
                  </View>
                );
              })
              
              }
              </ScrollView>
              </View>

              <View style={buttonstyles.paybutton}>
                <Button
                  title="Add a New Car"
                  color="black"
                  onPress={() => this.props.navigation.navigate("AddCarInfo")}
                />
              </View>
            </View>
          {/* </SafeAreaView> */}
        </ImageBackground>
      </View>
    );
  }
}

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
    top: "85%",
    right: "11.5%",
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
  bofadeeznuts: {
    color: "black",
    fontSize: 20,
    // lineHeight: 20,
    //fontWeight: "bold",
    textAlign: "center",
  },
  bofadeeznutsunderline: {
    color: "black",
    fontSize: 20,
    // lineHeight: 20,
    //fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: 'underline',
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
    width: "90%",
    height: "80%",
    left: "5%",
    top: 90,
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
  },
  box1: {
    position: "absolute",
    width: "90%",
    height: "80%",
    top: 74,
    left: "5%",
    backgroundColor: "#CDCABF",
    borderWidth: 3,
    borderRadius: 20,
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
  BoundingBox: {
    backgroundColor: "#CDCABF",
    //borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    marginBottom: 5,
    height: 170,
  },

  //Bounding Box
  // BoundingBox: {
  //   //If overlay occurs with cars, delete position: absolute,
  //   width: "100%",
  //   height: "30%",
  //   bottom: "20%",
  //   backgroundColor: "#CDCABF",
  //   borderWidth: 2,
  //   borderColor: "#000000",
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 10,
  // },

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
  scrollbox: {
    flex: 0.7,
    width: "90%",
    left: "5%",
    top: 90,
  },
  scroll1: {
    flex: 1,
  },
  h1: {
    position: "absolute",
    top: 40,
    left: "13%",
    fontWeight: "bold",
    fontSize: 36,
    lineHeight: 42,
    textDecorationLine: "underline",
  },
});
