import { StyleSheet, Text, View, SafeAreaView, Button, TouchableHighlight, ImageBackground, TextInput, KeyboardAvoidingView, ScrollView, Picker} from 'react-native'
// import Picker from '@react-native-picker/picker'
import React, { Component, useEffect, useState } from 'react'
import firebase from "firebase";
import { auth } from '../firebase'
import { addUser } from '../firebasefunctions'

import PhoneInput from 'react-native-phone-input'

export default class Registration extends Component{
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Users');
    this.state = {
      email: '',
      password: '',
      fname: '',
      lname: '',
      phone: '',
      paid: '',
      driver: '',
      createdAt: '',
      isLoading: false
    };
  }
  updatedd = (choice) => {
    this.setState({ driver: choice })
 }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  addUser() {
    if(this.state.email === '' || this.state.password === '' || this.state.fname === '' || this.state.lname === ''
    || this.state.phone === '' || this.state.driver === ''){
     alert('Please fill out all fields')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        email: auth.currentUser?.email,
        password: this.state.password,
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        paid: "no",
        driver: this.state.driver,
        license: this.state.license,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then((res) => {
        this.setState({
          email: '',
          password: '',
          fname: '',
          lname: '',
          phone: '',
          paid: "no",
          driver: '',
          isLoading: false,
        });
        
        if(this.state.driver == "no")
          this.props.navigation.navigate('Tabs')
        else{
          this.props.navigation.navigate('DriverTabs')
        }
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
  // const [password, setPassword] = useState('')
  // const [fname, setFname] = useState('')
  // const [lname, setLname] = useState('')
  // const [phone, setPhone] = useState('')
  // const [cMake, setcMake] = useState('')
  // const [cModel, setcModel] = useState('')
  // const [cYear, setcYear] = useState('')

  useEffect=() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user){
        this.props.navigation.replace("Tabs")
      }
    });

    return unsubscribe
  }

  // const handleSignUp = () => {
  //   auth
  //   .createUserWithEmailAndPassword(email, password)
  //   .then(userCredentials => {
  //     const user = userCredentials.user;
  //     console.log("Registered with: ",user.email);
  //     console.log("pass ",password);
  //     console.log("fname: ",fname);
  //     console.log("lname: ",lname);
  //     console.log("phone: ",phone);
      

  //     addUser({
  //       email: email,
  //       password: password,
  //       fname: fname,
  //       lname: lname,
  //       phone: phone,
  //     })
  //     .catch(error => alert(error.message))
  // })}

  render() {
  return ( 
  <View style={styles.container}>
    
    <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
      <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        // style={{ flex: 1 }}
      >
      <View style={styles.inner}>
      <View style={buttonstyles.backbutton}>
                              <Button
                              title="Back"
                              color="white"
                              onPress={() =>this.props.navigation.goBack()}
                            />
                            </View>
        
          <Text style={styles.text1}>PumpFive</Text>          
          <Text style={styles.text2}>Fuel Delivery Service</Text>
       

        {/* <Text style={styles.signup}>Sign Up</Text> */}

        <ScrollView
          ref={ref => {this.scrollView = ref}}
          onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
          bounces={false}
        >
        
        <Text style={styles.email}>Email: *</Text>
        <TextInput
                      style={styles.input}
                      placeholder={'Enter Email'}
                      value={this.state.email}
                      onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                      // value = {email}
                      // onChangeText={text => setEmail(text)}
                      // placeholder="enter Email"
                      // keyboardType="default"
        />

          <Text style={styles.email}>Password: *</Text>
                  <TextInput
                                style={styles.input}
                                placeholder="Create Password"
                                keyboardType="default"
                  />

                  <Text style={styles.email}>Re-enter Password:</Text>
                  <TextInput
                                style={styles.input}
                                placeholder={'Retype Password'}
                                value={this.state.password}
                                onChangeText={(val) => this.inputValueUpdate(val, 'password')}
                                // value = {password}
                                // onChangeText={text => setPassword(text)}
                                // placeholder="Retype Password"
                                // keyboardType="default"
                  />

          <Text style={styles.email}>First name: *</Text>
          <TextInput
                        style={styles.input}
                        placeholder={'Enter First Name'}
                        value={this.state.fname}
                        onChangeText={(val) => this.inputValueUpdate(val, 'fname')}
                        // value = {fname}
                        // onChangeText={text => setFname(text)}
                        // placeholder="Enter First name"
                        keyboardType="default"
          />

          <Text style={styles.email}>Last name: *</Text>
          <TextInput
                        style={styles.input}
                        placeholder={'Enter Last Name'}
                        value={this.state.lname}
                        onChangeText={(val) => this.inputValueUpdate(val, 'lname')}
                        // value = {lname}
                        // onChangeText={text => setLname(text)}
                        // placeholder="enter Last name"
                        keyboardType="default"
          />
        
       
        <Text style={styles.email}>Phone Number: *</Text>
        <TextInput
                      style={styles.input}
                      placeholder={'***-***-****'}
                      value={this.state.phone}
                      onChangeText={(val) => this.inputValueUpdate(val, 'phone')}
                      // value = {phone}
                      // onChangeText={text => setPhone(text)}
                      // placeholder="***-***-****"
                      keyboardType="default"
        />
        <Text style={styles.email}>Are you registering as a driver? *</Text>
        <Picker selectedValue = {this.state.driver} onValueChange = {this.updatedd}>
          <Picker.Item label="yes" value="yes" />
          <Picker.Item label="no" value="no" />
        </Picker>
       

        {/* <View style={styles.loginview}> */}
            <Button title="Sign up" 
                    color="white" 
                    onPress={this.addUser}
                    style={{top: "2%"}}
                    // onPress={() => navigation.navigate('Tabs')}
                    ></Button>
        {/* </View> */}
    </ScrollView>
    </View> 
    </KeyboardAvoidingView>
    </SafeAreaView>
    </ImageBackground>
    
    </View>
)
}}

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
    top: "8%",
  },

  text2: {
    color: "white",
    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    left: "2%",
    top: "8%",
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
    top: "8%",
    color: "white",

    fontSize: 20,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",

    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    left: "0%",
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
  input: {
    height: "4.5%",
    margin: "1%",
    borderWidth: 1,
    padding: "1%",
    backgroundColor: "white",
    top: "4%",
  },
  loginview: {
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 1,
    width: 100,
    height: 40,
    top: 30,
    // right: 10,
    backgroundColor: "#DAAC3F",
    left: 5,
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

  // backbutton Completed
  backbutton: {
    width: "15%",
    height: "7%",
    top: "5%",
    right: "5%",
    backgroundColor: "#DAAC3F",
    padding: "10%",
    borderRadius: 10,
    position: "absolute",
  },
});
