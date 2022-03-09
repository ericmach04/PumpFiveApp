import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, Button } from 'react-native'
import { Calendar } from 'react-native-calendario';
import Moment from 'moment'
import DatePicker from "react-datepicker";




export default function CalendarScreen({navigation}){
    const [dateState, setDateState] = useState(new Date())
     const changeDate = (e) => {
         setDateState(e)
    }
    
    
    

    return (
       <SafeAreaView>
           <View style={buttonstyles.backbutton}>
                <Button
                title="Back"
                color="black"
                onPress={() => navigation.goBack()}
            />
            </View>
            <Calendar
                value={dateState}
                onChange={changeDate}
                
               
            />

        
          
        </SafeAreaView>
    )
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
      backgroundColor:"#DAAC3F",
      
    },
    buttonText:{
        color: 'black',
        fontWeight: '800',
        fontSize: 20,
    }
})









