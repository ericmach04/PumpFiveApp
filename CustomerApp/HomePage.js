import { ImageBackground, Image, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const image = {uri: "https://play-lh.googleusercontent.com/ydkcSXReYXTWms08p6NbzkK85tOpQzcsM227Y2fVvyZXy5-TmZf594XfHZzATPjiFQ"}
export default function HomePage() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
      <Image
        style={styles.Logo}
        source={image}
      />
      <View style={styles.rect1}/>
      <View style={styles.rect2}/>
      <View style={styles.fixToText}>
        <View style={styles.buttonsContainer}>
        
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
  Logo: {
    position: 'absolute',
    width: 225,
    height: 225,
    left: 83,
    top: 48,
  },
  rect1: {
    position: 'absolute',
    width: 350,
    height: 243,
    left: 21,
    top: 287,
    backgroundColor: '#CDCABF',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 10,
  },
  rect2: {
    position: 'absolute',
    width: 350,
    height: 122,
    left: 21,
    top: 544,
    backgroundColor: '#CDCABF',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 10,
  },
})
