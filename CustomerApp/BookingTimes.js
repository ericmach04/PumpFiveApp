import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import React, { Component } from "react";
import firebase from 'firebase';


export default class BookingTimes extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection('Booking_Times');
    this.state = {
      isLoading: true,
      bookingTimes: []
    };

    //this.getTimeSlots = this.getTimeSlots.bind(this);
  }

  componentDidMount() {
    firebase.database().ref().on('value', (snapshot) =>{
      var slots = []
      snapshot.forEach((child) => {
        slots.push({
          key: child.key,
          slot1: child.val().slot1,
          slot2: child.val().slot2
        })
      })
      this.setState({
        bookingTimes: slots,
        isLoading: false
      })
    })
  }



  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>

          <ImageBackground style={styles.container} source={require("../images/pumpfivebackground.jpeg")}>
            <Text style={styles.text}>Pick a Time</Text>
            <FlatList style={{ width: '100%' }}
              data={this.state.bookingTimes}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Text>{item.slot1}</Text>
                    <Text>{item.slot2}</Text>
                  </View>)
              }} />
          </ImageBackground>

        <ImageBackground style={styles.container} source={require("../images/pumpfivebackground.jpeg")}>
          <Text style={styles.text}>Pick a Time</Text>
          <View style={styles.backbutton}>
             <Button title="Back" color="white" onPress={() => this.props.navigation.navigate('Tabs')}/>
          </View>
          {
            this.state.bookingTimes.map((slots, i) => {
              
              console.log(slots.slot1)
              return (
                //<View style={{ top: 20, left: "20%", }}>
                  <View >
                    <Text style={styles.slot}>{slots.slot1}</Text>
                  </View>
                //</View>

              );

            })

          }
        </ImageBackground>

        </SafeAreaView>
      </View>



    );

  }




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  text: {
    color: "white",
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    top: 40,
  },
  backbutton: {
    width: '18%', 
    height: 40,
    // top: 65,
    right: 0,
    backgroundColor:"#DAAC3F", 
    position: "absolute"
},

  slot: {
    marginTop: 0,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#ff7849",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"


  }


});

    // if (loading) {
    //     return <ActivityIndicator/>
    // }
//     render(){
//     return(
      
//         <FlatList
//             data={bookingTimes}
//             renderItem={({item}) => (
//                 <View style={{height:50, flex:1, alignItems:'center', justifyContent:'center'}}>
//                     {/* <Text>Booking Times: {item.id}</Text> */}
//                     <Text>Booking Times: {item.value}</Text>
//                 </View>
//             )} 
//         />
      
//     );  
// }


