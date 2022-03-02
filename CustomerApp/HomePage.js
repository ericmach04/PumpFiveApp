import { ImageBackground, Image, StyleSheet, Button, Text, View, Linking } from 'react-native'
import React, { useCallback } from 'react'

const supportedURL = "https://www.pumpfive.com/terms-conditions/";
const supportedURL2 = "https://www.pumpfive.com/contact/";
const map = {uri: "https://entrecourier.com/wp-content/uploads/2020/06/storemap.jpg.webp"}

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

export default function HomePage() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
      <Image
        style={styles.Logo}
        source={require('../images/pumpfivelogo.png')}
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
      <OpenURLButton color="white" url={supportedURL}>Terms and Conditions</OpenURLButton>
      </View>
      <View style={styles.button2}>
      <OpenURLButton color="white" url={supportedURL2}>Contact Us</OpenURLButton>
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
  button1: {
    position: 'absolute',
    width: 195,
    height: 40,
    left: 30,
    top: 690,
    backgroundColor: '#B96835',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },button2: {
    position: 'absolute',
    width: 110,
    height: 40,
    left: 250,
    top: 690,
    backgroundColor: '#B96835',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text1: {
    position: 'absolute',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    top: 555,
    alignSelf: 'center',
  },text2: {
    position: 'absolute',
    fontSize: 18,
    lineHeight: 21,
    top: 585,
    left: 105,
  },text3: {
    position: 'absolute',
    fontSize: 18,
    lineHeight: 21,
    top: 620,
    left: 105,
  },
  map: {
    position: 'absolute',
    width: 313,
    height: 151,
    left: 40,
    top: 315,
  },
  text4: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
    top: 489,
    alignSelf: 'center',
  },
  price1: {
    position: 'absolute',
    width: 74,
    height: 30,
    left: 188,
    top: 579,
    backgroundColor: '#B96835',
    color: "white",
  },
  price2: {
    position: 'absolute',
    width: 74,
    height: 30,
    left: 188,
    top: 616,
    backgroundColor: '#B96835',
    color: "white",
  },
})

