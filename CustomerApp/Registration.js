import { StyleSheet, Text, View, SafeAreaView, Button, TouchableHighlight, ImageBackground, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { addUser } from '../firebasefunctions'

import PhoneInput from 'react-native-phone-input'

export default function Registration({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [phone, setPhone] = useState('')
  const [cMake, setcMake] = useState('')
  const [cModel, setcModel] = useState('')
  const [cYear, setcYear] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user){
        navigation.replace("Login")
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
        password: password,
        fname: fname,
        lname: lname,
        phone: phone,
        cMake: cMake,
        cModel: cModel,
        cYear: cYear
      })
      .catch(error => alert(error.message))
  })}

  return ( 
  <View style={styles.container}>
    
    <ImageBackground source={require('../images/pumpfivebackground.jpeg')} style={styles.image}>
      <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        // style={{ flex: 1 }}
      >
      <View style={styles.inner}>
      <View style={buttonstyles.backbutton}>
                              <Button
                              title="Back"
                              color="white"
                              onPress={() => navigation.goBack()}
                            />
                            </View>
        
          <Text style={styles.text1}>PumpFive</Text>          
          <Text style={styles.text2}>Fuel Delivery Service</Text>
       

        {/* <Text style={styles.signup}>Sign Up</Text> */}
        <ScrollView
          // bounces={false}
          // ref={ref => {this.scrollView = ref}}
          // onContentSizeChange={() => scrollToEnd({animated: true})}
        >
        
        <Text style={styles.email}>Email: *</Text>
        <TextInput
                      style={styles.input}
                      value = {email}
                      onChangeText={text => setEmail(text)}
                      placeholder="enter Email"
                      keyboardType="default"
        />

          <Text style={styles.email}>Password: *</Text>
                  <TextInput
                                style={styles.input}
                                placeholder="create password"
                                keyboardType="default"
                  />

                  <Text style={styles.email}>Re-enter Password:</Text>
                  <TextInput
                                style={styles.input}
                                value = {password}
                                onChangeText={text => setPassword(text)}
                                placeholder="Retype Password"
                                keyboardType="default"
                  />
        <View style={{flexDirection: "row", justifyContent: "space-around", left: 5,}}>
          <Text style={styles.email}>First name: *</Text>
          <Text style={styles.email}>Last name: *</Text>
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-around", left: 5,}}>
          <TextInput
                        style={styles.input2}
                        value = {fname}
                        onChangeText={text => setFname(text)}
                        placeholder="Enter First name"
                        keyboardType="default"
          />
          
          <TextInput
                        style={styles.input2}
                        value = {lname}
                        onChangeText={text => setLname(text)}
                        placeholder="enter Last name"
                        keyboardType="default"
          />
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-around", left: 5,}}>
          <Text style={styles.email}>Car make: *</Text>
          <Text style={styles.email}>Car model: *</Text>
          <Text style={styles.email}>Car year: *</Text>
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-around", left: 5,}}>
          <TextInput
                        style={styles.input2}
                        value = {cMake}
                        onChangeText={text => setcMake(text)}
                        placeholder="Enter Car Make"
                        keyboardType="default"
          />
          
          <TextInput
                        style={styles.input2}
                        value = {cModel}
                        onChangeText={text => setcModel(text)}
                        placeholder="Enter Car Model"
                        keyboardType="default"
          />
          
          <TextInput
                        style={styles.input2}
                        value = {cYear}
                        onChangeText={text => setcYear(text)}
                        placeholder="Enter Car Year"
                        keyboardType="numeric"
          />
        </View>
       
        <Text style={styles.email}>Phone Number: *</Text>
        <TextInput
                      style={styles.input}
                      value = {phone}
                      onChangeText={text => setPhone(text)}
                      placeholder="***-***-****"
                      keyboardType="default"
        />
        {/* <PhoneInput
          style={styles.input}
          value = {phone}
          onChangeText={text => setPhone(text)}
          placeholder="enter Last name"
        /> */}
       

        <View style={styles.loginview}>
            <Button title="Sign up" 
                    color="white" 
                    onPress={handleSignUp}
                    // onPress={() => navigation.navigate('Tabs')}
                    ></Button>
        </View>
        
        {/* <Text> Please sign in to continue</Text>

        <Text>Email:</Text>

        <Text>Password:</Text>

        <Button title='LOGIN' onPress={() => console.log("button works")}/>

        <Text>New User?</Text> 
        <TouchableHighlight onPress={() => console.log("Touchable works")}>

          <Text>Sign up</Text>
        </TouchableHighlight> */}
    </ScrollView>
    </View> 
    </KeyboardAvoidingView>
    </SafeAreaView>
    </ImageBackground>
    
    </View>
)
}

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
    justifyContent: "center"
  },

  text1: {
    color: "white",

    fontSize: 48,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    // flex: 1,
    left: "2%",
    top: "-15%"
  },
  text2: {
    color: "white",

    fontSize: 30,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",
    // flex: 1,
    left: "2%",
    top: "-20%"
  },
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
  email: {
    // top: "1%",
    color: "white",
   
    fontSize: 20,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "left",

    left: "2%",
  },
  input: {
    height: "4%",
    margin: "1%",
    borderWidth: 1,
    padding: "1%",
    backgroundColor: "white",
    top: "0%",
    left: "2%",
  },
  input2: {
    height: "5.5%",
    // margin: "1%",
    borderWidth: 1,
    padding: "5%",
    backgroundColor: "white",
    top: "0%",
    left: "2%",
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
    justifyContent: "space-around"
  },

  gasservice: {
    position: 'absolute',
    width: 350,
    height: 175,
    left: 21,
    top: -275,
    backgroundColor: '#CDCABF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
  },

  tireservice: {
    position: 'absolute',
    width: 350,
    height: 175,
    left: 21,
    top: -80,
    backgroundColor: '#CDCABF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
  },

  detailingservice: {
    position: 'absolute',
    width: 350,
    height: 175,
    left: 21,
    top: 115,
    backgroundColor: '#CDCABF',
    borderWidth: 2,
    borderColor: '#000000',
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
    width: 100,
    height: 40,
    top: 30,
    // right: 10,
    backgroundColor: "#DAAC3F",
    left: 5,
  },

})

const buttonstyles = StyleSheet.create({
  button: {
    width: '30%',
    height: 40,
    bottom: 5,
    left: 230,
    // top: 270,
    borderWidth: 1,
    backgroundColor: "#DAAC3F",
    position: "absolute"
  },
  backbutton: {
    width: '15%', 
    height: "7%",
    top: "5%",
    right: "5%",
    backgroundColor: "#DAAC3F",
    position: "absolute"
  }
})