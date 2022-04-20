import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button, TextInput, UselessTextInput, ScrollView } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import React, { Component } from 'react'
import {useState} from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import TimeDropdown from "./dropdowns/TimeDropdown";
import DayDropdown from "./dropdowns/DayDropdown";
import GasDropdown from "./dropdowns/GasDropdown";
import PaymentDropdown from './dropdowns/PaymentDropdown';
import AddressDropdown from './dropdowns/AddressDropdown';
import CarDropdown from './dropdowns/CarDropdown';
import firebase from 'firebase'
import { auth } from "../firebase";
// import DropDownPicker from 'react-native-dropdown-picker';

import returnKeyVals from './dropdowns/AddressDropdown';

export default class GasService extends Component{

  constructor(props) {
    super(props);
    // this.docs = firebase.firestore().collection("Addresses");
    // this.userdocs = firebase.firestore().collection("Users");
    this.docs = firebase.firestore().collection("Prices");
    this.dbRef = firebase.firestore().collection('Orders');

    this.handleSNChange = this.handleSNChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleZipChange = this.handleZipChange.bind(this)

    this.handleMakeChange = this.handleMakeChange.bind(this)
    this.handleModelChange = this.handleModelChange.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    this.handleLicenseChange = this.handleLicenseChange.bind(this)

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleExpiryChange = this.handleExpiryChange.bind(this)
    this.handleCvvChange = this.handleCvvChange.bind(this)

    this.importCard = this.importCard.bind(this)
    this.importText = this.importText.bind(this)

    // this.setValue = this.setValue.bind(this)

    this.state = {
      reviewpressed: false,
      quantity: 0,
      gastype: '',
      gasprice: '',
      text: '',
      prices: [],
      total: 0,
      addressinfo:{
        streetnumber: '',
        city: '',
        state: '',
        zip: ''
      },
      carinfo:{
        make: '',
        model: '',
        year: '',
        license: ''
      },
      cardinfo:{
        name: '',
        number: '',
        type: '',
        expiry: '',
        cvv: '',
      },
      importedcardinfo:{
        name: '',
        number: '',
        type: '',
        expiry: '',
        cvv: '',
      },
      isLoading: false
      
    };
  }

  importText(text){
    const state = this.state
    state.text = text
    this.setState(state)
    console.log("Imported Text: ", this.state.text)

  }

