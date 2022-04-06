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
      if (user) {
        this.props.navigation.replace("Tabs");
      }
    });

    return unsubscribe;
  }

  handleSignUp(){
    if(this.state.email === '' || this.state.password === '' || this.state.reenterpassword === '' 
    || this.state.fname === '' || this.state.lname === '' || this.state.phone === ''){
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
  return (
    // <SafeAreaView >
    <ScrollView 
    style={{flex: 1}}
    ref={ref => {this.scrollView = ref}}
    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})} >
      <KeyboardAvoidingView>
    
      <ImageBackground
        source={require("../images/pumpfivebackground.jpeg")}
        // style={styles.image}
        style={{width: "100%", height: "100%"}}
      >
              {/* <View 
                style={{flexDirection:'row', justifyContent: 'space-around',}}
              > */}
              {/* <View style={styles.inputContainer}> */}
              
                <Text style={styles.text1}>PumpFive</Text>
                <Text style={styles.text2}>Fuel Delivery Service</Text>
                
                <View style={buttonstyles.backbutton}>
                  <Button
                    title="Back"
                    color="white"
                    onPress={() => this.props.navigation.goBack()}
                  />
                </View>
              {/* </View> */}
              {/* </View> */}
              {/* <View style={{top: "10%"}}> */}
                <Text style={styles.email}>Email: *</Text>
                <TextInput
                  // style={styles.input}
                  // value={email}
                  // onChangeText={(text) => setEmail(text)}
                  // placeholder="enter Email"
                  style={styles.input}
                  placeholder={'Enter Email'}
                  value={this.state.email}
                  onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                  keyboardType="default"
                  top="4%"
                  borderRadius="10"
                />
                {/* </View> */}
                <Text style={styles.email}>Password: *</Text>
                <TextInput
                  // style={styles.input}
                  // placeholder="create password"
                  // keyboardType="default"
                  // borderRadius="10"
                  style={styles.input}
                  placeholder={'Enter Password'}
                  value={this.state.password}
                  onChangeText={(val) => this.inputValueUpdate(val, 'password')}
                  keyboardType="default"
                  top="4%"
                  borderRadius="10"
                />

                <Text style={styles.email}>Re-enter Password: *</Text>
                <TextInput
                  // style={styles.input}
                  // value={password}
                  // onChangeText={(text) => setPassword(text)}
                  // placeholder="Retype Password"
                  style={styles.input}
                  placeholder={'Re-enter Password'}
                  value={this.state.reenterpassword}
                  onChangeText={(val) => this.inputValueUpdate(val, 'reenterpassword')}
                  keyboardType="default"
                  top="4%"
                  borderRadius="10"
                />

                <Text style={styles.email}>First name: *</Text>
                <TextInput
                  // style={styles.input}
                  // value={fname}
                  // onChangeText={(text) => setFname(text)}
                  // placeholder="Enter First name"
                  style={styles.input}
                  placeholder={'Enter First Name'}
                  value={this.state.fname}
                  onChangeText={(val) => this.inputValueUpdate(val, 'fname')}
                  keyboardType="default"
                  top="4%"
                  borderRadius="10"
                />

                <Text style={styles.email}>Last name: *</Text>
                <TextInput
                  // style={styles.input}
                  // value={lname}
                  // onChangeText={(text) => setLname(text)}
                  // placeholder="enter Last name"
                  style={styles.input}
                  placeholder={'Enter Last Name'}
                  value={this.state.lname}
                  onChangeText={(val) => this.inputValueUpdate(val, 'lname')}
                  keyboardType="default"
                  top="4%"
                  borderRadius="10"
                />

                <Text style={styles.email}>Phone Number: *</Text>
                <TextInput
                  // style={styles.input}
                  // value={phone}
                  // onChangeText={(text) => setPhone(text)}
                  // placeholder="***-***-****"
                  style={styles.input}
                  placeholder={'Enter Phone Number'}
                  value={this.state.phone}
                  onChangeText={(val) => this.inputValueUpdate(val, 'phone')}
                  keyboardType="default"
                  top="4%"
                  borderRadius="10"

                  //top = "10%"
                />
                <Text style={styles.email}>Are you registering as a driver: *</Text>
                <TextInput
                  // style={styles.input}
                  // value={phone}
                  // onChangeText={(text) => setPhone(text)}
                  // placeholder="***-***-****"
                  style={styles.input}
                  placeholder={'Enter Phone Number'}
                  value={this.state.phone}
                  onChangeText={(val) => this.inputValueUpdate(val, 'phone')}
                  keyboardType="default"
                  top="4%"
                  borderRadius="10"

                  //top = "10%"
                />
                <View style={styles.loginview}>
                  <Button
                    title="Sign up"
                    color="white"
                    onPress={() => this.handleSignUp()}
                    // onPress={() => navigation.navigate('Tabs')}
                  ></Button>
                </View>

                {/* <Text> Please sign in to continue</Text>

        <Text>Email:</Text>

        <Text>Password:</Text>

        <Button title='LOGIN' onPress={() => console.log("button works")}/>

        <Text>New User?</Text> 
        <TouchableHighlight onPress={() => console.log("Touchable works")}>

          <Text>Sign up</Text>
        </TouchableHighlight> */}
              {/* </ScrollView> */}
            {/* </View> */}
          {/* </KeyboardAvoidingView> */}
        {/* </SafeAreaView> */}
      
        </ImageBackground>
        </KeyboardAvoidingView>
    </ScrollView>
    // </SafeAreaView>
  );
      }
}

// ==================== CSS Styling ==================== //

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    // flex: 1,
    justifyContent: "flex-end",
    
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  // Header On Page
  text1: {
    color: "white",

    fontSize: 48,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    left: "2%",
    top: "3%",
  },

  text2: {
    color: "white",
    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    left: "2%",
    top: "3%",
  },

  //Effects Nothing On This Page
  login: {
    color: "white",
    fontFamily: "Times New Roman",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    // flex: 1,
    top: 30,
  },

  //Effects Nothing On This Page
  signin: {
    color: "white",
    fontFamily: "Times New Roman",
    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    // flex: 1,
    top: 30,
  },

  // Email Header
  email: {
    top: "5%",
    color: "white",

    fontSize: 20,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",

    paddingHorizontal: 15,
    //paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    left: "0%",
  },
  input: {
    height: "4%",
    margin: "2%",
    borderWidth: 1,
    padding: "2%",
    backgroundColor: "white",
    top: "5%",
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
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 1,
    width: '20%',
    height: '5%',
    // top: '6%',
    // right: 10,
    backgroundColor: "#DAAC3F",
    // left: '5%',
  },
});

const buttonstyles = StyleSheet.create({
  button: {
    width: "30%",
    height: 40,
    bottom: 5,
    left: 230,
    // top: 270,
    borderWidth: 1,
    //backgroundColor:"#DAAC3F",
    position: "absolute",

    backgroundColor: "#f9c107",
    //width: '100%',
    //padding: 15,
    borderRadius: 10,
    //alignItems: 'center',
    //left: "30%",
  },
  backbutton: {
    width: '18%', 
    height: 40,
    top: "10%",
    right: 0,
    backgroundColor:"#DAAC3F", 
    position: "absolute"
},

  // backbutton Completed
  // backbutton: {
  //   width: "15%",
  //   height: "7%",
  //   top: "7%",
  //   right: "5%",
  //   backgroundColor: "#DAAC3F",
  //   padding: "10%",
  //   borderRadius: 10,
  //   position: "absolute",
  // },
});
