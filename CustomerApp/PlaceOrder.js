import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button, Alert } from 'react-native'
import { useHistory } from "react-router-dom";
import React from 'react'
import GasService from './GasService';
import GasButton from '../CustomerApp/buttons/GasButton'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Tabs from '../navigation/tabs';


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
    // <View>
    //   <Text>PlaceOrder</Text>
    // </View>
    <View style={styles.container}>
        <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>
                    Services
                </Text>
                <View style={styles.container}>
                    <View style={styles.gasservice}>
                        <Text style={styles.boxfontshead}>Gas Services</Text>
                        <Text style={styles.boxfontsbody}>Because you hate going to the gas station!</Text>
                        <Text style={styles.boxfontsbody}>Because those extra 20 minutes in the morning matter.</Text>
                        <View style={buttonstyles.button}>
                          {/* <Text>Home Screen</Text> */}
                          <Button
                            title="Book Now"
                            color="white"
                            onPress={() => navigation.navigate('GasService')}
                          />
                            
                        </View>
                        
                    </View>
                    <View style={styles.tireservice}>
                        <Text style={styles.boxfontshead}>Tire Services</Text>
                        <Text style={styles.boxfontsbody}>PumpFive can provide you with quick tire service. Book your service and we
                        will get back to you in 24 hours.</Text>
                        <View style={buttonstyles.button}>
                        <Button
                            title="Book Now"
                            color="white"
                            onPress={() => navigation.navigate('TireService')}
                          />
                        </View>
                    </View>
                    <View style={styles.detailingservice}>
                        <Text style={styles.boxfontshead}>Detailing Services</Text>
                            <Text style={styles.boxfontsbody}>PumpFive can provide you with quick detailing service. Book your service and we
                            will get back to you in 24 hours.</Text>
                            <View style={buttonstyles.button}>
                              <Button
                              title="Book Now"
                              color="white"
                              onPress={() => navigation.navigate('DetailingService')}
                            />
                            </View>
                        </View>
                </View>
                {/* <NavigationContainer>
                    <Tabs />
                </NavigationContainer> */}
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