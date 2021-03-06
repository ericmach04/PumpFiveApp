import { StyleSheet, Alert, Text, View, SafeAreaView, ImageBackground, Button, TextInput, UselessTextInput, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { Component } from 'react'
// import DropdownMenu from 'react-native-dropdown-menu';
import firebase from 'firebase';
import { auth } from "../../firebase";
import {useState} from "react";
import PaymentDropdown from '../dropdowns/PaymentDropdown';
import DropdownMenu from 'react-native-dropdown-menu';
// import DropDownPicker from 'react-native-dropdown-picker';
// import TimeDropdown from "../dropdowns/TimeDropdown";
// import DayDropdown from "../dropdowns/DayDropdown";
// import GasDropdown from "../dropdowns/GasDropdown";
// import PaymentDropdown from '../dropdowns/PaymentDropdown';

function ButtonOne(props) {
  return (
    <View style={styles.paybutton}>
        <Button
          title="Add Membership"
          color="white"
          onPress={props.onClick}
        />
    </View>
  );
}

export default class Membership extends Component{
  constructor(props) {
    super(props);
    this.docs = firebase.firestore().collection("Users");
    this.ccdocs = firebase.firestore().collection("Credit_Cards");

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleExpiryChange = this.handleExpiryChange.bind(this)
    this.handleCvvChange = this.handleCvvChange.bind(this)

    this.importCard = this.importCard.bind(this)
    this.importText = this.importText.bind(this)

    this.state = {
      isLoading: true,
      key: '',
      paid: '',
      cards: [],
      text: '',
      data:[],
      buttononepressed: 'false',
      buttontwopressed: 'false',
      cardinfo : {
        name: '',
        number: '',
        type: '',
        expiry: '',
        cvv: ''
      },
      importedcardinfo : {
        name: '',
        number: '',
        type: '',
        expiry: '',
        cvv: ''
      },
    };
    // this.deleteUser = this.deleteUser.bind(this);
  }

  importCard(carddata){
    const state = this.state
    state.importedcardinfo = carddata
    this.setState(state)
    console.log("Imported Card state: ", this.state.importedcardinfo)

  }

  importText(text){
    const state = this.state
    state.text = text
    this.setState(state)
    console.log("Imported Text: ", this.state.text)

  }

  handleNameChange(name){
    // console.log("In name change")
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

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getifpaid);
    this.ccdocs.onSnapshot(this.getCardData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleButtonOnePress() {
    console.log("In button 1 pressed")
    this.setState({buttononepressed: "true"});
  }
  checkCards() {
    console.log("mytext: ", this.state.text)
    console.log("card info: ", this.state.cardinfo)
    console.log("imported card info: ", this.state.importedcardinfo)
    if(this.state.importedcardinfo[this.state.text].cvv != this.state.cardinfo.cvv)
    {
      Alert.alert(
        'Sorry, the fields for this card do not match',
        'Please try again',
        [
          {text: 'Dismiss', onPress: () => console.log('Error'), style: 'cancel'},
        ],
        { 
          cancelable: true 
        }
      );
    }
    else{
      // Alert.alert(
      //   'Fields match',
      //   'LFG',
      //   [
      //     {text: 'Dismiss', onPress: () => console.log('Error'), style: 'cancel'},
      //   ],
      //   { 
      //     cancelable: true 
      //   }
      // );
      this.updatePaidYes()
      console.log("payment info correct")
    }
  }
  updatePaidYes() {
    
    const updateDBRef = firebase.firestore().collection('Users').doc(this.state.key)
    
    updateDBRef.update("paid", "yes")
    
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  updatePaidNo() {
    // this.setState({
    //   isLoading: true,
    // });
    const updateDBRef = firebase.firestore().collection('Users').doc(this.state.key)
    
    updateDBRef.update("paid", "no")
    // .then((docRef) => {
    //   this.setState({
    //     email: '',
    //     password: '',
    //     isLoading: false,
    //   });
    //   // this.props.navigation.navigate('Login');
    // })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });

    this.setState({buttononepressed: "false"});
  }

  cancelMembership(){
    Alert.alert(
      'Cancel Memebership',
      'Are you sure you want to cancel?',
      [
        {text: 'Yes', onPress: () => this.updatePaidNo()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
      // this.updatePaidNo()
  }

  getCardData = (querySnapshot) => {
    const cards = [];
    console.log("In card data")
    querySnapshot.forEach((res) => {
      const { createdAt, cvv, email, expiry, number, type } = res.data();
      if (email == auth.currentUser?.email) {
        cards.push({
          key: res.id,
          createdAt,
          cvv,
          email,
          expiry,
          number,
          type,
        });
      }
    });
    this.setState({
      cards,
      isLoading: false,
    });
    console.log("My credit cards: ", cards)
  };


  getifpaid = (querySnapshot) => {
    
    querySnapshot.forEach((res) => {
      const {email, paid } = res.data();
      // console.log(email);
      // console.log(phone)
      // console.log(fname)
      // console.log(lname)
      if (email.toLowerCase() == auth.currentUser?.email) {
        // console.log("UserKeyID: ", res.id)
        if(paid == "no"){
          this.setState({
            paid: "no",
            isLoading: false,
          });
        }
        else
        {
          this.setState({
            // key: res.id,
            paid: "yes",
            isLoading: false,
          });
        }
        this.setState({
          key: res.id,
          // isLoading: false,
        });
        
      }
      
    });
    console.log("UserKeyID: ", this.state.key)
    this.setState({
      isLoading: false,
    });
    console.log("this.state.paid: ", this.state.paid)
  };

  render (){
    var data2 = [["Big Data", "Hadoop", "Spark", "Hive"], ["Data Science" ,"Python","Ruby"]];
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }

    var buttononepressed = this.state.buttononepressed;
    // let dropdown;
    if(this.state.paid == "no"){
      // console.log("in no")

      if (buttononepressed == "true") {
        // console.log("Button 1 pressed")
        // dropdown = 
        // <View style={{justifyContent:"center"}}>
        //   <Text style={{top:"400%", left: "25%"}}>Please Select Payment Method</Text>
        //   <PaymentDropdown/>
        // </View>
        const name = this.props.name
        const number = this.props.number
        const type = this.props.type
        const expiry = this.props.expiry
        const cvv = this.props.cvv

        const carddata = this.props.carddata
        const text = this.props.text
        return (
          
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            
              <ImageBackground source={require('../../images/pumpfivebackground.jpeg')} style={styles.image}>
                          <View 
                          style={styles.Memberships}
                          >
                              <View style={{flexDirection:'row', justifyContent: 'space-around',}}>
                                  <Text style={styles.text}>Membership</Text>
                                  {/* {
      
                                  } */}
                                  <View style={buttonstyles.backbutton}>
                                      <Button
                                      title="Back"
                                      color="white"
                                      //   onPress={() => console.log('Clicked')}
                                      onPress={() => this.props.navigation.goBack()}
                                      />
                                  </View>
                              </View>
                                <Text style={{top:"5%", left: "25%"}}>Please Select Payment Method</Text>
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
                                {/* <View style={{top: "50%"}}>
                                <DropdownMenu
                                  // style={{top: "10%"}}
                                  // useNativeDriver={true}
                                  label={"Select Payment Method"}
                                  bgColor={'white'}
                                  tintColor={'#000000'}
                                  activityTintColor={'red'}
                                  handler={(selection,row) => this.setState({text: data2[selection][row]})}
                                  data={data2}
                                >
                                </DropdownMenu>
                                </View> */}
                        <View style={styles.paybutton3}>
                          <Button
                          title="Checkout"
                          color="white"
                          onPress={() => this.checkCards()}
                          // onPress={() => console.log("Card info: ", this.state.cardinfo)}
                          // onPress={() => this.checkCards()}
                        /> 
                     
                       
                   </View> 
                                
                              
                          </View> 
                          
              </ImageBackground> 
              
          </View>
          </TouchableWithoutFeedback>  
        )
      }
      else{
        return (
          <View style={styles.container}>
         <ImageBackground source={require('../../images/pumpfivebackground.jpeg')} style={styles.image}>
                    <View 
                    style={styles.Memberships}
                    >
                        <View 
                        style={{flexDirection:'row', justifyContent: 'space-around',}}
                        >
                            <Text style={styles.text}>Membership</Text>
                            
                            <View style={buttonstyles.backbutton}>
                                <Button
                                title="Back"
                                color="white"
                                //   onPress={() => console.log('Clicked')}
                                onPress={() => this.props.navigation.goBack()}
                                />
                            </View>
                        </View>
                        <Text style={styles.email}>You currently do not have a membership</Text>
                        <Text style={styles.email}>Memberships are $19.99/month</Text>
                        <View style={styles.paybutton}>
                          
                            <Button
                              title="Add Membership"
                              color="white"
                              onPress={() => this.handleButtonOnePress()}
                            />
                        </View>
                        
                    </View> 
                    
         </ImageBackground>
           
    </View>
        )
      }
    }
    else{
      return (
    <View style={styles.container}>
               <ImageBackground source={require('../../images/pumpfivebackground.jpeg')} style={styles.image}>
                          <View 
                          style={styles.Memberships}
                          >
                              <View 
                              style={{flexDirection:'row', justifyContent: 'space-around',}}
                              >
                                  <Text style={styles.text}>Membership</Text>
                                  {/* {
      
                                  } */}
                                  <View style={buttonstyles.backbutton}>
                                      <Button
                                      title="Back"
                                      color="white"
                                      //   onPress={() => console.log('Clicked')}
                                      onPress={() => this.props.navigation.goBack()}
                                      />
                                  </View>
                              </View>
                              <Text style={styles.email}>Current Membership: <Text style={{fontWeight: "bold",}}>$19.99 Monthly</Text></Text>
                              <Text style={styles.email}>Member Number: <Text style={{fontWeight: "bold",}}>{this.state.key}</Text></Text>
                              <View style={styles.paybutton}>
                                
                                  <Button
                                    title="Cancel Membership"
                                    color="white"
                                    onPress={() => this.cancelMembership()}
                                  />
                              </View>
                              
                          </View> 
                
               </ImageBackground>
                 
          </View>
  )
    } 
                          }
}

  const buttonstyles = StyleSheet.create({
    button: { 
        width: '30%', 
        // height: 40,
        // bottom: 5,
        // left: 230,
        top: "10%",
        borderWidth: 1, 
        backgroundColor:"#DAAC3F", 
        position: "absolute"
    },
    backbutton: {
        width: '18%', 
        height: 40,
        // top: 65,
        right: 0,
        backgroundColor:"#DAAC3F", 
        position: "absolute"
    },
    backbutton2: {
      width: '18%', 
      height: 40,
      // top: 65,
      right: 0,
      bottom: "2%",
      backgroundColor:"#DAAC3F", 
      position: "absolute"
  },
  paybutton: {
    // width: "77%",
    // height: "7%",
    top: "30%",
    left: "20%",
    backgroundColor: "#DAAC3F",
    position: "absolute",
    justifyContent: "center",
  },
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
  
      UserAccount:{
        flexDirection: "column",
        justifyContent: "space-around"
    },
  
  
    Memberships: {
      position: 'absolute',
      width: "90%",
      height: "80%",
      left: "5%",
      top: "8%",
      backgroundColor: '#CDCABF',
      borderWidth: 2,
      borderColor: '#000000',
      borderRadius: 10,
  },
  email: {
    top: "10%",
    color: "black",
    paddingLeft: 15,
    fontSize: 15,
    lineHeight: 44,
    // fontWeight: "bold",
    textAlign: "left",

    // left: "2%",
  },
  paybutton: {
    // width: "77%",
    // height: "7%",
    top: "30%",
    left: "25%",
    backgroundColor: "#DAAC3F",
    position: "absolute",
    justifyContent: "center",
  },
  
  text: {
    color: "black",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    top: "10%",
  },
  
  
  // Addresses
  addrfontshead:{
    color: "black",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "center",
    top: 20,
    left: 5,
  },
  
  //Your Membership: 
  memfontshead:{
    color: "black",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "center",
    top: 40,
    left: 5,
  },
  
  //mem2
  mem2fontsbody:{
    color: "black",
    lineHeight: 30,
    textAlign: "center",
    top: 40,
    right: -15,
  },
  
  //mml
  mmlfontsbody:{
    color: "black",
    lineHeight: 30,
    textAlign: "center",
    top: 60,
    right: -15,
  },
  
  //lic
  licfontsbody:{
    color: "black",
    lineHeight: 30,
    textAlign: "center",
    top: 50,
    right: -15,
  },
  
  
  
  
  
  
  
  
      boxfontshead:{
        color: "black",
        fontSize: 24,
        lineHeight: 30,
        fontWeight: "bold",
        textAlign: "left",
        top: 5,
        left: 5,
      },
  
      boxfontsbody:{
        color: "black",
        fontSize: 18,
        lineHeight: 30,
        textAlign: "left",
        top: 5,
        left: 5,
        fontFamily: "Times New Roman",
      },

      boxfontshead2:{
        color: "black",
        fontSize: 24,
        lineHeight: 30,
        fontWeight: "bold",
        textAlign: "center",
        
      },
  
      image: {
        flex: 1,
        justifyContent: "center"
      },
  
     
  
      services:{
          flexDirection: "column",
          justifyContent: "space-around"
      },
  
      gasservice: {
        position: 'absolute',
        width: 350,
        height: 175,
        left: 21,
        top: -275,
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
    },
  
      tireservice:{
        position: 'absolute',
        width: 350,
        height: 175,
        left: 21,
        top: -80,
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
      },
  
      detailingservice:{
        position: 'absolute',
        width: 350,
        height: 175,
        left: 21,
        top: 115,
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
      },
  
      boxfontshead:{
        color: "black",
        fontSize: 24,
        lineHeight: 30,
        fontWeight: "bold",
        textAlign: "left",
        top: 5,
        left: 5,
      },
  
      boxfontsbody:{
        color: "black",
        fontSize: 18,
        lineHeight: 30,
        textAlign: "left",
        top: 5,
        left: 5,
      },
      loginview: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: 100, 
        height: 40,
        top: 5,
        right: 10,
        left: 5,
        backgroundColor:"#DAAC3F", 
      },
      preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
      },
      paybutton3: {
        // width: "77%",
        // height: "7%",
        top: "95%",
        right: "20%",
        borderRadius: 30,
        backgroundColor: "#DAAC3F",
        position: "absolute",
        // alignItems: "center",
      },
      
  
  
  })