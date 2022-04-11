import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableHighlight,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import firebase from 'firebase';
import { auth } from "../firebase";
import { addUser } from "../firebasefunctions";
import DropdownMenu from 'react-native-dropdown-menu';

import PhoneInput from "react-native-phone-input";

export default class Registration extends Component {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [fname, setFname] = useState("");
  // const [lname, setLname] = useState("");
  // const [phone, setPhone] = useState("");
  // const [cMake, setcMake] = useState('')
  // const [cModel, setcModel] = useState('')
  // const [cYear, setcYear] = useState('')
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Users');
    this.state = {
      email: '',
      password: '',
      reenterpassword: '',
      fname: '',
      lname: '',
      phone: '',
      driver: '',
      paid: 'no',
      isLoading: false
    };
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  useEffect(){
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("driver?: ", this.state.driver)
      if (user) {
        if(this.state.driver == "no")
        {
          this.props.navigation.replace("Tabs");
        }
        else
        {
          this.props.navigation.replace("DriverTabs");
        }
        
      }
    });

    return unsubscribe;
  }

  handleSignUp(){
    console.log("Registered with: ", this.state.email);
              console.log("pass ", this.state.password);
              console.log("fname: ", this.state.fname);
              console.log("lname: ", this.state.lname);
              console.log("phone: ", this.state.phone);
              console.log("driver: ", this.state.driver)
              console.log("paid: ", this.state.paid)
    if(this.state.email === '' || this.state.password === '' || this.state.reenterpassword === '' 
    || this.state.fname === '' || this.state.lname === '' || this.state.phone === '' || this.state.driver === ''){
      alert('Please fill out all fields')
     } else {
       this.setState({
         isLoading: true,
       });      
       this.dbRef.add({
         email: this.state.email,
         password: this.state.password,
         fname: this.state.fname,
         lname: this.state.lname,
         phone: this.state.phone,
         driver: this.state.driver,
         paid: 'no'
       })
      //  .then((res) => {
      //    this.setState({
      //      email: '',
      //      password: '',
      //      fname: '',
      //      lname: '',
      //      phone: '',
      //      isLoading: false,
      //    });
      //  })
      auth
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredentials) => {
              const user = userCredentials.user;
              console.log("Registered with: ", user.email);
              console.log("pass ", password);
              console.log("fname: ", fname);
              console.log("lname: ", lname);
              console.log("phone: ", phone);
              console.log("driver: ", driver)
              console.log("paid: ", paid)
            })
        //  this.props.navigation.navigate('Addresses')
        .catch((err) => {
         console.error("Error found: ", err);
         this.setState({
           isLoading: false,
         });
       });
     }
    
      // addUser({
        //   email: email,
        //   password: password,
        //   fname: fname,
        //   lname: lname,
        //   phone: phone,
        // }).catch((error) => alert(error.message));
  };
