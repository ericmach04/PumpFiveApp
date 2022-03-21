import { StyleSheet, Text, View, SafeAreaView, Button, TouchableHighlight, ImageBackground, TextInput, KeyboardAvoidingView, TouchableOpacity,} from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
// import { addUser, getUsers } from '../firebase'
import {addUser} from '../firebasefunctions'

// var data = require('./localdb/localdb.json')

// function loginAttempt(db) {
//   // var dataparse = JSON.parse(db);
//   // console.log(db);

//   for(var x in db)
//   {
//     // console.log(db[x]["email"]);
   
//   }

// }

//export default function Login({ navigation })

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user){
        navigation.replace("Tabs")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log("Registered with: ",user.email);

      addUser({
        email: email,
        password: password
      })
    })
    .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log("Logged in with: ",user.email);

    })
    .catch(error => alert(error.message))
  }

  // var state = {
  //   userList: [],
  //   currentUser: null,
  // }

  // onFoodAdded = (user) => {
  //   console.log("User Added");
  //   console.log(user);
  // }

  // onUserReceived = (userList) => {
  //   console.log(userList);
  //   this.setState(prevState  => ({
  //     userList: prevState.userList = userList
  //   }));
  // }

  // componentDidMount = () => {
  //   getUsers(onUserReceived)
  // }
  
  return (
    
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
      
      
      <View style={styles.inputContainer}>
        <Text style={styles.text1}>
          Login
        </Text>
        <Text style={styles.text2}>
          Please sign in to continue
        </Text>


        <Text style={styles.email}>
          Email:
        </Text>
        <TextInput placeholder="Email ID" 
                    value={email} 
                    onChangeText={text => setEmail(text)}
                    style={styles.input}>

        </TextInput>

        <Text style={styles.email}>
          Password:
        </Text>
        <TextInput placeholder="Password" 
                    value={password} 
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry>
                    

        </TextInput>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          // onPress={() => { }}
          onPress={handleLogin}
          style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>

        </TouchableOpacity>

        <TouchableOpacity
          // onPress={handleSignUp}
          onPress={() => navigation.navigate('Registration')}
          // onPress={() => navigation.navigate('Registration')}
          style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Register</Text>

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
  )
}

// export default LoginScreen

const styles = StyleSheet.create({
  container: {
      // justifyContent: 'center',
      // alignItems: 'center',
      flex: 1,
    },
    inputContainer:{
      width: '80%',
      // justifyContent: 'center',
      // alignItems: 'center',

    },
    input:{
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      left: "10%",
      // justifyContent: 'center',
      // alignItems: 'center',

    },
    buttonContainer:{
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,

    },
    button:{
      backgroundColor: '#f9c107',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      left: "30%",

    },
    buttonOutline:{
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#f9c107',
      borderWidth: 2,

    },
    buttonText:{
      color: 'white',
      fontWeight: '700',
      fontSize: 16,

    },
    buttonOutlineText:{
      color: '#f9c107',
      fontWeight: '700',
      fontSize: 16,

    },

    image: {
      flex: 1,
      justifyContent: "center"
    },

     text1: {
       color: "white",
       fontSize: 48,
       lineHeight: 44,
       fontWeight: "700",
     //  textAlign: "left",
     //   flex: 1,
       top: 40,

    
      left: "10%",
      top: "-20%"
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
       top: "-15%"
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
       left: "10%",
       top: "10%"
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
       top: "10%"
  //     textAlign: "left",
     },
  //   signup: {
  //     top: 300,
  //     color: "white",
  //     fontFamily: "Times New Roman",
  //     fontSize: 30,
  //     lineHeight: 44,
  //     fontWeight: "bold",
  //     textAlign: "left",
  //   },

  //   services:{
  //       flexDirection: "column",
  //       justifyContent: "space-around"
  //   },

  //   gasservice: {
  //     position: 'absolute',
  //     width: 350,
  //     height: 175,
  //     left: 21,
  //     top: -275,
  //     backgroundColor: '#CDCABF',
  //     borderWidth: 2,
  //     borderColor: '#000000',
  //     borderRadius: 10,
  // },

  //   tireservice:{
  //     position: 'absolute',
  //     width: 350,
  //     height: 175,
  //     left: 21,
  //     top: -80,
  //     backgroundColor: '#CDCABF',
  //     borderWidth: 2,
  //     borderColor: '#000000',
  //     borderRadius: 10,
  //   },

  //   detailingservice:{
  //     position: 'absolute',
  //     width: 350,
  //     height: 175,
  //     left: 21,
  //     top: 115,
  //     backgroundColor: '#CDCABF',
  //     borderWidth: 2,
  //     borderColor: '#000000',
  //     borderRadius: 10,
  //   },

  //   boxfontshead:{
  //     color: "black",
  //     fontSize: 24,
  //     lineHeight: 30,
  //     fontWeight: "bold",
  //     textAlign: "left",
  //     top: 5,
  //     left: 5,
  //   },

  //   boxfontsbody:{
  //     color: "black",
  //     fontSize: 18,
  //     lineHeight: 30,
  //     textAlign: "left",
  //     top: 5,
  //     left: 5,
  //   },
  //   input1: {
  //     height: 40,
  //     // width: 100,
  //     margin: 5,
  //     borderWidth: 1,
  //     padding: 5,
  //     backgroundColor: "white",
  //     top: 175,
  //   },
  //   input2: {
  //     height: 40,
  //     margin: 5,
  //     borderWidth: 1,
  //     padding: 5,
  //     backgroundColor: "white",
  //     top: 175,
  //   },
  //   loginview: {
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     borderWidth: 1,
  //     width: 100, 
  //     height: 40,
  //     top: 175,
  //     right: 10,
  //     left: 5,
  //     backgroundColor:"#DAAC3F", 
  //   },

})

const buttonstyles = StyleSheet.create({
  button: { 
      top: 600, 
      borderWidth: 1,
      width: "50%", 
      backgroundColor:"#DAAC3F", 
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
    backgroundColor:"#DAAC3F", 
    // position: "absolute", 
    alignItems: "center",
    justifyContent: "center",
}
})