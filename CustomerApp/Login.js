import { StyleSheet, Text, View, SafeAreaView, Button, TouchableHighlight, ImageBackground, TextInput } from 'react-native'
import React from 'react'

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
        <SafeAreaView style={styles.container}>
          
            <Text style={styles.text1}>PumpFive</Text>          
            <Text style={styles.text2}>Fuel Delivery Service</Text>
         

          <Text style={styles.login}>Login</Text>
          <Text style={styles.signin}>Please sign in to continue</Text>

          <Text style={styles.email}>Email:</Text>
          <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="default"
          />
          <Text style={styles.email}>Password:</Text>
          <TextInput
                        style={styles.input}
                        placeholder="Password"
                        keyboardType="default"
          />
          <View style={styles.loginview}>
                          <Button
                            title="Login"
                            color="white"
                            onPress={() => navigation.navigate('HomePage')}
                          />
                          </View>
          <View>
            <Text style={styles.signup}>New User?</Text>
            <View style={buttonstyles.signupbutton}>
              <Button title="Sign up" color="white" onPress={() => navigation.navigate('Registration')}></Button>
            </View>
          </View>
          
          {/* <Text> Please sign in to continue</Text>

          <Text>Email:</Text>

          <Text>Password:</Text>

          <Button title='LOGIN' onPress={() => console.log("button works")}/>

          <Text>New User?</Text> 
          <TouchableHighlight onPress={() => console.log("Touchable works")}>

            <Text>Sign up</Text>
          </TouchableHighlight> */}

      </SafeAreaView>
      </ImageBackground>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
    },

    image: {
      flex: 1,
      justifyContent: "center"
    },

    text1: {
      color: "white",
      fontFamily: "Times New Roman",
      fontSize: 48,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "left",
      // flex: 1,
      top: 30,
    },
    text2: {
      color: "white",
      fontFamily: "Times New Roman",
      fontSize: 30,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "left",
      // flex: 1,
      top: 30,
    },
    login: {
      color: "white",
      fontFamily: "Times New Roman",
      fontSize: 40,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "left",
      // flex: 1,
      top: 150,
    },
    signin: {
      color: "white",
      fontFamily: "Times New Roman",
      fontSize: 30,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "left",
      // flex: 1,
      top: 150,
    },
    email: {
      top: 175,
      color: "white",
      fontFamily: "Times New Roman",
      fontSize: 30,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "left",
    },
    signup: {
      top: 300,
      color: "white",
      fontFamily: "Times New Roman",
      fontSize: 30,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "left",
    },

    services:{
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

    tireservice:{
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

    detailingservice:{
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

    boxfontshead:{
      color: "black",
      fontSize: 24,
      lineHeight: 30,
      fontWeight: "bold",
      textAlign: "left",
      top: 5,
      left: 5,
    },

    boxfontsbody:{
      color: "black",
      fontSize: 18,
      lineHeight: 30,
      textAlign: "left",
      top: 5,
      left: 5,
    },
    input: {
      height: 40,
      margin: 5,
      borderWidth: 1,
      padding: 5,
      backgroundColor: "white",
      top: 175,
    },
    loginview: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      width: 100, 
      height: 40,
      top: 175,
      right: 10,
      left: 5,
      backgroundColor:"#DAAC3F", 
    },

})

const buttonstyles = StyleSheet.create({
  button: { 
      top: 600, 
      borderWidth: 1,
      width: "50%", 
      backgroundColor:"#DAAC3F", 
      position: "absolute", 
      alignItems: "center",
      justifyContent: "center",
  },
  signupbutton: { 
    // top: 600,
    left: "40%", 
    bottom: -260,
    borderWidth: 1,
    width: "30%", 
    backgroundColor:"#DAAC3F", 
    // position: "absolute", 
    alignItems: "center",
    justifyContent: "center",
}
})