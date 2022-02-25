import { StyleSheet, Text, View, SafeAreaView, Button, TouchableHighlight, ImageBackground } from 'react-native'
import React from 'react'

export default function Login() {
  return (
    <SafeAreaView>
      <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>

        <Text numberOfLines={2}>PumpFive </Text>
        <Text>Fuel Delivery Service</Text>

        <Text>
        Login
        </Text>

        <Text> Please sign in to continue</Text>

        <Text>Email:</Text>

        <Text>Password:</Text>

        <Button title='LOGIN' onPress={() => console.log("button works")}/>

        <Text>New User?</Text> 
        <TouchableHighlight onPress={() => console.log("Touchable works")}>

          <Text>Sign up</Text>
        </TouchableHighlight>
      </ImageBackground>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})