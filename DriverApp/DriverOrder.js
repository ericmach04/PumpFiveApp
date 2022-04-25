import { ImageBackground, Image, StyleSheet, Button, Text, View, Linking, ActivityIndicator } from 'react-native'
import React, { Component, useCallback } from 'react'
import { TouchableOpacity } from 'react-native-web';
import firebase from "firebase"
import {auth} from "../firebase"

const supportedURL = "https://www.pumpfive.com/terms-conditions/";
const supportedURL2 = "https://www.pumpfive.com/contact/";
const map = {uri: "https://entrecourier.com/wp-content/uploads/2020/06/storemap.jpg.webp"}

export default class DriverOrder extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection("Orders");
    this.state = {
      isLoading: true,
      allorders: [],
      units: ''
    };
    
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getOrderData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getOrderData = (querySnapshot) => {
    const allorders = [];
    var units=''
    querySnapshot.forEach((res) => {
      const { email, fulfilled, deliverydate, quantity, make, model, year, type, service, ordernumber} = res.data();
      // console.log("epicemail: ", email)
      // console.log("auth: ", auth.currentUser?.email)
      if (fulfilled=="no" && email=="ericmach04@yahoo.com") {
        if(service == 'gas'){
          units = "gallons of " + type + " gas"
        }
        else if (service == 'tire'){
          units = "tires"
        }
        allorders.push({
          key: res.id,
          fulfilled,
          deliverydate,
          quantity,
          make,
          model,
          year,
          type,
          service,
          ordernumber,
          units: units
        });
      }
    });
    this.setState({
      allorders,
      isLoading: false,
    });
    console.log("orders: ", this.state.allorders)
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }

    var currorder = this.state.allorders.shift()
    console.log("Current order: ", currorder)
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Current Order: (Order Type) </Text>
      <View style={styles.rect1}>
        {/* <Text style={styles.boxfontshead}>Company Updates</Text> */}

        <Image style={styles.Logo} source={require('../images/placeholdermap.png')}/>
        <Text style={styles.boxfontshead}>Customer Name: </Text>
        <Text style={styles.boxfontshead}>Customer Location: </Text>
        <Text style={styles.boxfontshead}>Customer Phone: </Text>
        <Text style={styles.boxfontshead}>Car Model: </Text>
        <Text style={styles.boxfontshead}>Car Make: </Text>
        <Text style={styles.boxfontshead}>License Plate: </Text>
      </View>

      <View style={styles.button}>
      {/* <OpenURLButton color="white" url={supportedURL}>Terms and Conditions</OpenURLButton> */}
        <Button
            title="Job Completed"
            color="white"
            // onPress={() => navigation.navigate('CalendarScreen')}
        />
      </View>
      <View style={styles.button2}>
        <Button
            title="Cancel Order"
            color="white"
            // onPress={() => navigation.navigate('CalendarScreen')}
        />
      {/* <OpenURLButton color="white" url={supportedURL2}>Contact Us</OpenURLButton> */}
      </View>
      </ImageBackground>
    </View>
  )
}
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
    width: "98%",
    height: "50%",
    left: "1%",
    right: "17.5%",
    top: "2%",
  },
  rect1: {
    position: 'absolute',
    width: "90%",
    height: "55%",
    left: "5%",
    right: "5%",
    top: "20%",
    backgroundColor: '#CDCABF',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 10,
  },
  boxfontshead:{
    color: "black",
    fontSize: 15,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "left",
    top: "52%",
    left: "2%",
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
  button: { 
    width: "40%", 
    height: "5%",
    bottom: "15%",
    left: "30%",
    // right: "5%",
    borderRadius: 20,
    backgroundColor:"green", 
    position: "absolute"
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
    width: "40%", 
    height: "5%",
    bottom: "5%",
    left: "30%",
    // right: "5%",
    borderRadius: 20,
    backgroundColor:"#EB8585", 
    position: "absolute"
  },
  text: {
    color: "white",
    fontSize: 25,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    top: "10%",
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

