import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { StyleSheet, View, SafeAreaView, Button } from 'react-native'
import firebase from 'firebase'
import firestore from '@react-native-firebase/firestore'

   

export default function BookingTimes() {
    const [loading, setLoading] = useState(true); //set loading to true on component mount
    const [bookingTimes, setBookingTimes] = useState([]); // Initial empty array of booking times

    useEffect(() => {
        const subscriber = firestore()
            .collection('Booking_Times')
            .onSnapshot(() => {
                const bookingTimes = [];
                
                querySnapshot.forEach(documentSnapshot => {
                    bookingTimes.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setBookingTimes(bookingTimes);
                setLoading(false);
            });

            
            
        return () => subscriber(); //unsubscribe from events when not in use
    }, []);

   

    if (loading) {
        return <ActivityIndicator/>
    }

    return(
        <FlatList
            data={bookingTimes}
            renderItem={({item}) => (
                <View style={{height:50, flex:1, alignItems:'center', justifyContent:'center'}}>
                    {/* <Text>Booking Times: {item.id}</Text> */}
                    <Text>Booking Times: {item.value}</Text>
                </View>
            )} 
        />
    );
}