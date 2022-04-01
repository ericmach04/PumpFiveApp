import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button, ActivityIndicator } from 'react-native'
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
      isLoading: false,
      text: "",
      data:[],
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
    state[prop] = val;
    this.setState(state);
  }

  getCardData = (querySnapshot) => {
    const cards = [];
    const data = [];
    var emptyarr = []
    data.push(emptyarr)
    // console.log("2D Data: ", data)
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

      }
    });
    this.setState({
      cards,
      data,
      isLoading: false,
    });

    console.log("Data: ", this.state.data)
  };
  
  render(){
      var data = this.state.data;
    
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
    console.log(data == [])
    if(data.length != 0){
      return (
        <View style={{flex: 1}}>
        <View style={{height: 52}} />
        <Text style={{}}>Choose Payment Method</Text>
          <DropdownMenu
            style={{flex: 0.5}}
            bgColor={'white'}
            tintColor={'#000000'}
            activityTintColor={'red'}
            handler={(selection,row) => this.setState({text: data[selection][row]})}
            data={data}
          >
          </DropdownMenu>
        </View>
      );
        }

        else{
          return null
        }
    
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