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
<<<<<<< HEAD
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
=======
                
                
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
                                        onPress = {() => this.handleGasBook()}
                                        // onPress={() => {
                                        //   if(res.paid == "no")
                                        //   {
                                        //     Alert.alert(
                                        //       'You do not currently have a membership. You need a membership to use our services. Would you like to purchase a membership?',
                                        //       [
                                        //         {text: 'Yes', onPress: () => this.props.navigation.navigate('Membership')},
                                        //         {text: 'Maybe Later', onPress: () => console.log('Cancelled'), style: 'cancel'},
                                        //       ],
                                        //       { 
                                        //         cancelable: true 
                                        //       }
                                        //     );
                                        //   };
                                        // }}
                                        // onPress={() => this.props.navigation.navigate('CalendarScreen')}
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
                                        onPress={() => this.props.navigation.navigate('TireService')}
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
                                          onPress={() => this.props.navigation.navigate('DetailingService')}
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
                                          onPress={() => this.props.navigation.navigate('DetailingService')}
                                        />
                                        </View>
                                    </View>
                                </ScrollView>
                   
                                      
>>>>>>> eaac2173e200081d52c719788deeb691255ec7d1
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