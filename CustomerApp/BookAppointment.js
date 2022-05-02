import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  Text,
  ImageBackground,
} from 'react-native'
import { React, Component } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from 'firebase';
import { auth } from '../firebase';





export default class BookAppointment extends Component {
  constructor(props) {
    super(props);
    this.user = auth.currentUser;
    this.uid =  user.uid
    this.updateDBRef = firebase.firestore().collection('Orders').doc(uid)
    this.state = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      fname: user,

      isDateTimePickerVisible: false,
      deliveryTime: "No delivery time set",
      isLoading: true,


    }
    let delivery 
  };


  //class methods 
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  }


  setDeliveryTime = (data) => {
    day = data.getDate();
    month = (data.getMonth() + 1);
    year = data.getFullYear();
    hours = data.getHours();
    minutes = data.getMinutes();

    ampm = hours >= 12 ? 'PM' : 'AM';
    hours =  (hours % 12);
    this.delivery =  month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ' ' + ampm


    this.setState({deliveryTime: this.delivery}, () => 
    console.log(this.state))
  }
  
  formatDate = (data) => {
    this.day = data.getDate();
    this.month = (data.getMonth() + 1);
    this.year = data.getFullYear();
    this.hours = data.getHours();
    this.minutes = data.getMinutes();

    this.ampm = this.hours >= 12 ? 'PM' : 'AM';
    this.hours = this.hours % 12;i
    this.deliveryTime = this.month + '/' + this.day + '/' + this.year + ' ' + this.hours + ':' + this.minutes + ' ' + this.ampm

  }





  //set correct service to update
  updateService = () => {
    this.updateDBRef.update({ "deliveryTime": this.state.deliveryTime })
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


  }




  handleDatePicked = date => {
    this.setDeliveryTime(date)
    this.updateService()
    this.hideDateTimePicker()

  }




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
              onConfirm={(this.handleDatePicked)}
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








