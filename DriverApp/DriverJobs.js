import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button, Alert } from 'react-native'
import { useHistory } from "react-router-dom";
import React from 'react'
// import GasService from './GasService';
// import GasButton from '../CustomerApp/buttons/GasButton'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Tabs from '../navigation/tabs';

//Research how to do a column flex for these objects


const image = { uri: "https://reactjs.org/logo-og.png" };

const GasStack = createStackNavigator();

// function GasScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('GasService')}
//       />
//     </View>
//   );
// }


export default function PlaceOrder({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Jobs for Today </Text>
        <View style={styles.box1}>
          <View style={styles.backbutton}>
           <Button title="Back" color="white" onPress={() => navigation.goBack()}/>
          </View>
          {/* <View>
              <Text style={styles.h1}>Order History</Text>
          </View> */}
          <View style={styles.section1}>
              <Text style={styles.texth1}>Fuel Delivery Service</Text>
              <View style= {styles.textp}>
              <Text>2021-06-17</Text>
              <Text>Vehicle: 2006 Red Toyota Camry</Text>
              <Text>Licence Plate: J41 9839</Text>
              </View>
              <View style={styles.button1}>
                  <Button title="View Details"/>
              </View>
          </View>
          <View style={styles.section2}>
          <Text style={styles.texth1}>Tire Service</Text>
              <View style= {styles.textp}>
              <Text>2021-06-17</Text>
              <Text>Vehicle: 2022 Blue BMW M5</Text>
              <Text>Licence Plate: CUSTPLT</Text>
              </View>
              <View style={styles.button1}>
                  <Button title="View Details"/>
              </View>

          </View>
          <View style={styles.section3}>
          <Text style={styles.texth1}>Detailing Service</Text>
              <View style= {styles.textp}>
              <Text>2021-07-266</Text>
              <Text>Vehicle: 2009 Black Ford F-150</Text>
              <Text>Licence Plate: PUMP FIVE5</Text>
              </View>
              <View style={styles.button1}>
                  <Button title="View Details"/>
              </View>

          </View>
        </View>
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
    box1: {
      position: "absolute",
      width:"90%",
      height: "80%",
      top:"15%",
      left: "5%",
      backgroundColor: "#CDCABF",
      borderWidth: 3,
      borderRadius: 20,
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
      top:"1%",
      right: "1%",
      backgroundColor:"#DAAC3F", 
      position: "absolute"
  },
    h1: {
      position: "absolute",
      top: 40,
      left: 40,
      fontWeight: "bold",
      fontSize: 36,
      lineHeight: 42,
    },
    section1: {
        position: 'absolute',
        width: '90%',
        height:"28%",
        left:"5%",
        top:"10%",
        borderWidth: 1,
        borderRadius: 20,
    },
    section2: {
      position: 'absolute',
      width: '90%',
      height:"28%",
      left:"5%",
      top:"40%",
      borderWidth: 1,
      borderRadius: 20,
  },
  section3: {
    position: 'absolute',
    width: '90%',
    height:"28%",
    left:"5%",
    top:"70%",
    borderWidth: 1,
    borderRadius: 20,
},
  texth1: {
      width: 267,
      height:50,
      top:15,
      left:20,
      fontSize: 24,
      fontWeight: "bold",
  },
  textp: {
      left: 20,

  },
  button1: {
      width: "90%",
      backgroundColor: "#DAAC3F", 
      height:"22%",
      top:"15%",
      borderWidth: 1,
      left: "5%",
  },
  text: {
    color: "white",
    fontSize: 25,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    top: "10%",
  },
})