import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { Component } from "react";
import firebase from "firebase";
import { auth } from "../../firebase";

export default class Receipt extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection("Orders");
    this.state = {
      isLoading: true,
      cancelled: '',
      orders: [],
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
    querySnapshot.forEach((res) => {
      const {
        card,
        city,
        cancelled,
        canceldetails,
        deliverydate,
        deliverytime,
        discount,
        drivercar,
        drivername,
        driverfname,
        driverlname,
        driverphone,
        drivernotes,
        email,
        fulfilled,
        license,
        make,
        model,
        ordernumber,
        price,
        quantity,
        service,
        state,
        streetnumber,
        subtotal,
        taxes,
        type,
        year,
        zip,
      } = res.data();
      // console.log("Email1: ", email)
      // console.log("Email2: ", auth.currentUser?.email)
      console.log("email: ", email);
      console.log("auth email: ", auth.currentUser?.email);
      console.log("ordernumber: ", ordernumber);
      console.log("params: ", this.props.route.params.userkey);
      if (
        email == auth.currentUser?.email &&
        ordernumber == this.props.route.params.userkey
      ) {
        orders.push({
          card,
          city,
          cancelled,
          canceldetails,
          deliverydate,
          deliverytime,
          discount,
          drivercar,
          drivername,
          driverfname,
          driverlname,
          driverphone,
          drivernotes,
          email,
          fulfilled,
          license,
          make,
          model,
          ordernumber,
          price,
          quantity,
          service,
          state,
          streetnumber,
          subtotal,
          taxes,
          type,
          year,
          zip,
        });
      }
    });
    // console.log(cars);
    this.setState({
      orders,
      isLoading: false,
    });
    console.log("Orders object: ", this.state.orders);
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
    console.log("Orders object in render: ", this.state.orders);

    var tag
    if(this.state.orders[0].cancelled == "no")
    {
      tag=<Text style={styles.boxfontsbody}></Text>
    }
    else
    {
      tag=<Text style={styles.boxfontsbody}>Reason for cancellation: {this.state.orders[0].canceldetails}</Text>
    }

    var fulfilled;
    if(this.state.orders[0].fulfilled == "no")
    {
      fulfilled= <Text style={styles.boxfontsbody}>
                  
      <Text style={styles.boxfontshead}>
          {this.state.orders[0].driverfname} {this.state.orders[0].driverlname}
      </Text>{" "}
      will deliver your order on
      <Text style={styles.boxfontshead}>
        {this.state.orders[0].deliverydate}
      </Text>{" "}
      at{" "}
      <Text style={styles.boxfontshead}>
        {this.state.orders[0].deliverytime}
      </Text>
      .
    </Text>
    }
    else
    {
      fulfilled=<Text style={styles.boxfontsbody}>Reason for cancellation: {this.state.orders[0].canceldetails}</Text>
    }

    var service
    if(this.state.orders[0].service == "Gas Delivery Service")
    {
        service=<Text style={styles.boxfontsbody}>
        <Text style={styles.boxfontshead}>
          {this.state.orders[0].quantity}
        </Text>{" "}
        gallons of
        <Text style={styles.boxfontshead}>
          {" "}
          {this.state.orders[0].type}
        </Text>{"\n"}
      </Text>
    }

    else if(this.state.orders[0].service == "Tire Delivery Service")
    {
        service=<Text style={styles.boxfontsbody}>
        <Text style={styles.boxfontshead}>
          {this.state.orders[0].quantity}{" "}
          {this.state.orders[0].type}
        </Text>{" "}
        tires{"\n"}
      </Text>
    }
    
    else{
      service=<Text style={styles.boxfontsbody}>
        <Text style={styles.boxfontshead}>
          {this.state.orders[0].type}
        </Text>{" "}
        Detailing Service{"\n"}
      </Text>

    }

    return (
     

      <View style={styles.container}>
        <ImageBackground
          source={require("../../images/pumpfivebackground.jpeg")}
          resizeMode="cover"
          style={styles.image}
        >
          <SafeAreaView style={styles.container}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Text style={styles.text}>Receipt for Order </Text>

              <View style={buttonstyles.backbutton}>
                <Button
                  title="Back"
                  color="white"
                  //   onPress={() => console.log('Clicked')}
                  onPress={() => this.props.navigation.navigate("Tabs")}
                />
              </View>
            </View>

            <View style={styles.rect1} />
            <View style={styles.gasservice}>
              <ScrollView style={styles.scroll}>
                <Text style={styles.boxfontsbody}>
                  Receipt for Order: 
                  <Text style={styles.boxfontshead}>#{this.state.orders[0].ordernumber}</Text>
                  {"\n"}
                </Text>
                <Text style={styles.boxfontsbody}>
                  Fulfilled?{" "}
                  <Text style={styles.boxfontshead}>
                    {this.state.orders[0].fulfilled}
                    {"\n"}
                  </Text>
                </Text>
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 2,
                  }}
                />
                <Text style={styles.boxfontsbody}>
                  {"\n"}Purchase Info:{" "}
                  <Text style={styles.boxfontshead}>
                    {this.state.orders[0].service}{"\n"}
                  </Text>
                </Text>
                {service}
                {/* <Text style={styles.boxfontsbody}>
                  <Text style={styles.boxfontshead}>
                    {this.state.orders[0].quantity}
                  </Text>{" "}
                  gallons of
                  <Text style={styles.boxfontshead}>
                    {" "}
                    {this.state.orders[0].type}
                  </Text>{" "}
                  gasoline{"\n"}
                </Text> */}
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 2,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    zIndex: 1,
                  }}
                >
                  <View>
                    <Text style={styles.boxfontsbody}>
                      {this.state.orders[0].type}
                      {"\n"}Gas price per gallon:{" "}
                    </Text>
                    <Text style={styles.boxfontsbody}>
                      {"\n"}Number of gallons:{" "}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.boxfontshead}>
                      {"\n"}${this.state.orders[0].price} {"\n"}
                    </Text>
                    <Text style={styles.boxfontshead}>
                      x {this.state.orders[0].quantity} {"\n"}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    zIndex: 1,
                  }}
                >
                  <View>
                    <Text style={styles.boxfontsbody}>{"\n"}Sub Total: </Text>
                    <Text style={styles.boxfontsbody}>Taxes: </Text>
                    <Text style={styles.boxfontsbody}>Discounts: </Text>
                  </View>

                  <View>
                    <Text style={styles.boxfontshead}>
                      {"\n"}
                      {this.state.orders[0].subtotal}
                    </Text>
                    <Text style={styles.boxfontshead}>
                      + {this.state.orders[0].taxes}
                    </Text>
                    <Text style={styles.boxfontshead}>
                      - {this.state.orders[0].discount}
                      {"\n"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    zIndex: 1,
                  }}
                >
                  <View>
                    <Text style={styles.boxfontsbody}>{"\n"}Total: </Text>
                  </View>
                  {/* Change this to total later when accounting for tax and discounts */}
                  <View>
                    <Text style={styles.boxfontshead}>
                      {"\n"}
                      {this.state.orders[0].subtotal}
                    </Text>
                  </View>
                </View>

                <Text style={styles.boxfontsbody}>
                  Paid using:{" "}
                  <Text style={styles.boxfontshead}>
                    {this.state.orders[0].card}
                    {"\n"}
                  </Text>
                </Text>
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 2,
                  }}
                />
                <Text style={styles.boxfontsbody}>
                  {"\n"}Deliver To:{" "}
                  <Text style={styles.boxfontshead}>
                    {this.state.orders[0].year} {this.state.orders[0].make}{" "}
                    {this.state.orders[0].model}
                  </Text>
                </Text>
                <Text style={styles.boxfontsbody}>
                  License Plate:{" "}
                  <Text style={styles.boxfontshead}>
                    {this.state.orders[0].license}
                  </Text>
                </Text>
                <Text style={styles.boxfontsbody}>at</Text>
                <Text style={styles.boxfontshead}>
                  {this.state.orders[0].streetnumber}
                </Text>
                <Text style={styles.boxfontshead}>
                  {this.state.orders[0].city}, {this.state.orders[0].state},{" "}
                  {this.state.orders[0].zip}
                  {"\n"}
                </Text>
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 2,
                  }}
                />

                <Text style={styles.boxfontshead}>Delivery Driver Info:</Text>
                {fulfilled}
                {/* <Text style={styles.boxfontsbody}>
                  
                  <Text style={styles.boxfontshead}>
                    {this.state.orders[0].drivername}
                  </Text>{" "}
                  will deliver your order on
                  <Text style={styles.boxfontshead}>
                    {this.state.orders[0].deliverydate}
                  </Text>{" "}
                  at{" "}
                  <Text style={styles.boxfontshead}>
                    {this.state.orders[0].deliverytime}
                  </Text>
                  .
                </Text> */}

                <Text style={styles.boxfontsbody}>
                  <Text style={styles.boxfontshead}>
                    {this.state.orders[0].driverfname}'s
                  </Text>{" "}
                  phone number:
                  <Text style={styles.boxfontshead}>
                    {this.state.orders[0].driverphone}
                  </Text>
                </Text>
                <Text style={styles.boxfontsbody}>Notes from driver: {this.state.orders[0].drivernotes}</Text>
                {tag}

                <View style={buttonstyles.button}>
                  <Button
                    title="Home"
                    color="white"
                    onPress={() => this.props.navigation.navigate("Tabs")}
                  />
                </View>
                
              </ScrollView>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}

