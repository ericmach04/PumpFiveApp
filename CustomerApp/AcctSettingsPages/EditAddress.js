import { StyleSheet, Text, TextInput, View, ImageBackground, Button, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native'
import React, {Component, useEffect, useState} from 'react';
import firebase from "firebase";
import { auth } from "../../firebase";
import {addCarInfo} from '../../firebasefunctions'

export default class EditAddress extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Addresses');
    this.state = {
      email: auth.currentUser?.email,
      streetnumber: '',
      city: '',
      state: '',
      zip: '',
      isLoading: false
    };
  }

  componentDidMount() {
    const dbRef = firebase.firestore().collection('Addresses').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const address = res.data();
        this.setState({
          key: res.id,
          email: auth.currentUser?.email,
          streetnumber: address.streetnumber,
          city: address.city,
          state: address.state,
          zip: address.zip,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateAddress() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('Addresses').doc(this.state.key);
    updateDBRef.set({
      email: auth.currentUser?.email,
      streetnumber: this.state.streetnumber,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
    }).then((docRef) => {
      this.setState({
        email: auth.currentUser?.email,
        key: '',
        streetnumber: '',
        city: '',
        state: '',
        zip: '',
        isLoading: false,
      });
      this.props.navigation.navigate('Addresses');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

    // const [email, setEmail] = useState('')
    // const [make, setMake] = useState('')
    // const [model, setModel] = useState('')
    // const [year, setYear] = useState('')
    // const [license, setLicense] = useState('')

    // const addCarInfoToDB = () => {
    //     addCarInfo({
    //         email: auth.currentUser?.email,
    //         make: make,
    //         model: model,
    //         year: year,
    //         license: license
    //     })

    // }
    render() {
      if(this.state.isLoading){
        return(
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
          </View>
        )
      }
    return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground source={require('../../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
          <View style={styles.box1}>
            <Text style={styles.h1}>Edit Address</Text>
            <View style={styles.backbutton}>
             <Button title="Back" color="white" onPress={() => this.props.navigation.navigate('Addresses')}/>
            </View>
            
                <Text style={styles.email}>Street Number: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter Street Numner'}
                        value={this.state.streetnumber}
                        onChangeText={(val) => this.inputValueUpdate(val, 'streetnumber')}
                        // value = {make}
                        // onChangeText={text => setMake(text)}
                        // placeholder="Enter Car Make"
                        // keyboardType="default"
                />

                <Text style={styles.email}>City: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter City'}
                        value={this.state.city}
                        onChangeText={(val) => this.inputValueUpdate(val, 'city')}
                        // value = {model}
                        // onChangeText={text => setModel(text)}
                        // placeholder="Enter Car Model"
                        // keyboardType="default"
                />

                <Text style={styles.email}>State: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter State'}
                        value={this.state.state}
                        onChangeText={(val) => this.inputValueUpdate(val, 'state')}
                        // value = {year}
                        // onChangeText={text => setYear(text)}
                        // placeholder="Enter Car Year"
                        // keyboardType="numeric"
                />

                <Text style={styles.email}>Zip Code: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter Zip Code'}
                        value={this.state.zip}
                        onChangeText={(val) => this.inputValueUpdate(val, 'zip')}
                        // value = {license}
                        // onChangeText={text => setLicense(text)}
                        // placeholder="Enter License Plate"
                        // keyboardType="default"
                />

            
          </View>
          <View style={styles.paybutton}>
                <Button
                  title="Edit Address"
                  color="black"
                  onPress={() => this.updateAddress()}
                //   onPress={() => navigation.navigate("AddCard")}
                />
              </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )}}
 
  const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      image: {
        flex: 1,
        justifyContent: "center"
      },
      box1: {
        position: "absolute",
        width:"95%",
        height: "80%",
        top:"10%",
        left: "2%",
        backgroundColor: "#CDCABF",
        borderWidth: 3,
        borderRadius: 20,
      },
      h1: {
        position: "absolute",
        top: 40,
        left: 40,
        fontWeight: "bold",
        fontSize: 36,
        lineHeight: 42,
      },
      box2: {
        position: "absolute",
        // width: "50%",
        // height: 69,
        // left: "1%",
        top: "20%",
      },
      h2: {
        fontSize: 20,
        lineHeight: 23,
        display: "flex",
      },
      box3: {
        position: 'absolute',
        width: 252,
        height: 28,
        left: 40,
        top: 275,
      },
      head3: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      box4: {
        position: 'absolute',
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
        backgroundColor:"#DAAC3F", 
        position: "absolute",
        borderWidth: 1,
      },
      backbutton: {
        width: '18%', 
        height: 40,
        // top: 65,
        right: 0,
        backgroundColor:"#DAAC3F", 
        position: "absolute"
    },
    paybutton: {
        width: "77%",
        height: "5%",
        bottom: "25%",
        left: "10%",
        backgroundColor: "#DAAC3F",
        position: "absolute",
      },
      email: {
        top: "20%",
        color: "black",
       
        fontSize: 20,
        lineHeight: 44,
        fontWeight: "bold",
        textAlign: "left",
    
        left: "2%",
      },
      input: {
        height: "4%",
        margin: "1%",
        width: "90%",
        borderWidth: 1,
        padding: "1%",
        backgroundColor: "white",
        top: "20%",
        left: "2%",
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
  })