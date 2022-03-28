import { StyleSheet, Text, View, SafeAreaView, Button, TouchableHighlight, ImageBackground, TextInput, KeyboardAvoidingView, ScrollView, Alert} from 'react-native'
// import Picker from '@react-native-picker/picker'
import React, { Component, useEffect, useState } from 'react'
import firebase from "firebase";
import { auth } from '../firebase'
import { addUser } from '../firebasefunctions'
import PhoneInput from 'react-native-phone-input'

export default class ForgotPassword extends Component{
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Users');
    this.state = {
      password: '',
      status: '0',
      isLoading: false
    };
  }
//   updatedd = (choice) => {
//     this.setState({ driver: choice })
//  }

renderRest() {
    if(this.state.status == '0'){
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
    else{
        return
    }
}

// componentDidMount() {
//     this.unsubscribe = this.docs.onSnapshot(this.getUserData);
//   }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updatePassword() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('User').doc(this.state.key);
    updateDBRef.set({
      password: this.state.password,
    }).then((docRef) => {
      this.setState({
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

  getUserData = (querySnapshot) => {
    // const user = [];
    querySnapshot.forEach((res) => {
      const { email } = res.data();
      // console.log("Email1: ", email)
      // console.log("Email2: ", auth.currentUser?.email)
      if (email == auth.currentUser?.email) {
          this.setState({
              status: '1'
          })
        // user.push({
        //   email,
        // });
      }
    });

    // console.log(cars);
    // this.setState({
    //   cars,
    //   isLoading: false,
    // });

    if (arr.length === 0)
    {
        return 0;
    }
    else{
        return 1;
    }
  };

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
        
        <Text style={styles.email}>Type email: *</Text>
        <View style={{flexDirection: "row", justifyContent: "space-around", left: 5,}}>
            <TextInput
                        style={styles.input}
                        placeholder={'Enter Email'}
                        value={this.state.email}
                        onChangeText={(val) => this.inputValueUpdate(val, 'email')}
            />
            {/* {
                if (this.state.status=='0'){

                }
            } */}
            <Button title="Enter" color="white" onPress={this.getUserData} style={{top: "2%"}}></Button>
        </View>

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
        />

       

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
    justifyContent: "center"
  },

  text1: {
    color: "white",

    fontSize: 48,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    // flex: 1,
    left: "2%",
    top: "-15%"
  },
  text2: {
    color: "white",

    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    // flex: 1,
    left: "2%",
    top: "-20%"
  },
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
  email: {
    top: "1%",
    color: "white",
   
    fontSize: 20,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",

    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    left: "1%",
    top: "2%"
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
    justifyContent: "space-around"
  },

  gasservice: {
    position: 'absolute',
    width: 350,
    height: 175,
    left: 21,
    top: -275,
    backgroundColor: '#CDCABF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
  },

  tireservice: {
    position: 'absolute',
    width: 350,
    height: 175,
    left: 21,
    top: -80,
    backgroundColor: '#CDCABF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
  },

  detailingservice: {
    position: 'absolute',
    width: 350,
    height: 175,
    left: 21,
    top: 115,
    backgroundColor: '#CDCABF',
    borderWidth: 2,
    borderColor: '#000000',
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

})

const buttonstyles = StyleSheet.create({
  button: { 
      width: '30%', 
      height: 40,
      bottom: 5,
      left: 230,
      // top: 270,
      borderWidth: 1, 
      //backgroundColor:"#DAAC3F", 
      position: "absolute",

      backgroundColor: '#f9c107',
      //width: '100%',
      //padding: 15,
      borderRadius: 10
      //alignItems: 'center',
      //left: "30%",
  },
  backbutton: {
    width: '15%', 
    height: "7%",
    top: "5%",
    right: "5%",
    backgroundColor: "#DAAC3F",
    position: "absolute"
  }
})