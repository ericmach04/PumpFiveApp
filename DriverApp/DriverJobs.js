import { StyleSheet, Text, View, ImageBackground, Button, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native'
import React, { Component } from 'react';
import firebase from 'firebase'
import {auth} from '../firebase'

//Research how to do a column flex for these objects

export default class DriverJobs extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection("Orders");
    this.state = {
      isLoading: true,
      orders: [],
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
    const orders = [];
    var units=''
    querySnapshot.forEach((res) => {
      const { email, fulfilled, deliverydate, quantity, make, model, year, type, service, ordernumber, cancelled} = res.data();
      console.log("epicemail: ", email)
      console.log("auth: ", auth.currentUser?.email)
      if (cancelled=="no" && fulfilled=="no" && email=="ericmach04@yahoo.com") {
        if(service == 'gas'){
          units = "gallons of " + type + " gas"
        }
        else if (service == 'tire'){
          units = "tires"
        }
        orders.push({
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
      orders,
      isLoading: false,
    });
    console.log("orders: ", this.state.orders)
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
    console.log("orders: ", this.state.orders)
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
          <View style={styles.box1}>
            <View style={styles.backbutton}>
             <Button title="Back" color="white" onPress={() => this.props.navigation.goBack()}/>
            </View>
            <View>
                <Text style={styles.h1}>Jobs for Today</Text>
            </View>

            <View style={styles.scrollbox}>
            <ScrollView style={styles.scroll1}>
            
            {this.state.orders.map((res, i) => {
              // count += 1;

              return (
                
                <View style={styles.section}>
                  <View>
                    <Text style={styles.bofadeeznutsbold}>
                    {/* {res.service.toUpperCase()} Delivery Service */}
                    {res.service}
                    </Text>
                  </View>

                  
                   <View style= {styles.textp}>
                      <Text>{res.quantity} {res.units} delivered to {res.year} {res.make} {res.model}</Text>
                      <Text>Date of Order: {res.deliverydate}</Text>
                      <Text>Delivered?:  {res.fulfilled}</Text>
                      <Text>O. no.:  {res.ordernumber}</Text>
                      {/* <Text>Order#:  {res.ordernumber}</Text> */}
                  </View>
                 
                   <TouchableOpacity style={styles.button1}>
                    <Button 
                    title="View All Details"
                    onPress={() => this.props.navigation.navigate('Receipt', {
                      userkey: res.ordernumber
                    })}/>
                    </TouchableOpacity>
                </View>
              );
            })}
            </ScrollView>
            </View>
            {/* <View style={styles.scrollbox}> */}
            {/* <ScrollView style={styles.scroll1}> */}

            {/* {
            this.state.orders.map((res, i) => {
              <View style={styles.section}>
                <Text>Here</Text>
                <Text style={styles.texth1}>{res.service} Delivery Service</Text>
                <View style= {styles.textp}>
                  <Text>{res.quantity} {res.units} delivered to {res.year} {res.make} {res.model}</Text>
                  <Text>Date of Order: {res.deliverydate}</Text>
                  <Text>Delivered?:  {res.fulfilled}</Text>
                </View>
                <View style={styles.button1}>
                    <Button title="View Receipt"/>
               </View>
             </View>

            }
            )
          } */}
            {/* </ScrollView> */}
            {/* </View> */}
          </View>
        </ImageBackground>
      </View>
  )
}}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center",
    },
  
    //Addresses Box
    box1: {
      position: "absolute",
      width: 338,
      height: 672,
      top: 74,
      left: 24,
      backgroundColor: "#CDCABF",
      borderWidth: 3,
      borderRadius: 20,
    },
  
    //Bounding Box
    BoundingBox: {
      backgroundColor: "#CDCABF",
      //borderWidth: 2,
      borderColor: "#000000",
      backgroundColor: "#FFFFFF",
      borderRadius: 5,
      marginBottom: 5,
    },
    section: {
      // position: 'absolute',
      width: "95%",
      height:164,
      left:"1%",
      // top:"5%",
      borderWidth: 1,
      borderRadius: 20,
      marginBottom: 15,
  },
  
    //Addresses Underlined Header
    h1: {
      position: "absolute",
      top: 40,
      left: "23%",
      fontWeight: "bold",
      fontSize: 36,
      lineHeight: 42,
      textDecorationLine: "underline",
    },
    box2: {
      position: "absolute",
      width: 277,
      height: 69,
      left: 40,
      top: 150,
    },
  
    //Address,City,State,Zip Text
    bofadeeznuts: {
      //Made Change:       //Keep: textAlign, color, fontSize,
      color: "black",
      fontSize: 25,
      top: "100%",
      left: "0.5%",
      // lineHeight: 20,
      //fontWeight: "bold",
      //textAlign: "center",
    },
  
    //Addresses Bold Header
    bofadeeznutsbold: {
      // Keep: color, fontSize, fontweight, textAlign // Changes: pos:abs, del col,
      color: "black",
      fontSize: 25,
      top: "10%",
      //height: "40%",
      fontWeight: "bold",
      textAlign: "center",
    },
    h2: {
      fontSize: 20,
      lineHeight: 23,
      display: "flex",
    },
    box3: {
      position: "absolute",
      width: 252,
      height: 28,
      left: 40,
      top: 275,
    },
    head3: {
      fontSize: 24,
      fontWeight: "bold",
    },
    box4: {
      position: "absolute",
      width: 212,
      height: 84,
      left: 40,
      top: 347,
    },
    button: {
      width: "50%",
      height: 40,
      bottom: "2%",
      // left: 220,
      backgroundColor: "#DAAC3F",
      position: "absolute",
      borderWidth: 1,
    },
    backbutton: {
      width: "18%",
      height: 40,
      // top: 65,
      right: 0,
      backgroundColor: "#DAAC3F",
      position: "absolute",
    },
    loader: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    scrollbox: {
      flex: 0.7,
      width: "90%",
      left: "5%",
      top: 90,
    },
    scroll1: {
      flex: 1,
    },
    h1: {
      position: "absolute",
      top: 40,
      left: 40,
      fontWeight: "bold",
      fontSize: 36,
      lineHeight: 42,
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
    width: "100%",
    height: 40,
    bottom: "0%",
    // left: 220,
    backgroundColor: "#DAAC3F",
    position: "absolute",
    // borderWidth: 1,
    borderRadius: 20,
  }
  });
  


