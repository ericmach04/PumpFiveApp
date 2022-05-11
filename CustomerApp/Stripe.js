import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, ImageBackground, Image, } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import {StripeProvider} from "@stripe/stripe-react-native";
import PaymentDropdown from "./dropdowns/PaymentDropdown";
import { render } from "react-dom";
import firebase from "../firebase";
import { auth } from "../firebase";
import {Picker} from '@react-native-picker/picker'
import reactDom from "react-dom";

//ADD localhost address of your server
const API_URL = "http://10.162.15.50:19002";

export default function Stripe({ route, navigation }) {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const userkey = route.params;

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          Alert.alert(
            "Payment Successful",
            "Click OK to continue",
          [
            {
              text: 'Ok', 
              // onPress: () => navigation.navigate('OrderSummary')
              onPress: () => navigation.navigate('OrderSummary', {
                userid: userkey
              })
            },
          ]);
          console.log("Payment successful ", paymentIntent);
          console.log("Uid:", userkey);
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    
  <StripeProvider publishableKey ="pk_test_uYutcjOEAFLWKxvdHKzCFeCw">
          <View style={styles.container}>
          <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
          <View style={styles.backbutton}>
              <Button
                title="Back"
                color="white"
                onPress={() => navigation.goBack()}
              />
            </View>
            <View style={styles.heading}>
              <Text style={styles.head}>Checkout</Text>
            </View>
            {/* <View style={styles.paymentinfo}>
                          <Text style={styles.boxfontshead}>Payment Information</Text>
                          <PaymentDropdown
                          name={name}
                          number={number}
                          type={type}
                          expiry={expiry}
                          cvv={cvv}
                          carddata={carddata}
                          text={text}
                          onNameValChange = {this.handleNameChange}
                          onNumberValChange = {this.handleNumberChange}
                          onTypeValChange = {this.handleTypeChange}
                          onExpiryValChange = {this.handleExpiryChange}
                          onCvvValChange = {this.handleCvvChange}
                          onExportCard = {this.importCard}
                          onTextValChange = {this.importText}
                          />
                      </View> */}
            <TextInput
              autoCapitalize="none"
              placeholder="E-mail"
              keyboardType="email-address"
              onChange={value => setEmail(value.nativeEvent.text)}
              style={styles.input}
            />
            <CardField
              postalCodeEnabled={true}
              placeholder={{
                number: "Card Number",
              }}
              cardStyle={styles.card}
              style={styles.cardContainer}
              onCardChange={cardDetails => {
                setCardDetails(cardDetails);
              }}
            />
            <View style={styles.button}>
            <Button onPress={handlePayPress} title="Pay"  color="white" disabled={loading} />
            </View>
            </ImageBackground>
          </View>
      </StripeProvider>
  );
};
// export default Stripe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  button: {
    //flex: 1,
    width: "70%",
    height: 40,
    borderRadius: 5,
    backgroundColor: "black",
    //position: "absolute",
    left: "15%",
  },
  backbutton: {
    width: "18%",
    height: 40,
    top: "10%",
    right: "5%",
    borderRadius: 4,
    backgroundColor: "#DAAC3F",
    position: "absolute",
  },
  heading: {
    alignItems: "center",
    marginBottom: 50,
  },  
  head: {
    fontSize: 50,
    textDecorationLine: "underline",
  },
});
