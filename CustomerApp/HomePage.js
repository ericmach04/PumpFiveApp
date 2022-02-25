import { ImageBackground, Image, StyleSheet, Button, Text, View } from 'react-native'
import React from 'react'


const image = {uri: "https://play-lh.googleusercontent.com/ydkcSXReYXTWms08p6NbzkK85tOpQzcsM227Y2fVvyZXy5-TmZf594XfHZzATPjiFQ"}
const map = {uri: "https://entrecourier.com/wp-content/uploads/2020/06/storemap.jpg.webp"}
export default function HomePage() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
      <Image
        style={styles.Logo}
        source={image}
      />
      <View style={styles.rect1}/>
      <Image
        style={styles.map}
        source={map}
      />
      <Text style={styles.text4}>Number of drivers in the area: 4</Text>
      <View style={styles.rect2}/>
      <Text style={styles.text1}>Gas Price (per Gallon)</Text>
      <Text style={styles.text2}>Regular:</Text>
      <View style={styles.price1}><Text>$3.16</Text></View>
      <Text style={styles.text3}>Premium:</Text>
      <View style={styles.price2}><Text>$3.87</Text></View>
      <View style={styles.button1}>
        <Button
          title="Terms and Conditions" color="white"
          onPress={() => Alert.alert('url')}
        />
      </View>
      <View style={styles.button2}>
        <Button
          title="Contact Us" color="white"
          onPress={() => Alert.alert('Left button pressed')}
        />
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
  },rect2: {
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