const buttonstyles = StyleSheet.create({
  //Affects Home button on Order Summary
  button: {
    position: "absolute",
    //width: 151,
    width: "20%",
    height: 45,

    top: "102%",
    //left: 121,
    //left: "10%",
    right: "1%",
    backgroundColor: "#DAAC3F",
    borderRadius: 5,
  },

  backbutton: {
    width: "18%",
    height: 40,
    top: "22%",
    right: "5%",
    borderRadius: 10,
    backgroundColor: "#DAAC3F",
    position: "absolute",
  },
});

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
    justifyContent: "center",
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

  services: {
    flexDirection: "column",
    justifyContent: "space-around",
  },

  gasservice: {
    flex: 1,
    width: "90%",
    height: 450,
    left: "5%",
    right: "5%",
    //top: "0%",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#000000",
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
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
    marginBottom: 20,
  },

  address: {
    flex: 1,
    width: "90%",
    height: 700,
    left: "5%",
    right: "5%",
    //top: "0%",
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
    marginBottom: 20,
  },
  carInfo: {
    flex: 1,
    width: "90%",
    height: 750,
    left: "5%",
    right: "5%",
    //top: "0%",
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
    marginBottom: 20,
  },

  paymentinfo: {
    flex: 1,
    width: "90%",
    height: 750,
    left: "5%",
    right: "5%",
    //top: "0%",
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
    marginBottom: 20,
  },

  boxfontshead: {
    color: "black",
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "left",
    top: 5,
    left: 5,
  },

  boxfontsbody: {
    color: "black",
    fontSize: 20,
    lineHeight: 30,
    textAlign: "left",
    top: 5,
    left: 5,
  },

  subheadings: {
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
    width: "50%",
    margin: 5,
    borderWidth: 1,
    padding: 5,
    backgroundColor: "white",
  },
  promobutton: {
    // position: 'absolute',
    left: 21,
    top: 300,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  checkoutback: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
