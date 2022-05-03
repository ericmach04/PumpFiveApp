import { ImageBackground, Image, StyleSheet, Button, Text, View, Linking, ActivityIndicator, Alert, TextInput} from 'react-native'
import React, { Component, useCallback } from 'react'
import { TouchableOpacity } from 'react-native-web';
import firebase from "firebase"
import {auth} from "../firebase"
import { Picker } from "@react-native-picker/picker";

const supportedURL = "https://www.pumpfive.com/terms-conditions/";
const supportedURL2 = "https://www.pumpfive.com/contact/";
const map = {uri: "https://entrecourier.com/wp-content/uploads/2020/06/storemap.jpg.webp"}

export default class DriverOrder extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection("Orders");
    this.pricedocs = firebase.firestore().collection("Prices");
    this.state = {
      isLoading: true,
      allorders: [],
      servicetype: '',
      gasprice: '',
      tireprice: '',
      customernotes: "",
      drivernotes: "",
      driveremail: "",
      orderfulfilled: false,
      prices: [],
      units: '',
      cancelAttempt: false,
      canceldetails: "",
    };
    
  }

  getData() {
    this.docs.onSnapshot(this.getOrderData);
    // this.pricedocs.onSnapshot(this.getPriceData);
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getOrderData);
    // this.pricedocs.onSnapshot(this.getPriceData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  cancelAlert(){
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel this order?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => this.setState({
            cancelAttempt: true
          })
        }
      ],
      
      
    );
  }
  cancelAlert2(id, details){
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel this order?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => this.handleCancel(id, details)
        }
      ],
      
      
    );
  }

  handleCancel(id, details){
    console.log("In handle Cancel")
    console.log("In handle Cancel id: ", id)
    const updateDBRef = firebase.firestore().collection('Orders').doc(id)
    updateDBRef.get().then((res) => {
      updateDBRef.update("cancelled", "yes")
      updateDBRef.update("canceldetails", details)
      const state = this.state;
      state["cancelAttempt"] = false;
      this.setState(state);
    })


  }

  getPriceData = () => {
    const prices = [];
    const dbRef = firebase.firestore().collection("Prices").doc("Tire_Prices");
    dbRef.get().then((res) => {
      const { small, medium, large } = res.data();
      console.log("small: ", small);
      console.log("medium: ", medium);
      console.log("large: ", large);
      prices.push({
        key: res.id,
        small,
        medium,
        large,
      });
      console.log("Prices: ", prices);
      this.setState({
        prices,
        isLoading: false,
      });
      
    });
  };

  showType = (option) => {
    console.log("option: ", option);
    const state = this.state;
    console.log("State.prices: ", state.prices)
    state["tiretype"] = option;
    if (option == "Small") {
      state["tireprice"] = this.state.prices[0]["small"];
    } else if (option  == "Medium") {
      state["tireprice"] = this.state.prices[0]["medium"];
    } else {
      state["tireprice"] = this.state.prices[0]["large"];
    }
    this.setState(state);

    console.log("option: ", option);
    console.log("State: ", this.state.tireprice);
  };

  updateGasQuantity(quantity, id){
    const updateDBRef = firebase.firestore().collection('Orders').doc(id)
    updateDBRef.get().then((res) => {
      const { price } = res.data();
      var subtotal = parseFloat(price) * parseFloat(quantity);
      subtotal = subtotal.toFixed(2);
      console.log("SubTotal: ", subtotal);
      updateDBRef.update("subtotal", subtotal)
      updateDBRef.update("quantity", quantity)
      updateDBRef.update("fulfilled", "yes")
      updateDBRef.update("driveremail", auth.currentUser?.email)
      const state = this.state;
      state["orderfulfilled"] = true;
      this.setState(state);
    })
    

  }

  updateTireSize(size, id, quantity){
    console.log("TIre id: ", id)
    const updateDBRef = firebase.firestore().collection('Orders').doc(id)
    updateDBRef.update("type", size)
    updateDBRef.update("price", this.state.tireprice)
    var subtotal = parseFloat(this.state.tireprice) * parseFloat(quantity);
    subtotal = subtotal.toFixed(2);
    console.log("SubTotal: ", subtotal);
    updateDBRef.update("subtotal", subtotal)
    // var total;
    updateDBRef.update("fulfilled", "yes")
    updateDBRef.update("driveremail", auth.currentUser?.email)
    const state = this.state;
    state.servicetype = ''
    state.tireprice = ''
    state["orderfulfilled"] = true;
    this.setState(state);

  }

  updateDetailingOrder(id, notes){
    console.log("TIre id: ", id)
    const updateDBRef = firebase.firestore().collection('Orders').doc(id)
    updateDBRef.update("drivernotes", notes)
    // updateDBRef.update("price", this.state.tireprice)
    // var subtotal = parseFloat(this.state.tireprice) * parseFloat(quantity);
    // subtotal = subtotal.toFixed(2);
    // console.log("SubTotal: ", subtotal);
    // updateDBRef.update("subtotal", subtotal)
    // var total;
    updateDBRef.update("fulfilled", "yes")
    updateDBRef.update("driveremail", auth.currentUser?.email)
    const state = this.state;
    state.servicetype = ''
    state.drivernotes = ''
    state["orderfulfilled"] = true;
    this.setState(state);

  }

  onButtonPress(id, service){
    console.log("lol service: ", service)
    if(service == "Gas Delivery Service")
    {
      Alert.prompt(
        "Gas Delivery",
        "Enter number of gallons you filled",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Submit",
            onPress: quantity => this.updateGasQuantity(quantity, id)
          }
        ],
        
        
      );
    }
    else if(service == "Tire Delivery Service")
    {
      const prices = [];
      const dbRef = firebase.firestore().collection("Prices").doc("Tire_Prices");
      dbRef.get().then((res) => {
        const state = this.state;
        const { small, medium, large } = res.data();
        console.log("small: ", small);
        console.log("medium: ", medium);
        console.log("large: ", large);
        prices.push({
          key: res.id,
          small,
          medium,
          large,
        });
        console.log("Prices: ", prices);
        this.setState({
          prices,
          isLoading: false,
        });
          state.servicetype = "tire"
          state.prices=prices
          this.setState(state);
          console.log("this.state.Prices: ", this.state.prices);
        }
        )
      
    }
    else if (service == "Detailing Service"){
      const state = this.state;
      state.servicetype = "detailing"
      this.setState(state);
    }
  };


  getOrderData = (querySnapshot) => {
    const allorders = [];
    var units=''
    
    querySnapshot.forEach((res) => {
      const { fname, lname, phone, email, color, fulfilled, deliverydate, driveremail, quantity, make, model, year, type, service, ordernumber, 
        streetnumber, city, state, zip, license, subtotal, customernotes, cancelled} = res.data();
      // console.log("epicemail: ", email)
      // console.log("auth: ", auth.currentUser?.email)
      if (cancelled=="no" && fulfilled=="no" && driveremail.toLowerCase()==auth.currentUser?.email) {
        if(service == 'gas'){
          units = "gallons of " + type + " gas"
        }
        else if (service == 'tire'){
          units = "tires"
        }
        allorders.push({
          key: res.id,
          fname,
          lname,
          phone,
          color,
          fulfilled,
          deliverydate,
          driveremail,
          quantity,
          make,
          model,
          year,
          type,
          service,
          ordernumber,
          streetnumber,
          city,
          state,
          zip,
          license,
          subtotal,
          customernotes,
          units: units
        });
      }
    });
    this.setState({
      allorders,
      isLoading: false,
    });
    // console.log("orders: ", this.state.allorders)
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
    console.log("All orders: ", this.state.allorders)
    if(this.state.allorders.length != 0)
    {
      console.log("Here for some reason ")
      var currorder = this.state.allorders[0]
    //   var currorder=firebase.firestore().collection("Orders").doc("kRyLqxYoeloCrM2HpFvL").get()
    //   .then((res) => {
    //   console.log("Current order: ", res)
    //   })
    
      console.log("My service type: ", this.state.servicetype)
      if(this.state.servicetype ==  "tire")
      {
        return (
          <View style={styles.container}>
            <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
            <Text style={styles.text}>Current Order: {currorder.service} </Text>
            <View style={styles.rect1}>
              
      
              {/* <Image style={styles.Logo} source={require('../images/placeholdermap.png')}/> */}
              <Text style={styles.boxfontshead2}>Please select the type of tire you installed:</Text>
              
                      <Picker
                        onValueChange={this.showType}
                        selectedValue={this.state.tiretype}
                      >
                        <Picker.Item
                          label="Please Select"
                          value="disabled"
                          color="#aaa"
                        />
                        <Picker.Item label="Small" value="Small" />
                        <Picker.Item label="Medium" value="Medium" />
                        <Picker.Item label="Large" value="Large" />
                      </Picker>
                    
              
              {/* <Text style={styles.boxfontshead}>Order Number: <Text style={{color: "green"}}>{currorder.ordernumber}</Text></Text>
              <Text style={styles.boxfontshead}>Customer Name: <Text style={{color: "green"}}>{currorder.fname} {currorder.lname}</Text></Text>
              <Text style={styles.boxfontshead}>Customer Phone: <Text style={{color: "green"}}>{currorder.phone}</Text></Text>
              <Text style={styles.boxfontshead}>Order Type: <Text style={{color: "green"}}>{currorder.type}</Text></Text>
              <Text style={styles.boxfontshead}>Location: <Text style={{color: "green"}}>{currorder.streetnumber} {currorder.city} {currorder.state} {currorder.zip}</Text></Text>
              <Text style={styles.boxfontshead}>Vehicle: <Text style={{color: "green"}}>{currorder.year} {currorder.color} {currorder.make} {currorder.model}</Text></Text>
              <Text style={styles.boxfontshead}>License Plate: <Text style={{color: "green"}}>{currorder.license}</Text></Text> */}
            </View>
      
            <View style={styles.button}>
              <Button
                  title="Submit"
                  color="white"
                  onPress={() => this.updateTireSize(this.state.tiretype, currorder.ordernumber, currorder.quantity)}
                  // onPress={() => navigation.navigate('CalendarScreen')}
              />
            </View>
            {/* <View style={styles.button2}>
              <Button
                  title="Cancel Order"
                  color="white"
                  // onPress={() => navigation.navigate('CalendarScreen')}
              />
      
            </View> */}
            </ImageBackground>
          </View>
        )
      }
      else if (this.state.servicetype ==  "detailing")
      {
        return (
          <View style={styles.container}>
            <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
            <Text style={styles.text}>Current Order: {currorder.service} </Text>
            <View style={styles.rect1}>
              
              <Text style={styles.detailtext}>Please add any additional details for the customer: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Details'}
                        value={this.state.drivernotes}
                        onChangeText={(val) => this.inputValueUpdate(val, 'drivernotes')}
                        // value = {year}
                        // onChangeText={text => setYear(text)}
                        // placeholder="Enter Car Year"
                        // keyboardType="numeric"
                />
            </View>
    
            <View style={styles.button}>
              <Button
                  title="Submit"
                  color="white"
                  onPress={() => this.updateDetailingOrder(currorder.ordernumber, this.state.drivernotes)}
                  // onPress={() => navigation.navigate('CalendarScreen')}
              />
            </View>
            </ImageBackground>
          </View>
        )
      }
      else if(this.state.orderfulfilled==true){
        return (
          <View style={styles.container}>
            <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
            {/* <Text style={styles.text}>Current Order: {currorder.service} </Text> */}
            <View style={styles.rect1}>
              
              <Text style={styles.boxfontshead}>This order has been processed successfully. Click "next order" to retrieve your next order</Text>
              <View style={styles.button1}>
              <Button
                  title="Next Order"
                  color="white"
                  onPress={() => this.setState({
                      orderfulfilled: false
                  })}
                  // onPress={() => navigation.navigate('CalendarScreen')}
              />
            </View>
            </View>
            </ImageBackground>
          </View>
        )

      }
      else if (this.state.cancelAttempt ==  true){
        return (
          <View style={styles.container}>
            <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
            <Text style={styles.text}>Current Order: {currorder.service} </Text>
            <View style={styles.rect1}>
              
              <Text style={styles.detailtext}>Please provide a reason for cancelation: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Details'}
                        value={this.state.canceldetails}
                        onChangeText={(val) => this.inputValueUpdate(val, 'canceldetails')}
                />
            </View>
    
            <View style={styles.button}>
              <Button
                  title="Submit"
                  color="white"
                  onPress={() => this.cancelAlert2(currorder.ordernumber, this.state.canceldetails)}
                  // onPress={() => navigation.navigate('CalendarScreen')}
              />
            </View>
            <View style={styles.button2}>
              <Button
                  title="Go Back"
                  color="white"
                  onPress={() => this.setState({
                    cancelAttempt: false
                  })}
              />

            </View>
            </ImageBackground>
          </View>
        )

      }
      else{
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Current Order: {currorder.service} </Text>
        <View style={styles.rect1}>
          

          <Image style={styles.Logo} source={require('../images/placeholdermap.png')}/>
          
          <Text style={styles.boxfontshead}>Order Number: <Text style={{color: "green"}}>{currorder.ordernumber}</Text></Text>
          <Text style={styles.boxfontshead}>Customer Name: <Text style={{color: "green"}}>{currorder.fname} {currorder.lname}</Text></Text>
          <Text style={styles.boxfontshead}>Customer Phone: <Text style={{color: "green"}}>{currorder.phone}</Text></Text>
          <Text style={styles.boxfontshead}>Order Type: <Text style={{color: "green"}}>{currorder.type}</Text></Text>
          <Text style={styles.boxfontshead}>Location: <Text style={{color: "green"}}>{currorder.streetnumber} {currorder.city} {currorder.state} {currorder.zip}</Text></Text>
          <Text style={styles.boxfontshead}>Vehicle: <Text style={{color: "green"}}>{currorder.year} {currorder.color} {currorder.make} {currorder.model}</Text></Text>
          <Text style={styles.boxfontshead}>License Plate: <Text style={{color: "green"}}>{currorder.license}</Text></Text>
          {/* <Text style={styles.boxfontshead}>Notes from customer: <Text style={{color: "green"}}>{currorder.customernotes}</Text></Text> */}
        </View>

        <View style={styles.rect2}>
          <Text style={styles.boxfontshead2}>Notes from customer: <Text style={{color: "green"}}>{currorder.customernotes}</Text></Text>

        </View>

        

        <View style={styles.button1}>
          <Button
              title="Job Completed"
              color="white"
              onPress={() => this.onButtonPress(currorder.ordernumber, currorder.service)}
              // onPress={() => navigation.navigate('CalendarScreen')}
          />
        </View>
        <View style={styles.button2}>
          <Button
              title="Cancel Order"
              color="white"
              onPress={() => this.cancelAlert(currorder.ordernumber)}
          />

        </View>
        </ImageBackground>
      </View>
    )
      }
    }
    else{

      return (
        <View style={styles.container}>
          <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
          {/* <Text style={styles.text}>Current Order: {currorder.service} </Text> */}
          <View style={styles.rect1}>
            
            <Text style={styles.boxfontshead}>No orders currently</Text>
          </View>
          </ImageBackground>
        </View>
      )

    }
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
    height: "35%",
    left: "1%",
    right: "17.5%",
    top: "1%",
  },
  rect1: {
    position: 'absolute',
    width: "90%",
    height: "43%",
    left: "5%",
    right: "5%",
    top: "20%",
    backgroundColor: '#CDCABF',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 10,
  },
  rect2: {
    position: 'absolute',
    width: "90%",
    height: "22%",
    left: "5%",
    right: "5%",
    top: "65%",
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
    top: "35%",
    left: "2%",
    // justifyContent: "center",
    // alignItems: "center",
    // alignContent: "center"
  },
  boxfontshead2:{
    color: "black",
    fontSize: 15,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "left",
    top: "2%",
    left: "2%",
    // justifyContent: "center",
    // alignItems: "center",
    // alignContent: "center"
  },
  // rect2: {
  //   position: 'absolute',
  //   width: "90%",
  //   height: "8%",
  //   left: "5%",
  //   right: "5%",
  //   top: "85%",
  //   backgroundColor: '#CDCABF',
  //   borderWidth: 3,
  //   borderColor: '#000000',
  //   borderRadius: 10,
  // },
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
    bottom: "12%",
    left: "55%",
    // right: "5%",
    borderRadius: 20,
    backgroundColor:"green", 
    position: "absolute"
},
  // button1: {
  //   position: 'absolute',
  //   width: "50%",
  //   height: "7%",
  //   left: "5%",
  //   top: "89%",
  //   backgroundColor: '#B96835',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   borderRadius: 20,
  //   textAlign: "center",
  // },
  // button2: {
  //   width: "40%", 
  //   height: "5%",
  //   bottom: "5%",
  //   left: "55%",
  //   // right: "5%",
  //   borderRadius: 20,
  //   backgroundColor:"#EB8585", 
  //   position: "absolute"
  // },
  button1: {
    position: 'absolute',
    width: "37%",
    height: "5%",
    left: "8%",
    top: "89%",
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    textAlign: "center",
  },
  button2: {
    position: 'absolute',
    width: "31%",
    height: "5%",
    right: "8%",
    top: "89%",
    backgroundColor: '#EB8585',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
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
  detailtext: {
    top: "20%",
    color: "black",
   
    fontSize: 20,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",

    left: "2%",
  },
  input: {
    height: "20%",
    margin: "1%",
    width: "90%",
    borderWidth: 1,
    padding: "1%",
    backgroundColor: "white",
    top: "20%",
    left: "2%",
  },
})

