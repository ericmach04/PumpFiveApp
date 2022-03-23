import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { StyleSheet, View, SafeAreaView, Button } from 'react-native'
import firebase from 'firebase'
import firestore from '@react-native-firebase/firestore'

   

export default class BookingTimes extends Component {
    constructor() {
        super();
        this.docs = firebase.firestore().collection('Booking_Times');
        this.state = {
          isLoading: true,
          bookingTimes: []
        };
      }

    componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getTimeSlots)
    }

    componentWillUnmount(){
        this.unsubscribe();
      }

    async getTimeSlots (){
        const snapshot = await firestore().collection('Booking_Times').get()
        return snapshot.docs.map(doc => doc.data());
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
//     render(){
//     return(
      
//         <FlatList
//             data={bookingTimes}
//             renderItem={({item}) => (
//                 <View style={{height:50, flex:1, alignItems:'center', justifyContent:'center'}}>
//                     {/* <Text>Booking Times: {item.id}</Text> */}
//                     <Text>Booking Times: {item.value}</Text>
//                 </View>
//             )} 
//         />
      
//     );  
// }
}