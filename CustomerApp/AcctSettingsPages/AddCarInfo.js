import { StyleSheet, Text, TextInput, View, ImageBackground, Button, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, ActivityIndicator} from 'react-native'
import React, {Component, useEffect, useState} from 'react';
import firebase from "firebase";
import { auth } from "../../firebase";
import {addCarInfo} from '../../firebasefunctions'

export default class AddCarInfo extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Car_Info');
    this.state = {
      email: '',
      make: '',
      model: '',
      year: '',
      color: '',
      license: '',
      isLoading: false
    };
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  addCar() {
    if(this.state.make === '' || this.state.model === '' || this.state.year === '' || this.state.color === '' || this.state.license === ''){
     alert('Please fill out all fields')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        email: auth.currentUser?.email,
        make: this.state.make,
        model: this.state.model,
        year: this.state.year,
        color: this.state.color,
        license: this.state.license,
      }).then((res) => {
        this.setState({
          email: '',
          make: '',
          model: '',
          year: '',
          license: '',
          color: '',
          isLoading: false,
        });
        this.props.navigation.navigate('CarInfo')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }
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
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <ImageBackground source={require('../../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
          <View style={styles.box1}>
            <View style={styles.inputContainer}>
            <Text style={styles.h1}>Add Car Info</Text>
            <View style={styles.backbutton}>
             <Button title="Back" color="white" onPress={() => this.props.navigation.navigate('CarInfo')}/>
            </View>
            
                <Text style={styles.email}>Car Make: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter Car Make (ex: Honda)'}
                        placeholderTextColor="#D3D3D3"
                        value={this.state.make}
                        onChangeText={(val) => this.inputValueUpdate(val, 'make')}
                        // value = {make}
                        // onChangeText={text => setMake(text)}
                        // placeholder="Enter Car Make"
                        // keyboardType="default"
                />

                <Text style={styles.email}>Car Model: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter Car Model (ex: Accord)'}
                        placeholderTextColor="#D3D3D3"
                        value={this.state.model}
                        onChangeText={(val) => this.inputValueUpdate(val, 'model')}
                        // value = {model}
                        // onChangeText={text => setModel(text)}
                        // placeholder="Enter Car Model"
                        // keyboardType="default"
                />

                <Text style={styles.email}>Car Year: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter Car Year (YYYY)'}
                        placeholderTextColor="#D3D3D3"
                        value={this.state.year}
                        onChangeText={(val) => this.inputValueUpdate(val, 'year')}
                        // value = {year}
                        // onChangeText={text => setYear(text)}
                        // placeholder="Enter Car Year"
                        // keyboardType="numeric"
                />

                <Text style={styles.email}>Color: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter Color of the Car'}
                        placeholderTextColor="#D3D3D3"
                        value={this.state.color}
                        onChangeText={(val) => this.inputValueUpdate(val, 'color')}
                        // value = {year}
                        // onChangeText={text => setYear(text)}
                        // placeholder="Enter Car Year"
                        // keyboardType="numeric"
                />

                <Text style={styles.email}>License Plate: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter License Plate'}
                        placeholderTextColor="#D3D3D3"
                        value={this.state.license}
                        onChangeText={(val) => this.inputValueUpdate(val, 'license')}
                        // value = {license}
                        // onChangeText={text => setLicense(text)}
                        // placeholder="Enter License Plate"
                        // keyboardType="default"
                />

            </View>
          </View>
          <View style={styles.paybutton}>
                <Button
                  title="Add Car"
                  color="black"
                  onPress={() => this.addCar()}
                //   onPress={() => navigation.navigate("AddCard")}
                />
              </View>
        </ImageBackground>
      </View>
      </KeyboardAvoidingView>
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
        width:"90%",
        height: "80%",
        top:"10%",
        left: "5%",
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
        bottom: "20%",
        left: "11.5%",
        backgroundColor: "#DAAC3F",
        position: "absolute",
      },
      email: {
        top: "25%",
        color: "black",
       
        fontSize: 20,
        lineHeight: 44,
        fontWeight: "bold",
        textAlign: "left",
    
        left: "2%",
      },
      input: {
        height: "6%",
        margin: "1%",
        width: "90%",
        borderWidth: 1,
        padding: "1%",
        backgroundColor: "white",
        top: "25%",
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
      inputContainer: {
        width: "100%",
        // justifyContent: 'center',
        // alignItems: 'center',
      },
  })