render(){
  var data = [["yes", "no"]];
  return (
    // <SafeAreaView >
    <ScrollView 
    style={{flex: 1}}
    ref={ref => {this.scrollView = ref}}
    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})} >
      <KeyboardAvoidingView>
    
      <ImageBackground
        source={require("../images/pumpfivebackground.jpeg")}
        // style={styles.image}
        style={{width: "100%", height: "100%"}}
      >
              {/* <View 
                style={{flexDirection:'row', justifyContent: 'space-around',}}
              > */}
              {/* <View style={styles.inputContainer}> */}
              
                <Text style={styles2.text1}>PumpFive</Text>
                <Text style={styles2.text2}>Fuel Delivery Service</Text>
                
                <View style={buttonstyles2.backbutton}>
                  <Button
                    title="Back"
                    color="white"
                    onPress={() => this.props.navigation.goBack()}
                  />
                </View>
              {/* </View> */}
              {/* </View> */}
              {/* <View style={{top: "10%"}}> */}
                <Text style={styles2.email}>Email: *</Text>
                <TextInput
                  // style={styles.input}
                  // value={email}
                  // onChangeText={(text) => setEmail(text)}
                  // placeholder="enter Email"
                  style={styles2.input}
                  placeholderTextColor="#D3D3D3"
                  placeholder={'Enter Email'}
                  value={this.state.email}
                  onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                  keyboardType="default"
                  top="4%"
                  borderRadius="10"
                />
                {/* </View> */}
                <Text style={styles2.email}>Password: *</Text>
                <TextInput
                  // style={styles.input}
                  // placeholder="create password"
                  // keyboardType="default"
                  // borderRadius="10"
                  style={styles2.input}
                  placeholderTextColor="#D3D3D3"
                  placeholder={'Enter Password'}
                  value={this.state.password}
                  onChangeText={(val) => this.inputValueUpdate(val, 'password')}
                  keyboardType="default"
                  secureTextEntry
                  top="4%"
                  borderRadius="10"
                />

                <Text style={styles2.email}>Re-enter Password: *</Text>
                <TextInput
                  // style={styles.input}
                  // value={password}
                  // onChangeText={(text) => setPassword(text)}
                  // placeholder="Retype Password"
                  style={styles2.input}
                  placeholderTextColor="#D3D3D3"
                  placeholder={'Re-enter Password'}
                  value={this.state.reenterpassword}
                  onChangeText={(val) => this.inputValueUpdate(val, 'reenterpassword')}
                  keyboardType="default"
                  secureTextEntry
                  top="4%"
                  borderRadius="10"
                />

                <Text style={styles2.email}>First name: *</Text>
                <TextInput
                  // style={styles.input}
                  // value={fname}
                  // onChangeText={(text) => setFname(text)}
                  // placeholder="Enter First name"
                  style={styles2.input}
                  placeholderTextColor="#D3D3D3"
                  placeholder={'Enter First Name'}
                  value={this.state.fname}
                  onChangeText={(val) => this.inputValueUpdate(val, 'fname')}
                  keyboardType="default"
                  top="4%"
                  borderRadius="10"
                />

                <Text style={styles2.email}>Last name: *</Text>
                <TextInput
                  // style={styles.input}
                  // value={lname}
                  // onChangeText={(text) => setLname(text)}
                  // placeholder="enter Last name"
                  style={styles2.input}
                  placeholderTextColor="#D3D3D3"
                  placeholder={'Enter Last Name'}
                  value={this.state.lname}
                  onChangeText={(val) => this.inputValueUpdate(val, 'lname')}
                  keyboardType="default"
                  top="4%"
                  borderRadius="10"
                />

                <Text style={styles2.email}>Phone Number: *</Text>
                <TextInput
                  // style={styles.input}
                  // value={phone}
                  // onChangeText={(text) => setPhone(text)}
                  // placeholder="***-***-****"
                  style={styles2.input}
                  placeholderTextColor="#D3D3D3"
                  placeholder={'Enter Phone Number'}
                  value={this.state.phone}
                  onChangeText={(val) => this.inputValueUpdate(val, 'phone')}
                  keyboardType="default"
                  top="4%"
                  borderRadius="10"

                  //top = "10%"
                />
                <View 
                style={{flexDirection:'row', justifyContent: 'space-around',}}
              >
                  <Text style={styles2.email}>Are you registering as a driver?: *</Text>
                  <View style={{left: "10%",top: "7%", width: "20%"}}> 
                    <DropdownMenu
                      // style={{top: "20%"}}
                      // useNativeDriver={true}
                      // label={"Select Payment Method"}
                      bgColor={'white'}
                      tintColor={'#000000'}
                      activityTintColor={'red'}
                      handler={(selection,row) => this.setState({driver: data[selection][row]})}
                      data={data}
                    >
                    </DropdownMenu>
                    </View>
                  </View>
                <View style={styles2.loginview}>
                  <Button
                    title="Sign up"
                    color="white"
                    onPress={() => this.handleSignUp()}
                    // onPress={() => navigation.navigate('Tabs')}
                  ></Button>
                </View>
      
        </ImageBackground>
        </KeyboardAvoidingView>
    </ScrollView>
    // </SafeAreaView>
  );
      }
}

// ==================== CSS Styling ==================== //

const styles = StyleSheet.create({
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
    top: "3%",
  },

  text2: {
    color: "white",
    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    left: "2%",
    top: "3%",
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
    top: "5%",
    color: "white",

    fontSize: 20,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",

    paddingHorizontal: 15,
    //paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    left: "0%",
  },
  input: {
    height: "4%",
    margin: "2%",
    borderWidth: 1,
    padding: "2%",
    backgroundColor: "white",
    top: "5%",
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
  
  loginview: {
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 1,
    width: '20%',
    height: '5%',
    top: '2%',
    // right: 10,
    backgroundColor: "#DAAC3F",
    // left: '5%',
  },
});

