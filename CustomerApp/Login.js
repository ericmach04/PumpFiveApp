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
  TouchableOpacity,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import { auth } from "../firebase";
// import { addUser, getUsers } from '../firebase'
import { addUser } from "../firebasefunctions";
import firebase from "firebase"
// import { objectTraps } from "immer/dist/internal";

export default class Login extends Component{
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  constructor() {
    super();
    this.docs = firebase.firestore().collection('Users');
    this.state = {
      email: '',
      password: '',
      keyvals: {},
    };
  }

  useEffect(){
    console.log("in useeffect")
    // auth.onAuthStateChanged((user) => {
    //   // console.log("user id: ", user.uid)
    //   if (user) {
    //     console.log("user: ", user.email)
    //     if (
    //       user.email == "info@pumpfive.com" ||
    //       user.email == "talethea@gmail.com"
    //     ) {
    //       console.log("In admin LFGGG")
    //       this.props.navigation.replace("Admin");
    //     } 
        
    //     else {
    //       let keysarr = Object.keys(this.state.keyvals)
    //       for(let i=0; i < Object.keys(this.state.keyvals).length; i++)
    //       {
    //         if(user.email == keysarr[i]){
    //           console.log("What is the email? ", user.email)
    //           if(this.state.keyvals[user.email] == "no")
    //           {
    //             this.props.navigation.replace("Tabs");
    //             this.state.driver == "no"
    //           }
    //           if(this.state.keyvals[user.email] == "yes")
    //           {
    //             this.props.navigation.replace("DriverTabs");
    //             this.state.driver = "yes"
    //           }
    //         }
    //       }
    //       // console.log("Should be no: ", this.state.driver)
    //       // if(this.state.driver == "no")
    //       // {
    //       //   this.props.navigation.replace("DriverTabs");
            
    //       // }
    //       // else{
    //       //   this.props.navigation.replace("Tabs");
    //       // }
          
    //     }
    //   }
    // });


    // auth.onAuthStateChanged((user) => {
    //   // console.log("user id: ", user.uid)
    //   if (user) {
    //     // console.log("user: ", user.email)
    //     if (
    //       user.email == "info@pumpfive.com" ||
    //       user.email == "talethea@gmail.com"
    //     ) {
    //       this.props.navigation.replace("Admin");
    //     } 
        
    //     else {
    //       console.log("Should be blahblahblah: ", this.state.driver)
    //       if(this.state.driver == "no")
    //       {
    //         console.log("in")
    //         this.props.navigation.replace("Tabs");
            
    //       }
    //       else{
    //         this.props.navigation.replace("DriverTabs");
    //       }
          
    //     }
    //   }
    // });

    
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getifdriver);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  getifdriver = (querySnapshot) => {
    // const user = userCredentials.user;
    console.log("In getifdriver")
    console.log("this email: ", this.state.email)
    
    var keyvalues = {}
    querySnapshot.forEach((res) => {
      const {email, driver } = res.data();
      keyvalues[email.toLowerCase()] = driver
      console.log("Epic email: ",email);
      // console.log(phone)
      // console.log(fname)
      console.log("Email? ", this.state.email)
      if (email.toLowerCase() == this.state.email) {
        // console.log("UserKeyID: ", res.id)
        if(driver == "no"){
          this.setState({
            paid: "no",
            isLoading: false,
          });
        }
        else
        {
          this.setState({
            // key: res.id,
            driver: "yes",
            isLoading: false,
          });
        }
        this.setState({
          key: res.id,
          // isLoading: false,
        });
        
      }
      
    });
    console.log("UserKeyID: ", this.state.key)
    this.setState({
      keyvals: keyvalues,
      isLoading: false,
    });
    console.log("this.state.paid: ", this.state.paid)
    console.log("Driver states: ", this.state.keyvals)
  };

