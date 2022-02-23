import { ImageBackground, Image, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../CustomerApp/HomePage';
import PlaceOrder from '../CustomerApp/PlaceOrder';
import AcctSettings from '../CustomerApp/AcctSettings';

const Tab = createBottomTabNavigator();

const Tabs = () =>{
    return(
        <Tab.Navigator 
        screenOptions={{ 
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "#CEB764",
            tabBarInactiveBackgroundColor: "#CDCABF",
         }}
         >
            <Tab.Screen name="Home" component={HomePage} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', }}>
                        <Image 
                        source={require('../icons/homeicon.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? 'black' : 'black',
                        }}/>
                        <Text 
                        style={{color: focused ? 'black' : 'black', fontSize: 12}}>
                            Home
                            </Text>
                    </View>
                )
                
            }}></Tab.Screen>
            <Tab.Screen name="Place Order" component={PlaceOrder} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <Image 
                        source={require('../icons/placeorder.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? 'black' : 'black',
                        }}/>
                        <Text 
                        style={{color: focused ? 'black' : 'black', fontSize: 12}}>
                            Home
                            </Text>
                    </View>
                )
            }}></Tab.Screen>
            <Tab.Screen name="Account Settings" component={AcctSettings} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <Image 
                        source={require('../icons/acctsettings.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? 'black' : 'black',
                        }}/>
                        <Text 
                        style={{color: focused ? 'black' : 'black', fontSize: 12}}>
                            Home
                            </Text>
                    </View>
                )
            }}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default Tabs;