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
  TouchableOpacity
} from "react-native";
import React, { Component } from "react";
import firebase from "firebase";
import { useState } from "react";
import { getCards } from "../../firebasefunctions";
import { auth } from "../../firebase";
import DropdownMenu from 'react-native-dropdown-menu';

export default class Addresses extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection("Addresses");
    this.state = {
      isLoading: true,
      addresses: [],
    };
    this.deleteAddress = this.deleteAddress.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getAddressData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  deleteAddress(deletekey) {
    const dbRef = firebase.firestore().collection('Addresses').doc(deletekey)

    Alert.alert(
      'Delete ',
      'Are you sure you want to delete this card?',
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

  getAddressData = (querySnapshot) => {
    const addresses = [];
    querySnapshot.forEach((res) => {
      const { email, streetnumber, city, state, zip } = res.data();
      if (email == auth.currentUser?.email) {
        addresses.push({
          key: res.id,
          email,
          streetnumber,
          city,
          state,
          zip,
        });
      }
    });
    this.setState({
      addresses,
      isLoading: false,
    });
  };

  render() {
    var data2 = [["Big Data", "Hadoop", "Spark", "Hive"], ["Data Science" ,"Python","Ruby"]];
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
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.box1}>
            <Text style={styles.h1}>Addresses</Text>
            <View style={styles.backbutton}>
              <Button
                title="Back"
                color="white"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>
            <View style={styles.scrollbox}>
            <ScrollView style={styles.scroll1}>
            
            {this.state.addresses.map((res, i) => {
              count += 1;

              return (
                <View style={styles.BoundingBox} key={i}>
                  <View>
                    <Text style={styles.bofadeeznutsbold}>
                      Address #{count}
                    </Text>
                  </View>

                  {/* <View>
                          <Image source={image} />
                        </View> */}
                  <View>
                    <Text style={styles.bofadeeznuts}>{res.streetnumber}</Text>
                  </View>
                  <View>
                    <Text style={styles.bofadeeznuts}>
                      {res.city}, {res.state}, {res.zip}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('EditAddress', {
                                  userkey: res.key
                                });
                              }}>
                    <Text style={{ textDecorationLine: "underline",textAlign: "center",bottom: "25%",left: "40%",}}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.deleteAddress(res.key)}>
                    <Text style={{ textDecorationLine: "underline",textAlign: "center",bottom: "25%",left: "40%",}}>Delete</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            </ScrollView>
            </View>
            <View style={buttonstyles.paybutton}>
              <Button
                title="Add an Address"
                color="black"
                onPress={() => this.props.navigation.navigate("AddAddress")}
              />
            </View>
          </View>
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
  // + Add Payment Button
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
  image: {
    flex: 1,
    justifyContent: "center",
  },

  //Addresses Box
  box1: {
    position: "absolute",
    width: "90%",
    height: 680,
    top: 74,
    left: "5%",
    backgroundColor: "#CDCABF",
    borderWidth: 3,
    borderRadius: 20,
  },

  //Bounding Box
  BoundingBox: {
    backgroundColor: "#CDCABF",
    //borderWidth: 2,s
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    marginBottom: 5,
  },

  //Addresses Underlined Header
  h1: {
    position: "absolute",
    top: 40,
    left: "23%",
    fontWeight: "bold",
    fontSize: 36,
    lineHeight: 42,
    textDecorationLine: "underline",
  },
  box2: {
    position: "absolute",
    width: 277,
    height: 69,
    left: 40,
    top: 150,
  },

  //Address,City,State,Zip Text
  bofadeeznuts: {
    //Made Change:       //Keep: textAlign, color, fontSize,
    color: "black",
    fontSize: 25,
    top: "100%",
    left: "0.5%",
    // lineHeight: 20,
    //fontWeight: "bold",
    //textAlign: "center",
  },

  //Addresses Bold Header
  bofadeeznutsbold: {
    // Keep: color, fontSize, fontweight, textAlign // Changes: pos:abs, del col,
    color: "black",
    fontSize: 35,
    top: "10%",
    //height: "40%",
    fontWeight: "bold",
    textAlign: "center",
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
});