  handleLogin = () => {
    console.log("Login email: ", this.state.email)
    console.log("Login password: ", this.state.password)

    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
      })
      .catch((error) => alert(error.message));

     auth.onAuthStateChanged((user) => {
        // console.log("user id: ", user.uid)
        if (user) {
          console.log("user: ", user.email)
          if (
            user.email == "info@pumpfive.com" ||
            user.email == "talethea@gmail.com"
          ) {
            console.log("In admin LFGGG")
            this.props.navigation.replace("Admin");
          } 
          
          else {
            let keysarr = Object.keys(this.state.keyvals)
            for(let i=0; i < Object.keys(this.state.keyvals).length; i++)
            {
              if(user.email == keysarr[i]){
                console.log("What is the email? ", user.email)
                console.log("What is the driver state? ", this.state.keyvals[user.email])
                if(this.state.keyvals[user.email] == "no")
                {
                  this.props.navigation.replace("Tabs");
                  this.state.driver == "no"
                }
                else
                {
                  this.state.driver = "yes"
                  this.props.navigation.replace("DriverTabs");
                }
              }
            }
            // console.log("Should be no: ", this.state.driver)
            // if(this.state.driver == "no")
            // {
            //   this.props.navigation.replace("DriverTabs");
              
            // }
            // else{
            //   this.props.navigation.replace("Tabs");
            // }
            
          }
        }
      });
  };
  

    

  render(){

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
        source={require("../images/pumpfivebackground.jpeg")}
        style={styles.image}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.text1}>Login</Text>
          <Text style={styles.text2}>Please sign in to continue</Text>

          <Text style={styles.email}>Email:</Text>
          <TextInput
          style={styles.input}
          placeholderTextColor="#D3D3D3"
          placeholder={'Enter Email'}
          value={this.state.email}
          onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          keyboardType="default"
          top="4%"
          borderRadius="10"
            // placeholder="Email ID"
            // value={email}
            // onChangeText={(text) => setEmail(text)}
            // style={styles.input}
          ></TextInput>

          <Text style={styles.email}>Password:</Text>
          <TextInput
            // placeholder="Password"
            // value={password}
            // onChangeText={(text) => setPassword(text)}
            // style={styles.input}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#D3D3D3"
            placeholder={'Enter Password'}
            value={this.state.password}
            onChangeText={(val) => this.inputValueUpdate(val, 'password')}
            keyboardType="default"
            top="4%"
            borderRadius="10"
          ></TextInput>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            // onPress={() => { }}
            onPress={() => this.handleLogin()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={handleSignUp}
            onPress={() => this.props.navigation.navigate("Registration")}
            // onPress={() => navigation.navigate('Registration')}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>

        </TouchableOpacity>
        <TouchableOpacity
          // onPress={handleSignUp}
          onPress={() => this.props.navigation.navigate('ForgotPassword')}
          // onPress={() => navigation.navigate('Registration')}
          // style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Forgot Password?</Text>

        </TouchableOpacity>

      </View>
      </ImageBackground>
    </KeyboardAvoidingView>

    // <View style={styles.container}>
    //   <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
    //     <SafeAreaView style={styles.container}>

    //         <Text style={styles.text1}>PumpFive</Text>
    //         <Text style={styles.text2}>Fuel Delivery Service</Text>

    //       <Text style={styles.login}>Login</Text>
    //       <Text style={styles.signin}>Please sign in to continue</Text>

    //       <Text style={styles.email}>Email:</Text>
    //       <TextInput style={styles.input1} placeholder="Email" keyboardType="default"/>
    //       <Text style={styles.password}>Password:</Text>
    //       <TextInput style={styles.input2} placeholder="Password" keyboardType="default"/>
    //       <View style={styles.loginview}>
    //         <Button title="Login" color="white" onPress={() => navigation.navigate('Tabs')}/>
    //         {/* <Button title="Login" color="white" onPress={() => loginAttempt(data)}/> */}
    //         {/* <Button onPress={() => this.getValues()} title='Login' /> */}
    //       </View>
    //       <View>
    //         <Text style={styles.signup}>New User?</Text>
    //         <View style={buttonstyles.signupbutton}>
    //           <Button title="Sign up" color="white" onPress={() => navigation.navigate('Registration')}></Button>
    //         </View>
    //       </View>

    /* <Text> Please sign in to continue</Text>

          <Text>Email:</Text>

          <Text>Password:</Text>

          <Button title='LOGIN' onPress={() => console.log("button works")}/>

          <Text>New User?</Text> 
          <TouchableHighlight onPress={() => console.log("Touchable works")}>

            <Text>Sign up</Text>
          </TouchableHighlight> */

    // </SafeAreaView>
    // </ImageBackground>
    // </View>
  );
}}

// export default LoginScreen

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
    //top: 174,
    color: "white",

    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    // textAlign: "left",

    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingBottom: 20,
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
