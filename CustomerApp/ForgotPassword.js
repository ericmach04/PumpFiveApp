import { Keyboard, StyleSheet, Text, View, SafeAreaView, Button, TouchableWithoutFeedback, ImageBackground, TextInput, KeyboardAvoidingView, ScrollView, Alert} from 'react-native'
// import Picker from '@react-native-picker/picker'
import React, { Component, useEffect, useState } from 'react'
import firebase from "firebase";
import { auth } from '../firebase'
import { addUser } from '../firebasefunctions'
import PhoneInput from 'react-native-phone-input'

export default class ForgotPassword extends Component{
  constructor() {
    super();
    this.docs = firebase.firestore().collection("Users");
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      status: false,
      users:[],
    };
  }
//   updatedd = (choice) => {
//     this.setState({ driver: choice })
//  }

rest() { 
    console.log("Users arr: ", this.state.users)   
    for(var i=0; i < this.state.users.length; i++)
    {

      if(this.state.email == this.state.users[i]){
        this.setState({
          status: true,
        });
      }
    }

        Alert.alert(
          'Error',
          'Email not recognized. Please try another email',
          [
            {text: 'Dismiss', onPress: () => console.log('Error'), style: 'cancel'},
          ],
          { 
            cancelable: true 
          }
        );
    
    
}

  componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getUserData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updatePassword() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('Users').doc(this.state.key);
    updateDBRef.set({
      password: this.state.password,
    }).then((docRef) => {
      this.setState({
        email: '',
        password: '',
        isLoading: false,
      });
      this.props.navigation.navigate('Login');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  handleEnter() {
      this.rest()
  }

  getUserData = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((res) => {
      const { email } = res.data();
          
        users.push(
          email,
        );
      
    });
    // console.log("State: ", this.state.status)

    
    this.setState({
      users,
      isLoading: false,
    });

  };

  render() {
  return ( 
<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
          <Text style={styles.text2}>Reset Password</Text>
       

        {/* <Text style={styles.signup}>Sign Up</Text> */}

        {/* <ScrollView
          ref={ref => {this.scrollView = ref}}
          onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
          bounces={false}
        > */}
        
        <Text style={styles.email}>Type email: *</Text>
            <TextInput
                        style={styles.input}
                        placeholder={'Enter Email'}
                        value={this.state.email}
                        onChangeText={(val) => this.inputValueUpdate(val, 'email')}
            />
            <View style={buttonstyles.button}>
              <Button title="Enter" color="white" onPress={() => this.handleEnter()}></Button>
            </View>
            {/* {
              if(this.state.status == true){

              }
            } */}
    </View> 
    </KeyboardAvoidingView>
    </SafeAreaView>
    </ImageBackground>
    
    </View>
    </TouchableWithoutFeedback>
)
}}

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
      height: "15.5%",
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
      width: '30%', 
      height: '15%',
      left: '2%',
      top: '105%',
      // top: '60%',
      // borderWidth: 1, 
      backgroundColor:"#DAAC3F", 
      position: "absolute"
  },
  
    // backbutton Completed
    backbutton: {
      width: "15%",
      height: "10%",
      top: "5%",
      right: "5%",
      backgroundColor: "#DAAC3F",
      padding: "10%",
      borderRadius: 10,
      position: "absolute",
    },
  });
  