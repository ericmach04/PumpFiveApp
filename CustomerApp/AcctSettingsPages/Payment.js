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
  Image,
} from "react-native";
import React, {Component} from "react";
import firebase from 'firebase';
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {getCards} from '../../firebasefunctions'
import { ListItem } from "react-native-elements";
// import TimeDropdown from "../dropdowns/TimeDropdown";
// import DayDropdown from "../dropdowns/DayDropdown";
// import GasDropdown from "../dropdowns/GasDropdown";
// import PaymentDropdown from '../dropdowns/PaymentDropdown';

export default class Payment extends Component{

  constructor() {
    super();
    this.docs = firebase.firestore().collection('Credit_Cards');
    this.state = {
      isLoading: true,
      cards: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getCardData);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCardData = (querySnapshot) => {
    const cards = [];
    querySnapshot.forEach((res) => {
      const { createdAt, cvv, email, expiry, number, type } = res.data();
      cards.push({
        key: res.id,
        createdAt,
        cvv,
        email,
        expiry,
        number,
        type
      });
    });
    this.setState({
      cards,
      isLoading: false
   });
  }
render(){
  if(this.state.isLoading){
    return(
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="red"/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../images/pumpfivebackground.jpeg")}
        style={styles.image}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView>
                {
                  this.state.cards.map((res, i) => {
                    return (
                      <ListItem 
                        key={i}           
                        bottomDivider>
                        <ListItem.Content>
                          <ListItem.Title>{res.email}</ListItem.Title>
                          <ListItem.Subtitle>{res.number}</ListItem.Subtitle>
                          <ListItem.Subtitle>{res.type}</ListItem.Subtitle>
                          <ListItem.Subtitle>{res.expiry}</ListItem.Subtitle>
                          <ListItem.Subtitle>{res.cvv}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron 
                          color="black" 
                        />
                      </ListItem>
                    );
                  })
                }
            </ScrollView>
          {/* <View style={styles.container}>
            <View style={styles.Memberships}>
              <View
                style={{
                  top: -0,
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Text style={styles.text}>Payment Management</Text>
                <View style={buttonstyles.backbutton}>
                  <Button
                    title="Back"
                    color="white"
                    onPress={() => navigation.goBack()}
                  />
                </View>
              </View>
              <View style={{ bottom: "60%", left: "5%" }}>
                <Text style={styles.boxfontsbody}>a1234@gmail.com</Text>
                <Text style={styles.boxfontsbody}>Member no. 773123456789</Text>
                <Text style={styles.boxfontsbody}>414-***-****</Text>
              </View>

              <View style={{ bottom: "60%", left: "5%" }}>
                <Text style={styles.creditdebit}>Credit/Debit Card</Text>
              </View>

              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              > */}
                {/* <View style={{ top: -219, left: 10 }}>
                  <Image source={require("../../icons/bofa.png")} />
                </View> */}

                {/* <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                ></View>
                <View style={{ top: -215, left: -15 }}>
                  <Text style={styles.bofadeeznuts}>Bank of America</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View style={{ top: -215, left: -20 }}>
                    <Image source={require("../../icons/visa.png")} />

                    <View style={{ top: 15, left: -230 }}>
                      <Image source={require("../../icons/chase.png")} />
                      <Text style={styles.chasemoneynotchics}>Chase</Text>
                    </View>

                    <View style={{ top: -45, left: -2 }}>
                      <Image source={require("../../icons/mastercard.png")} />
                    </View>
                  </View>
                </View> */}
              {/* </View>

              <View style={buttonstyles.paybutton}>
                <Button
                  title="+ Add Payment Method"
                  color="black"
                  onPress={() => navigation.navigate("AddCard")}
                /> */}
                 {/* <Button
                  title="Get Cards"
                  color="black"
                  onPress={getCards}
                /> */}
              {/* </View> */}

            {/* </View> */}
          {/* </View> */}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
}

// function GasScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       {/* <Text>Home Screen</Text> */}
//       <Button
//         title="BookNow"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

const buttonstyles = StyleSheet.create({
  button: {
    width: "30%",
    height: 40,
    bottom: 5,
    left: 230,
    // top: 270,
    borderWidth: 1,
    backgroundColor: "#DAAC3F",
    position: "absolute",
  },
  backbutton: {
    width: "18%",
    height: 40,
    // top: 65,
    right: 0,
    backgroundColor: "#DAAC3F",
    position: "absolute",
  },
  // + Add Payment Button
  paybutton: {
    width: "77%",
    height: "7%",
    top: "85%",
    right: "10%",
    backgroundColor: "#DAAC3F",
    position: "absolute",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  UserAccount: {
    flexDirection: "column",
    justifyContent: "space-around",
  },

  Memberships: {
    position: "absolute",
    width: 350,
    height: 620,
    left: 21,
    top: 90,
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
  },

  text: {
    color: "black",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    top: 40,
  },

  //CreditDebit
  creditdebit: {
    color: "black",
    fontSize: 25,
    lineHeight: 30,
    //fontWeight: "bold",
    textAlign: "left",
    top: 5,
    left: 10,
  },

  //bofadeeznuts
  bofadeeznuts: {
    color: "black",
    fontSize: 25,
    lineHeight: 30,
    //fontWeight: "bold",
    textAlign: "left",
  },

  //chasemoneynotchics
  chasemoneynotchics: {
    color: "black",
    fontSize: 25,
    lineHeight: 30,
    top: -35,
    left: 40,
  },

  boxfontshead: {
    color: "black",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "left",
    top: 5,
    left: 5,
  },

  boxfontsbody: {
    color: "black",
    fontSize: 18,
    lineHeight: 30,
    textAlign: "left",
    top: 5,
    left: 5,
    fontFamily: "Times New Roman",
  },

  boxfontshead2: {
    color: "black",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  services: {
    flexDirection: "column",
    justifyContent: "space-around",
  },

  gasservice: {
    position: "absolute",
    width: 350,
    height: 175,
    left: 21,
    top: -275,
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
  },

  tireservice: {
    position: "absolute",
    width: 350,
    height: 175,
    left: 21,
    top: -80,
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
  },

  detailingservice: {
    position: "absolute",
    width: 350,
    height: 175,
    left: 21,
    top: 115,
    backgroundColor: "#CDCABF",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
  },

  boxfontshead: {
    color: "black",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "left",
    top: 5,
    left: 5,
  },

  boxfontsbody: {
    color: "black",
    fontSize: 18,
    lineHeight: 30,
    textAlign: "left",
    top: 5,
    left: 5,
  },
  loginview: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: 100,
    height: 40,
    top: 5,
    right: 10,
    left: 5,
    backgroundColor: "#DAAC3F",
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
});
