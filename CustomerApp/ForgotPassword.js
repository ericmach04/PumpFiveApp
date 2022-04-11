import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableWithoutFeedback,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
// import Picker from '@react-native-picker/picker'
import React, { Component, useEffect, useState } from "react";
import firebase from "firebase";
import { auth } from "../firebase";
import { addUser } from "../firebasefunctions";
import PhoneInput from "react-native-phone-input";

export default class ForgotPassword extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection("Users");
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      status: false,
      users: [],
    };
  }
  //   updatedd = (choice) => {
  //     this.setState({ driver: choice })
  //  }

<<<<<<< HEAD
  rest() {
    console.log("Users arr: ", this.state.users);
    for (var i = 0; i < this.state.users.length; i++) {
      if (this.state.email == this.state.users[i]) {
        this.setState({
          status: true,
        });
=======
rest() { 
    // console.log("Users arr: ", this.state.users)
    const myUsers = this.state.users 
    const state = this.state   
    for(var i=0; i < myUsers.length; i++)
    {
      // console.log("Current State: ", this.state)
      // console.log("Email1: ", this.state.email)
      // console.log("Email2: ", this.state.users[i])
      console.log("Email lowercase: ",this.state.email.toLowerCase)
      if(this.state.email.toLowerCase() == this.state.users[i][1]){
        console.log("Setting state")
        state["status"]=true
        state["enterpressed"] = true
        state["key"] = this.state.users[i][0]
        this.setState(state);
        // this.setState({
        //   status: "true",
        //   enterpressed: true,
        // });
        // console.log("New State: ", this.state)
>>>>>>> 64eca6e43998b7b47ec5071c474711dcddb86607
      }
    }

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

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getUserData);
  }

  componentWillUnmount() {
    this.unsubscribe();
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
<<<<<<< HEAD
    const updateDBRef = firebase
      .firestore()
      .collection("Users")
      .doc(this.state.key);
    updateDBRef
      .set({
        password: this.state.password,
      })
      .then((docRef) => {
        this.setState({
          email: "",
          password: "",
          isLoading: false,
        });
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });
=======
    // const updateDBRef = firebase.firestore().collection('Users').doc(this.state.key)
    
    // updateDBRef.update("password", this.state.password)
    // .then((docRef) => {
    //   this.setState({
    //     email: '',
    //     password: '',
    //     isLoading: false,
    //   });
    //   // this.props.navigation.navigate('Login');
    // })
    // .catch((error) => {
    //   console.error("Error: ", error);
    //   this.setState({
    //     isLoading: false,
    //   });
    // });
    
    auth.sendPasswordResetEmail(this.state.email.toLowerCase())
    .then(()  => {
      console.log("Password Reset Email Sent Successfully!")
    })
    .catch(error => {
      console.error(error);
    })

    this.setState({
      isLoading: false,
    });

    
    // user.updatePassword(this.state.password)
    // .then(() => console.log("New password: ", user.password))

    // updateDBRef.set({
    //   password: this.state.password,
    // })
>>>>>>> 64eca6e43998b7b47ec5071c474711dcddb86607
  }

  handleEnter() {
    this.rest();
  }

  getUserData = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((res) => {
      const { email } = res.data();

      users.push(email);
    });
    // console.log("State: ", this.state.status)

    this.setState({
      users,
      isLoading: false,
    });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../images/pumpfivebackground.jpeg")}
            style={styles.image}
          >
            <SafeAreaView style={styles.container}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                // style={{ flex: 1 }}
              >
                <View style={styles.inner}>
                  <View style={buttonstyles.fckthisbutton}>
                    <Button
                      title="Back"
                      color="white"
                      onPress={() => this.props.navigation.goBack(null)} //Set to null fixed nav issue
                    />
                  </View>

                  <Text style={styles.text1}>PumpFive</Text>
                  <Text style={styles.text2}>Fuel Delivery Service</Text>
                  <Text style={styles.text2}>Reset Password</Text>

                  {/* <Text style={styles.signup}>Sign Up</Text> */}

                  {/* <ScrollView
          ref={ref => {this.scrollView = ref}}
          onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
          bounces={false}
        > */}

                  <Text style={styles.email}>Type email: *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={"Enter Email"}
                    value={this.state.email}
                    onChangeText={(val) => this.inputValueUpdate(val, "email")}
                  />
                  <View style={buttonstyles.button}>
                    <Button
                      title="Enter"
                      color="white"
                      onPress={() => this.handleEnter()}
                    ></Button>
                  </View>
                  {/* {
              if(this.state.status == true){

              }
            } */}
                </View>
              </KeyboardAvoidingView>
            </SafeAreaView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
<<<<<<< HEAD
    );
  }
}
=======
      
      //   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      //   <KeyboardAvoidingView style={styles.container} behavior="padding">
      //   <ImageBackground
      //     source={require("../images/pumpfivebackground.jpeg")}
      //     style={styles.image}
      //   >
      //     <SafeAreaView>
      //     <View style={styles.inputContainer}>
      //     <Text style={styles.text1}>Forgot Password</Text>
      //     <Text style={styles.text2}>Please enter and re-enter your new password for {this.state.email}</Text>
    
      //       <Text style={styles.email}>Password:</Text>
      //       <TextInput
      //         style={styles.input}
      //         placeholder={'Enter New Password'}
      //         value={this.state.password}
      //         onChangeText={(val) => this.inputValueUpdate(val, 'password')}
      //         secureTextEntry
      //       ></TextInput>

      //       <Text style={styles.email}>Re-enter Password:</Text>
      //           <TextInput
      //               style={styles.input}
      //               placeholder={'Re-Enter New Password'}
      //               value={this.state.newpassword}
      //               onChangeText={(val) => this.inputValueUpdate(val, 'newpassword')}
      //               secureTextEntry
      //         ></TextInput>
      //     </View>
    
      //     <View style={styles.buttonContainer}>
      //       <TouchableOpacity
      //         // onPress={() => { }}
      //         onPress={() => this.handleReset()}
      //         style={styles.button}
      //       >
      //         <Text style={styles.buttonText}>Reset Password</Text>
      //       </TouchableOpacity>
    
      //   </View>
      //   </SafeAreaView>
      //   </ImageBackground>
      // </KeyboardAvoidingView> 
      // </TouchableWithoutFeedback>
        )
      
    }
    // else if (this.state.resetpressed){
    //   return (
    //     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    //     <KeyboardAvoidingView style={styles.container} behavior="padding">
    //     <ImageBackground
    //       source={require("../images/pumpfivebackground.jpeg")}
    //       style={styles.image}
    //     >
    //       <SafeAreaView>
    //       <View style={styles.inputContainer}>
    //       <Text style={styles.text1}>An email has been sent to {this.state.email}!</Text>
    //       <Text style={styles.text2}>Please re enter your new password using the link sent in the email</Text>
    //       </View>
    
    //       <View style={styles.buttonContainer}>
    //         <TouchableOpacity
    //           // onPress={() => { }}
    //           onPress={() => this.props.navigation.navigate("Login")}
    //           style={styles.button}
    //         >
    //           <Text style={styles.buttonText}>Return to Login</Text>
    //         </TouchableOpacity>
    
    //     </View>
    //     </SafeAreaView>
    //     </ImageBackground>
    //   </KeyboardAvoidingView> 
    //   </TouchableWithoutFeedback>
    //   )
    // }
    else{
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles2.container}>
      <ImageBackground
        source={require("../images/pumpfivebackground.jpeg")}
        style={styles2.image}
      >
        <SafeAreaView style={styles2.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            // style={{ flex: 1 }}
          >
            <View style={styles2.inner}>
              <View style={buttonstyles2.fckthisbutton}>
                <Button
                  title="Back"
                  color="white"
                  onPress={() => this.props.navigation.goBack(null)} //Set to null fixed nav issue
                />
              </View>

              <Text style={styles2.text1}>PumpFive</Text>
              <Text style={styles2.text2}>Fuel Delivery Service</Text>
              <Text style={styles2.text2}>Reset Password</Text>

              {/* <Text style={styles.signup}>Sign Up</Text> */}

              {/* <ScrollView
      ref={ref => {this.scrollView = ref}}
      onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
      bounces={false}
    > */}

              <Text style={styles2.email}>Type email: *</Text>
              <TextInput
                style={styles2.input}
                placeholder={"Enter Email"}
                value={this.state.email}
                onChangeText={(val) => this.inputValueUpdate(val, "email")}
              />
              <View style={buttonstyles2.button}>
                <Button
                  title="Enter"
                  color="white"
                  onPress={() => this.handleEnter()}
                ></Button>
              </View>
              {/* {
          if(this.state.status == true){

          }
        } */}
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  </TouchableWithoutFeedback>
  //   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
  //   <KeyboardAvoidingView style={styles.container} behavior="padding">
  //   <ImageBackground
  //     source={require("../images/pumpfivebackground.jpeg")}
  //     style={styles.image}
  //   >
  //     <SafeAreaView>
  //     <View style={styles.inputContainer}>
  //       <Text style={styles.text1}>Forgot Password</Text>
  //       <Text style={styles.text2}>Please enter the email associated with your Account</Text>

  //       <Text style={styles.email}>Email:</Text>
  //       <TextInput
  //             style={styles.input}
  //             placeholder={'Enter Email'}
  //             value={this.state.email}
  //             onChangeText={(val) => this.inputValueUpdate(val, 'email')}
  //       ></TextInput>

  //     </View>

  //     <View style={styles.buttonContainer}>
  //       <TouchableOpacity
  //         // onPress={() => { }}
  //         onPress={() => this.handleEnter()}
  //         style={styles.button}
  //       >
  //         <Text style={styles.buttonText}>Enter</Text>
  //       </TouchableOpacity>

  //   </View>
  //   </SafeAreaView>
  //   </ImageBackground>
  // </KeyboardAvoidingView> 
  // </TouchableWithoutFeedback>
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
)
}}}