const buttonstyles = StyleSheet.create({
  button: {
    width: "30%",
    height: 40,
    bottom: 5,
    left: 230,
    // top: 270,
    borderWidth: 1,
    //backgroundColor:"#DAAC3F",
    position: "absolute",

    backgroundColor: "#f9c107",
    //width: '100%',
    //padding: 15,
    borderRadius: 10,
    //alignItems: 'center',
    //left: "30%",
  },
  backbutton: {
    width: '18%', 
    height: 40,
    top: "10%",
    right: 0,
    backgroundColor:"#DAAC3F", 
    position: "absolute"
},

});

// // ==================== CSS Styling (Ryan's stuff) ==================== //

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
    top: "7%",
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

  // Phone Number Header Text
  fcknphonenumber: {
    top: "6%",
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
    height: "5.5%",
    margin: "1%",
    borderWidth: 1,
    padding: "1%",
    backgroundColor: "white",
    top: "5%",
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
    borderRadius: 10,
  },
});

const buttonstyles2 = StyleSheet.create({
  button: {
    width: "30%",
    height: 40,
    bottom: 5,
    left: 230,
    // top: 270,
    borderWidth: 1,
    //backgroundColor:"#DAAC3F",
    position: "absolute",

    backgroundColor: "#f9c107",
    //width: '100%',
    //padding: 15,
    borderRadius: 10,
    //alignItems: 'center',
    //left: "30%",
  },

  // backbutton Completed
  backbutton: {
    width: "15%",
    height: "7%",
    top: "5%",
    right: "5%",
    backgroundColor: "#DAAC3F",
    padding: "10%",
    borderRadius: 10,
    position: "absolute",
  },
});


// import {
//   StyleSheet,
//   Component,
//   Text,
//   View,
//   SafeAreaView,
//   Button,
//   TouchableHighlight,
//   ImageBackground,
//   TextInput,
//   KeyboardAvoidingView,
//   ScrollView,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { auth } from "../firebase";
// import { addUser } from "../firebasefunctions";

// import PhoneInput from "react-native-phone-input";

// export default class Registration extends Component {
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   // const [fname, setFname] = useState("");
//   // const [lname, setLname] = useState("");
//   // const [phone, setPhone] = useState("");
//   // const [cMake, setcMake] = useState('')
//   // const [cModel, setcModel] = useState('')
//   // const [cYear, setcYear] = useState('')
//   constructor() {
//     super();
//     this.dbRef = firebase.firestore().collection('Users');
//     this.state = {
//       email: '',
//       password: '',
//       reenterpassword: '',
//       fname: '',
//       lname: '',
//       phone: '',
//       driver: '',
//       paid: 'no',
//       isLoading: false
//     };
//   }
//   inputValueUpdate = (val, prop) => {
//     const state = this.state;
//     state[prop] = val;
//     this.setState(state);
//   }

//   useEffect(){
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       console.log("driver?: ", this.state.driver)
//       if (user) {
//         if(this.state.driver == "no")
//         {
//           this.props.navigation.replace("Tabs");
//         }
//         else
//         {
//           this.props.navigation.replace("DriverTabs");
//         }
        
//       }
//     });

//     return unsubscribe;
//   }

//   handleSignUp(){
//     console.log("Registered with: ", this.state.email);
//               console.log("pass ", this.state.password);
//               console.log("fname: ", this.state.fname);
//               console.log("lname: ", this.state.lname);
//               console.log("phone: ", this.state.phone);
//               console.log("driver: ", this.state.driver)
//               console.log("paid: ", this.state.paid)
//     if(this.state.email === '' || this.state.password === '' || this.state.reenterpassword === '' 
//     || this.state.fname === '' || this.state.lname === '' || this.state.phone === '' || this.state.driver === ''){
//       alert('Please fill out all fields')
//      } else {
//        this.setState({
//          isLoading: true,
//        });      
//        this.dbRef.add({
//          email: this.state.email,
//          password: this.state.password,
//          fname: this.state.fname,
//          lname: this.state.lname,
//          phone: this.state.phone,
//          driver: this.state.driver,
//          paid: 'no'
//        })
//       //  .then((res) => {
//       //    this.setState({
//       //      email: '',
//       //      password: '',
//       //      fname: '',
//       //      lname: '',
//       //      phone: '',
//       //      isLoading: false,
//       //    });
//       //  })
//       auth
//             .createUserWithEmailAndPassword(this.state.email, this.state.password)
//             .then((userCredentials) => {
//               const user = userCredentials.user;
//               console.log("Registered with: ", user.email);
//               console.log("pass ", password);
//               console.log("fname: ", fname);
//               console.log("lname: ", lname);
//               console.log("phone: ", phone);
//               console.log("driver: ", driver)
//               console.log("paid: ", paid)
//             })
//         //  this.props.navigation.navigate('Addresses')
//         .catch((err) => {
//          console.error("Error found: ", err);
//          this.setState({
//            isLoading: false,
//          });
//        });
//      }
    
