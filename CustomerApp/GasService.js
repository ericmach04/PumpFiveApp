import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button, TextInput } from 'react-native'
import React from 'react'
import {useState} from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import TimeDropdown from "./dropdowns/TimeDropdown";
import DayDropdown from "./dropdowns/DayDropdown";
import GasDropdown from "./dropdowns/GasDropdown";
import PaymentDropdown from './dropdowns/PaymentDropdown';

export default function GasService() {
  return (
    <View style={styles.container}>
         <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>
                    Checkout
                </Text>
                <View style={styles.container}>
                    <View style={styles.gasservice}>
                        <Text style={styles.boxfontshead}>Gas Service</Text>
                        <Text style={styles.subheadings}>Schedule</Text>
                        <View style={{flexDirection:'row', flexWrap:'wrap',}}>
                            <View>
                                <TimeDropdown></TimeDropdown>
                            </View>
                            <View>
                                <DayDropdown></DayDropdown>
                            </View>                          
                        </View>
                        <Text style={styles.subheadings}>Quantity</Text>
                        <UselessTextInput />
                        <Text style={styles.subheadings}>Type of Fuel</Text>
                        <GasDropdown></GasDropdown>
                    </View>
                    
                    <View style={styles.personalinfo}>
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
                    <View style={styles.promobutton}>
                      <TextInput
                        style={styles.promoinput}
                        placeholder="Promo Code"
                        keyboardType="default"
                          />
                          <View style={buttonstyles.button}>
                                <Button title="Order" color="white"></Button>
                          </View>
                    </View>
                </View>
            </SafeAreaView>
         </ImageBackground>   
    </View>
  )
}

const UselessTextInput = () => {
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
  
    return (
      <View>
        {/* <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        /> */}
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Amount of Gas (per gallon)"
          keyboardType="numeric"
        />
      </View>
    );
  };

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
        top: 10,
      },

      services:{
          flexDirection: "column",
          justifyContent: "space-around"
      },

      gasservice: {
        position: 'absolute',
        width: 350,
        height: 280,
        left: 21,
        top: -330,
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
    },

      personalinfo:{
        position: 'absolute',
        width: 350,
        height: 190,
        left: 21,
        top: -40,
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
      },

      paymentinfo:{
        position: 'absolute',
        width: 350,
        height: 100,
        left: 21,
        top: 155,
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
        top: 270,
        flexDirection:'row', 
        flexWrap:'wrap',
      }


})