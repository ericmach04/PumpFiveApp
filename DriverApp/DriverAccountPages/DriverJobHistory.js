import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import firebase from "firebase";
import { auth } from "../../firebase";

export default class DriverJobHistory extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection("Orders");

    // this.dbusers = firebase.firestore().collection('Users');
    this.state = {
      isLoading: true,
      orders: [],
      cancelledorders: [],
      count: 0,
      cancelledcount: 0,
      units: "",
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getOrderData);
    // this.dbusers.onSnapshot(this.getUserData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getOrderData = (querySnapshot) => {
    const orders = [];
    const cancelledorders =[];
    var units = "";
    querySnapshot.forEach((res) => {
      const {
        email,
        fulfilled,
        cancelled,
        canceldetails,
        deliverydate,
        driveremail,
        quantity,
        make,
        model,
        year,
        type,
        service,
        ordernumber,
      } = res.data();
      console.log("Email1: ", email)
      console.log("Email2: ", auth.currentUser?.email)
      if ((driveremail == auth.currentUser?.email && fulfilled == "yes") || (driveremail == auth.currentUser?.email && cancelled == "yes")) {
        // this.state.count++
        if(cancelled=="no"){
          if (service == "gas") {
            units = "gallons of " + type + " gas";
          } else if (service == "tire") {
            units = "tires";
          }
          orders.push({
            key: res.id,
            fulfilled,
            cancelled,
            deliverydate,
            quantity,
            make,
            model,
            year,
            type,
            service,
            ordernumber,
            units: units,
          });
        }
        else{
          cancelledorders.push({
            key: res.id,
            fulfilled,
            cancelled,
            canceldetails,
            deliverydate,
            quantity,
            make,
            model,
            year,
            type,
            service,
            ordernumber,
            units: units,
          });
        }
      }
    });
    this.setState({
      orders,
      cancelledorders,
      count: orders.length,
      cancelledcount: cancelledorders.length,
      isLoading: false,
    });
    console.log("orders: ", this.state.orders);
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../images/pumpfivebackground.jpeg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.box1}>
            <View style={styles.backbutton}>
              <Button
                title="Back"
                color="white"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>
           
              
            <Text style={styles.h1}>Job History</Text>
              <Text style={styles.h2}>Total jobs completed: {this.state.count}</Text>
              <Text style={styles.h3}>Total jobs cancelled: {this.state.cancelledcount}</Text>
              
            

            <View style={styles.scrollbox}>
            
              <ScrollView style={styles.scroll1}>
              
              
              
                {this.state.orders.map((res, i) => {
                  // count += 1;

                  return (
                  

                <View style={styles.section}>
                  <View>
                    <Text style={styles.bofadeeznutsbold}>
                    {res.service}
                    </Text>
                  </View>

                      
                      <View style={styles.textp}>
                        <Text>
                          {res.quantity} {res.units} delivered to {res.year}{" "}
                          {res.make} {res.model}
                        </Text>
                        <Text>Date of Order: {res.deliverydate}</Text>
                        <Text>Delivered?: {res.fulfilled}</Text>
                        <Text>Cancelled?: {res.cancelled}</Text>
                        {/* <Text>Order#:  {res.ordernumber}</Text> */}
                      </View>
                     
                      <TouchableOpacity style={styles.button1}>
                        <Button
                          title="View Receipt"
                          onPress={() =>
                            this.props.navigation.navigate("Receipt", {
                              userkey: res.ordernumber,
                            })
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })
                }

                {this.state.cancelledorders.map((res, i) => {
                  // count += 1;

                  return (
                  

                <View style={styles.section}>
                  <View>
                    <Text style={styles.bofadeeznutsbold}>
                    {res.service}
                    </Text>
                  </View>

                      
                      <View style={styles.textp}>
                        <Text>
                          {res.quantity} {res.units} NOT delivered to {res.year}{" "}
                          {res.make} {res.model}
                        </Text>
                        <Text>Date of Order: {res.deliverydate}</Text>
                        <Text>Delivered?: {res.fulfilled}</Text>
                        <Text>Cancelled?: {res.cancelled}</Text>
                        <Text>Reason: {res.canceldetails}</Text>
                        {/* <Text>Order#:  {res.ordernumber}</Text> */}
                      </View>
                     
                      <TouchableOpacity style={styles.button1}>
                        <Button
                          title="View Receipt"
                          onPress={() =>
                            this.props.navigation.navigate("Receipt", {
                              userkey: res.ordernumber,
                            })
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })
                }
              </ScrollView>
            </View>
          
          </View>
        </ImageBackground>
      </View>
    );
  }
}
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
    width: "90%",
    height: "80%",
    top: 74,
    left: "5%",
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
    height: 164,
    left: "1%",
    top:"45%",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 25,
  },

  //Addresses Underlined Header
  // h1: {
  //   position: "absolute",
  //   top: "10%",
  //   left: "23%",
  //   fontWeight: "bold",
  //   fontSize: 36,
  //   lineHeight: 42,
  //   textDecorationLine: "underline",
  // },
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
    width: 100,
    height: 40,
    top: 5,
    left: 220,
    backgroundColor: "#DAAC3F",
    position: "absolute",
    borderWidth: 1,
  },

  //BackButton - Order History
  backbutton: {
    width: "18%",
    height: 40,
    // top: 65,
    right: 0,
    borderRadius: 4,
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
    top: "5%",
  },
  scroll1: {
    flex: 1,
  },
  h1: {
    position: "absolute",
    top: "5%",
    left: 40,
    fontWeight: "bold",
    fontSize: 36,
    lineHeight: 42,
  },
  h2: {
    position: "absolute",
    top: "9%",
    left: 40,
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 42,
  },
  h3: {
    position: "absolute",
    top: "13%",
    left: 40,
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 42,
  },

  section2: {
    position: "absolute",
    width: 292,
    height: 164,
    left: 20,
    // top: 361,
    top: "0%",
    borderWidth: 1,
    borderRadius: 20,
  },
  texth1: {
    width: 267,
    height: 50,
    top: 15,
    left: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  textp: {
    left: 20,
  },

  //View Receipt Button - Order History
  button1: {
    //width: 292,
    width: "101%",
    backgroundColor: "#DAAC3F",
    //height: 35,
    height: "24%",
    //top: 44,
    top: "80%",
    padding: "-5%",
    borderWidth: 1,
    borderRadius: 10,
    //left: -1,
    left: "-.5%",
    position: "absolute",
  },
});