>>>>>>> 64eca6e43998b7b47ec5071c474711dcddb86607

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    // flex: 1,
    justifyContent: "flex-end",
<<<<<<< HEAD
=======
  },

  image: {
    flex: 1,
    justifyContent: "center",
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
>>>>>>> 64eca6e43998b7b47ec5071c474711dcddb86607
  },

  // image: {
  //   flex: 1,
  //   justifyContent: "center",
  // },

  // Header On Page
  text1: {
    color: "white",

    fontSize: 48,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    left: "2%",
    top: "8%",
  },

  text2: {
    color: "white",
    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    left: "2%",
    top: "8%",
  },

  //Effects Nothing On This Page
  login: {
    color: "white",
    fontFamily: "Times New Roman",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    // flex: 1,
    top: 30,
  },

  //Effects Nothing On This Page
  signin: {
    color: "white",
    fontFamily: "Times New Roman",
    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    // flex: 1,
    top: 30,
  },

  // Email Header
  email: {
    top: "8%",
    color: "white",

    fontSize: 20,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",

    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    left: "0%",
  },
  signup: {
    top: 30,
    color: "white",
    fontFamily: "Times New Roman",
    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
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
  input: {
    height: "15.5%",
    margin: "1%",
    borderWidth: 1,
    padding: "1%",
    backgroundColor: "white",
    top: "4%",
    borderRadius: 10,
  },
  loginview: {
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 1,
    width: 100,
    height: 40,
    top: 30,
    // right: 10,
    backgroundColor: "#DAAC3F",
    left: 5,
  },
});