  addOrderToDB() {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        email: auth.currentUser?.email,

        streetnumber: this.state.addressinfo.streetnumber,
        city: this.state.addressinfo.city,
        state: this.state.addressinfo.state,
        zip: this.state.addressinfo.zip,

        service: 'gas',
        type: this.state.gastype,
        price: this.state.gasprice,
        quantity: this.state.quantity,
        subtotal: this.state.total,

        make: this.state.carinfo.make,
        model: this.state.carinfo.model,
        year: this.state.carinfo.year,
        license: this.state.carinfo.license,

        card: this.state.cardinfo.type,

        deliverytime: "TBD",
        deliverydate: "TBD",
        drivername: "TBD",
        drivercar: "TBD",
        taxes: "TBD",
        discount: "TBD",

        ordernumber: '',
        fulfilled: "no",

      }).then((res) => {
        console.log("Res id: ", res.id)
        const updateDBRef = firebase.firestore().collection('Orders').doc(res.id)
        updateDBRef.update("ordernumber", res.id)
        this.setState({
          email: '',
          streetnumber: '',
          city: '',
          state: '',
          zip: '',
          isLoading: false,
        });
        this.props.navigation.navigate('OrderSummary', {
          userkey: res.id
        })
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    
  }


  showType = option =>{
    // console.log("option: ", option)
    const state = this.state
    // console.log("State: ", state)
    state["gastype"]= option
    if(option.toLowerCase() == "regular"){
      state["gasprice"] = this.state.prices[0]["regular"]
    }

    else if(option.toLowerCase() == "premium"){
      state["gasprice"] = this.state.prices[0]["premium"]
    }

    else{
      state["gasprice"] = this.state.prices[0]["diesel"]
    }
    this.setState(state)

    console.log("option: ", option)
    console.log("State: ", this.state.gasprice)
  }
  

  childToParent(gastype){
    const state = this.state
    state.type= gastype
    this.setState(state)
    console.log("Gas type?: ", this.state.type)

  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getPriceData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getPriceData = (querySnapshot) => {
    const prices = [];
    const dbRef = firebase
    .firestore()
    .collection("Prices")
    .doc("Gas_Prices");
  dbRef.get().then((res) => {
      const { regular, premium, diesel } = res.data();
      console.log("regular: ", regular)
      console.log("premium: ", premium)
      console.log("diesel: ", diesel)
        prices.push({
          key: res.id,
          regular,
          premium,
          diesel,
        });
    });
    console.log("Prices: ", prices);
    this.setState({
      prices,
      isLoading: false,
    });
  };

  importCard(carddata){
    const state = this.state
    state.importedcardinfo = carddata
    this.setState(state)
    console.log("Imported Card state: ", this.state.importedcardinfo)

  }

  handleSNChange(streetnumber){
    // console.log("in SN change")
    
    const state = this.state
    state.addressinfo["streetnumber"] = streetnumber
    this.setState(state)
    
    
  }
  handleCityChange(city){
    // console.log("streetnum from dd: ", streetnumber)
    const state = this.state
    state.addressinfo["city"] = city
    this.setState(state)
    
    
  }
  handleStateChange(newstate){
    
    const state = this.state
    state.addressinfo["state"] = newstate
    this.setState(state)
    
    
  }
  handleZipChange(zip){
    const state = this.state
    state.addressinfo["zip"] = zip
    this.setState(state)
   
  }


  handleMakeChange(make){
    const state = this.state
    state.carinfo["make"] = make
    this.setState(state)
    
  }
  handleModelChange(model){
    const state = this.state
    state.carinfo["model"] = model
    this.setState(state)
    
  }
  handleYearChange(year){
    const state = this.state
    state.carinfo["year"] = year
    this.setState(state)
    
  }
  handleLicenseChange(license){
    const state = this.state
    state.carinfo["license"] = license
    this.setState(state)
   
  }


//Credit Card
  handleNameChange(name){
    console.log("In name change")
    const state = this.state
    state.cardinfo["name"] = name
    this.setState(state)
   
  }


  handleNumberChange(number){
    const state = this.state
    state.cardinfo["number"] = number
    this.setState(state)
    
  }
  handleTypeChange(type){
    const state = this.state
    state.cardinfo["type"] = type
    this.setState(state)
    
  }
  handleExpiryChange(expiry){
    const state = this.state
    state.cardinfo["expiry"] = expiry
    this.setState(state)
    
  }
  handleCvvChange(cvv){
    const state = this.state
    state.cardinfo["cvv"] = cvv
    this.setState(state)
   
  }




  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state.keyvals[this.state.text][prop] = val;
    this.setState(state);
    // console.log("Gas type?: ", this.state.type)
  }

  quantityInputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
    // console.log("quantity?: ", this.state.quantity)
  }

  changePages() {
    // if(this.state.quantity == '' || this.state.gastype == '' || this.state.addressinfo["streetnumber"] == '' || 
    // this.state.addressinfo["city"] == '' || this.state.addressinfo["state"] == '' || this.state.addressinfo["zip"] == '' || 
    // this.state.carinfo["make"] == '' ||  this.state.carinfo["model"] == '' || this.state.carinfo["year"] == '' || this.state.carinfo["license"] == ''){
    //   alert('Please fill out all fields')
    // }
    // else{
    const state = this.state;
    // console.log("State: ", state)
    var total = parseFloat(state["gasprice"]) * parseFloat(state["quantity"])
    total = total.toFixed(2)
    console.log("Total: ", total)
    state["reviewpressed"] = true;
    state["total"] = total
    this.setState(state)
    console.log("Final gas type: ", this.state.gastype)
    console.log("Final gas quantity: ", this.state.quantity)
    console.log("Final gas price: ", this.state.price)
    console.log("Final addy state: ", this.state.addressinfo)
    console.log("Final car state: ", this.state.carinfo)
    // console.log("Final card info: ", this.state.cardinfo)

    // console.log(returnKeyVals)
    // }
  }

  render(){

  // console.log("reviewpressed?: ", this.state.reviewpressed)

  const streetnumber = this.props.streetnumber
  const city = this.props.city
  const state = this.props.state
  const zip = this.props.zip

  const make = this.props.make
  const model = this.props.model
  const year = this.props.year
  const license = this.props.license

  const { open, value, items } = this.state;
  if(this.state.reviewpressed == false) {
  return (
    <View style={styles.container}>
         <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
            {/* <SafeAreaView style={styles.container}> */}
              
                <SafeAreaView style={styles.container}>
                  <Text style={styles.text}>
                      Checkout
                  </Text>
                  <View style={buttonstyles.backbutton}>
                              <Button
                              title="Back"
                              color="white"
                              // onPress={() => console.log('Clicked')}
                              onPress={() => this.props.navigation.goBack()}
                            />
                            </View>
              
            
                
                  <ScrollView style={styles.scroll}>
                    <View style={styles.gasservice}>
                      
                        <Text style={styles.boxfontshead}>Gas Service</Text>
                        <Text style={styles.subheadings}>Schedule</Text>
                        <View style={{flexDirection:'row', flexWrap:'nowrap', zIndex: 1}}>
                          
                            <View>
                                <TimeDropdown></TimeDropdown>
                            </View>
                            
                            <View>
                                <DayDropdown></DayDropdown>
                            </View>  
                                                    
                        </View>

                        <View>
                          <Text style={styles.subheadings}>Quantity</Text>
                          <TextInput
                           style={styles.input}
                           placeholder="Quantity (in Gallons)"
                           placeholderTextColor="#D3D3D3"
                           onChangeText={(val) =>this.quantityInputValueUpdate(val, 'quantity')}
                            keyboardType="numeric"
                          />
  
                        </View>
                       
                        <Text style={styles.subheadings}>Type of Fuel</Text>
                        {/* <View 
                        style ={{flexDirection:'row', flexWrap:'nowrap', zIndex: 1}} 
                        > */}

                            <View>
                              <Picker
                                onValueChange={this.showType}
                                selectedValue={this.state.gastype}
                              >
                                <Picker.Item label="Please Select" value="disabled" color="#aaa"/>
                                <Picker.Item label="Regular" value="Regular" />
                                <Picker.Item label="Premium" value="Premium" />
                                <Picker.Item label="Diesel" value="Diesel" />
                                
                              </Picker>
                              {/* <GasDropdown childToParent={this.childToParent}></GasDropdown> */}
                              {/* <DropDownPicker
                                items={[
                                    {label: 'France', value: 'fr'},
                                    {label: 'Spain', value: 'es'},
                                ]}
                                // defaultNull
                                placeholder="Select your country"
                                containerStyle={{height: 40, width: "50%"}}
                                onChangeItem={item => this.changeCountry(item)}
                                // dropDownMaxHeight={540}
                              /> */}
                              {/* <DropDownPicker
                                  open={open}
                                  value={value}
                                  items={items}
                                  setOpen={this.setOpen}
                                  setValue={this.setValue}
                                  setItems={this.setItems}
                                  
                              /> */}
                              </View>
                            
                           
                        </View>
                    {/* </View> */}
                    
                    <View style={styles.address}>
                        <Text style={styles.boxfontshead}>Address</Text>
                        <Text style={styles.boxfontsbody}>Please Select an Address</Text>
                        <AddressDropdown
                          streetnumber={streetnumber}
                          city={city}
                          state={state}
                          zip={zip}
                          onSNValChange = {this.handleSNChange}
                          onCityValChange = {this.handleCityChange}
                          onStateValChange = {this.handleStateChange}
                          onZipValChange = {this.handleZipChange}
                        >

                          </AddressDropdown>
                          {/* <View style={styles.paybutton}>
                              <Button
                              title="Test"
                              color="white"
                              onPress={() => console.log("Final addy state: ", this.state.addressinfo)}
                            /> 
                          
                            
                        </View>  */}

                          
                    </View>


                    <View style={styles.carInfo}>
                        <Text style={styles.boxfontshead}>Car Information</Text>
                        <Text style={styles.boxfontsbody}>Please Select a Car</Text>
                        <CarDropdown
                          make={make}
                          model={model}
                          year={year}
                          license={license}
                          onMakeValChange = {this.handleMakeChange}
                          onModelValChange = {this.handleModelChange}
                          onYearValChange = {this.handleYearChange}
                          onLicenseValChange = {this.handleLicenseChange}
                        >

                        </CarDropdown>

                          
                    </View>

                    {/* <View style={styles.paymentinfo}>
                        <Text style={styles.boxfontshead}>Payment Information</Text>
                        <PaymentDropdown/>
                    </View> */}

                    <View style={styles.paybutton}>
                              <Button
                              title="Review Order"
                              color="white"
                              // onPress={() => this.addOrderToDB()}
                              onPress={() => {
                                // console.log("SN: ", this.state.streetnumber)
                                this.changePages()
                              }}
                            /> 
                          
                            
                        </View> 
                    
                    </ScrollView>
                
            {/* </SafeAreaView> */}
            </SafeAreaView>
         </ImageBackground>   
    </View>
  )
  }
  else{
    const name = this.props.name
    const number = this.props.number
    const type = this.props.type
    const expiry = this.props.expiry
    const cvv = this.props.cvv

    const carddata = this.props.carddata
    const text = this.props.text

    return(
    <View style={styles.container}>
    <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
       {/* <SafeAreaView style={styles.container}> */}
         
           <SafeAreaView style={styles.container}>
             <Text style={styles.text}>
                 Review Order
             </Text>
             <View style={buttonstyles.backbutton}>
                         <Button
                         title="Back"
                         color="white"
                         // onPress={() => console.log('Clicked')}
                         onPress={() => this.props.navigation.goBack()}
                       />
                       </View>
         
       
           
             <ScrollView style={styles.scroll}>
               <View style={styles.gasservice}>
                 
                   <Text style={styles.boxfontshead}>A Review of Your Order</Text>
                   {/* <Text style={styles.subheadings}>Schedule</Text> */}
                    <View style={styles.revieworder}>
                      <View style={{flexDirection:'row', flexWrap:'nowrap', zIndex: 1}}>
                          
                          <View>
                              <Text>Address:</Text>
                              <Text>{this.state.addressinfo.streetnumber}</Text>
                              <Text>{this.state.addressinfo.city} {this.state.addressinfo.state} {this.state.addressinfo.zip}</Text>    
                          </View>
                          
                          <View style={{justifyContent: "right"}}>
                          <Text></Text>
                              <Text>Car Information: </Text>
                              <Text>{this.state.carinfo.year} {this.state.carinfo.make} {this.state.carinfo.model}</Text>
                              <Text>Licence Plate: {this.state.carinfo.license}</Text>
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
                          <Text>{this.state.gastype} gas price per gallon: $</Text>
                          <Text>Number of gallons: </Text>
                        </View>

                        <View>
                          <Text>{this.state.gasprice} </Text>
                          <Text>x  {this.state.quantity} </Text>
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
                          <Text>TOTAL: </Text>
                        </View>
                        <View>
                          <Text>${this.state.total} </Text>
                        </View>
                      </View>

                      

                    </View>
                  
                    <View style={styles.paybutton2}>
                          <Button
                          title="Edit Order"
                          color="white"
                           onPress={() => this.setState({
                             reviewpressed: false
                           })}
                        /> 
                     
                       
                   </View> 
               </View>
               
               <View style={styles.paymentinfo}>
                        <Text style={styles.boxfontshead}>Payment Information</Text>
                        <PaymentDropdown
                        name={name}
                        number={number}
                        type={type}
                        expiry={expiry}
                        cvv={cvv}
                        carddata={carddata}
                        text={text}
                        onNameValChange = {this.handleNameChange}
                        onNumberValChange = {this.handleNumberChange}
                        onTypeValChange = {this.handleTypeChange}
                        onExpiryValChange = {this.handleExpiryChange}
                        onCvvValChange = {this.handleCvvChange}
                        onExportCard = {this.importCard}
                        onTextValChange = {this.importText}
                        />
                    </View>
               
              
               

               
               
                <View style={styles.paybutton3}>
                          <Button
                          title="Checkout"
                          color="white"
                          onPress={() => this.addOrderToDB()}
                          // onPress={() => console.log("Card info: ", this.state.cardinfo)}
                          // onPress={() => this.checkCards()}
                        /> 
                     
                       
                   </View> 
                   
                  
               
               </ScrollView>
           
       {/* </SafeAreaView> */}
       </SafeAreaView>
    </ImageBackground>   
</View>
    )
  }
}

}

  const buttonstyles = StyleSheet.create({
    button: { 
        width: '30%', 
        height: 40,
        bottom: 5,
        left: 230,
        // top: 270,
        borderWidth: 1, 
        backgroundColor:"#DAAC3F", 
        position: "absolute"
    },
    backbutton: {
      width: '15%', 
      height: 40,
      top: 65,
      right: 15,
      backgroundColor:"#DAAC3F", 
      position: "absolute"
    }
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
        backgroundColor: '#CDCABF',
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
        fontSize: 24,
        lineHeight: 30,
        fontWeight: "bold",
        textAlign: "center",
        top: 5,
        left: 5,
      },

      boxfontsbody:{
        color: "black",
        fontSize: 18,
        lineHeight: 30,
        textAlign: "center",
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