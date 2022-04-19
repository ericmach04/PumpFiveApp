import { ImageBackground, Image, Button, StyleSheet, Text, View, SafeAreaView, SafeAreaInsets} from 'react-native'
import React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AdminGas from '../CustomerApp/AdminGas'
import AdminTires from '../CustomerApp/AdminTires'
import AdminDetailing from '../CustomerApp/AdminDetailing'
// import HomePage from '../CustomerApp/HomePage';
// import PlaceOrder from '../CustomerApp/PlaceOrder';
// import AcctSettings from '../CustomerApp/AcctSettings';

const Tab = createBottomTabNavigator();

const AdminTabs = () =>{
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
            <Tab.Screen name="AdminGas" component={AdminGas} options={{
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
                            Gas Prices
                            </Text>
                    </View>
                    
                )
                
                
                
            }}></Tab.Screen>
            <Tab.Screen name="AdminTires" component={AdminTires} options={{
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
                            Tire Prices
                            </Text>
                    </View>
                ),

                // gasScreen: ({ navigation }) =>(
                    
                //         <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                //           {/* <Text>Home Screen</Text> */}
                //           <Button
                //             title="Book Now"
                //             onPress={() => navigation.navigate('GasService')}
                //           />
                //         </SafeAreaView>
                      
                // ) 

            }}></Tab.Screen>
            <Tab.Screen name="AdminDetailing" component={AdminDetailing} options={{
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
                            Detailing Prices
                            </Text>
                    </View>
                )
            }}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default AdminTabs;