const buttonstyles2 = StyleSheet.create({
  button: {
    width: "30%",
    height: "15%",
    left: "1%",
    top: "105%",
    backgroundColor: "#DAAC3F",
    position: "absolute",
    borderRadius: 10,
    marginTop: 10,
  },

  //Padding sets text position within button,
  //marginTop sets spacing between things,
  //borderradius makes soft corner shapes
  fckthisbutton: {
    width: "15%",
    height: "19%",
    top: "10%",
    right: "1%",
    backgroundColor: "#DAAC3F",
    position: "absolute",
    borderRadius: 10,
    //marginTop: 10,
    padding: "5%",
  },

  // backbutton Completed
  backbutton: {
    width: "15%",
    height: "10%",
    top: "10%",
    right: "1%",
    backgroundColor: "#DAAC3F",
    padding: "10%",
    borderRadius: 10,
    position: "absolute",
  },
  fckthisbutton: {
    width: "15%",
    height: "19%",
    top: "10%",
    right: "1%",
    backgroundColor: "#DAAC3F",
    position: "absolute",
    borderRadius: 10,
    //marginTop: 10,
    padding: "5%",
  },
});
<<<<<<< HEAD
=======

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    // flex: 1,
    justifyContent: "flex-end",
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  // Header On Page
  text1: {
    color: "white",

    fontSize: 48,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    left: "2%",
    top: "8%",
  },

  text2: {
    color: "white",
    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    left: "2%",
    top: "8%",
  },

  //Effects Nothing On This Page
  login: {
    color: "white",
    fontFamily: "Times New Roman",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    // flex: 1,
    top: 30,
  },

  //Effects Nothing On This Page
  signin: {
    color: "white",
    fontFamily: "Times New Roman",
    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    // flex: 1,
    top: 30,
  },

  // Email Header
  email: {
    top: "8%",
    color: "white",

    fontSize: 20,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",

    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    left: "0%",
  },
  signup: {
    top: 30,
    color: "white",
    fontFamily: "Times New Roman",
    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
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
  input: {
    height: "15.5%",
    margin: "1%",
    borderWidth: 1,
    padding: "1%",
    backgroundColor: "white",
    top: "4%",
    borderRadius: 10,
  },
  loginview: {
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 1,
    width: 100,
    height: 40,
    top: 30,
    // right: 10,
    backgroundColor: "#DAAC3F",
    left: 5,
  },
});

