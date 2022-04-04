import {
  ImageBackground,
  Image,
  StyleSheet,
  Button,
  Text,
  View,
  Linking,
} from "react-native";
import React, { Component, useCallback } from "react";
import firebase from "firebase";

const supportedURL = "https://www.pumpfive.com/terms-conditions/";
const supportedURL2 = "https://www.pumpfive.com/contact/";
const map = {
  uri: "https://entrecourier.com/wp-content/uploads/2020/06/storemap.jpg.webp",
};

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
    this.docs = firebase.firestore().collection("Gas_Prices");
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
    querySnapshot.forEach((res) => {
      const { regular, premium, diesel } = res.data();
      // console.log("Email1: ", email)
      // console.log("Email2: ", auth.currentUser?.email)
      prices.push({
        key: res.id,
        regular,
        premium,
        diesel,
      });
    });
    // console.log(cars);
    this.setState({
      prices,
      isLoading: false,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../images/pumpfivebackground.jpeg")}
          resizeMode="cover"
          style={styles.image}
        >
          <Image
            style={styles.Logo}
            source={require("../images/pumpfivelogo.png")}
          />
          <View style={styles.rect1} />
          {this.state.prices.map((res, i) => {
            return (
              <View style={styles.rect2}>
                <Text style={styles.gastext2}>
                  Current Regular Price: {res.regular}
                </Text>
                <Text style={styles.gastext2}>
                  Current Premium Price: {res.premium}
                </Text>
                <Text style={styles.gastext2}>
                  Current Diesel Price: {res.diesel}
                </Text>
              </View>
            );
          })}

          <View style={styles.button1}>
            <OpenURLButton color="white" url={supportedURL}>
              Terms and Conditions
            </OpenURLButton>
          </View>
          <View style={styles.button2}>
            <OpenURLButton color="white" url={supportedURL2}>
              Contact Us
            </OpenURLButton>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
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
    position: "absolute",
    width: "90%",
    height: "30%",
    left: "5%",
    right: "5%",
    top: "35%",
    backgroundColor: "#CDCABF",
    borderWidth: 3,
    borderColor: "#000000",
    borderRadius: 10,
  },
  rect2: {
    position: "absolute",
    width: "90%",
    height: "15%",
    left: "5%",
    right: "5%",
    top: "68%",
    backgroundColor: "#CDCABF",
    borderWidth: 3,
    borderColor: "#000000",
    borderRadius: 10,
  },

  //paddingLeft positioned text L/R within shape
  button1: {
    position: "absolute",
    width: "30%",
    height: "5%",
    left: "5%",
    top: "89%",
    backgroundColor: "#B96835",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    //textAlign: "center",
    padding: 8,
    paddingLeft: "10%",
  },
  button2: {
    position: "absolute",
    width: "30%",
    height: "5%",
    right: "5%",
    top: "89%",
    backgroundColor: "#B96835",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    paddingLeft: "25%",
    borderRadius: 20,
  },
  text1: {
    position: "absolute",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 21,
    top: 555,
    alignSelf: "center",
  },
  text2: {
    position: "absolute",
    fontSize: 18,
    lineHeight: 21,
    top: 585,
    left: 105,
  },
  text3: {
    position: "absolute",
    fontSize: 18,
    lineHeight: 21,
    top: 620,
    left: 105,
  },
});
