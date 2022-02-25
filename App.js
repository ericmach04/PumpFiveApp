import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from "./CustomerApp/HomePage";
import PlaceOrder from "./CustomerApp/PlaceOrder";
import GasService from "./CustomerApp/GasService";
import TireService from "./CustomerApp/TireService";
import DetailingService from "./CustomerApp/DetailingService";
import LoginPage from "./CustomerApp/Login";

import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';

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

const App = () =>  {
  return (
    //<NavigationContainer>
    //  <Tabs />
   // </NavigationContainer>
    // <GasService/>
    // <TireService/>
    // <DetailingService/>
    <LoginPage/>
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
