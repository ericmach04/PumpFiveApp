import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button, TextInput, UselessTextInput, Picker, ScrollView } from 'react-native'
import React, { Component } from 'react'
import {useState} from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import TimeDropdown from "./dropdowns/TimeDropdown";
import DayDropdown from "./dropdowns/DayDropdown";
import GasDropdown from "./dropdowns/GasDropdown";
import PaymentDropdown from './dropdowns/PaymentDropdown';
import AddressDropdown from './dropdowns/AddressDropdown';
import CarDropdown from './dropdowns/CarDropdown';

import returnKeyVals from './dropdowns/AddressDropdown';

export default class GasService extends Component{

  constructor(props) {
    super(props);
    // this.docs = firebase.firestore().collection("Addresses");
    // this.userdocs = firebase.firestore().collection("Users");
    this.state = {
      reviewpressed: false,
      
    };
  }
  childToParent(){
    console.log("This is an alert from the Child Component")
  }

  setAddressData(){

  }

  changePages() {
    const state = this.state;
    // console.log("State: ", state)
    state["reviewpressed"] = true;
    this.setState(state)

    // console.log(returnKeyVals)
  }

  render(){

  console.log("reviewpressed?: ", this.state.reviewpressed)
  if(this.state.reviewpressed == false) {
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
                              onPress={() => this.props.navigation.goBack()}
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
                    
                    <View style={styles.address}>
                        <Text style={styles.boxfontshead}>Address</Text>
                        <Text style={styles.boxfontsbody}>Please Select an Address</Text>
                        <AddressDropdown></AddressDropdown>

                          
                    </View>

                    <View style={styles.carInfo}>
                        <Text style={styles.boxfontshead}>Car Information</Text>
                        <Text style={styles.boxfontsbody}>Please Select a Car</Text>
                        <CarDropdown></CarDropdown>

                          
                    </View>

                    <View style={styles.paymentinfo}>
                        <Text style={styles.boxfontshead}>Payment Information</Text>
                        <PaymentDropdown/>
                    </View>

                    <View style={styles.paybutton}>
                              <Button
                              title="Review Order"
                              color="white"
                              onPress={() => this.changePages()}
                            /> 
                          
                            
                        </View> 
                    
                    </ScrollView>
                
            {/* </SafeAreaView> */}
            </SafeAreaView>
         </ImageBackground>   
    </View>
  )
  }
  else{
    return(
    <View style={styles.container}>
    <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
       {/* <SafeAreaView style={styles.container}> */}
         
           <SafeAreaView style={styles.container}>
             <Text style={styles.text}>
                 Review Order
             </Text>
             <View style={buttonstyles.backbutton}>
                         <Button
                         title="Back"
                         color="white"
                         // onPress={() => console.log('Clicked')}
                         onPress={() => this.props.navigation.goBack()}
                       />
                       </View>
         
       
           
             <ScrollView style={styles.scroll}>
               <View style={styles.gasservice}>
                 
                   <Text style={styles.boxfontshead}>A Review of Your Order</Text>
                   {/* <Text style={styles.subheadings}>Schedule</Text> */}
                    <View style={styles.revieworder}>

                    </View>
                  
                   
               </View>
               
               

               

               

               <View style={styles.paybutton2}>
                         <Button
                         title="Checkout"
                         color="white"
                        //  onPress={() => this.checkCards()}
                       /> 
                     
                       
                   </View> 
               
               </ScrollView>
           
       {/* </SafeAreaView> */}
       </SafeAreaView>
    </ImageBackground>   
</View>
    )
  }
}

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
      paybutton: {
        // width: "77%",
        // height: "7%",
        bottom: "2%",
        left: "35%",
        borderRadius: 30,
        backgroundColor: "#DAAC3F",
        position: "absolute",
        // justifyContent: "center",
      },
      paybutton2: {
        // width: "77%",
        // height: "7%",
        bottom: "5.5%",
        left: "38%",
        borderRadius: 30,
        backgroundColor: "#DAAC3F",
        position: "absolute",
        // alignItems: "center",
      },

      image: {
        flex: 1,
        justifyContent: "center"
      },

      text: {
        color: "white",
        fontSize: 35,
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
        height: 450,
        left: "5%",
        right: "5%",
        //top: "0%",
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
        marginBottom: 20,
    },
    revieworder: {
      // flex: 1,
      width: "100%",
      height: 350,
      // left: "1%",
      // right: "1%",
      top: "5%",
      backgroundColor: '#FFFFFF',
      borderWidth: 2,
      borderColor: '#000000',
      borderRadius: 10,
      marginBottom: 20,
  },

      address:{
        flex: 1,
        width: "90%",
        height: 700,
        left: "5%",
        right: "5%",
        //top: "0%",
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
        marginBottom: 20,
      },
      carInfo:{
        flex: 1,
        width: "90%",
        height: 750,
        left: "5%",
        right: "5%",
        //top: "0%",
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
        marginBottom: 20,
      },

      paymentinfo:{
        flex: 1,
        width: "90%",
        height: 750,
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
        textAlign: "center",
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