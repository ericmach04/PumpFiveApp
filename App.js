import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomePage from "./CustomerApp/HomePage";
import PlaceOrder from "./CustomerApp/PlaceOrder";
import AcctSettings from "./CustomerApp/AcctSettings";
import GasService from "./CustomerApp/GasService";
import TireService from "./CustomerApp/TireService";
import DetailingService from "./CustomerApp/DetailingService";
import LoginPage from "./CustomerApp/Login";
import Registration from './CustomerApp/Registration';
import OrderSummary from './CustomerApp/OrderSummary';
import Membership from './CustomerApp/AcctSettingsPages/Membership'
import CarInfo from './CustomerApp/AcctSettingsPages/CarInfo'
// import Addresses from './CustomerApp/Addresses'
import Addresses from './CustomerApp/AcctSettingsPages/Addresses'
import OrderHistory from './CustomerApp/AcctSettingsPages/OrderHistory'
import Payment from './CustomerApp/AcctSettingsPages/Payment'
import BookAppointment from './CustomerApp/BookAppointment'
import AddCard from './CustomerApp/AcctSettingsPages/AddCard'
import AddAddress from './CustomerApp/AcctSettingsPages/AddAddress';
import AddCarInfo from './CustomerApp/AcctSettingsPages/AddCarInfo';
import EditCarInfo from './CustomerApp/AcctSettingsPages/EditCarInfo';
import EditAddress from './CustomerApp/AcctSettingsPages/EditAddress';



import { NavigationContainer, Screen } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import DriverTabs from './navigation/DriverTabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './CustomerApp/Login';

import DriverHome from './DriverApp/DriverHome';
import DriverOrder from './DriverApp/DriverOrder';
import DriverJobs from './DriverApp/DriverJobs';
import DriverAccount from './DriverApp/DriverAccount';

import DriverAddresses from './DriverApp/DriverAccountPages/DriverAddresses';
import DriverInfo from './DriverApp/DriverAccountPages/DriverInfo';
import JobHistory from './DriverApp/DriverAccountPages/DriverJobHistory';

import Admin from './CustomerApp/Admin'
import ForgotPassword from './CustomerApp/ForgotPassword';

import PaymentDropdown from './CustomerApp/dropdowns/PaymentDropdown';

import Receipt from './CustomerApp/AcctSettingsPages/Receipt';


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

const App = () => {
  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="BookAppointment" component={BookAppointment} />
        <Stack.Screen name="GasService" component={GasService} />
        <Stack.Screen name="TireService" component={TireService} />
        <Stack.Screen name="DetailingService" component={DetailingService} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="OrderSummary" component={OrderSummary} />
        <Stack.Screen name="Membership" component={Membership} />
        <Stack.Screen name="AcctSettings" component={AcctSettings} />
        <Stack.Screen name="CarInfo" component={CarInfo} />
        {/* <Stack.Screen name="Addresses" component={Addresses} /> */}
        <Stack.Screen name="Addresses" component={Addresses} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="Payment" component={Payment} />

        <Stack.Screen name="DriverTabs" component={DriverTabs} />
        <Stack.Screen name="DriverHome" component={DriverHome} />
        <Stack.Screen name="DriverOrder" component={DriverOrder} />
        <Stack.Screen name="DriverJobs" component={DriverJobs} />
        <Stack.Screen name="DriverAccount" component={DriverAccount} />

        <Stack.Screen name="DriverAddresses" component={DriverAddresses} />
        <Stack.Screen name="DriverInfo" component={DriverInfo} />
        <Stack.Screen name="JobHistory" component={JobHistory} />

          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="AddAddress" component={AddAddress} />
          <Stack.Screen name="AddCarInfo" component={AddCarInfo} />
          <Stack.Screen name="EditCarInfo" component={EditCarInfo} />
          <Stack.Screen name="EditAddress" component={EditAddress} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

          <Stack.Screen name="Admin" component={Admin} />
          <Stack.Screen name="PaymentDropdown" component={PaymentDropdown} />
          <Stack.Screen name="Receipt" component={Receipt} />

          



      </Stack.Navigator>



    </NavigationContainer>
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
