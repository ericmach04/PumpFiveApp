import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button, ScrollView, Alert} from 'react-native'
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import { auth } from "../firebase";
import React, { Component } from 'react'
import GasService from './GasService';
import GasButton from '../CustomerApp/buttons/GasButton'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import Tabs from '../navigation/tabs';


const image = { uri: "https://reactjs.org/logo-og.png" };

export default class PlaceOrder extends Component{
  constructor() {
    super();
    this.docs = firebase.firestore().collection("Users");
    this.state = {
      isLoading: true,
      users:[],
    };
    // this.deleteUser = this.deleteUser.bind(this);

   
    

  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getUserData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleGasBook () {
    // console.log(this.state.users[0].paid)
    if(this.state.users[0].paid == "no"){
      Alert.alert(
        'You do not currently have a membership.',
        'You need a membership to use our services. Would you like to purchase a membership?',
        [
          // {text: 'Yes', onPress: () => this.props.navigation.navigate('Membership')},
          {text: 'Yes', onPress: () => this.props.navigation.navigate('Membership')},
          {text: 'Maybe Later', onPress: () => console.log('Cancelled'), style: 'cancel'},
        ],
        { 
          cancelable: true 
        }
      );
          
    }
    else{
      // this.props.navigation.navigate('BookAppointment', {service: 1})
      this.props.navigation.navigate('GasService')
    }
  }
  
  getUserData = (querySnapshot) => {
    const users=[]
    querySnapshot.forEach((res) => {
      const { email, phone, fname, lname, paid } = res.data();
      if (email.toLowerCase() == auth.currentUser?.email) {
        users.push({
          key: res.id,
          email,
          phone,
          fname,
          lname,
          paid,
        });
      }
      // console.log(users)
    });
    this.setState({
      users,
      isLoading: false,
    });
  };
  render(){
  return (
    <View style={styles.container}>
        <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>
                    Services
               </Text>

                <ScrollView style={styles.scroll}>
                    <View style={styles.gasservice}>
                        <Text style={styles.boxfontshead}>Gas Services</Text>
                        <Text style={styles.boxfontsbody}>Because you hate going to the gas station! Because those extra 20 minutes in the morning matter.</Text>
                        <View style={styles.button}>
                          {/* <Text>Home Screen</Text> */}
                          <Button
                            title="Book Now"
                            color="white"
                            onPress={() => this.handleGasBook()}
                          />
                            
                        </View>
                        
                    </View>
                    <View style={styles.gasservice}>
                        <Text style={styles.boxfontshead}>Tire Services</Text>
                        <Text style={styles.boxfontsbody}>PumpFive can provide you with quick tire service. Book your service and we
                        will get back to you in 24 hours.</Text>
                        <View style={styles.button}>
                        <Button
                            title="Book Now"
                            color="white"
                            onPress={() => this.props.navigation.navigate('BookAppointment')}
                          />
                        </View>
                    </View>
                    <View style={styles.gasservice}>
                        <Text style={styles.boxfontshead}>Detailing Services</Text>
                            <Text style={styles.boxfontsbody}>PumpFive can provide you with quick detailing service. Book your service and we
                            will get back to you in 24 hours.</Text>
                            <View style={styles.button}>
                              <Button
                              title="Book Now"
                              color="white"
                              onPress={() => this.props.navigation.navigate('BookAppointment', )}
                            />
                            </View>
                        </View>
                        <View style={styles.gasservice}>
                        <Text style={styles.boxfontshead}>Tinting Services</Text>
                            <Text style={styles.boxfontsbody}>PumpFive can provide you with a quick tinting service. Book your service and we
                            will get back to you in 24 hours.</Text>
                            <View style={styles.button}>
                              <Button
                              title="Book Now"
                              color="white"
                              onPress={() => this.props.navigation.navigate('BookAppointment')}
                            />
                            </View>
                        </View>
                    </ScrollView>
          </SafeAreaView>
        </ImageBackground>
    </View>
  )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },

      image: {
        flex: 1,
        //justifyContent: "center"
      },

      text: {
        //flex: 1,
        color: "white",
        fontSize: 48,
        lineHeight: 70,
        fontWeight: "bold",
        textAlign: "center",
        //flex: 1,
        top: 0,
      },

      gasservice: {
        flex: 1,
        width: "90%",
        height: 200,
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
        //flex: 1,
        color: "black",
        fontSize: 24,
        lineHeight: 30,
        fontWeight: "bold",
        textAlign: "left",
        top: "3%",
        left: "2%",
      },

      boxfontsbody:{
        //flex: 1,
        color: "black",
        fontSize: 18,
        lineHeight: 30,
        textAlign: "left",
        top: "3%",
        left: "2%",
        right: "2%",
        width: "95%",
      },
      button: { 
        flex: 1,
        width: "30%",
        height: 40,
        bottom: "5%",
        right: "5%",
        borderRadius: 20,
        backgroundColor:"#DAAC3F", 
        position: "absolute"
    },
    scroll: {
      flex: 1,
    },
})

