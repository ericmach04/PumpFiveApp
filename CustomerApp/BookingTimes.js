import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Button,
  TextInput,
  UselessTextInput,
} from "react-native";
import React, { Component } from "react";
import firebase from 'firebase';
import { auth } from '../firebase'



export default class BookingTimes extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection('Booking_Times');
    this.state = {
      isLoading: true,
      bookingTimes: []
    };

    //this.getTimeSlots = this.getTimeSlots.bind(this);
  }



  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getTimeSlots)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getTimeSlots = (querySnapshot) => {
    const bookingTimes = [];
    querySnapshot.forEach((slot) => {
      const { slot1 } = slot.data();
      bookingTimes.push({
        key: slot.id,
        slot1
      });
    });

    console.log(bookingTimes)

    this.setState({
      bookingTimes,
      isLoading: false
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.container} source={require("../images/pumpfivebackground.jpeg")}>
          <Text style={styles.text}>Pick a Time</Text>
          {
            this.state.bookingTimes.map((slots, i) => {
              
              console.log(slots.slot1)
              return (
                //<View style={{ top: 20, left: "20%", }}>
                  <View >
                    <Text style={styles.slot}>{slots.slot1}</Text>
                  </View>
                //</View>

              );

            })

          }
        </ImageBackground>
        </SafeAreaView>
      </View>



    );

  }




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  text: {
    color: "white",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    top: 40,
  },

  slot: {
    marginTop: 0,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#ff7849",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
    
    
  }

});