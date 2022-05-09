import { ImageBackground, Image, StyleSheet, Button, Text, View, Linking, ActivityIndicator } from 'react-native'
import React, { Component, useCallback } from 'react'
import firebase from "firebase";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
//import Geolocation from '@react-native-community/geolocation';


const supportedURL = "https://www.pumpfive.com/terms-conditions/";
const supportedURL2 = "https://www.pumpfive.com/contact/";
const map = {uri: "https://entrecourier.com/wp-content/uploads/2020/06/storemap.jpg.webp"}

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

export default class HomePage extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection("Prices");
    this.state = {
      isLoading: true,
      prices: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.getPriceData);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getPriceData = (querySnapshot) => {
    const prices = [];
    var regular=''
    var premiumgas = ''
    var diesel= ''
    
    var small=''
    var medium=''
    var large=''

    var inside=''
    var outside=''
    var both=''
    querySnapshot.forEach((res) => {

      if(res.id=="Gas_Prices")
      {     
        regular = res.data().regular
        premiumgas = res.data().premium
        diesel = res.data().diesel
      }
      else if(res.id=="Tire_Prices")
      {
        small = res.data().small
        medium = res.data().medium
        large = res.data().large
      }
      else if(res.id=="Detailing_Prices")
      {
        inside = res.data().inside
        outside = res.data().outside
        both = res.data().both
      }

      
    });
    prices.push({
      regular,
      premiumgas,
      diesel,
      small,
      medium,
      large,
      inside,
      outside,
      both
    });
    console.log("All prices: ", prices)
  
    // console.log(cars);
    this.setState({
      prices,
      isLoading: false,
    });
  };


  render(){
    console.log("Regular gas: ", this.state.prices)
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/pumpfivebackground.jpeg')} resizeMode="cover" style={styles.image}>
      <Image
        style={styles.Logo}
        source={require('../images/pumpfivelogo.png')}
      />
      <View style={styles.rect1}>
        <MapView style={{height: '100%', width: '100%'}} provider={PROVIDER_GOOGLE} showsUserLocation={true}
        initialRegion={{
          latitude: 43.0385,
          longitude: -87.9311,
          longitudeDelta: 0.0421,
          latitudeDelta: 0.0622,
        }}/>
      </View>
        
              <View style={styles.scrollbox}>
              <ScrollView style={styles.scroll1}>
                {/* <View style={styles.rect2}> */}
                <View style={styles.BoundingBox}>
                  <View>
                    <Text style={styles.bofadeeznutsbold}>Regular Gas Price: <Text style={styles.embeddedText}>${this.state.prices[0].regular}</Text></Text>
                    <Text style={styles.bofadeeznutsbold}>Premium Gas Price: <Text style={styles.embeddedText}>${this.state.prices[0].premiumgas}</Text></Text>
                    <Text style={styles.bofadeeznutsbold}>Diesel Gas Price: <Text style={styles.embeddedText}>${this.state.prices[0].diesel}</Text></Text>

                    <Text style={styles.bofadeeznutsbold}>Small Tire Price: <Text style={styles.embeddedText}>${this.state.prices[0].small}</Text></Text>
                    <Text style={styles.bofadeeznutsbold}>Medium Tire Price: <Text style={styles.embeddedText}>${this.state.prices[0].medium}</Text></Text>
                    <Text style={styles.bofadeeznutsbold}>Large Tire Price: <Text style={styles.embeddedText}>${this.state.prices[0].large}</Text></Text>

                    <Text style={styles.bofadeeznutsbold}>Inside Detailing Price: <Text style={styles.embeddedText}>${this.state.prices[0].inside}</Text></Text>
                    <Text style={styles.bofadeeznutsbold}>Outside Detailing Price: <Text style={styles.embeddedText}>${this.state.prices[0].outside}</Text></Text>
                    <Text style={styles.bofadeeznutsbold}>Both: <Text style={styles.embeddedText}>${this.state.prices[0].both}</Text></Text>
                  </View>
                    
                </View>
              </ScrollView>
              </View>
            
        

      {/* <View style={styles.button1}>
      <OpenURLButton color="white" url={supportedURL}>Terms and Conditions</OpenURLButton>
      </View>
      <View style={styles.button2}>
      <OpenURLButton color="white" url={supportedURL2}>Contact Us</OpenURLButton>
      </View> */}
      </ImageBackground>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  Logo: {
    position: "absolute",
    width: "65%",
    height: "25%",
    left: "17.5%",
    right: "17.5%",
    top: "8%",
  },
  rect1: {
    position: 'absolute',
    width: "90%",
    height: "30%",
    left: "5%",
    right: "5%",
    top: "35%",
    backgroundColor: '#CDCABF',
    borderWidth: 3,
    borderColor: '#000000',
    //borderRadius: 10,
  },
  rect2: {
    backgroundColor: "#CDCABF",
    //borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    marginBottom: 5,
    // position: 'absolute',
    // width: "90%",
    // height: "15%",
    // left: "5%",
    // right: "5%",
    // top: "68%",
    // backgroundColor: '#CDCABF',
    // borderWidth: 3,
    // borderColor: '#000000',
    // borderRadius: 10,
  },
  button1: {
    position: 'absolute',
    width: "50%",
    height: "5%",
    left: "5%",
    top: "89%",
    backgroundColor: '#B96835',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    textAlign: "center",
  },
  button2: {
    position: 'absolute',
    width: "28%",
    height: "5%",
    right: "5%",
    top: "89%",
    backgroundColor: '#B96835',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  text1: {
    position: 'absolute',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    top: 555,
    alignSelf: 'center',
  },text2: {
    position: 'absolute',
    fontSize: 18,
    lineHeight: 21,
    top: 585,
    left: 105,
  },text3: {
    position: 'absolute',
    fontSize: 18,
    lineHeight: 21,
    top: 620,
    left: 105,
  },
  bofadeeznutsbold: {
    color: "black",
    fontSize: 23,
    // lineHeight: 35,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 5,
    paddingTop: 5,
  },
  embeddedText: {
    color: "green",
  },
  scroll1: {
    flex: 1,
  },
  scrollbox: {
    flex: 0.7,
    width: "90%",
    left: "5%",
    top: "50%",
  },
  BoundingBox: {
    backgroundColor: "#CDCABF",
    //borderWidth: 2,s
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    marginBottom: 5,
  },
})