//       // addUser({
//         //   email: email,
//         //   password: password,
//         //   fname: fname,
//         //   lname: lname,
//         //   phone: phone,
//         // }).catch((error) => alert(error.message));
//   };
//   render(){
//     var data = [["yes", "no"]];

//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={require("../images/pumpfivebackground.jpeg")}
//         style={styles.image}
//       >
//         <SafeAreaView style={styles.container}>
//           <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : null}
//           >
//             <View style={styles.inner}>
//               <View style={buttonstyles.backbutton}>
//                 <Button
//                   title="Back"
//                   color="white"
//                   onPress={() => navigation.goBack()}
//                 />
//               </View>

//               <Text style={styles.text1}>PumpFive</Text>
//               <Text style={styles.text2}>Fuel Delivery Service</Text>

//               {/* <Text style={styles.signup}>Sign Up</Text> */}
//               <ScrollView
//               // bounces={false}
//               // ref={ref => {this.scrollView = ref}}
//               // onContentSizeChange={() => scrollToEnd({animated: true})}
//               >
//                 {/* This Controls enterEmail text box */}
//                 <Text style={styles.email}>Email: *</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={email}
//                   onChangeText={(text) => setEmail(text)}
//                   placeholder="enter Email"
//                   keyboardType="default"
//                   top="4%"
//                   borderRadius="10"
//                 />

//                 <Text style={styles.email}>Password: *</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="create password"
//                   keyboardType="default"
//                   borderRadius="10"
//                 />

//                 <Text style={styles.email}>Re-enter Password:</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={password}
//                   onChangeText={(text) => setPassword(text)}
//                   placeholder="Retype Password"
//                   keyboardType="default"
//                   borderRadius="10"
//                 />

//                 <Text style={styles.email}>First name: *</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={fname}
//                   onChangeText={(text) => setFname(text)}
//                   placeholder="Enter First name"
//                   keyboardType="default"
//                   borderRadius="10"
//                 />

//                 <Text style={styles.email}>Last name: *</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={lname}
//                   onChangeText={(text) => setLname(text)}
//                   placeholder="enter Last name"
//                   keyboardType="default"
//                   borderRadius="10"
//                 />

//                 <Text style={styles.fcknphonenumber}>Phone Number: *</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={phone}
//                   onChangeText={(text) => setPhone(text)}
//                   placeholder="***-***-****"
//                   keyboardType="default"
//                   top="2%"
//                   borderRadius="10"

//                   //top = "10%"
//                 />
//                                 <View 
//                 style={{flexDirection:'row', justifyContent: 'space-around',}}
//               >
//                   <Text style={styles.email}>Are you registering as a driver?: *</Text>
//                   <View style={{left: "10%",top: "7%", width: "20%"}}> 
//                     <DropdownMenu
//                       // style={{top: "20%"}}
//                       // useNativeDriver={true}
//                       // label={"Select Payment Method"}
//                       bgColor={'white'}
//                       tintColor={'#000000'}
//                       activityTintColor={'red'}
//                       handler={(selection,row) => this.setState({driver: data[selection][row]})}
//                       data={data}
//                     >
//                     </DropdownMenu>
//                     </View>
//                   </View>
//                 {/* <PhoneInput
//           style={styles.input}
//           value = {phone}
//           onChangeText={text => setPhone(text)}
//           placeholder="enter Last name"
//         /> */}

//                 <View style={styles.loginview}>
//                   <Button
//                     title="Sign up"
//                     color="white"
//                     onPress={handleSignUp}
//                     // onPress={() => navigation.navigate('Tabs')}
//                   ></Button>
//                 </View>

//                 {/* <Text> Please sign in to continue</Text>

//         <Text>Email:</Text>

//         <Text>Password:</Text>

//         <Button title='LOGIN' onPress={() => console.log("button works")}/>

//         <Text>New User?</Text> 
//         <TouchableHighlight onPress={() => console.log("Touchable works")}>

//           <Text>Sign up</Text>
//         </TouchableHighlight> */}
//               </ScrollView>
//             </View>
//           </KeyboardAvoidingView>
//         </SafeAreaView>
//       </ImageBackground>
//     </View>
//   );
// }
//}