const buttonstyles = StyleSheet.create({
  button: {
    width: "30%",
    height: "15%",
    left: "1%",
    top: "105%",
    backgroundColor: "#DAAC3F",
    position: "absolute",
    borderRadius: 10,
    marginTop: 10,
  },

  //Padding sets text position within button,
  //marginTop sets spacing between things,
  //borderradius makes soft corner shapes
  fckthisbutton: {
    width: "15%",
    height: "19%",
    top: "10%",
    right: "1%",
    backgroundColor: "#DAAC3F",
    position: "absolute",
    borderRadius: 10,
    //marginTop: 10,
    padding: "5%",
  },

  // backbutton Completed
  backbutton: {
    width: "15%",
    height: "10%",
    top: "10%",
    right: "1%",
    backgroundColor: "#DAAC3F",
    padding: "10%",
    borderRadius: 10,
    position: "absolute",
  },
});



// import {
//   Keyboard,
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Button,
//   TouchableWithoutFeedback,
//   ImageBackground,
//   TextInput,
//   KeyboardAvoidingView,
//   ScrollView,
//   Alert,
// } from "react-native";
// // import Picker from '@react-native-picker/picker'
// import React, { Component, useEffect, useState } from "react";
// import firebase from "firebase";
// import { auth } from "../firebase";
// import { addUser } from "../firebasefunctions";
// import PhoneInput from "react-native-phone-input";

// export default class ForgotPassword extends Component {
//   constructor() {
//     super();
//     this.docs = firebase.firestore().collection("Users");
//     this.state = {
//       email: "",
//       password: "",
//       isLoading: false,
//       status: false,
//       users: [],
//     };
//   }
//   //   updatedd = (choice) => {
//   //     this.setState({ driver: choice })
//   //  }

