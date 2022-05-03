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

export default class OrderHistory extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection("Orders");
    this.state = {
      isLoading: true,
      orders: [],
      units: "",
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
    var units = "";
    querySnapshot.forEach((res) => {
      const {
        email,
        fulfilled,
        cancelled,
        deliverydate,
        driverfname,
        driverlname,
        quantity,
        make,
        model,
        year,
        type,
        service,
        ordernumber,
      } = res.data();
      if (email == auth.currentUser?.email) {
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
          driverfname,
          driverlname,
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
    });
    this.setState({
      orders,
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
            <View>
              <Text style={styles.h1}>Order History</Text>
            </View>

            <View style={styles.scrollbox}>
              <ScrollView style={styles.scroll1}>
                {this.state.orders.map((res, i) => {
                  // count += 1;
                  if(res.cancelled=="no"){
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
                        <Text>Driver: {res.driverfname} {res.driverlname}</Text>
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
                 }
                 else{
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
                        <Text>Delivered?: {res.fulfilled} (cancelled)</Text>
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
                 }
                })}
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
    position: "absolute",
    width: 292,
    height: 164,
    left: 20,
    top: 361,
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
    top: "28%",
    padding: "-5%",
    borderWidth: 1,
    borderRadius: 10,
    //left: -1,
    left: "-.5%",
  },
});
