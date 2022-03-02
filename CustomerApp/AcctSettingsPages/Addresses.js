import { StyleSheet, Text, View, ImageBackground, Button} from 'react-native'
import React from 'react';

export default function Addresses({ navigation }) {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
          <View style={styles.box1}>
            <Text style={styles.h1}>Addresses</Text>
            <View style={styles.button}>
             <Button title="Back" color="white" onPress={() => navigation.goBack()}/>
            </View>
            <View style={styles.box2}>
              <Text style={styles.h2}>123@gmail.com</Text>
              <Text style={styles.h2}>Member no. 773123456789</Text>
              <Text style={styles.h2}>414-***-****</Text>
            </View>
            <View style={styles.box3}>
              <Text style={styles.head3}>Default Billing Address</Text>
            </View>
            <View style={styles.box4}>
              <Text style={styles.h2}>123 s 12th St</Text>
              <Text style={styles.h2}>Milwaukee, WI</Text>
              <Text style={styles.h2}>53215</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
  )}
  const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      image: {
        flex: 1,
        justifyContent: "center"
      },
      box1: {
        position: "absolute",
        width:338,
        height: 672,
        top:74,
        left: 24,
        backgroundColor: "#CDCABF",
        borderWidth: 3,
        borderRadius: 20,
      },
      h1: {
        position: "absolute",
        top: 40,
        left: 40,
        fontWeight: "bold",
        fontSize: 36,
        lineHeight: 42,
      },
      box2: {
        position: "absolute",
        width: 277,
        height: 69,
        left: 40,
        top: 150,
      },
      h2: {
        fontSize: 20,
        lineHeight: 23,
        display: "flex",
      },
      box3: {
        position: 'absolute',
        width: 252,
        height: 28,
        left: 40,
        top: 275,
      },
      head3: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      box4: {
        position: 'absolute',
        width: 212,
        height: 84,
        left: 40,
        top: 347,
      },
      button: {
        width: 100, 
        height: 40,
        top: 5,
        left: 220,
        backgroundColor:"#DAAC3F", 
        position: "absolute",
        borderWidth: 1,
      }
  })
  
  
  
  
  
  
  
  
  
    
    //Working on implementation
  
  /* <view>
      rect1: {
          position: 'absolute',
          width: 350,
          height: 243,
          left: 21,
          top: 287,
          backgroundColor: '#CDCABF',
          borderWidth: 2,
          borderColor: '#000000',
          borderRadius: 10,
          },
  </view> */