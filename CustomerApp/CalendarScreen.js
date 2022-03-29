import { 
  StyleSheet,View, 
  SafeAreaView, 
  Button, 
} from 'react-native'
import { React,Component} from 'react'
import { DateTimePicker} from '@react-native-community/datetimepicker';


export default class CalendarScreen extends Component {
  constructor() {
    super();
    var currentDate = new Date()
    console.log(currentDate)
  }
  

  render(navigation){
    return (
      <SafeAreaView>
  
        <View style={buttonstyles.backbutton}>
          <Button
            title="Back"
            color="black"
            onPress={() => navigation.goBack()}
          />
        </View>
  
        <DateTimePicker>
          value={new Date(1950, 0, 1)}
        
  
        </DateTimePicker>

      </SafeAreaView>
    
  

  
 
      

      /* <Calendar
        minDate={current}
        onDayPress={day => {navigation.navigate('BookingTimes', {day})}}


        theme={{
          activeDayColor: {
            color: '#6d95da'
          }
        }
        }

      /> */

    )};
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1
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

const buttonstyles = StyleSheet.create({
  backbutton: {
    width: '15%',
    left: '1%',
    color: 'black',
    backgroundColor: "#DAAC3F",

  },
  buttonText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 20,
  }
})









