import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableHighlight,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import firebase from 'firebase';
import { auth } from "../firebase";
import { addUser } from "../firebasefunctions";
import DropdownMenu from 'react-native-dropdown-menu';

import PhoneInput from "react-native-phone-input";

export default class Registration extends Component {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [fname, setFname] = useState("");
  // const [lname, setLname] = useState("");
  // const [phone, setPhone] = useState("");
  // const [cMake, setcMake] = useState('')
  // const [cModel, setcModel] = useState('')
  // const [cYear, setcYear] = useState('')
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Users');
    this.state = {
      email: '',
      password: '',
      reenterpassword: '',
      fname: '',
      lname: '',
      phone: '',
      driver: '',
      paid: 'no',
      isLoading: false
    };
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  useEffect(){
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("driver?: ", this.state.driver)
      if (user) {
        if(this.state.driver == "no")
        {
          this.props.navigation.replace("Tabs");
        }
        else
        {
          this.props.navigation.replace("DriverTabs");
        }
        
      }
    });

    return unsubscribe;
  }

  handleSignUp(){
    console.log("Registered with: ", this.state.email);
              console.log("pass ", this.state.password);
              console.log("fname: ", this.state.fname);
              console.log("lname: ", this.state.lname);
              console.log("phone: ", this.state.phone);
              console.log("driver: ", this.state.driver)
              console.log("paid: ", this.state.paid)
    if(this.state.email === '' || this.state.password === '' || this.state.reenterpassword === '' 
    || this.state.fname === '' || this.state.lname === '' || this.state.phone === '' || this.state.driver === ''){
      alert('Please fill out all fields')
     } else {
       this.setState({
         isLoading: true,
       });      
       this.dbRef.add({
         email: this.state.email,
         password: this.state.password,
         fname: this.state.fname,
         lname: this.state.lname,
         phone: this.state.phone,
         driver: this.state.driver,
         paid: 'no'
       })
      //  .then((res) => {
      //    this.setState({
      //      email: '',
      //      password: '',
      //      fname: '',
      //      lname: '',
      //      phone: '',
      //      isLoading: false,
      //    });
      //  })
      auth
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredentials) => {
              const user = userCredentials.user;
              console.log("Registered with: ", user.email);
              console.log("pass ", password);
              console.log("fname: ", fname);
              console.log("lname: ", lname);
              console.log("phone: ", phone);
              console.log("driver: ", driver)
              console.log("paid: ", paid)
            })
        //  this.props.navigation.navigate('Addresses')
        .catch((err) => {
         console.error("Error found: ", err);
         this.setState({
           isLoading: false,
         });
       });
     }
    
      // addUser({
        //   email: email,
        //   password: password,
        //   fname: fname,
        //   lname: lname,
        //   phone: phone,
        // }).catch((error) => alert(error.message));
  };
