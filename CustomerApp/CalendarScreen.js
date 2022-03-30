import {
  StyleSheet, 
  View,
  SafeAreaView,
  Button,
  Text,
  ImageBackground
} from 'react-native'
import { React, Component } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";



export default class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };

    var currentDate = new Date()
    var day
    var month
    var year
  }


  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };

  render() {
    var currentDate = new Date()
    setDate = (event, date) => { };

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
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
            minimumDate={currentDate}
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
    alignItems:'center',
    justifyContent:'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    height:'90%', 
    fontSize:80,
    fontWeight:'bold',


   
    
    
  }
})









