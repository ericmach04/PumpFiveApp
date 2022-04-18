import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, Button, ScrollView} from 'react-native'
import React, { Component } from 'react';
import firebase from 'firebase'
import {auth} from '../firebase'

export default class OrderSummary extends Component{
  constructor() {
    super();
    this.state = {
      card: '',
      city: '',
      deliverydate: '',
      deliverytime: '',
      discount: '',
      drivercar: '',
      drivername: '',
      email: '',
      fulfilled: '',
      license: '',
      make: '',
      model: '',
      ordernumber: '',
      price: '',
      quantity: 0,
      service: '',
      state: '',
      streetnumber: '',
      subtotal: 0,
      taxes: '',
      type: '',
      year: '',
      zip: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('Orders').doc(this.props.route.params.userkey)
    // const dbRef = firebase.firestore().collection('Orders').doc("YTdzKDUCVZ101z4dQmhn")
    dbRef.get().then((res) => {
      if (res.exists) {
        const order = res.data();
        this.setState({
          card: order.card,
          city: order.city,
          deliverydate: order.deliverydate,
          deliverytime: order.deliverytime,
          discount: order.discount,
          drivercar: order.drivercar,
          drivername: order.drivername,
          email: order.email,
          fulfilled: order.fulfilled,
          license: order.license,
          make: order.make,
          model: order.model,
          ordernumber: order.ordernumber,
          price: order.price,
          quantity: order.quantity,
          service: order.service,
          state: order.state,
          streetnumber: order.streetnumber,
          subtotal: order.subtotal,
          taxes: order.taxes,
          type: order.type,
          year: order.year,
          zip: order.zip,
          
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
            <SafeAreaView style={styles.container}>
            <View style={{flexDirection:'row', justifyContent: 'space-around',}}>
                                  <Text style={styles.text}>Order Summary</Text>
                                  {/* {
      
                                  } */}
                                  <View style={buttonstyles.backbutton}>
                                      <Button
                                      title="Back"
                                      color="white"
                                      //   onPress={() => console.log('Clicked')}
                                      onPress={() => this.props.navigation.navigate('Tabs')}
                                      />
                                  </View>
                              </View>
            
            <View style={styles.rect1}/>
              <View style={styles.gasservice}>
              <ScrollView style={styles.scroll}>
                <Text style={styles.boxfontsbody}>Your Order is Confirmed! Thank You!</Text>
                <Text style={styles.boxfontsbody}>Hi, <Text style={styles.boxfontshead}>{this.state.email}</Text>, 
                your confirmation number is <Text style={styles.boxfontshead}>{this.state.ordernumber}</Text></Text>
                <View
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: 2,
                        }}
                      />
                <Text style={styles.boxfontsbody}>Purchase Info: <Text style={styles.boxfontshead}>{this.state.service} service</Text></Text>
                <Text style={styles.boxfontsbody}><Text style={styles.boxfontshead}>{this.state.quantity}</Text> gallons of 
                <Text style={styles.boxfontshead}> {this.state.type}</Text> gasoline</Text>
                <View
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: 2,
                        }}
                      />

                <View style={{flexDirection:'row', flexWrap:'nowrap', zIndex: 1}}>
                        <View>
                          <Text style={styles.boxfontsbody}>{this.state.type} gas price per gallon: </Text>
                          <Text style={styles.boxfontsbody}>Number of gallons: </Text>
                          
                        </View>

                        <View>
                          <Text style={styles.boxfontshead}>${this.state.price} </Text>
                          <Text style={styles.boxfontshead}>x  {this.state.quantity} </Text>
                          
                        </View>
                        
                </View>

                <View
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: 1,
                        }}
                      />
                <View style={{flexDirection:'row', flexWrap:'nowrap', zIndex: 1}}>
                  <View>
                    <Text style={styles.boxfontsbody}>Sub Total: </Text>
                    <Text style={styles.boxfontsbody}>Taxes: </Text>
                    <Text style={styles.boxfontsbody}>Discounts: </Text>
                  </View>

                  <View>
                    <Text style={styles.boxfontshead}>{this.state.subtotal}</Text>
                    <Text style={styles.boxfontshead}>+ {this.state.taxes}</Text>
                    <Text style={styles.boxfontshead}>- {this.state.discount}</Text>
                  </View>

                </View>
                <View
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: 1,
                        }}
                      />
                <View style={{flexDirection:'row', flexWrap:'nowrap', zIndex: 1}}>
                <View>
                    <Text style={styles.boxfontsbody}>Total: </Text>
                  </View>
                        {/* Change this to total later when accounting for tax and discounts */}
                  <View>
                    <Text style={styles.boxfontshead}>{this.state.subtotal}</Text>
                  </View>
                
                </View>

                <Text style={styles.boxfontsbody}>Paid using: <Text style={styles.boxfontshead}>{this.state.card}</Text></Text>
                <View
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: 2,
                        }}
                      />
                <Text style={styles.boxfontsbody}>Deliver To: <Text style={styles.boxfontshead}>{this.state.year} {this.state.make} {this.state.model}</Text></Text>
                <Text style={styles.boxfontsbody}>License Plate: <Text style={styles.boxfontshead}>{this.state.license}</Text></Text>
                <Text style={styles.boxfontsbody}>at</Text>
                <Text style={styles.boxfontshead}>{this.state.streetnumber}</Text>
                <Text style={styles.boxfontshead}>{this.state.city}, {this.state.state}, {this.state.zip}</Text>
                <View
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: 2,
                        }}
                      />

                <Text style={styles.boxfontshead}>Delivery Driver Info:</Text>
                <Text style={styles.boxfontsbody}><Text style={styles.boxfontshead}>{this.state.drivername}</Text> will deliver your order on
                <Text style={styles.boxfontshead}>{this.state.deliverydate}</Text> at <Text style={styles.boxfontshead}>{this.state.deliverytime}</Text>.</Text>

                <Text style={styles.boxfontsbody}><Text style={styles.boxfontshead}>{this.state.drivername}</Text> will be driving a 
                <Text style={styles.boxfontshead}>{this.state.drivercar}</Text></Text>

                <View style={buttonstyles.button}>
                  <Button title="Home" color="white" onPress={() => this.props.navigation.navigate('Tabs')}/>
                </View>
                {/* <View style={buttonstyles.button2}>
                  <Button title="Home" color="white" onPress={() => this.props.navigation.navigate('Tabs')}/>
                </View> */}
                </ScrollView>

              </View>
              
              
            
            </SafeAreaView>
        </ImageBackground>
      </View>
    )
  }
  }

