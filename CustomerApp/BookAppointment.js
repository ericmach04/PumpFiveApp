import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  Text,
  ImageBackground,
} from 'react-native'
import { React, Component} from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from 'firebase';
import { auth } from '../firebase';





export default class BookAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      deliverytime: "",
      isLoading: true
    };

    //Const variables 
    const GAS = 1;
    const TIRE = 2;
    const DETAIL = 3; 
    
    //class variables 
    const user = auth.currentUser;
    const uid = user.uid;
    const db = firebase.firestore().collection('Orders');
    const service =  this.props.navigation.getParam('service')

    let currentDate
    let dateTimeString
    var day
    var month
    var year
    var hours
    var minutes


  }

  //class methods 
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  FormatDate = (data) => {
    this.day = data.getDate();
    this.month = (data.getMonth() + 1);
    this.year = data.getFullYear();
    this.hours = data.getHours();
    this.minutes = data.getMinutes();
  
    this.ampm = this.hours >= 12 ? 'PM' : 'AM';
    this.hours = this.hours % 12;
    this.dateTimeString = this.month+ '-' + this.day + '-' + this.year + ' ' + this.hours + ':' + this.minutes + ' ' + this.ampm
    return this.deliverytime;

  };

  //set correct service to update
  updateService = (type,deliverytime) =>{
    switch(type){
      case this.GAS:
        updateDBRef.update({"deliverytime": this.state.deliverytime})
        .then(() => {
          this.setState({
            isLoading: false,
          });
        })
        .catch((error) => {
          console.error("Error: ", error);
          this.setState({
            isLoading: false,
          });
        });
       
        break;

      case this.TIRE:
        break;

      case this.DETAIL:
        break;

      default:
        console.log("No service selected")
  }


  handleDatePicked = (date) => {
    this.setState({ deliverytime: this.FormatDate(date) })
    this.hideDateTimePicker()
    this.updateService(this.service,this.state.deliverytime)

    console.log("A date has been picked: ", this.state.deliverytime)

  
    }
    
  };

  //firebase functions
  
  

  //rendering view 
  render() {
    this.currentDate = new Date()

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.container} source={require("../images/pumpfivebackground.jpeg")}>

          <View style={buttonStyles.backButton}>
            <Button
              title="Back"
              color="black"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>

          <View style={buttonStyles.dateButton}>
            <Button
              title="Select a date and time"
              onPress={this.showDateTimePicker}
            />
            <DateTimePickerModal
              isVisible={this.state.isDateTimePickerVisible}
              mode="datetime"
              minimumDate={this.currentDate}
              onConfirm={this.handleDatePicked(this.date)}
              onCancel={this.hideDateTimePicker}
            />
              
          </View>

        </ImageBackground>
      </SafeAreaView>

    )
  };


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white'
  },

  image: {
    flex: 1,
    justifyContent: "center"
  },

  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#DAAC3F',
    height: 700
  },

  text: {
    color: "black",
    fontSize: 48,
    lineHeight: 44,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    top: 40,
  },

})

const buttonStyles = StyleSheet.create({

  backButton: {
    width: '15%',
    left: '1%',
    color: 'black',
    backgroundColor: "#DAAC3F",

  },

  dateButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    height: '90%',
    fontSize: 80,
    fontWeight: 'bold',





  }
})









