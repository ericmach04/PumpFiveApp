import { StyleSheet, Text, TextInput, View, ImageBackground, Button, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native'
import React, {Component, useEffect, useState} from 'react';
import firebase from "firebase";
import { auth } from "../../firebase";
import {addCarInfo} from '../../firebasefunctions'

export default class EditCarInfo extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Car_Info');
    this.state = {
      email: auth.currentUser?.email,
      make: '',
      model: '',
      year: '',
      color: '',
      license: '',
      isLoading: false
    };
  }

  componentDidMount() {
    const dbRef = firebase.firestore().collection('Car_Info').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const car = res.data();
        this.setState({
          key: res.id,
          email: auth.currentUser?.email,
          make: car.make,
          model: car.model,
          year: car.year,
          color: car.color,
          license: car.license,
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

  updateCar() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('Car_Info').doc(this.state.key);
    updateDBRef.set({
      email: auth.currentUser?.email,
      make: this.state.make,
      model: this.state.model,
      year: this.state.year,
      color: this.state.color,
      license: this.state.license,
    }).then((docRef) => {
      this.setState({
        email: auth.currentUser?.email,
        key: '',
        make: '',
        model: '',
        year: '',
        color: '',
        license: '',
        isLoading: false,
      });
      this.props.navigation.navigate('CarInfo');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
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
      <View style={styles.container}>
        <ImageBackground source={require('../../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
          <View style={styles.box1}>
            <Text style={styles.h1}>Edit Car Info</Text>
            <View style={styles.backbutton}>
             <Button title="Back" color="white" onPress={() => this.props.navigation.navigate('CarInfo')}/>
            </View>
            
                <Text style={styles.email}>Car Make: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter Car Make'}
                        value={this.state.make}
                        onChangeText={(val) => this.inputValueUpdate(val, 'make')}
                />

                <Text style={styles.email}>Car Model: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter Car Model'}
                        value={this.state.model}
                        onChangeText={(val) => this.inputValueUpdate(val, 'model')}
                />

                <Text style={styles.email}>Car Year: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter Car Year'}
                        value={this.state.year}
                        onChangeText={(val) => this.inputValueUpdate(val, 'year')}
                />

                <Text style={styles.email}>Color: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter Color of the Car'}
                        value={this.state.color}
                        onChangeText={(val) => this.inputValueUpdate(val, 'color')}
                />

                <Text style={styles.email}>License Plate: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter License Plate'}
                        value={this.state.license}
                        onChangeText={(val) => this.inputValueUpdate(val, 'license')}
                />

            
          </View>
          <View style={styles.paybutton}>
                <Button
                  title="Edit Car"
                  color="black"
                  onPress={() => this.updateCar()}
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