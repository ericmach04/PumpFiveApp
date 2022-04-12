import { StyleSheet, Text, TextInput, View, SafeAreaView, ImageBackground, Button, ActivityIndicator, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
// import {Dropdown } from 'react-native-material-dropdown';

import firebase from 'firebase';
import {auth} from '../../firebase';
import {Component, useState} from "react";
import DropdownMenu from 'react-native-dropdown-menu';

export default class AddressDropdown extends Component{
  
  constructor(props) {
    super(props);
    this.docs = firebase.firestore().collection("Addresses");
    this.userdocs = firebase.firestore().collection("Users");
    this.state = {
      // cards: [],
      addresses:{
        
      },
      isLoading: true,
      key:'',
      text: 'Other',
      data:[],
      keyvals: {
        // "Other": {
        //   email: '',  
        //   streetnumber:'',
        //   city: '',
        //   state: '',
        //   zip: '',
        // }
      },
    };
  }
//   updatedd = (choice) => {
//     this.setState({ driver: choice })
//  }
  componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getAddressData);
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

  checkCards() {
    if(this.state.cards[this.state.text].cvv != this.state.keyvals[this.state.text].cvv)
    {
      Alert.alert(
        'Sorry, the fields for this card do not match',
        'Please try again',
        [
          {text: 'Dismiss', onPress: () => console.log('Error'), style: 'cancel'},
        ],
        { 
          cancelable: true 
        }
      );
    }
    else{
      // Alert.alert(
      //   'Fields match',
      //   'LFG',
      //   [
      //     {text: 'Dismiss', onPress: () => console.log('Error'), style: 'cancel'},
      //   ],
      //   { 
      //     cancelable: true 
      //   }
      // );
    //   this.updatePaidYes()
    }
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
    console.log("Epic key: ", this.state.key)
  }
  getAddressData = (querySnapshot) => {
    const addresses = [];
    const data=[]
    var keyvals = {
    // "Other": 
    // {
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
    // data[0].push("Please select an address")
    // keyvals["Please select and address"] = {
    // email: '',  
    // streetnumber:'',
    // city: '',
    // state: '',
    // zip: '',
    // }
    querySnapshot.forEach((res) => {
      const { email, streetnumber, city, state, zip } = res.data();
      if (email == auth.currentUser?.email) {
        addresses.push({
          key: res.id,
          email,
          streetnumber,
          city,
          state,
          zip,
        });

        var string = streetnumber
        data[0].push(string)

        keyvals[string] = {
            // name:'placeholder',
            streetnumber: streetnumber,
            city: city,
            state: state,
            zip: zip
            // cvv: '000'
            // cvv: cvv
          }
      }
      
    });

    keyvals["Other"] = {
        email: '',  
        streetnumber:'',
        city: '',
        state: '',
        zip: '',
      }
      data[0].push("Other")

    this.setState({
        keyvals,
      addresses,
    });
    
    this.setState({
        data,
        isLoading: false,
      });

      console.log("My addys: ", this.state.keyvals)
    
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
    
    // console.log("Keys in render: ", keys)
    // console.log("Text: ", this.state.text)
    // // console.log(typeof this.state.text)
    // console.log("Text Object: ", this.state.keyvals)
    // console.log("New Data: ", data)
    console.log("Text: ", this.state.text)
    console.log("Object State: ", this.state.keyvals)
      return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          
        <View style={{top: "1%"}}> 
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

          
          <Text style={styles.email}>Street Name and Number: *</Text>
          <View style={styles.input}>
                <TextInput
                        // style={styles.input}
                        placeholder="Enter Name on the Card"
                        placeholderTextColor="#D3D3D3"
                        value={this.state.keyvals[this.state.text].streetnumber}
                        onChangeText={(val) => this.inputValueUpdate(val, 'streetnumber')}
                />
                </View>

                <Text style={styles.email}>City: *</Text>
                <View style={styles.input}>
                <TextInput
                        // style={styles.input}
                        placeholder='Enter Card Type (Visa, Mastercard, etc)'
                        placeholderTextColor="#D3D3D3"
                        value={this.state.keyvals[this.state.text].city}
                        onChangeText={(val) => this.inputValueUpdate(val, 'city')}
                />
                </View>

                <Text style={styles.email}>State: *</Text>
                <View style={styles.input}>
                <TextInput
                        // style={styles.input}
                        placeholder={'Enter Card Number (****-****-****-****)'}
                        placeholderTextColor="#D3D3D3"
                        value={this.state.keyvals[this.state.text].state}
                        onChangeText={(val) => this.inputValueUpdate(val, 'state')}
                />
                </View>

                <Text style={styles.email}>Zip Code: *</Text>
                <View style={styles.input}>
                <TextInput
                        // style={styles.input}
                        placeholder={'Enter Expiration Date (MM/YY)'}
                        placeholderTextColor="#D3D3D3"
                        value={this.state.keyvals[this.state.text].zip}
                        onChangeText={(val) => this.inputValueUpdate(val, 'zip')}
                />
                </View>
                
                
                
               
                </View>
                
                
                
        // </TouchableWithoutFeedback>
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
      top: "40%",
      color: "black",
     
      fontSize: 20,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "left",
  
      // left: "2%",
    },
    input: {
      height: "7%",
      margin: "1%",
      width: "90%",
      borderWidth: 1,
      padding: "1%",
      backgroundColor: "white",
      top: "40%",
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
  

// const PaymentDropdown = () => {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     {label: 'creditcard1', value: 'Credit Card ending in 5079'},
//     {label: 'creditcard2', value: 'Credit Card ending in 4984'},
//   ]);

//   return (
//     <DropDownPicker style={styles.containerStyle}
//       open={open}
//       value={value}
//       items={items}
//       setOpen={setOpen}
//       setValue={setValue}
//       setItems={setItems}
//     />
//   );
// }

// const styles = StyleSheet.create({
//     containerStyle: {
//         left: 0,
//         top: 5,
//     }
// })

// export default PaymentDropdown;