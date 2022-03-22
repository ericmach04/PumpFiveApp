import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, Button } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


import moment from 'moment'



export default function CalendarScreen({ navigation }) {
  let current = new(Date)


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
        minDate={current}
        onDayPress={day => { navigation.navigate('GasService', {day})}}


        theme={{
          activeDayColor: {
            color: '#6d95da'
          }
        }
        }

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
    backgroundColor: "#DAAC3F",

  },
  buttonText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 20,
  }
})









