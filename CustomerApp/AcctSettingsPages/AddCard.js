import { StyleSheet, Text, View, ImageBackground, Button, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React, {Component} from 'react';
import { CreditCardInput} from "react-native-credit-card-input";
import { auth } from "../../firebase";
import {addCard} from '../../firebasefunctions'

// export default function AddCard({ navigation }) {
    var dataobject;
    var useremail = auth.currentUser.email;
    export default class AddCard extends Component {

    _onFocus = field => console.log('focusing', field)

    _onChange = formData => {
        console.log(JSON.stringify(formData, null, ' '))
        dataobject = formData;
        console.log("Data object: ", dataobject)
    }

    storeValues = () => {
        console.log("Final data object: ", dataobject)
        console.log("Card number: ", dataobject["values"]["number"])
        console.log("Email: ", useremail)

        addCard({
            email: useremail,
            number: dataobject["values"]["number"],
            type: dataobject["values"]["type"],
            cvv: dataobject["values"]["cvc"],
            expiry: dataobject["values"]["expiry"],
        })

    }
    // _printVals = () => {
    //     console.log("Final object:", this.dataobject)
    // }

    // printcardvals = formData => console.log(JSON.stringify(formData, null, ' '))

    render(){

        
    // _onChange => form => console.log(form);
    return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground source={require('../../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
          <View style={styles.box1}>
            <Text style={styles.h1}>Add Card</Text>
            <View style={styles.backbutton}>
             <Button title="Back" color="white" onPress={() => this.props.navigation.navigate('Payment')}/>
            </View>
            <View 
                style={styles.box2}
            >
                <CreditCardInput
                    autofocus
                    requireName={true}
                    requireCVC={true}
                    requirePostalCode={true}
                    validColor="black"
                    invalidColor="red"
                    placeholderColor="darkgray"
                    labelStyle={{color: "black", fontSize: 12}}
                    inputStyle={{color: "black", fontSize: 16}}
                    onFocus={this._onFocus}
                    onChange={this._onChange}
                />
                {/* <LiteCreditCardInput/> */}
    
            </View>
            {/* <View style={styles.box3}>
              <Text style={styles.head3}>Default Billing Address</Text>
            </View>
            <View style={styles.box4}>
              <Text style={styles.h2}>123 s 12th St</Text>
              <Text style={styles.h2}>Milwaukee, WI</Text>
              <Text style={styles.h2}>53215</Text>
            </View> */}
          </View>
          <View style={styles.paybutton}>
                <Button
                  title="Add Card"
                  color="black"
                  onPress={this.storeValues}
                //   onPress={() => navigation.navigate("AddCard")}
                />
              </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )}
 }
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
  })
  
  
  
  
  
  
  
  
  
    
    //Working on implementation
  
  /* <view>
      rect1: {
          position: 'absolute',
          width: 350,
          height: 243,
          left: 21,
          top: 287,
          backgroundColor: '#CDCABF',
          borderWidth: 2,
          borderColor: '#000000',
          borderRadius: 10,
          },
  </view> */