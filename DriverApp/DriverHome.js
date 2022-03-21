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
      <View style={styles.rect1}>
        <Text style={styles.boxfontshead}>Company Updates</Text>
      </View>
      
      <View style={styles.rect2}>
        <Text style={styles.boxfontsbody}>Number of Drivers in Area: </Text>
      </View>
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
    position: "absolute",
    width: "65%",
    height: "25%",
    left: "17.5%",
    right: "17.5%",
    top: "8%",
  },
  rect1: {
    position: 'absolute',
    width: "90%",
    height: "30%",
    left: "5%",
    right: "5%",
    top: "35%",
    backgroundColor: '#CDCABF',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 10,
  },
  boxfontshead:{
    color: "black",
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "left",
    top: "3%",
    left: "27%",
    // justifyContent: "center",
    // alignItems: "center",
    // alignContent: "center"
  },
  rect2: {
    position: 'absolute',
    width: "90%",
    height: "8%",
    left: "5%",
    right: "5%",
    top: "66%",
    backgroundColor: '#CDCABF',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 10,
  },
  boxfontsbody:{
    color: "black",
    fontSize: 24,
    lineHeight: 30,
    textAlign: "left",
    top: "20%",
    left: "2%",
    right: "2%",
    width: "95%",
  },
  button1: {
    position: 'absolute',
    width: "50%",
    height: "5%",
    left: "5%",
    top: "89%",
    backgroundColor: '#B96835',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    textAlign: "center",
  },
  button2: {
    position: 'absolute',
    width: "28%",
    height: "5%",
    right: "5%",
    top: "89%",
    backgroundColor: '#B96835',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
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
})

