import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button, ScrollView, Alert} from 'react-native'
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
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
      userpaid: [],
    };
    // this.deleteUser = this.deleteUser.bind(this);
  }

  // componentDidMount() {
  //   this.unsubscribe = this.docs.onSnapshot(this.getUserData);
  // }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }
  getUserData = (querySnapshot) => {
    const user = [];
    querySnapshot.forEach((res) => {
      const { paid } = res.data();
      // console.log("Email1: ", email)
      // console.log("Email2: ", auth.currentUser?.email)
      if (paid == "no") {
        Alert.alert(
          'You currently do not have a membership. You must have a membership to book our services. Would you like to purchase a membership now?',
          [
            {text: 'Yes', onPress: () => this.props.navigation.navigate('Membership')},
            {text: 'No', onPress: () => console.log('Cancelled'), style: 'cancel'},
          ],
          { 
            cancelable: true 
          }
        );
        
      }
    });
    // console.log(cars);
    this.setState({
      cars,
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
                <ScrollView 
                  style={styles.scroll}
                  ref={ref => {this.scrollView = ref}}
                  onContentSizeChange={() => this.scrollView.scrollToEnd({animated: false})}
                  // bounces={false}
                >
                    <View style={styles.gasservice}>
                        <Text style={styles.boxfontshead}>Gas Services</Text>
                        <Text style={styles.boxfontsbody}>Because you hate going to the gas station! Because those extra 20 minutes in the morning matter.</Text>
                        <View style={buttonstyles.button}>
                          {/* <Text>Home Screen</Text> */}
                          <Button
                            title="Book Now"
                            color="white"
                            onPress={() => this.props.navigation.navigate('BookAppointment')}
                          />
                            
                        </View>
                        
                    </View>
                    <View style={styles.tireservice}>
                        <Text style={styles.boxfontshead}>Tire Services</Text>
                        <Text style={styles.boxfontsbody}>PumpFive can provide you with quick tire service. Book your service and we
                        will get back to you in 24 hours.</Text>
                        <View style={buttonstyles.button}>
                        <Button
                            title="Book Now"
                            color="white"
                            onPress={() => this.props.navigation.navigate('BookAppointment')}
                          />
                        </View>
                    </View>
                    <View style={styles.detailingservice}>
                        <Text style={styles.boxfontshead}>Detailing Services</Text>
                            <Text style={styles.boxfontsbody}>PumpFive can provide you with quick detailing service. Book your service and we
                            will get back to you in 24 hours.</Text>
                            <View style={buttonstyles.button}>
                              <Button
                              title="Book Now"
                              color="white"
                              onPress={() => this.props.navigation.navigate('BookAppointment')}
                            />
                            </View>
                        </View>
                        <View style={styles.tintingservice}>
                        <Text style={styles.boxfontshead}>Tinting Services</Text>
                            <Text style={styles.boxfontsbody}>PumpFive can provide you with quick detailing service. Book your service and we
                            will get back to you in 24 hours.</Text>
                            <View style={buttonstyles.button}>
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
        color: "white",
        fontSize: 48,
        lineHeight: 70,
        fontWeight: "bold",
        textAlign: "center",
        //flex: 1,
        top: 0,
      },

      gasservice: {
        width: "100%",
        height: "50%",
        //top: "0%",
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
    },

      tireservice:{
        width: "100%",
        height: "50%",
        //top: "5%",
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
      },

      detailingservice:{
        width: "100%",
        height: "50%",
        //top: "10%",
        backgroundColor: '#CDCABF',
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
      },
      tintingservice:{
        width: "100%",
        height: "50%",
        //top: "15%",
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
        top: "3%",
        left: "2%",
      },

      boxfontsbody:{
        color: "black",
        fontSize: 18,
        lineHeight: 30,
        textAlign: "left",
        top: "3%",
        left: "2%",
        right: "2%",
        width: "95%",
      },
      scroll: {
        width: "90%",
        left: "5%",
        right: "5%",
        resizeMode:"repeat",
      },
})

const buttonstyles = StyleSheet.create({
    button: { 
        width: "30%", 
        height: "21%",
        bottom: "5%",
        right: "5%",
        borderRadius: 20,
        backgroundColor:"#DAAC3F", 
        position: "absolute"
    },
})