import { StyleSheet, Text, TextInput, View, SafeAreaView, ImageBackground, Button, ActivityIndicator, KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
// import {Dropdown } from 'react-native-material-dropdown';

import firebase from 'firebase';
import {auth} from '../../firebase';
import {Component, useState} from "react";
import DropdownMenu from 'react-native-dropdown-menu';

export default class AddressDropdown extends Component{
  
  constructor(props) {
    super(props);
    this.docs = firebase.firestore().collection("Car_Info");
    this.userdocs = firebase.firestore().collection("Users");
    this.handleModelChange  = this.handleModelChange.bind(this)
    this.handleMakeChange  = this.handleMakeChange.bind(this)
    this.handleYearChange  = this.handleYearChange.bind(this)
    this.handleLicenseChange  = this.handleLicenseChange.bind(this)
    this.handleColorChange  = this.handleColorChange.bind(this)
    this.state = {
      // cards: [],
      addresses:{
        
      },
      isLoading: true,
      key:'',
      text: 'Other',
      data:[],
      keyvals: {
        
      },
    };
  }



handleMakeChange(e) {
  console.log("e: ", e)
  this.inputValueUpdate(e, 'make')
  // console.log("Make: ", this.state.keyvals[this.state.text].make)
  this.props.onMakeValChange(e)
  console.log("value: ", e)
}
handleModelChange(e) {
  // console.log("e: ", e)
  this.inputValueUpdate(e, 'model')
  this.props.onModelValChange(e)
  // console.log("value: ", e)
}
handleYearChange(e) {
  // console.log("e: ", e)
  this.inputValueUpdate(e, 'year')
  this.props.onYearValChange(e)
  // console.log("value: ", e)
}
handleLicenseChange(e) {
  // console.log("e: ", e)
  this.inputValueUpdate(e, 'license')
  this.props.onLicenseValChange(e)
  // console.log("value: ", e)
}

handleColorChange(e) {
  // console.log("e: ", e)
  this.inputValueUpdate(e, 'color')
  this.props.onColorValChange(e)
  // console.log("value: ", e)
}


  componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getCarData);
        this.unsubscribe2 = this.userdocs.onSnapshot(this.getUserKey)
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.unsubscribe2();
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state.keyvals[this.state.text][prop] = val;
    this.setState(state);
  }

  getUserKey = (querySnapshot) => {
    querySnapshot.forEach((res) => {
      const { createdAt, cvv, email, expiry, number, type } = res.data();
      if (email == auth.currentUser?.email) {
        const state = this.state;
        state.key = res.id;
        this.setState(state);
      }
    }

    )
    // console.log("Epic key: ", this.state.key)
  }
  getCarData = (querySnapshot) => {
    const carinfo = [];
    const data=[]
    var keyvals = {
    // "Other": {
    //     name:'',
    //     number: '',
    //     type: '',
    //     expiry: '',
    //     cvv: ''
    //     // cvv: cvv
    // }
  }
    var emptyarr = []
    data.push(emptyarr)

    querySnapshot.forEach((res) => {
      const { email, license, make, model, year, color } = res.data();
      if (email == auth.currentUser?.email) {
        carinfo.push({
          key: res.id,
          email,
          license,
          make,
          model,
          year,
          color
        });

        var string = year + " " + color + " " + make + " " + model
        data[0].push(string)

        keyvals[string] = {
            // name:'placeholder',
            license: license,
            make: make,
            model: model,
            year: year,
            color: color,
            // cvv: '000'
            // cvv: cvv
          }
      }
      
    });

    keyvals["Other"] = {
      email: '',  
      license:'',
      make: '',
      model: '',
      year: '',
      color: ''
    }
    data[0].push("Other")

    this.setState({
        keyvals,
      carinfo,
    });
    
    this.setState({
        data,
        isLoading: false,
      });

      // console.log("My addys: ", this.state.keyvals)
    
  };
  
  render(){
     
    
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    
    else{
      var data = this.state.data;
      var keys = this.state.keyvals
      var data2 = [["Big Data", "Hadoop", "Spark", "Hive"], ["Data Science" ,"Python","Ruby"]];
    
      // if(this.state.keyvals[this.state.text]["make"] != '')
      // {
      //   console.log("Epic make: ", this.state.keyvals[this.state.text]["make"])
      //   var count =1
      //   if(count != 0)
      //   {
      //     this.handleMakeChange()
      //   }
       
      //   // 
      // }
      return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <DropdownMenu
            // style={{top: "20%"}}
            // useNativeDriver={true}
            label={"Select Payment Method"}
            bgColor={'white'}
            tintColor={'#000000'}
            activityTintColor={'red'}
            handler={(selection,row) => this.setState({text: data[selection][row]})}
            data={data}
          >
          </DropdownMenu>

          <View style={styles.inputContainer}>
          <Text style={styles.email}>Car Make: *</Text>
          <View style={styles.input}>
                <TextInput
                        // style={styles.input}
                        placeholder="Enter Car Make"
                        placeholderTextColor="#D3D3D3"
                        value={this.state.keyvals[this.state.text].make}
                        // onChange={this.handleMakeChange}
                        onChangeText={this.handleMakeChange}
                        // onSelectionChange={this.handleMakeChange}
                />
                </View>

                <Text style={styles.email}>Car Model: *</Text>
                <View style={styles.input}>
                <TextInput
                        // style={styles.input}
                        placeholder='Enter Car Model'
                        placeholderTextColor="#D3D3D3"
                        value={this.state.keyvals[this.state.text].model}
                        onChangeText={this.handleModelChange}
                />
                </View>

                <Text style={styles.email}>Car Year: *</Text>
                <View style={styles.input}>
                <TextInput
                        // style={styles.input}
                        placeholder={'Enter Car Year'}
                        placeholderTextColor="#D3D3D3"
                        value={this.state.keyvals[this.state.text].year}
                        onChangeText={this.handleYearChange}
                />
                </View>

                <Text style={styles.email}>Color: *</Text>
                <View style={styles.input}>
                <TextInput
                        // style={styles.input}
                        placeholder={'Enter Color'}
                        placeholderTextColor="#D3D3D3"
                        value={this.state.keyvals[this.state.text].color}
                        onChangeText={this.handleColorChange}
                />
                </View>

                <Text style={styles.email}>License Plate: *</Text>
                <View style={styles.input}>
                <TextInput
                        // style={styles.input}
                        placeholder={'Enter License Plate'}
                        placeholderTextColor="#D3D3D3"
                        value={this.state.keyvals[this.state.text].license}
                        onChangeText={this.handleLicenseChange}
                />
                </View>
                </View>
                </KeyboardAvoidingView>
                
      );
        }
      
        // }

        // else{
        //   return <Text>Not supposed to be here</Text>
        // }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    backbutton2: {
      width: '18%', 
      height: 40,
      // top: 65,
      right: 0,
      bottom: "2%",
      backgroundColor:"#DAAC3F", 
      position: "absolute"
  },
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center'
    },
    email: {
      // top: "25%",
      color: "black",
     
      fontSize: 20,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "left",
  
      // left: "2%",
    },
    input: {
      height: "6%",
      margin: "1%",
      width: "90%",
      borderWidth: 1,
      padding: "1%",
      backgroundColor: "white",
      // top: "25%",
      // left: "2%",
    },
    inputGroup: {
      // flex: 1,
      // top:"100%",
      padding: 0,
      // marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
    },
    paybutton: {
      // width: "77%",
      // height: "7%",
      top: "300%",
      // left: "30%",
      backgroundColor: "#DAAC3F",
      position: "absolute",
      // justifyContent: "center",
    },
})
