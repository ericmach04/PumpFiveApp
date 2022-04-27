import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, ImageBackground } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import {StripeProvider} from "@stripe/stripe-react-native"

//ADD localhost address of your server
const API_URL = "http://10.162.21.79:19002";
const image = { uri: "https://reactjs.org/logo-og.png" };

const Stripe = props => {
//<StripeProvider publishableKey ="pk_test_uYutcjOEAFLWKxvdHKzCFeCw">
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

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
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
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
    <ImageBackground
              source={require("../images/pumpfivebackground.jpeg")}
              style={styles.image}
            >
    <View style={styles.box}>
        <Text style={styles.heading}>Checkout</Text>
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
          number: "Number on Card",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <View style={styles.button}>
      <Button onPress={handlePayPress} title="Pay" color="white" disabled={loading}/>
      </View>
      </View>
      </ImageBackground>
    </View>
</StripeProvider>
  );
};
export default Stripe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  box: {
    position: "absolute",
    width: "90%",
    height: "80%",
    top: "10%",
    left: "5%",
    backgroundColor: "#CDCABF",
    borderWidth: 3,
    borderRadius: 20,
  },
  heading: {
        fontSize: 56,
        textAlign: "center",
        textDecorationLine: "underline",
        marginTop: "5%",
  },
  input: {
    backgroundColor: "#efefefef",
    marginTop: "30%",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginVertical: 30,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    width: "70%",
    height: 40,
    borderRadius: 5,
    backgroundColor: "black",
    left: "15%",
  },
});