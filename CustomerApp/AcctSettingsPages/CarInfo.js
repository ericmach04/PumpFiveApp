import { ImageBackground, Image, Button, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//car info Page - In Progresss 

export default function AddressesCarInfo({ navigation }) {
    return(
        <View style={styles.container}>
        <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
        <SafeAreaView style={styles.container}>
    
        <Text style={styles.text}> Car Information </Text>
        <View style={styles.carInfo}>
            
        <Text style={styles.boxfontshead}> User Email: </Text>
  
        <Text style={styles.boxfontsbody}>a1234@gmail.com</Text>
                  <Text style={styles.boxfontsbody}>Member Number: 773123456789</Text>
                  <Text style={styles.boxfontsbody}>User Phone Number: 414-***-**** </Text>
                 </View>
  
  
    
        <View style={Logoutstyles.button}>       
            <Button 
              title="< == "
              color="black"
              onPress={() => navigation.navigate('HomePage')}
            />
    
                 
                      
            
                      
                      <View style={Logoutstyles.button}>       
                            <Button 
                             title="==>"
                             color="black"
                             onPress={() => navigation.navigate('Login')}
                            /> </View>
    
                     
                     
                    
    
                     
                      <Text style={styles.mmlfontsbody}> Make: Toyota </Text>
                      <Text style={styles.mmlfontsbody}> Model: Camry </Text>
                      <Text style={styles.licfontsbody}> License Plate: 123abc </Text>


                      <Text style={styles.mmlfontsbody}> Photos </Text>
                      <Image 
                      style={styles.Logo}
                      source={{
                          width: 200,
                          height:300,
                          uri: "data:image/jpeg;base64,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",
                      }} />
    
                     
                        
                      
    
                      
    
                      
    
                    </View>
                    </SafeAreaView>
                    </ImageBackground>
                    </View>
    
       
        
    )}
    
    const buttonstyles = StyleSheet.create({
      button: { 
          width: 100, 
          height: 40,
          bottom: 5,
          right: 10,
          color: "white",
          borderWidth: 1, 
          backgroundColor:"#DAAC3F", 
          position: "absolute"
      }
    })
    
    const Logoutstyles = StyleSheet.create({
      Logoutstyles: { 
          
      color: "black",
      fontSize: 48,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "right",
      flex: 1,
      top: 30,
      right: 50,
      position: "absolute"
          
      }
    })
    
    
    const styles = StyleSheet.create({
      container: {
          flex: 1,
        },
    
        UserAccount:{
          flexDirection: "column",
          justifyContent: "space-around"
      },

      Logo: {
        position: 'absolute',
        width: 225,
        height: 225,
        left: 83,
        top: 48,
      },
    
    
      carInfo: {
        position: 'absolute',
        width: 350,
        height: 620,
        left: 21,
        top: 120,
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
    },
    
    text: {
      color: "black",
      fontSize: 48,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "center",
      flex: 1,
      top: 30,
    },
    
    
    // Addresses
    addrfontshead:{
      color: "black",
      fontSize: 24,
      lineHeight: 30,
      fontWeight: "bold",
      textAlign: "center",
      top: 20,
      left: 5,
    },
    
    //Your Membership: 
    memfontshead:{
      color: "black",
      fontSize: 24,
      lineHeight: 30,
      fontWeight: "bold",
      textAlign: "center",
      top: 40,
      left: 5,
    },
    
    //mem2
    mem2fontsbody:{
      color: "black",
      lineHeight: 30,
      textAlign: "center",
      top: 40,
      right: -15,
    },
    
    //mml
    mmlfontsbody:{
      color: "black",
      lineHeight: 30,
      textAlign: "center",
      top: 60,
      right: -15,
    },
    
    //lic
    licfontsbody:{
      color: "black",
      lineHeight: 30,
      textAlign: "center",
      top: 50,
      right: -15,
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
    
        image: {
          flex: 1,
          justifyContent: "center"
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

    
    
