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
      cards:{
        
      },
      isLoading: true,
      key:'',
      text: "Other",
      data:[],
      keyvals: {
        "Other": {
          name:'L',
          number: '',
          type: '',
          expiry: '',
          cvv: ''
          // cvv: cvv
        }
      },
    };
  }
//   updatedd = (choice) => {
//     this.setState({ driver: choice })
//  }
  componentDidMount() {
        this.unsubscribe = this.docs.onSnapshot(this.getCardData);
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
      this.updatePaidYes()
    }
  }

  updatePaidYes() {
    // this.setState({
    //   isLoading: true,
    // });
    const updateDBRef = firebase.firestore().collection('Users').doc(this.state.key)
    
    updateDBRef.update("paid", "yes")
    // .then((docRef) => {
    //   this.setState({
    //     email: '',
    //     password: '',
    //     isLoading: false,
    //   });
    //   // this.props.navigation.navigate('Login');
    // })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
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

  getCardData = (querySnapshot) => {
    const cards = {};
    const data = [];
    var keyvals = {
      "Other": {
        name:'',
        number: '',
        type: '',
        expiry: '',
        cvv: ''
        // cvv: cvv
    }};
    var emptyarr = []
    data.push(emptyarr)
    // console.log("2D Data: ", data)
    
    querySnapshot.forEach((res) => {
      const { createdAt, cvv, email, expiry, number, type } = res.data();
      if (email == auth.currentUser?.email) {
        // cards.push({
        //   cvv,
        //   expiry,
        //   number,
        //   type,
        // });
        var cardarr = number.split(' ')
        var lastfour = cardarr[3]
        var string = type + " ending in " + lastfour
        console.log("String", string)
        data[0].push(string)

        const state = this.state;
        state.key = res.id;
        this.setState(state);

        keyvals[string] = {
          // name:'placeholder',
          number: number,
          type: type,
          expiry: expiry,
          // cvv: '000'
          // cvv: cvv
        }

        cards[string] = {
          cvv: cvv
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
    console.log("Cards: ", this.state.cards)
    console.log("epic before werid Data: ", this.state.data)
    console.log("KeyVals(state)", this.state.keyvals)
    console.log("uid: ", this.state.key)

    // data[0].push("Other")

    
  
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
    
    console.log("Keys in render: ", keys)
    console.log("Text: ", this.state.text)
    // console.log(typeof this.state.text)
    console.log("Text Object: ", this.state.keyvals)
    console.log("New Data: ", data)
      return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          
        <View style={{top: "7%"}}> 
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

          
          <Text style={styles.email}>Name on Card: *</Text>
          <View style={styles.input}>
                <TextInput
                        // style={styles.input}
                        placeholder="Enter Name on the Card"
                        placeholderTextColor="#D3D3D3"
                        value={this.state.keyvals[this.state.text].name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                />
                </View>

                <Text style={styles.email}>Card Type: *</Text>
                <View style={styles.input}>
                <TextInput
                        // style={styles.input}
                        placeholder='Enter Card Type (Visa, Mastercard, etc)'
                        placeholderTextColor="#D3D3D3"
                        value={this.state.keyvals[this.state.text].type}
                        onChangeText={(val) => this.inputValueUpdate(val, 'type')}
                />
                </View>

                <Text style={styles.email}>Card Number: *</Text>
                <View style={styles.input}>
                <TextInput
                        // style={styles.input}
                        placeholder={'Enter Card Number (****-****-****-****)'}
                        placeholderTextColor="#D3D3D3"
                        value={this.state.keyvals[this.state.text].number}
                        onChangeText={(val) => this.inputValueUpdate(val, 'number')}
                />
                </View>

                <Text style={styles.email}>Expiration Date: *</Text>
                <View style={styles.input}>
                <TextInput
                        // style={styles.input}
                        placeholder={'Enter Expiration Date (MM/YY)'}
                        placeholderTextColor="#D3D3D3"
                        value={this.state.keyvals[this.state.text].expiry}
                        onChangeText={(val) => this.inputValueUpdate(val, 'expiry')}
                />
                </View>
                <Text style={styles.email}>CVC: *</Text>
                <View style={styles.input}>
                <TextInput
                        // style={styles.input}
                        placeholder={'Enter CVC'}
                        placeholderTextColor="#D3D3D3"
                        value={this.state.keyvals[this.state.text].cvv}
                        onChangeText={(val) => this.inputValueUpdate(val, 'cvv')}
                        keyboardType="numeric"
                />
                <View style={styles.paybutton}>
                              <Button
                              title="Confirm Payment"
                              color="white"
                              onPress={() => this.checkCards()}
                            /> 
                          
                            
                        </View>  
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
      top: "9%",
      color: "black",
     
      fontSize: 15,
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
      top: "9%",
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