// export default function PlaceOrder({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
//         <Text style={styles.text}>Jobs for Today </Text>
//         <View style={styles.box1}>
//           <View style={styles.backbutton}>
//            <Button title="Back" color="white" onPress={() => navigation.goBack()}/>
//           </View>
//           {/* <View>
//               <Text style={styles.h1}>Order History</Text>
//           </View> */}
//           <View style={styles.section1}>
//               <Text style={styles.texth1}>Fuel Delivery Service</Text>
//               <View style= {styles.textp}>
//               <Text>2021-06-17</Text>
//               <Text>Vehicle: 2006 Red Toyota Camry</Text>
//               <Text>Licence Plate: J41 9839</Text>
//               </View>
//               <View style={styles.button1}>
//                   <Button title="View Details"/>
//               </View>
//           </View>
//           <View style={styles.section2}>
//           <Text style={styles.texth1}>Tire Service</Text>
//               <View style= {styles.textp}>
//               <Text>2021-06-17</Text>
//               <Text>Vehicle: 2022 Blue BMW M5</Text>
//               <Text>Licence Plate: CUSTPLT</Text>
//               </View>
//               <View style={styles.button1}>
//                   <Button title="View Details"/>
//               </View>

//           </View>
//           <View style={styles.section3}>
//           <Text style={styles.texth1}>Detailing Service</Text>
//               <View style= {styles.textp}>
//               <Text>2021-07-266</Text>
//               <Text>Vehicle: 2009 Black Ford F-150</Text>
//               <Text>Licence Plate: PUMP FIVE5</Text>
//               </View>
//               <View style={styles.button1}>
//                   <Button title="View Details"/>
//               </View>

//           </View>
//         </View>
//       </ImageBackground>
//     </View>
// )
// }

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//     },
//     image: {
//       flex: 1,
//       justifyContent: "center"
//     },
//     box1: {
//       position: "absolute",
//       width:"90%",
//       height: "80%",
//       top:"15%",
//       left: "5%",
//       backgroundColor: "#CDCABF",
//       borderWidth: 3,
//       borderRadius: 20,
//     },
//     button: {
//       width: 100, 
//       height: 40,
//       top: 5,
//       left: 220,
//       backgroundColor:"#DAAC3F", 
//       position: "absolute",
//       borderWidth: 1,
//     },
//     backbutton: {
//       width: '18%', 
//       height: 40,
//       top:"1%",
//       right: "1%",
//       backgroundColor:"#DAAC3F", 
//       position: "absolute"
//   },
//     h1: {
//       position: "absolute",
//       top: 40,
//       left: 40,
//       fontWeight: "bold",
//       fontSize: 36,
//       lineHeight: 42,
//     },
//     section1: {
//         position: 'absolute',
//         width: '90%',
//         height:"28%",
//         left:"5%",
//         top:"10%",
//         borderWidth: 1,
//         borderRadius: 20,
//     },
//     section2: {
//       position: 'absolute',
//       width: '90%',
//       height:"28%",
//       left:"5%",
//       top:"40%",
//       borderWidth: 1,
//       borderRadius: 20,
//   },
//   section3: {
//     position: 'absolute',
//     width: '90%',
//     height:"28%",
//     left:"5%",
//     top:"70%",
//     borderWidth: 1,
//     borderRadius: 20,
// },
//   texth1: {
//       width: 267,
//       height:50,
//       top:15,
//       left:20,
//       fontSize: 24,
//       fontWeight: "bold",
//   },
//   textp: {
//       left: 20,

//   },
//   button1: {
//       width: "90%",
//       backgroundColor: "#DAAC3F", 
//       height:"22%",
//       top:"15%",
//       borderWidth: 1,
//       left: "5%",
//   },
//   text: {
//     color: "white",
//     fontSize: 25,
//     lineHeight: 44,
//     fontWeight: "bold",
//     textAlign: "center",
//     flex: 1,
//     top: "10%",
//   },
// })