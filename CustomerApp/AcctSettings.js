import { ImageBackground, Image, Button, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

//Working On:  construct box with black border, 

export default function AccountSettings() {
  return (
    //<View>
      //<Text>Login</Text>
    //</View>
    <View style={styles.container}>
      <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
          <SafeAreaView style={styles.container}>
            
              <View style={styles.container}>
                  <View style={styles.UserAccount}>
                      <Text style={styles.boxfontshead}> User Account: John</Text>
                      <Text style={styles.boxfontsbody}>a1234@gmail.com</Text>
                      <Text style={styles.boxfontsbody}>Member Number: 773123456789</Text>
                      <Text style={styles.boxfontsbody}>User Phone Number: </Text>
                      <View style={buttonstyles.button}>
                          <Button title="Logout" color="black"></Button>
                      </View>
                  </View>

                  <View style={buttonstyles.button}>
                              <Button title="Addresses" color="black"></Button>
                  </View>

                  <View style={buttonstyles.button}>
                              <Button title="Your Membership" color="black"></Button>
                              <Text style={styles.boxfontsbody}>Monthly Membership: [Start Date of Membership] </Text>
                  </View>

                  <View style={buttonstyles.button}>
                              <Button title="Car Information" color="black"></Button>
                              <Text style={styles.boxfontsbody}>Make: 
                                                                Model: 
                                                                License Plate: 
                              </Text>
                  </View>
                    
                  <View style={buttonstyles.button}>
                              <Button title="Payment" color="black"></Button>
                  </View>

                  <View style={buttonstyles.button}>
                              <Button title="Order History" color="black"></Button>
                  </View>

                  <View style={buttonstyles.button}>
                              <Button title="Notification" color="black"></Button>
                  </View>
                    
                  </View>
                </SafeAreaView>
                </ImageBackground>
                </View>
   
    // {/* <NavigationContainer>
    //             <Tabs />
    //         </NavigationContainer> */}

)}

const buttonstyles = StyleSheet.create({
  button: { 
      width: 100, 
      height: 40,
      bottom: 5,
      right: 10,
      borderWidth: 1, 
      backgroundColor:"#DAAC3F", 
      position: "absolute"
  }
})

const styles = StyleSheet.create({
  container: {
      flex: 1,
    },

    image: {
      flex: 1,
      justifyContent: "center"
    },

    text: {
      color: "white",
      fontSize: 48,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "center",
      flex: 1,
      top: 30,
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


})









  
  //Working on implementation

/* <view>
    rect1: {
        position: 'absolute',
        width: 350,
        height: 243,
        left: 21,
        top: 287,
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
        },
</view> */