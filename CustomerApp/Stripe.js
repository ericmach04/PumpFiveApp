// import firebase from "firebase";
// import { auth } from "../firebase";
// import PaymentDropdown from "./dropdowns/PaymentDropdown";
// import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button, TextInput, UselessTextInput, ScrollView, ActivityIndicator } from 'react-native'
// import {Picker} from '@react-native-picker/picker'
// import React, { Component, useState } from 'react'
// import { StripeProvider } from "@stripe/stripe-react-native";
// import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

// export default class Stripe extends Component {
//   constructor(props) {
//     super(props);
//     this.dbusers = firebase.firestore().collection('Users');
//     this.handleNameChange = this.handleNameChange.bind(this);
//     this.handleNumberChange = this.handleNumberChange.bind(this);
//     this.handleTypeChange = this.handleTypeChange.bind(this);
//     this.handleExpiryChange = this.handleExpiryChange.bind(this);
//     this.handleCvvChange = this.handleCvvChange.bind(this);

//     this.importCard = this.importCard.bind(this);
//     this.importText = this.importText.bind(this);
//     this.state = {
//       reviewpressed: false,
//       cardinfo: {
//         name: "",
//         number: "",
//         type: "",
//         expiry: "",
//         cvv: "",
//       },
//       importedcardinfo: {
//         name: "",
//         number: "",
//         type: "",
//         expiry: "",
//         cvv: "",
//       },
//       isLoading: false,
//     }

//   };
//   componentDidMount() {
//     this.dbusers.onSnapshot(this.getUserData);
//   }
//   getUserData = (querySnapshot) => {
//     var drivers=[]
   
//     querySnapshot.forEach((res) => {
//       const {email, fname, lname, phone, driver } = res.data();
//       // console.log("email: ", email)
//       if (email.toLowerCase() == auth.currentUser?.email) {
//         // console.log("email: ", email)
//         const state = this.state
//         state.email = email
//       }
//     });
//     this.setState({
//       // keyvals: keyvalues,
//       isLoading: false,
//     });
//   };

//   importText(text){
//     const state = this.state
//     state.text = text
//     this.setState(state)
//     console.log("Imported Text: ", this.state.text)

//   }
//   importCard(carddata) {
//     const state = this.state;
//     state.importedcardinfo = carddata;
//     this.setState(state);
//     console.log("Imported Card state: ", this.state.importedcardinfo);
//   }
//   handleNameChange(name) {
//     console.log("In name change");
//     const state = this.state;
//     state.cardinfo["name"] = name;
//     this.setState(state);
//   }

//   handleNumberChange(number) {
//     const state = this.state;
//     state.cardinfo["number"] = number;
//     this.setState(state);
//   }
//   handleTypeChange(type) {
//     const state = this.state;
//     state.cardinfo["type"] = type;
//     this.setState(state);
//   }
//   handleExpiryChange(expiry) {
//     const state = this.state;
//     state.cardinfo["expiry"] = expiry;
//     this.setState(state);
//   }
//   handleCvvChange(cvv) {
//     const state = this.state;
//     state.cardinfo["cvv"] = cvv;
//     this.setState(state);
//   }
//   inputValueUpdate = (val, prop) => {
//     const state = this.state;
//     state.keyvals[this.state.text][prop] = val;
//     this.setState(state);
//     // console.log("Gas type?: ", this.state.type)
//   };

//   inputValueUpdate2 = (val, prop) => {
//     const state = this.state;
//     state[prop] = val;
//     this.setState(state);
//   }

//   quantityInputValueUpdate = (val, prop) => {
//     const state = this.state;
//     state[prop] = val;
//     this.setState(state);
//     // console.log("quantity?: ", this.state.quantity)
//   };
//   render() {
//     const name = this.props.name
//     const number = this.props.number
//     const type = this.props.type
//     const expiry = this.props.expiry
//     const cvv = this.props.cvv

//   // const [email, setEmail] = useState();
//   // const [cardDetails, setCardDetails] = useState();
//   // const { confirmPayment, loading } = useConfirmPayment();
 
//     const carddata = this.props.carddata
//     const text = this.props.text
//     return (
//       <StripeProvider publishableKey ="pk_test_uYutcjOEAFLWKxvdHKzCFeCw">
//           <View style={styles.container}>
//           <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
//             <View style={styles.paymentinfo}>
//                           <Text style={styles.boxfontshead}>Payment Information</Text>
//                           <PaymentDropdown
//                           name={name}
//                           number={number}
//                           type={type}
//                           expiry={expiry}
//                           cvv={cvv}
//                           carddata={carddata}
//                           text={text}
//                           onNameValChange = {this.handleNameChange}
//                           onNumberValChange = {this.handleNumberChange}
//                           onTypeValChange = {this.handleTypeChange}
//                           onExpiryValChange = {this.handleExpiryChange}
//                           onCvvValChange = {this.handleCvvChange}
//                           onExportCard = {this.importCard}
//                           onTextValChange = {this.importText}
//                           style={styles.dropdown}
//                           />
//                       </View>
//             </ImageBackground>
//           </View>
//       </StripeProvider>

//     )
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   paymentinfo: {
//     width: "90%",
//     left: "5%",
//     height: 750,
//     backgroundColor: "#CDCABF",
//     borderWidth: 2,
//     borderColor: "#000000",
//     borderRadius: 10,
//   },

//   boxfontshead: {
//     color: "black",
//     fontSize: 24,
//     lineHeight: 30,
//     fontWeight: "bold",
//     textAlign: "center",
//     top: "0%",
//   },
//   image: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   button: {
//     //flex: 1,
//     width: "70%",
//     height: 40,
//     borderRadius: 5,
//     backgroundColor: "black",
//     //position: "absolute",
//     left: "15%",
//   },
//   dropdown: {
//     top: "20%",
//     left: "5%",
//   },
 
// })

import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, ImageBackground, Image } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import {StripeProvider} from "@stripe/stripe-react-native";
import PaymentDropdown from "./dropdowns/PaymentDropdown";
import { render } from "react-dom";
import firebase from "../firebase";
import { auth } from "../firebase";
import {Picker} from '@react-native-picker/picker'
import reactDom from "react-dom";

//ADD localhost address of your server
const API_URL = "http://10.162.4.69:19002";

function Stripe({route, navigation}) {
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
          alert("Payment Successful",
          [
            {
              text: 'Ok', 
              onPress: () => navigation.navigate('OrderSummary')
            },
          ]);
          console.log("Payment successful ", paymentIntent);
          console.log("Uid", userkey);
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
export default Stripe;

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
  heading: {
    alignItems: "center",
    marginBottom: 50,
  },  
  head: {
    fontSize: 50,
    textDecorationLine: "underline",
  },
});
