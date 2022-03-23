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

        <ImageBackground 
        style={styles.container}
        source= {require("../images/pumpfivebackground.jpeg")}

          
        >

          <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Pick a Time</Text>
            {
              this.state.bookingTimes.map((slots, i) => {
                
              })
              
            }

          </SafeAreaView>

        </ImageBackground>
      </View>
    )

  }


  // async getTimeSlots = (querySnapshot) => {
  //     const bookingTimes = [];
  //     querySnapshot.forEach((slot) => {
  //         const {} = slot.data();

  //     }


  // }



  // if (loading) {
  //     return <ActivityIndicator/>
  // }

  // return(
  //     <FlatList
  //         data={bookingTimes}
  //         renderItem={({item}) => (
  //             <View style={{height:50, flex:1, alignItems:'center', justifyContent:'center'}}>
  //                 {/* <Text>Booking Times: {item.id}</Text> */}
  //                 <Text>Booking Times: {item.value}</Text>
  //             </View>
  //         )} 
  //     />
  // );  
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
    color: "black",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    top: 40,
  }
});