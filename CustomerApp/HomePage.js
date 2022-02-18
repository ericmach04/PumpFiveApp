import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      {/* <StatusBar style="auto" /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