const buttonstyles = StyleSheet.create({
  button: { 
    position: "absolute",
    width: 151,
    height: 45,
    top: "100%",
    left: 121,
    backgroundColor:"#DAAC3F", 
    borderRadius: 5,
  },
  button2: { 
    position: "absolute",
    width: 151,
    height: 45,
    top: "50%",
    left: "60%",
    backgroundColor:"#DAAC3F", 
    borderRadius: 5,
  },
  backbutton: {
    width: '18%', 
    height: 40,
    // top: 65,
    right: 0,
    backgroundColor:"#DAAC3F", 
    position: "absolute"
},
})
  
const styles = StyleSheet.create({
  container: {
      flex: 1,
    },
    paybutton: {
      // width: "77%",
      // height: "7%",
      bottom: "2%",
      left: "35%",
      borderRadius: 30,
      backgroundColor: "#DAAC3F",
      position: "absolute",
      // justifyContent: "center",
    },
    paybutton2: {
      // width: "77%",
      // height: "7%",
      bottom: "1.5%",
      left: "20%",
      borderRadius: 30,
      backgroundColor: "#DAAC3F",
      position: "absolute",
      // alignItems: "center",
    },
    paybutton3: {
      // width: "77%",
      // height: "7%",
      bottom: "5.5%",
      right: "20%",
      borderRadius: 30,
      backgroundColor: "#DAAC3F",
      position: "absolute",
      // alignItems: "center",
    },

    image: {
      flex: 1,
      justifyContent: "center"
    },

    text: {
      color: "white",
      fontSize: 35,
      lineHeight: 70,
      fontWeight: "bold",
      textAlign: "center",
      // flex: 1,
      top: 0,
    },

    services:{
        flexDirection: "column",
        justifyContent: "space-around"
    },

    gasservice: {
      flex: 1,
      width: "90%",
      height: 450,
      left: "5%",
      right: "5%",
      //top: "0%",
      backgroundColor: '#FFFFFF',
      borderWidth: 2,
      borderColor: '#000000',
      borderRadius: 10,
      marginBottom: 20,
  },
  revieworder: {
    // flex: 1,
    width: "100%",
    height: 350,
    // left: "1%",
    // right: "1%",
    top: "5%",
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
    marginBottom: 20,
},

    address:{
      flex: 1,
      width: "90%",
      height: 700,
      left: "5%",
      right: "5%",
      //top: "0%",
      backgroundColor: '#CDCABF',
      borderWidth: 2,
      borderColor: '#000000',
      borderRadius: 10,
      marginBottom: 20,
    },
    carInfo:{
      flex: 1,
      width: "90%",
      height: 750,
      left: "5%",
      right: "5%",
      //top: "0%",
      backgroundColor: '#CDCABF',
      borderWidth: 2,
      borderColor: '#000000',
      borderRadius: 10,
      marginBottom: 20,
    },

    paymentinfo:{
      flex: 1,
      width: "90%",
      height: 750,
      left: "5%",
      right: "5%",
      //top: "0%",
      backgroundColor: '#CDCABF',
      borderWidth: 2,
      borderColor: '#000000',
      borderRadius: 10,
      marginBottom: 20,
    },

    boxfontshead:{
      color: "black",
      fontSize: 20,
      lineHeight: 30,
      fontWeight: "bold",
      textAlign: "left",
      top: 5,
      left: 5,
    },

    boxfontsbody:{
      color: "black",
      fontSize: 20,
      lineHeight: 30,
      textAlign: "left",
      top: 5,
      left: 5,
    },

    subheadings:{
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
      lineHeight: 30,
      textAlign: "left",
      top: 5,
      left: 10,
    },
    input: {
      height: 40,
      margin: 5,
      borderWidth: 1,
      padding: 5,
      backgroundColor: "white",
    },
    promoinput: {
      height: 40,
      width: '50%',
      margin: 5,
      borderWidth: 1,
      padding: 5,
      backgroundColor: "white",
    },
    promobutton: {
      // position: 'absolute',
      left: 21,
      top: 300,
      flexDirection:'row', 
      flexWrap:'wrap',
    },
    checkoutback: {
      flexDirection:'row', 
      flexWrap:'wrap',
    },


})