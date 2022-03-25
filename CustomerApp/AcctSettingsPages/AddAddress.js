import { StyleSheet, Text, TextInput, View, ImageBackground, Button, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React, {Component, useEffect, useState} from 'react';
import { auth } from "../../firebase";
import {addAddress} from '../../firebasefunctions'

export default function AddCard({ navigation }) {
    const [email, setEmail] = useState('')
    const [streetnumber, setStreetnumber] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')

        // addCard({
        //     email: auth.currentUser?.email,
        //     number: dataobject["values"]["number"],
        //     type: dataobject["values"]["type"],
        //     cvv: dataobject["values"]["cvc"],
        //     expiry: dataobject["values"]["expiry"],
        // })

        
    // _onChange => form => console.log(form);

    const addAddressToDB = () => {
        addAddress({
            email: auth.currentUser?.email,
            streetnumber: streetnumber,
            city: city,
            state: state,
            zip: zip,
        })

    }
    return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground source={require('../../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
          <View style={styles.box1}>
            <Text style={styles.h1}>Add Address</Text>
            <View style={styles.backbutton}>
             <Button title="Back" color="white" onPress={() => navigation.navigate('Addresses')}/>
            </View>
            
                <Text style={styles.email}>Street Address: *</Text>
                <TextInput
                        style={styles.input}
                        value = {streetnumber}
                        onChangeText={text => setStreetnumber(text)}
                        placeholder="Enter Street Address"
                        keyboardType="default"
                />

                <Text style={styles.email}>City: *</Text>
                <TextInput
                        style={styles.input}
                        value = {city}
                        onChangeText={text => setCity(text)}
                        placeholder="Enter City"
                        keyboardType="default"
                />

                <Text style={styles.email}>State: *</Text>
                <TextInput
                        style={styles.input}
                        value = {state}
                        onChangeText={text => setState(text)}
                        placeholder="Enter State"
                        keyboardType="default"
                />

                <Text style={styles.email}>Zip Code: *</Text>
                <TextInput
                        style={styles.input}
                        value = {zip}
                        onChangeText={text => setZip(text)}
                        placeholder="Enter Zip Code"
                        keyboardType="numeric"
                />

            
          </View>
          <View style={styles.paybutton}>
                <Button
                  title="Add Address"
                  color="black"
                  onPress={addAddressToDB}
                //   onPress={() => navigation.navigate("AddCard")}
                />
              </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )}
 
  const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      image: {
        flex: 1,
        justifyContent: "center"
      },
      box1: {
        position: "absolute",
        width:"95%",
        height: "80%",
        top:"10%",
        left: "2%",
        backgroundColor: "#CDCABF",
        borderWidth: 3,
        borderRadius: 20,
      },
      h1: {
        position: "absolute",
        top: 40,
        left: 40,
        fontWeight: "bold",
        fontSize: 36,
        lineHeight: 42,
      },
      box2: {
        position: "absolute",
        // width: "50%",
        // height: 69,
        // left: "1%",
        top: "20%",
      },
      h2: {
        fontSize: 20,
        lineHeight: 23,
        display: "flex",
      },
      box3: {
        position: 'absolute',
        width: 252,
        height: 28,
        left: 40,
        top: 275,
      },
      head3: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      box4: {
        position: 'absolute',
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
        backgroundColor:"#DAAC3F", 
        position: "absolute",
        borderWidth: 1,
      },
      backbutton: {
        width: '18%', 
        height: 40,
        // top: 65,
        right: 0,
        backgroundColor:"#DAAC3F", 
        position: "absolute"
    },
    paybutton: {
        width: "77%",
        height: "5%",
        bottom: "25%",
        left: "10%",
        backgroundColor: "#DAAC3F",
        position: "absolute",
      },
      email: {
        top: "20%",
        color: "black",
       
        fontSize: 20,
        lineHeight: 44,
        fontWeight: "bold",
        textAlign: "left",
    
        left: "2%",
      },
      input: {
        height: "4%",
        margin: "1%",
        width: "90%",
        borderWidth: 1,
        padding: "1%",
        backgroundColor: "white",
        top: "20%",
        left: "2%",
      },
  })