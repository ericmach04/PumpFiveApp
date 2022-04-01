import { StyleSheet, Text, TextInput, View, SafeAreaView, ImageBackground, Button, ActivityIndicator } from 'react-native'
// import {Dropdown } from 'react-native-material-dropdown';

import firebase from 'firebase';
import {auth} from '../../firebase';
import {Component, useState} from "react";
import DropdownMenu from 'react-native-dropdown-menu';

export default class PaymentDropdown extends Component{
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   text: ''
  //   };
  // }
  constructor(props) {
    super(props);
    this.docs = firebase.firestore().collection("Credit_Cards");
    this.state = {
      cards: [],
      isLoading: true,
      text: "Other",
      data:[],
      keyvals: {},
    };
  }
//   updatedd = (choice) => {
//     this.setState({ driver: choice })
//  }
  componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getCardData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state.keyvals[this.state.text][prop] = val;
    this.setState(state);
  }

  getCardData = (querySnapshot) => {
    const cards = [];
    const data = [];
    var keyvals = {};
    var emptyarr = []
    data.push(emptyarr)
    // console.log("2D Data: ", data)
    if(this.state.data.length != 0 && Object.keys(this.state.keyvals).length != 0){
    querySnapshot.forEach((res) => {
      const { createdAt, cvv, email, expiry, number, type } = res.data();
      if (email == auth.currentUser?.email) {
        cards.push({
          cvv,
          expiry,
          number,
          type,
        });
        var cardarr = number.split(' ')
        var lastfour = cardarr[3]
        var string = type + " ending in " + lastfour
        console.log("String", string)
        data[0].push(string)

        keyvals[string] = {
          number: number,
          type: type,
          expiry: expiry,
          // cvv: cvv
        }

      }
    })
  ;
    console.log("KeyVals", keyvals)
    this.setState({
      cards,
      data,
      keyvals,
      isLoading: false,
    });
    console.log("epic before werid Data: ", this.state.data)
    console.log("KeyVals(state)", this.state.keyvals)

    data[0].push("Other")

    
  }
};

// renderWhenNotEmpty(){
//   if(data.length != 0 && Object.keys(keys).length != 0){
//     this.render()
//   }
// }
  
  render(){
      var data = this.state.data;
      var keys = this.state.keyvals
    
    // console.log("Data: ", data)
    // var data = [["visa enting in 5029", "master-card ending in 4324"]]
    // var newdata = this.state.data
    console.log("New Data: ", data)
    
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    console.log("Keys empty: ",Object.keys(keys).length == 0)
    console.log("text: ",this.state.text)
    // console.log("Data empty: ",data.length != 0)
    if(data.length != 0 && Object.keys(keys).length != 0){
      // console.log("WHat is text?: ",this.state.text)
      // console.log("WHat is name?: ",this.state.keyvals[this.state.text])
      return (
        <View style={{flex: 1}}>
        <View style={{height: "10%"}} />
        {/* <Text style={{}}>Choose Payment Method</Text> */}
          <DropdownMenu
            style={{flex: 0.5}}
            bgColor={'white'}
            tintColor={'#000000'}
            activityTintColor={'red'}
            handler={(selection,row) => this.setState({text: data[selection][row]})}
            data={data}
          >
          </DropdownMenu>
          {
          <View>
          <Text style={styles.email}>Name on Card: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter Name on the Card'}
                        value={this.state.keyvals[this.state.text].name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                />

                <Text style={styles.email}>Card Type: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter Card Type (Visa, Mastercard, etc)'}
                        value={this.state.keyvals[this.state.text].type}
                        // onChangeText={(val) => this.inputValueUpdate(val, 'model')}
                />

                <Text style={styles.email}>Card Number: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter Card Number (****-****-****-****)'}
                        value={this.state.keyvals[this.state.text].number}
                        // onChangeText={(val) => this.inputValueUpdate(val, 'year')}
                />

                <Text style={styles.email}>Expiration Date: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter Expiration Date (MM/YY)'}
                        value={this.state.keyvals[this.state.text].expiry}
                        // onChangeText={(val) => this.inputValueUpdate(val, 'license')}
                />
                <Text style={styles.email}>CVC: *</Text>
                <TextInput
                        style={styles.input}
                        placeholder={'Enter CVC'}
                        value={this.state.keyvals[this.state.text].cvv}
                        // onChangeText={(val) => this.inputValueUpdate(val, 'license')}
                />
                </View>
          }
        </View>
      );
        }

        // else{
        //   return <Text>Not supposed to be here</Text>
        // }
    
  }
}

const styles = StyleSheet.create({
    containerStyle: {
        left: 0,
        top: 5,
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
      top: "20%",
      color: "black",
     
      fontSize: 20,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "left",
  
      left: "2%",
    },
    input: {
      height: "4%",
      margin: "1%",
      width: "90%",
      borderWidth: 1,
      padding: "1%",
      backgroundColor: "white",
      top: "20%",
      left: "2%",
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