render(){
  var data = [["yes", "no"]];
  return (
      <KeyboardAvoidingView style={styles2.container}>
    
      <ImageBackground
        source={require("../images/pumpfivebackground.jpeg")}
        style={styles2.image}
      >
        <SafeAreaView style={styles2.container}>
          <View style={styles2.head}>
                <Text style={styles2.text1}>PumpFive</Text>
                <Text style={styles2.text2}>Fuel Delivery Service</Text>
                
                <View style={styles2.backbutton}>
                  <Button
                    title="Back"
                    color="white"
                    onPress={() => this.props.navigation.goBack()}
                  />
                </View>
          </View>
          <ScrollView>
          <View style={styles2.sect}>
                <Text style={styles2.email}>Email: *</Text>
                <TextInput
                  style={styles2.input}
                  placeholderTextColor="#D3D3D3"
                  placeholder={'Enter Email'}
                  value={this.state.email}
                  onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                  keyboardType="default"
                  borderRadius="10"
                />
                <Text style={styles2.email}>Password: *</Text>
                <TextInput
                  style={styles2.input}
                  placeholderTextColor="#D3D3D3"
                  placeholder={'Enter Password'}
                  value={this.state.password}
                  onChangeText={(val) => this.inputValueUpdate(val, 'password')}
                  keyboardType="default"
                  secureTextEntry
                  borderRadius="10"
                />

                <Text style={styles2.email}>Re-enter Password: *</Text>
                <TextInput
                  style={styles2.input}
                  placeholderTextColor="#D3D3D3"
                  placeholder={'Re-enter Password'}
                  value={this.state.reenterpassword}
                  onChangeText={(val) => this.inputValueUpdate(val, 'reenterpassword')}
                  keyboardType="default"
                  secureTextEntry
                  borderRadius="10"
                />

                <Text style={styles2.email}>First name: *</Text>
                <TextInput
                  style={styles2.input}
                  placeholderTextColor="#D3D3D3"
                  placeholder={'Enter First Name'}
                  value={this.state.fname}
                  onChangeText={(val) => this.inputValueUpdate(val, 'fname')}
                  keyboardType="default"
                  borderRadius="10"
                />

                <Text style={styles2.email}>Last name: *</Text>
                <TextInput
                  style={styles2.input}
                  placeholderTextColor="#D3D3D3"
                  placeholder={'Enter Last Name'}
                  value={this.state.lname}
                  onChangeText={(val) => this.inputValueUpdate(val, 'lname')}
                  keyboardType="default"
                  borderRadius="10"
                />

                <Text style={styles2.email}>Phone Number: *</Text>
                <TextInput
                  style={styles2.input}
                  placeholderTextColor="#D3D3D3"
                  placeholder={'Enter Phone Number'}
                  value={this.state.phone}
                  onChangeText={(val) => this.inputValueUpdate(val, 'phone')}
                  keyboardType="default"
                  borderRadius="10"
                />
                <View>
                  <Text style={styles2.email}>Are you registering as a driver?: *</Text>
                  <View> 
                    <DropdownMenu
                      bgColor={'white'}
                      tintColor={'#000000'}
                      activityTintColor={'red'}
                      handler={(selection,row) => this.setState({driver: data[selection][row]})}
                      data={data}
                    >
                    </DropdownMenu>
                    </View>
                  </View>
                <View style={styles2.loginview}>
                  <Button
                    title="Sign up"
                    color="white"
                    onPress={() => this.handleSignUp()}
                    // onPress={() => navigation.navigate('Tabs')}
                  ></Button>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
        </ImageBackground>
        </KeyboardAvoidingView>
    // </SafeAreaView>
  );
      }
}
// // ==================== CSS Styling (Ryan's stuff) ==================== //

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },
  head: {
    flex: 1,
    width: "95%",
    left: "2.5%",
    right: "2.5%",
    top: "3%",
    height: "10%"

  },
  scroll: {
    flex: 1,
  },
  sect: {
    flex: 1,
    width: "90%",
    left: "5%",
    right: "5%",
    top: "1%",
  },

  // Header On Page
  text1: {
    color: "white",

    fontSize: 48,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
  },

  text2: {
    color: "white",
    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
  },

  // Email Header
  email: {
    //top: "7%",
    color: "white",

    fontSize: 20,
    //lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",

    //paddingHorizontal: 15,
    paddingVertical: 10,
    //borderRadius: 10,
    //marginTop: 5,
    //left: "0%",
  },

  signup: {
    top: 30,
    color: "white",
    fontFamily: "Times New Roman",
    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    //height: "5.5%",
    //margin: "1%",
    //borderWidth: 1,
    padding: "2%",
    backgroundColor: "white",
    //top: "5%",
  },
  loginview: {
    borderWidth: 1,
    width: "50%",
    height: 40,
    top: 85,
    backgroundColor: "#DAAC3F",
    left: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backbutton: {
    width: "30%",
    height: "40%",
    top: "5%",
    right: "5%",
    backgroundColor: "#DAAC3F",
    borderRadius: 10,
    position: "absolute",
  },
});