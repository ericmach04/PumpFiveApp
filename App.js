import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from "./CustomerApp/HomePage";
import PlaceOrder from "./CustomerApp/PlaceOrder";
import AcctSettings from "./CustomerApp/AcctSettings";
import GasService from "./CustomerApp/GasService";
import TireService from "./CustomerApp/TireService";
import DetailingService from "./CustomerApp/DetailingService";
import LoginPage from "./CustomerApp/Login";

import { NavigationContainer, Screen } from '@react-navigation/native';
import Tabs from './navigation/tabs'; 

import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './CustomerApp/Login';

// export default function App() {
//   // return (
//   //   <View style={styles.container}>
//   //     <Text>Open up App.js to start working on your app!</Text>
//   //     <StatusBar style="auto" />
//   //   </View>
//   // );
//   return(
//     <PlaceOrder />
//   ) ;
// }
const Stack = createNativeStackNavigator();

const App = () =>  {
  return (
    <NavigationContainer>
      
        <Stack.Navigator screenOptions={{headerShown: false,}}>
          <Stack.Screen name="Tabs" component={Tabs} />
          {/* <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
          <Stack.Screen name="AcctSettings" component={AcctSettings} /> */}
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="GasService" component={GasService} />
          <Stack.Screen name="TireService" component={TireService} />
          <Stack.Screen name="DetailingService" component={DetailingService} />
          <Stack.Screen name="Login" component={Login} />
          
          
        </Stack.Navigator>
        
        
      {/* <Tabs/> */}
      {/* <Screen>
        
      </Screen> */}
      
      
    </NavigationContainer>
    // <GasService/>
    // <TireService/>
    // <DetailingService/>
    // <LoginPage/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
