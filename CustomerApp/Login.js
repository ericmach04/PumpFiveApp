import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'
import React from 'react'

export default function Login() {
  return (
    <SafeAreaView>
      <Text numberOfLines={2}>PumpFive </Text>
      <Text>Fuel Delivery Service</Text>

      <Text>
        Login
      </Text>

      <Text> Please sign in to continue</Text>

      <Text>Email:</Text>

      <Text>Password:</Text>

      <Button title='LOGIN' onPress={() => console.log("button works")}/>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})