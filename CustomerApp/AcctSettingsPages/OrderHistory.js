import { StyleSheet, Text, View, ImageBackground, Button} from 'react-native'
import React from 'react';

export default function OrderHistory({ navigation }) {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
          <View style={styles.box1}>
            <View style={styles.backbutton}>
             <Button title="Back" color="white" onPress={() => navigation.goBack()}/>
            </View>
            <View>
                <Text style={styles.h1}>Order History</Text>
            </View>
            {/* <View style={styles.section1}>
                <Text style={styles.texth1}>Fuel Delivery Service</Text>
                <View style= {styles.textp}>
                <Text>2021-06-17</Text>
                <Text>Delivered</Text>
                </View>
                <View style={styles.button1}>
                    <Button title="View Receipt"/>
                </View>
            </View>
            <View style={styles.section2}>
            <Text style={styles.texth1}>Tire Service</Text>
                <View style= {styles.textp}>
                <Text>2021-06-17</Text>
                <Text>Delivered</Text>
                </View>
                <View style={styles.button1}>
                    <Button title="View Receipt"/>
                </View>

            </View> */}
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
      button: {
        width: 100, 
        height: 40,
        top: 5,
        left: 220,
        backgroundColor:"#DAAC3F", 
        position: "absolute",
        borderWidth: 1,
      },
      backbutton: {
        width: '18%', 
        height: 40,
        // top: 65,
        right: 0,
        backgroundColor:"#DAAC3F", 
        position: "absolute"
    },
      h1: {
        position: "absolute",
        top: 40,
        left: 40,
        fontWeight: "bold",
        fontSize: 36,
        lineHeight: 42,
      },
      section1: {
          position: 'absolute',
          width: 292,
          height:164,
          left:20,
          top:179,
          borderWidth: 1,
          borderRadius: 20,
      },
      section2: {
        position: 'absolute',
        width: 292,
        height:164,
        left:20,
        top:361,
        borderWidth: 1,
        borderRadius: 20,
    },
    texth1: {
        width: 267,
        height:50,
        top:15,
        left:20,
        fontSize: 24,
        fontWeight: "bold",
    },
    textp: {
        left: 20,

    },
    button1: {
        width: 292,
        backgroundColor: "#DAAC3F", 
        height:35,
        top:44,
        borderWidth: 1,
        left: -1,
    }
  })
  