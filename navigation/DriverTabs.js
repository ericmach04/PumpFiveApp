import { ImageBackground, Image, Button, StyleSheet, Text, View, SafeAreaView, SafeAreaInsets} from 'react-native'
import React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomePage from '../CustomerApp/HomePage';
// import PlaceOrder from '../CustomerApp/PlaceOrder';
// import AcctSettings from '../CustomerApp/AcctSettings';
import DriverHome from '../DriverApp/DriverHome';
import DriverOrder from '../DriverApp/DriverOrder';
import DriverJobs from '../DriverApp/DriverJobs';
import DriverAccount from '../DriverApp/DriverAccount';

const Tab = createBottomTabNavigator();

const Tabs = () =>{
    return(
        <Tab.Navigator 
        screenOptions={{ 
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "#CEB764",
            tabBarInactiveBackgroundColor: "#CDCABF",
            tabBarStyle: {
                paddingBottom: 0,
            },
         }}
         >
            <Tab.Screen name="Home" component={DriverHome} options={{
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
            <Tab.Screen name="Current Order" component={DriverOrder} options={{
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
                            Current Order
                            </Text>
                    </View>
                ),

            }}></Tab.Screen>
            <Tab.Screen name="All Jobs" component={DriverJobs} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        <Image 
                        source={require('../icons/bell.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? 'black' : 'black',
                        }}/>
                        <Text 
                        style={{color: focused ? 'black' : 'black', fontSize: 12}}>
                            All Jobs
                            </Text>
                    </View>
                )
            }}></Tab.Screen>
            <Tab.Screen name="Account Settings" component={DriverAccount} options={{
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
                            Account Settings
                            </Text>
                    </View>
                )
            }}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default Tabs;