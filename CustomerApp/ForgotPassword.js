import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
// import Picker from '@react-native-picker/picker'
import React, { Component, useEffect, useState } from "react";
import firebase from "firebase";
import { auth } from "../firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { addUser } from "../firebasefunctions";
import PhoneInput from "react-native-phone-input";

export default class ForgotPassword extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection("Users");
    this.state = {
      email: "",
      password: "",
      newpassword: "",
      key: "",
      isLoading: true,
      status: false,
      users: [],
      enterpressed: false,
      resetpressed: false,
    };
  }
  //   updatedd = (choice) => {
  //     this.setState({ driver: choice })
  //  }

  rest() {
    // console.log("Users arr: ", this.state.users)
    const myUsers = this.state.users;
    const state = this.state;
    for (var i = 0; i < myUsers.length; i++) {
      // console.log("Current State: ", this.state)
      // console.log("Email1: ", this.state.email)
      // console.log("Email2: ", this.state.users[i])
      // console.log(this.state.email == this.state.users[i])
      if (this.state.email == this.state.users[i][1]) {
        console.log("Setting state");
        state["status"] = true;
        state["enterpressed"] = true;
        state["key"] = this.state.users[i][0];
        this.setState(state);
        // this.setState({
        //   status: "true",
        //   enterpressed: true,
        // });
        // console.log("New State: ", this.state)
      }
      // console.log("New State: ", this.state)
    }
    console.log("Statu state: ", this.state.status);
    if (this.state.status == false) {
      Alert.alert(
        "Error",
        "Email not recognized. Please try another email",
        [
          {
            text: "Dismiss",
            onPress: () => console.log("Error"),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
    }
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getUserData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  handleEnterPress() {
    console.log("In button 1 pressed");
    this.setState({ buttononepressed: "true" });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  updatePassword() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase
      .firestore()
      .collection("Users")
      .doc(this.state.key);

    updateDBRef
      .update("password", this.state.password)
      .then((docRef) => {
        this.setState({
          email: "",
          password: "",
          isLoading: false,
        });
        // this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });

    auth
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        console.log("Password Reset Email Sent Successfully!");
      })
      .catch((error) => {
        console.error(error);
      });

    // user.updatePassword(this.state.password)
    // .then(() => console.log("New password: ", user.password))

    // updateDBRef.set({
    //   password: this.state.password,
    // })
  }

  handleEnter() {
    this.rest();
  }

  handleReset() {
    const state = this.state;
    if (this.state.password != this.state.newpassword) {
      Alert.alert(
        "Error",
        "Passwords do not match. Please try again",
        [
          {
            text: "Dismiss",
            onPress: () => console.log("Error"),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
    } else {
      state["enterpressed"] = false;
      state["resetpressed"] = true;
      this.setState(state);
      this.updatePassword();
    }
  }

  getUserData = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((res) => {
      const { email } = res.data();

      users.push([res.id, email]);
    });
    console.log("Users: ", users);

    this.setState({
      users,
      isLoading: false,
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    if (this.state.enterpressed) {
      return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ImageBackground
              source={require("../images/pumpfivebackground.jpeg")}
              style={styles.image}
            >
              <SafeAreaView>
                <View style={styles.inputContainer}>
                  <Text style={styles.text1}>Forgot Password</Text>
                  <Text style={styles.text2}>
                    Please enter and re-enter your new password for{" "}
                    {this.state.email}
                  </Text>

                  <Text style={styles.email}>Password:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={"Enter New Password"}
                    value={this.state.password}
                    onChangeText={(val) =>
                      this.inputValueUpdate(val, "password")
                    }
                    secureTextEntry
                  ></TextInput>

                  <Text style={styles.email}>Re-enter Password:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={"Re-Enter New Password"}
                    value={this.state.newpassword}
                    onChangeText={(val) =>
                      this.inputValueUpdate(val, "newpassword")
                    }
                    secureTextEntry
                  ></TextInput>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    // onPress={() => { }}
                    onPress={() => this.handleReset()}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Reset Password</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </ImageBackground>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      );
    } else if (this.state.resetpressed) {
      return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ImageBackground
              source={require("../images/pumpfivebackground.jpeg")}
              style={styles.image}
            >
              <SafeAreaView>
                <View style={styles.inputContainer}>
                  <Text style={styles.text1}>
                    An email has been sent to {this.state.email}!
                  </Text>
                  <Text style={styles.text2}>
                    Please re enter your new password using the link sent in the
                    email
                  </Text>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    // onPress={() => { }}
                    onPress={() => this.props.navigation.navigate("Login")}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Return to Login</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </ImageBackground>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ImageBackground
              source={require("../images/pumpfivebackground.jpeg")}
              style={styles.image}
            >
              <SafeAreaView>
                <View style={styles.inputContainer}>
                  <Text style={styles.text1}>Forgot Password</Text>
                  <Text style={styles.text2}>
                    Please enter the email associated with your Account
                  </Text>

                  <Text style={styles.email}>Email:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={"Enter Email"}
                    value={this.state.email}
                    onChangeText={(val) => this.inputValueUpdate(val, "email")}
                  ></TextInput>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    // onPress={() => { }}
                    onPress={() => this.handleEnter()}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Enter</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </ImageBackground>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        // <KeyboardAvoidingView style={styles.container} behavior="padding">
        //   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        //   <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
        //   <SafeAreaView style={styles.inputcontainer}>

        //             <View style={buttonstyles.backbutton}>
        //                                     <Button
        //                                     title="Back"
        //                                     color="white"
        //                                     onPress={() =>this.props.navigation.goBack()}
        //                                   />
        //                                   </View>

        //                 <Text style={styles.text1}>PumpFive</Text>
        //                 <Text style={styles.text2}>Fuel Delivery Service</Text>
        //                 <Text style={styles.text2}>Reset Password</Text>

        //               <Text style={styles.email}>Type email: *</Text>
        //                   <TextInput
        //                               style={styles.input}
        //                               placeholder={'Enter Email'}
        //                               value={this.state.email}
        //                               onChangeText={(val) => this.inputValueUpdate(val, 'email')}
        //                   />
        //                   <View style={buttonstyles.button}>
        //                     <Button title="Enter" color="white" onPress={() => this.handleEnter()}></Button>
        //                   </View>
        //                   {/* {
        //                     if(this.state.status == true){

        //                     }
        //                   } */}
        //           </SafeAreaView>

        //               </ImageBackground>

        //         </TouchableWithoutFeedback>
        //        </KeyboardAvoidingView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
  inputContainer: {
    width: "80%",
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  input: {
    backgroundColor: "white",
    height: "10%",
    top: "6%",
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    borderRadius: 10,
    // marginTop: 5,
    left: "10%",
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#f9c107",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    left: "30%",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#f9c107",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#f9c107",
    fontWeight: "700",
    fontSize: 16,
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  text1: {
    color: "white",
    fontSize: 48,
    lineHeight: 44,
    fontWeight: "700",
    //  textAlign: "left",
    //   flex: 1,
    // top: 40,

    left: "10%",
    top: "-20%",
  },
  text2: {
    color: "white",
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "100",
    // textAlign: "left",
    //  flex: 1,
    top: 30,

    left: "10%",
    top: "-15%",
  },
  //   login: {
  //     color: "white",
  //     fontFamily: "Times New Roman",
  //     fontSize: 40,
  //     lineHeight: 44,
  //     fontWeight: "bold",
  //     textAlign: "left",
  //     // flex: 1,
  //     top: 150,
  //   },
  //   signin: {
  //     color: "white",
  //     fontFamily: "Times New Roman",
  //     fontSize: 30,
  //     lineHeight: 44,
  //     fontWeight: "bold",
  //     textAlign: "left",
  //     // flex: 1,
  //     top: 150,
  //   },
  email: {
    // top: 174,
    color: "white",

    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    // textAlign: "left",

    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    left: "5%",
    top: "10%",
  },
  password: {
    //     top: 175,
    color: "white",

    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    left: "10%",
    top: "10%",
    //     textAlign: "left",
  },
});

const buttonstyles = StyleSheet.create({
  button: {
    top: 600,
    borderWidth: 1,
    width: "50%",
    backgroundColor: "#DAAC3F",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  signupbutton: {
    // top: 600,
    left: "40%",
    bottom: -260,
    borderWidth: 1,
    width: "30%",
    backgroundColor: "#DAAC3F",
    // position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
