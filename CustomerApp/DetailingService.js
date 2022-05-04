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
import BookAppointment from './BookAppointment';
import firebase from 'firebase'
import { auth } from "../firebase";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// import DropDownPicker from 'react-native-dropdown-picker';

import returnKeyVals from './dropdowns/AddressDropdown';

export default class DetailingService extends Component{

  constructor(props) {
    super(props);
    // this.docs = firebase.firestore().collection("Addresses");
    // this.userdocs = firebase.firestore().collection("Users");
    this.docs = firebase.firestore().collection("Prices");
    this.dbRef = firebase.firestore().collection('Orders');

    this.user = auth.currentUser;
    this.uid =  this.user.uid

    this.dbusers = firebase.firestore().collection('Users');

    //binding for datetimepicker methods 
    // this.handleDeliveryDateSet = this.handleDeliveryDateSet(this)
    // this.handleDeliveryTimeSet = this.handleDeliveryTimeSet(this)
    // this.handleDatePicked = this.handleDatePicked(this)

    this.handleShowDTPick = this.handleShowDTPick.bind(this)
    this.handleHideDTPick = this.handleHideDTPick.bind(this)
    this.handleDTPicked = this.handleDTPicked.bind(this)


    this.handleSNChange = this.handleSNChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleZipChange = this.handleZipChange.bind(this)

    this.handleMakeChange = this.handleMakeChange.bind(this)
    this.handleModelChange = this.handleModelChange.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
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
      fname: '',
      lname: '',
      phone: '',
      email: '',
      cancelled: 'no',
      canceldetails: '',
      customernotes: "",
      quantity: 1,
      detailingtype: '',
      detailingprice: '',
      prices: [],
      drivers: [],
      driveremail: '',
      driverfname: '',
      driverlname: '',
      driverphone: '',
      total: 0,
      text: "",
      drivernotes: "",
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
        color: '',
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

      datetimepicker:{
        isDateTimePickerVisible: false,
        deliverydate: " ",
        deliverytime: " ",
        deliverydatetime: " ",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        // fname: this.user,
      },
      isLoading: false
      
    };
  }

  //class methods for date picker 
  showDateTimePicker(){
    this.setState({ isDateTimePickerVisible: true });
  }

  hideDateTimePicker() {
    this.setState({ isDateTimePickerVisible: false });
  }

  setDeliveryTime = (data) => {
    day = data.getDate();
    month = (data.getMonth() + 1);
    year = data.getFullYear();
    hours = data.getHours();
    minutes = data.getMinutes();

    ampm = hours >= 12 ? 'PM' : 'AM';
    hours =  (hours % 12);
    this.delivery =  month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ' ' + ampm


    this.setState({deliveryTime: this.delivery}, () => 
    console.log(this.state))
  }
  
  formatDate = (data) => {
    this.day = data.getDate();
    this.month = (data.getMonth() + 1);
    this.year = data.getFullYear();
    this.hours = data.getHours();
    this.minutes = data.getMinutes();

    this.ampm = this.hours >= 12 ? 'PM' : 'AM';
    this.hours = this.hours % 12;i
    this.deliveryTime = this.month + '/' + this.day + '/' + this.year + ' ' + this.hours + ':' + this.minutes + ' ' + this.ampm

  }
  //set correct service to update
  updateService = () => {
    this.updateDBRef.update({ "deliveryTime": this.state.deliveryTime })
      .then(() => {
        this.setState({
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });


  }

  handleDatePicked = date => {
    this.setDeliveryTime(date)
    this.updateService()
    this.hideDateTimePicker()

  }


  formatDelivery(data){
    day = data.getDate();
    month = (data.getMonth() + 1);
    year = data.getFullYear();
    hours = data.getHours();
    minutes = data.getMinutes();

    ampm = hours >= 12 ? 'PM' : 'AM';
    hours =  (hours % 12);
    this.deliverydate =  month + '/' + day + '/' + year 
    this.deliverytime = hours + ':' + minutes + ' ' + ampm
 
  }

  handleDeliveryDateSet(deliverydate){
    const state = this.state
    console.log("Date time state: ", state.datetimepicker)
    state.datetimepicker["deliverydate"] = deliverydate
    this.setState(state)
  }

  handleDeliveryTimeSet(deliverytime){
    const state = this.state
    console.log("Date time state: ", state.datetimepicker)
    state.datetimepicker["deliverytime"] = deliverytime
    this.setState(state)
  }

  handleShowDTPick(state){
    // console.log("State: ", state)
  }

  handleHideDTPick(state){
    // console.log("State: ", state)
  }

  handleDTPicked(state){
    // console.log("DT State: ", state)
    var string = state.deliveryTime
    var stringarr;
    console.log("Epic string: ", string)
    const mystate = this.state.datetimepicker
    mystate.deliverydatetime = string
    stringarr=string.split(" ")
    var date = stringarr[0]
    mystate.deliverydate = date
    var time = stringarr[1] + " " + stringarr[2]
    mystate.deliverytime = time
    // console.log("date: ", date)
    // console.log("time: ", time)
    this.setState(mystate)
    console.log("Date state: ", this.state.datetimepicker.deliverydate)
    console.log("Time state: ", this.state.datetimepicker.deliverytime)
  }

  // handleDatePicked(date) {
  //   this.formatDelivery(date)
  //   this.hideDateTimePicker()

  // }

 //Class methods for 
  importText(text){
    const state = this.state
    state.text = text
    this.setState(state)
    console.log("Imported Text: ", this.state.text)

  }
  inputValueUpdate2 = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  addOrderToDB() {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        email: auth.currentUser?.email,
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,

        driveremail: this.state.driveremail,
        driverfname: this.state.driverfname,
        driverlname: this.state.driverlname,
        driverphone: this.state.driverphone,
        customernotes: this.state.customernotes,
        cancelled: this.state.cancelled,
        canceldetails: this.state.canceldetails,

        streetnumber: this.state.addressinfo.streetnumber,
        city: this.state.addressinfo.city,
        state: this.state.addressinfo.state,
        zip: this.state.addressinfo.zip,

        service: 'Detailing Service',
        type: this.state.detailingtype,
        price: this.state.detailingprice,
        quantity: this.state.quantity,
        subtotal: this.state.total,

        make: this.state.carinfo.make,
        model: this.state.carinfo.model,
        year: this.state.carinfo.year,
        color: this.state.carinfo.color,
        license: this.state.carinfo.license,

        card: this.state.cardinfo.type,

        deliverytime: this.state.datetimepicker.deliverytime,
        deliverydate: this.state.datetimepicker.deliverydate,
        drivername: "TBD",
        drivercar: "TBD",
        taxes: "TBD",
        discount: "TBD",

        ordernumber: '',
        fulfilled: "no",
        drivernotes: "",

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

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


  showType = option =>{
    console.log("option: ", option)
    const state = this.state
    // console.log("State: ", state);;/.
    state["detailingtype"]= option
    if(option == "Inside"){
      state["detailingprice"] = this.state.prices[0]["inside"]
    }

    else if(option == "Outside"){
      state["detailingprice"] = this.state.prices[0]["outside"]
    }

    else{
      state["detailingprice"] = this.state.prices[0]["both"]
    }
    this.setState(state)

    console.log("option: ", option)
    console.log("Type State: ", this.state.detailingtype)
    console.log("State: ", this.state.detailingprice)
  }
  

  childToParent(gastype){
    const state = this.state
    state.type= gastype
    this.setState(state)
    console.log("Gas type?: ", this.state.type)

  }
  getUserData = (querySnapshot) => {
    var drivers=[]
    
    querySnapshot.forEach((res) => {
      const {email, fname, lname, phone, driver } = res.data();
      // console.log("email: ", email)
      if (email.toLowerCase() == auth.currentUser?.email) {
        // console.log("email: ", email)
        const state = this.state
        state.email = email
        state.fname = fname
        state.lname = lname
        state.phone = phone
        this.setState(state)
        
      }
      if(driver == "yes"){
        drivers.push({
          key: res.id,
          email,
          phone,
          fname,
          lname,
        });
      }
      
    });
    this.setState({
      // keyvals: keyvalues,
      drivers,
      isLoading: false,
    });
    console.log("Drivers length: ", drivers.length)
    var driverindex = this.getRandomInt(drivers.length)
    this.setState({
      // keyvals: keyvalues,
      driveremail: this.state.drivers[driverindex].email,
      driverfname: this.state.drivers[driverindex].fname,
      driverlname: this.state.drivers[driverindex].lname,
      driverphone: this.state.drivers[driverindex].phone,
      isLoading: false,
    });

    console.log("Random driver: ", this.state.driveremail)
    
  };

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getPriceData);
    this.dbusers.onSnapshot(this.getUserData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getPriceData = (querySnapshot) => {
    const prices = [];
    const dbRef = firebase
    .firestore()
    .collection("Prices")
    .doc("Detailing_Prices");
  dbRef.get().then((res) => {
      const {inside, outside, both} = res.data();
      console.log("inside: ", inside)
      console.log("outside: ", outside)
      console.log("both: ", both)
      // console.log("large: ", large)
        prices.push({
          key: res.id,
          inside,
          outside,
          both,
          // large,
        });
        console.log("Prices: ", prices);
    this.setState({
      prices,
      isLoading: false,
    });
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
  handleColorChange(color){
    const state = this.state
    state.carinfo["color"] = color
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
    var total = parseFloat(state["detailingprice"]) * parseFloat(state["quantity"])
    total = total.toFixed(2)
    console.log("Total: ", total)
    state["reviewpressed"] = true;
    state["total"] = total
    this.setState(state)
    console.log("Final gas type: ", this.state.detailingtype)
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
  const color = this.props.color
  const license = this.props.license

  //datetimepicker
  const deliverydate = this.props.deliverydate
  const deliverytime = this.props.deliverytime
  const currentDate = new Date()

  const { open, value, items } = this.state;
  console.log("Date time state: ", this.state.datetimepicker)
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
                      
                        <Text style={styles.boxfontshead}>Detailing Service</Text>
                        <Text style={styles.subheadings}>Schedule</Text>
                        {/* <View style={{flexDirection:'row', flexWrap:'nowrap', zIndex: 1}}> */}
                          <BookAppointment
                            deliverydate={deliverydate}
                            deliverytime={deliverytime}
                            onShowDateTimePicker = {this.handleShowDTPick}
                            onHideDateTimePicker = {this.handleHideDTPick}
                            onHandleDatePicked = {this.handleDTPicked}
                            >

                          </BookAppointment>
                          <Text style={styles.subheadings}>Selected date and time: {this.state.datetimepicker.deliverydatetime}</Text>
                        {/* </View> */}

                        {/* <View>
                          <Button
                            title="Select a date and time"
                            onPress={this.showDateTimePicker}
                          />
                          <DateTimePickerModal
                            isVisible={this.state.datetimepicker["isDateTimePickerVisible"]}
                            mode="datetime"
                            minimumDate={currentDate}
                            onConfirm={(this.handleDatePicked)}
                            onCancel={this.hideDateTimePicker}
                          />

                        </View> */}
                        {/* <TextInput
                          // onChangeText={onChangeText}
                          value={text}
                          placeholder="Date"
                        />
                        <TextInput
                          // onChangeText={onChangeText}
                          value={text}
                          placeholder="Time"
                        /> */}
                                            
                        {/* </View> */}
                       
                        <Text style={styles.subheadings}>Detailing Type</Text>
                        {/* <View 
                        style ={{flexDirection:'row', flexWrap:'nowrap', zIndex: 1}} 
                        > */}

                            <View>
                              <Picker
                                onValueChange={this.showType}
                                selectedValue={this.state.detailingtype}
                              >
                                <Picker.Item label="Please Select" value="disabled" color="#aaa"/>
                                <Picker.Item label="Inside" value="Inside" />
                                <Picker.Item label="Outside" value="Outside" />
                                <Picker.Item label="Both" value="Both" />
                                {/* <Picker.Item label="Large" value="Large" /> */}
                                
                              </Picker>
                              
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
                          color={color}
                          onMakeValChange = {this.handleMakeChange}
                          onModelValChange = {this.handleModelChange}
                          onYearValChange = {this.handleYearChange}
                          onColorValChange = {this.handleColorChange}
                          onLicenseValChange = {this.handleLicenseChange}
                        >

                        </CarDropdown>

                          
                    </View>

                    {/* <View style={styles.paymentinfo}>
                        <Text style={styles.boxfontshead}>Payment Information</Text>
                        <PaymentDropdown/>
                    </View> */}
                     <View style={styles.addNotes}>
                        <Text style={styles.boxfontshead}>Please provide any additonal notes for the driver (optional)</Text>
                        <View style={styles.input2}>
                          <TextInput
                                  placeholder={'Additional Notes'}
                                  placeholderTextColor="#D3D3D3"
                                  value={this.state.customernotes}
                                  onChangeText={(val) => this.inputValueUpdate2(val, 'customernotes')}
                          />
                        </View>
                          
                    </View>

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
                          <Text>{this.state.detailingtype} Detailing price: $</Text>
                          <Text>Detailing: </Text>
                        </View>

                        <View>
                          <Text>{this.state.detailingprice} </Text>
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
                      <View
                          style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                          }}
                        />
                        <Text>Additonal Notes: {this.state.customernotes}</Text>

                      

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
      addNotes: {
        flex: 1,
        width: "90%",
        height: 500,
        left: "5%",
        right: "5%",
        //top: "0%",
        backgroundColor: "#CDCABF",
        borderWidth: 2,
        borderColor: "#000000",
        borderRadius: 10,
        marginBottom: 20,
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
        height: "40%",
        top:"20%",
        margin: 5,
        borderWidth: 1,
        padding: 5,
        backgroundColor: "white",
      },
      input2: {
        height: "40%",
        top:"20%",
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




// import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button, TextInput } from 'react-native'
// import React from 'react'
// import {useState} from "react";
// import DropDownPicker from 'react-native-dropdown-picker';
// import TimeDropdown from "./dropdowns/TimeDropdown";
// import DayDropdown from "./dropdowns/DayDropdown";
// import GasDropdown from "./dropdowns/GasDropdown";
// import PaymentDropdown from './dropdowns/PaymentDropdown';
// import DetailingDropdown from './dropdowns/DetailingDropdown';

// export default function DetailingService({navigation}) {
//   return (
//     <View style={styles.container}>
//          <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
//             <SafeAreaView style={styles.container}>
//             <View style={buttonstyles.backbutton}>
//                               <Button
//                               title="Back"
//                               color="white"
//                               onPress={() => navigation.goBack()}
//                             />
//                             </View>
//                 <Text style={styles.text}>
//                     Checkout
//                 </Text>
//                 <View style={styles.container}>
//                     <View style={styles.detailingservice}>
//                         <Text style={styles.boxfontshead}>Detailing Service</Text>
//                         <View style={{flexDirection:'row', flexWrap:'wrap',}}>
//                             <Text style={styles.subheadings}>Detailing Type</Text>
//                             <DetailingDropdown/>
//                         </View>
                        
//                         <View style={{flexDirection:'row', flexWrap:'wrap',}}>
//                             <View>
//                                 <Text style={styles.subheadings}>Schedule Time</Text>
//                                 <TimeDropdown></TimeDropdown>
//                             </View>
//                             <View>
//                                 <Text style={styles.subheadings}>Schedule Day</Text>
//                                 <DayDropdown></DayDropdown>
//                             </View>                          
//                         </View>
                        
//                     </View>
                    
//                     <View style={styles.personalinfo}>
//                         <Text style={styles.boxfontshead}>Personal Info</Text>
//                         <TextInput
//                         style={styles.input}
//                         placeholder="First Name"
//                         keyboardType="default"
//                         />
//                         <TextInput
//                         style={styles.input}
//                         placeholder="Last Name"
//                         keyboardType="default"
//                         />
//                         <TextInput
//                         style={styles.input}
//                         placeholder="Address"
//                         keyboardType="default"
//                         />
//                     </View>
//                     <View style={styles.paymentinfo}>
//                         <Text style={styles.boxfontshead}>Payment Information</Text>
//                         <PaymentDropdown/>
//                     </View>
//                     <View style={styles.promobutton}>
//                       <TextInput
//                         style={styles.promoinput}
//                         placeholder="Promo Code"
//                         keyboardType="default"
//                           />
//                           <View style={buttonstyles.button}>
//                                 <Button title="Order" color="white" onPress={() => navigation.navigate('OrderSummary')}></Button>
//                           </View>
//                     </View>
//                 </View>
//             </SafeAreaView>
//          </ImageBackground>   
//     </View>
//   )
// }

// const UselessTextInput = () => {
//     const [text, onChangeText] = React.useState("Useless Text");
//     const [number, onChangeNumber] = React.useState(null);
  
//     return (
//       <View>
//         {/* <TextInput
//           style={styles.input}
//           onChangeText={onChangeText}
//           value={text}
//         /> */}
//         <TextInput
//           style={styles.input}
//           onChangeText={onChangeNumber}
//           value={number}
//           placeholder="Amount of Gas (per gallon)"
//           keyboardType="numeric"
//         />
//       </View>
//     );
//   };

//   const buttonstyles = StyleSheet.create({
//     button: { 
//         width: '30%', 
//         height: 40,
//         bottom: 5,
//         left: 230,
//         // top: 270,
//         borderWidth: 1, 
//         backgroundColor:"#DAAC3F", 
//         position: "absolute"
//     },
//     backbutton: {
//       width: '15%', 
//       height: 40,
//       top: 65,
//       right: 15,
//       backgroundColor:"#DAAC3F", 
//       position: "absolute"
//     }
// })

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//       },

//       image: {
//         flex: 1,
//         justifyContent: "center"
//       },

//       text: {
//         color: "white",
//         fontSize: 48,
//         lineHeight: 44,
//         fontWeight: "bold",
//         textAlign: "center",
//         flex: 1,
//         top: 60,
//       },

//       services:{
//           flexDirection: "column",
//           justifyContent: "space-around"
//       },

//       detailingservice: {
//         position: 'absolute',
//         width: 350,
//         height: 200,
//         left: 21,
//         top: -250,
//         backgroundColor: '#CDCABF',
//         borderWidth: 2,
//         borderColor: '#000000',
//         borderRadius: 10,
//     },

//       personalinfo:{
//         position: 'absolute',
//         width: 350,
//         height: 190,
//         left: 21,
//         top: -40,
//         backgroundColor: '#CDCABF',
//         borderWidth: 2,
//         borderColor: '#000000',
//         borderRadius: 10,
//       },

//       paymentinfo:{
//         position: 'absolute',
//         width: 350,
//         height: 100,
//         left: 21,
//         top: 160,
//         backgroundColor: '#CDCABF',
//         borderWidth: 2,
//         borderColor: '#000000',
//         borderRadius: 10,
//       },

//       boxfontshead:{
//         color: "black",
//         fontSize: 24,
//         lineHeight: 30,
//         fontWeight: "bold",
//         textAlign: "center",
//         top: 5,
//         left: 5,
//       },

//       boxfontsbody:{
//         color: "black",
//         fontSize: 18,
//         lineHeight: 30,
//         textAlign: "left",
//         top: 5,
//         left: 5,
//       },

//       subheadings:{
//         color: "black",
//         fontSize: 16,
//         fontWeight: "bold",
//         lineHeight: 30,
//         textAlign: "left",
//         top: 5,
//         left: 10,
//       },
//       input: {
//         height: 40,
//         margin: 5,
//         borderWidth: 1,
//         padding: 5,
//         backgroundColor: "white",
//       },
//       promoinput: {
//         height: 40,
//         width: '50%',
//         margin: 5,
//         borderWidth: 1,
//         padding: 5,
//         backgroundColor: "white",
//       },
//       promobutton: {
//         // position: 'absolute',
//         left: 21,
//         top: 270,
//         flexDirection:'row', 
//         flexWrap:'wrap',
//       }


// })