//   rest() {
//     console.log("Users arr: ", this.state.users);
//     for (var i = 0; i < this.state.users.length; i++) {
//       if (this.state.email == this.state.users[i]) {
//         this.setState({
//           status: true,
//         });
//       }
//     }

//     Alert.alert(
//       "Error",
//       "Email not recognized. Please try another email",
//       [
//         {
//           text: "Dismiss",
//           onPress: () => console.log("Error"),
//           style: "cancel",
//         },
//       ],
//       {
//         cancelable: true,
//       }
//     );
//   }

//   componentDidMount() {
//     this.unsubscribe = this.docs.onSnapshot(this.getUserData);
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   inputValueUpdate = (val, prop) => {
//     const state = this.state;
//     state[prop] = val;
//     this.setState(state);
//   };

//   updatePassword() {
//     this.setState({
//       isLoading: true,
//     });
//     const updateDBRef = firebase
//       .firestore()
//       .collection("Users")
//       .doc(this.state.key);
//     updateDBRef
//       .set({
//         password: this.state.password,
//       })
//       .then((docRef) => {
//         this.setState({
//           email: "",
//           password: "",
//           isLoading: false,
//         });
//         this.props.navigation.navigate("Login");
//       })
//       .catch((error) => {
//         console.error("Error: ", error);
//         this.setState({
//           isLoading: false,
//         });
//       });
//   }

//   handleEnter() {
//     this.rest();
//   }

//   getUserData = (querySnapshot) => {
//     const users = [];
//     querySnapshot.forEach((res) => {
//       const { email } = res.data();

//       users.push(email);
//     });
//     // console.log("State: ", this.state.status)

//     this.setState({
//       users,
//       isLoading: false,
//     });
//   };

//   render() {
//     return (
      // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      //   <View style={styles.container}>
      //     <ImageBackground
      //       source={require("../images/pumpfivebackground.jpeg")}
      //       style={styles.image}
      //     >
      //       <SafeAreaView style={styles.container}>
      //         <KeyboardAvoidingView
      //           behavior={Platform.OS === "ios" ? "padding" : null}
      //           // style={{ flex: 1 }}
      //         >
      //           <View style={styles.inner}>
      //             <View style={buttonstyles.fckthisbutton}>
      //               <Button
      //                 title="Back"
      //                 color="white"
      //                 onPress={() => this.props.navigation.goBack(null)} //Set to null fixed nav issue
      //               />
      //             </View>

      //             <Text style={styles.text1}>PumpFive</Text>
      //             <Text style={styles.text2}>Fuel Delivery Service</Text>
      //             <Text style={styles.text2}>Reset Password</Text>

      //             {/* <Text style={styles.signup}>Sign Up</Text> */}

      //             {/* <ScrollView
      //     ref={ref => {this.scrollView = ref}}
      //     onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
      //     bounces={false}
      //   > */}

      //             <Text style={styles.email}>Type email: *</Text>
      //             <TextInput
      //               style={styles.input}
      //               placeholder={"Enter Email"}
      //               value={this.state.email}
      //               onChangeText={(val) => this.inputValueUpdate(val, "email")}
      //             />
      //             <View style={buttonstyles.button}>
      //               <Button
      //                 title="Enter"
      //                 color="white"
      //                 onPress={() => this.handleEnter()}
      //               ></Button>
      //             </View>
      //             {/* {
      //         if(this.state.status == true){

      //         }
      //       } */}
      //           </View>
      //         </KeyboardAvoidingView>
      //       </SafeAreaView>
      //     </ImageBackground>
      //   </View>
      // </TouchableWithoutFeedback>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   inner: {
//     // flex: 1,
//     justifyContent: "flex-end",
//   },

//   image: {
//     flex: 1,
//     justifyContent: "center",
//   },

//   // Header On Page
//   text1: {
//     color: "white",

//     fontSize: 48,
//     lineHeight: 44,
//     fontWeight: "bold",
//     textAlign: "left",
//     left: "2%",
//     top: "8%",
//   },

//   text2: {
//     color: "white",
//     fontSize: 30,
//     lineHeight: 44,
//     fontWeight: "bold",
//     textAlign: "left",
//     left: "2%",
//     top: "8%",
//   },

//   //Effects Nothing On This Page
//   login: {
//     color: "white",
//     fontFamily: "Times New Roman",
//     fontSize: 40,
//     lineHeight: 44,
//     fontWeight: "bold",
//     textAlign: "left",
//     // flex: 1,
//     top: 30,
//   },

//   //Effects Nothing On This Page
//   signin: {
//     color: "white",
//     fontFamily: "Times New Roman",
//     fontSize: 30,
//     lineHeight: 44,
//     fontWeight: "bold",
//     textAlign: "left",
//     // flex: 1,
//     top: 30,
//   },

//   // Email Header
//   email: {
//     top: "8%",
//     color: "white",

//     fontSize: 20,
//     lineHeight: 44,
//     fontWeight: "bold",
//     textAlign: "left",

//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginTop: 5,
//     left: "0%",
//   },
//   signup: {
//     top: 30,
//     color: "white",
//     fontFamily: "Times New Roman",
//     fontSize: 30,
//     lineHeight: 44,
//     fontWeight: "bold",
//     textAlign: "left",
//   },

//   services: {
//     flexDirection: "column",
//     justifyContent: "space-around",
//   },

//   gasservice: {
//     position: "absolute",
//     width: 350,
//     height: 175,
//     left: 21,
//     top: -275,
//     backgroundColor: "#CDCABF",
//     borderWidth: 2,
//     borderColor: "#000000",
//     borderRadius: 10,
//   },

//   tireservice: {
//     position: "absolute",
//     width: 350,
//     height: 175,
//     left: 21,
//     top: -80,
//     backgroundColor: "#CDCABF",
//     borderWidth: 2,
//     borderColor: "#000000",
//     borderRadius: 10,
//   },

//   detailingservice: {
//     position: "absolute",
//     width: 350,
//     height: 175,
//     left: 21,
//     top: 115,
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
//     textAlign: "left",
//     top: 5,
//     left: 5,
//   },

//   boxfontsbody: {
//     color: "black",
//     fontSize: 18,
//     lineHeight: 30,
//     textAlign: "left",
//     top: 5,
//     left: 5,
//   },
//   input: {
//     height: "15.5%",
//     margin: "1%",
//     borderWidth: 1,
//     padding: "1%",
//     backgroundColor: "white",
//     top: "4%",
//     borderRadius: 10,
//   },
//   loginview: {
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     borderWidth: 1,
//     width: 100,
//     height: 40,
//     top: 30,
//     // right: 10,
//     backgroundColor: "#DAAC3F",
//     left: 5,
//   },
// });

// const buttonstyles = StyleSheet.create({
//   button: {
//     width: "30%",
//     height: "15%",
//     left: "1%",
//     top: "105%",
//     backgroundColor: "#DAAC3F",
//     position: "absolute",
//     borderRadius: 10,
//     marginTop: 10,
//   },

//   //Padding sets text position within button,
//   //marginTop sets spacing between things,
//   //borderradius makes soft corner shapes
//   fckthisbutton: {
//     width: "15%",
//     height: "19%",
//     top: "10%",
//     right: "1%",
//     backgroundColor: "#DAAC3F",
//     position: "absolute",
//     borderRadius: 10,
//     //marginTop: 10,
//     padding: "5%",
//   },

//   // backbutton Completed
//   backbutton: {
//     width: "15%",
//     height: "10%",
//     top: "10%",
//     right: "1%",
//     backgroundColor: "#DAAC3F",
//     padding: "10%",
//     borderRadius: 10,
//     position: "absolute",
//   },
// });
>>>>>>> 64eca6e43998b7b47ec5071c474711dcddb86607
