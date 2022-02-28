import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, Button,} from 'react-native'
import React from 'react';

export default function OrderSummary({navigation}) {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={styles.container}>
            <View style={styles.rect1}/>
            <Image source={require('../images/orderexample.png')} resizeMode="cover" style={styles.exm}/>
            <View style={buttonstyles.button}>
                <Button title="Home" color="#DAAC3F" onPress={() => navigation.navigate('HomePage')}/>
            </View>
            <Image
                style={styles.icon}
                source={require('../icons/homeicon.png')}
            />
            </SafeAreaView>
        </ImageBackground>
      </View>
    )
  }
  function OrderScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Text>Home Screen</Text> */}
        <Button
          title="Home"
          onPress={() => navigation.navigate('HomePage')}
        />
      </View>
    );
}
const buttonstyles = StyleSheet.create({
    button: { 
        width: 151, 
        height: 59,
        bottom: 5,
        left: 121,
        top: 684,
        borderRadius: 5, 
        backgroundColor:"#DAAC3F", 
        position: "absolute"
    },
})
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    rect1: {
        position: "absolute",
        width: 331,
        height: 689,
        left: 29,
        top: 67,
        backgroundColor: "#FFFFFF",
        borderWidth: 3,
        borderRadius: 20,
    },
    exm: {
        position: 'absolute',
        width: 315,
        height: 600,
        left: 35,
        top: 80,
    },
    icon: {
        position: 'absolute',
        width: 35,
        height: 35,
        top: 696,
        left: 179,
    },
  })