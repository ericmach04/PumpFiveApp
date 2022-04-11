import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button, TextInput, UselessTextInput, Picker, ScrollView } from 'react-native'
import React from 'react'
import {useState} from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import TimeDropdown from "./dropdowns/TimeDropdown";
import DayDropdown from "./dropdowns/DayDropdown";
import GasDropdown from "./dropdowns/GasDropdown";
import PaymentDropdown from './dropdowns/PaymentDropdown';

export default function GasService({navigation}) {
  return (
    <View style={styles.container}>
         <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
            {/* <SafeAreaView style={styles.container}> */}
              
                <SafeAreaView style={styles.container}>
                  <Text style={styles.text}>
                      Checkout
                  </Text>
                  <View style={buttonstyles.backbutton}>
                              <Button
                              title="Back"
                              color="white"
                              // onPress={() => console.log('Clicked')}
                              onPress={() => navigation.goBack()}
                            />
                            </View>
              
            
                
                  <ScrollView style={styles.scroll}>
                    <View style={styles.gasservice}>
                      
                        <Text style={styles.boxfontshead}>Gas Service</Text>
                        <Text style={styles.subheadings}>Schedule</Text>
                        <View style={{flexDirection:'row', flexWrap:'nowrap', zIndex: 1}}>
                          
                            <View>
                                <TimeDropdown></TimeDropdown>
                            </View>
                            
                            <View>
                                <DayDropdown></DayDropdown>
                            </View>  
                                                    
                        </View>

                        <View>
                          <Text style={styles.subheadings}>Quantity</Text>
                          <TextInput
                           style={styles.input}
                            placeholder="Quantity"
                            keyboardType="default"
                          />
  
                        </View>
                       
                        <Text style={styles.subheadings}>Type of Fuel</Text>
                        <View style ={{flexDirection:'row', flexWrap:'nowrap', zIndex: 0}} >

                            <View>
                              <GasDropdown></GasDropdown>
                            </View>
                           
                        </View>
                    </View>
                    
                    <View style={styles.gasservice}>
                        <Text style={styles.boxfontshead}>Personal Info</Text>

                            <TextInput
                              style={styles.input}
                              placeholder="First Name"
                              keyboardType="default"
                            />
                            <TextInput
                              style={styles.input}
                              placeholder="Last Name"
                              keyboardType="default"
                            />
                            <TextInput
                              style={styles.input}
                              placeholder="Address"
                              keyboardType="default"
                            />
                          
                    </View>
                    <View style={styles.paymentinfo}>
                        <Text style={styles.boxfontshead}>Payment Information</Text>
                        <PaymentDropdown/>
                    </View>
                    {/* <View style={styles.promobutton}>
                      <TextInput
                        style={styles.promoinput}
                        placeholder="Promo Code"
                        keyboardType="default"
                          />
                          <View style={buttonstyles.button}>
                                <Button title="Order" color="white" onPress={() => navigation.navigate('OrderSummary')}></Button>
                          </View>
                          
                    </View> */}
                    </ScrollView>
                
            {/* </SafeAreaView> */}
            </SafeAreaView>
         </ImageBackground>   
    </View>
  )
}

  const buttonstyles = StyleSheet.create({
    button: { 
        width: '30%', 
        height: 40,
        bottom: 5,
        left: 230,
        // top: 270,
        borderWidth: 1, 
        backgroundColor:"#DAAC3F", 
        position: "absolute"
    },
    backbutton: {
      width: '15%', 
      height: 40,
      top: 65,
      right: 15,
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
        lineHeight: 70,
        fontWeight: "bold",
        textAlign: "center",
        // flex: 1,
        top: 0,
      },

      services:{
          flexDirection: "column",
          justifyContent: "space-around"
      },

      gasservice: {
        flex: 1,
        width: "90%",
        height: 300,
        left: "5%",
        right: "5%",
        //top: "0%",
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
        marginBottom: 20,
    },

      personalinfo:{
        position: 'absolute',
        width: "95%",
        height: 200,
        left: "2%",
        top: "8%",
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
        flex: 1,
      },

      paymentinfo:{
        flex: 1,
        width: "90%",
        height: 650,
        left: "5%",
        right: "5%",
        //top: "0%",
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
        marginBottom: 20,
      },

      boxfontshead:{
        color: "black",
        fontSize: 24,
        lineHeight: 30,
        fontWeight: "bold",
        textAlign: "center",
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

      subheadings:{
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 30,
        textAlign: "left",
        top: 5,
        left: 10,
      },
      input: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 5,
        backgroundColor: "white",
      },
      promoinput: {
        height: 40,
        width: '50%',
        margin: 5,
        borderWidth: 1,
        padding: 5,
        backgroundColor: "white",
      },
      promobutton: {
        // position: 'absolute',
        left: 21,
        top: 300,
        flexDirection:'row', 
        flexWrap:'wrap',
      },
      checkoutback: {
        flexDirection:'row', 
        flexWrap:'wrap',
      },


})