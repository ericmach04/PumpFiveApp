import {
    ImageBackground,
    Image,
    Button,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableHighlight,
    TouchableOpacity,
  } from "react-native";
  import {React, Component} from "react";
  import { NavigationContainer } from "@react-navigation/native";
  import { createStackNavigator } from "@react-navigation/stack";
  import firebase from "firebase"
  import { auth } from "../firebase";
  
  //Addresses Page - In Progresss
  
  export default class AcctSettings extends Component {
    constructor() {
      super();
      this.docs = firebase.firestore().collection("Users");
      this.state = {
        isLoading: true,
        users: [],
      };
    }
    componentDidMount() {
      this.unsubscribe = this.docs.onSnapshot(this.getUserData);
    }
  
    componentWillUnmount() {
      this.unsubscribe();
    }
  
    getUserData = (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((res) => {
        const { email, phone, fname, lname } = res.data();
        console.log(email);
        // console.log(phone)
        // console.log(fname)
        // console.log(lname)
        // console.log("email1: ", email)
        // console.log("email2: ", auth.currentUser?.email)
        if (email.toLowerCase() == auth.currentUser?.email) {
          users.push({
            key: res.id,
            email,
            phone,
            fname,
            lname,
          });
        }
        // console.log(users)
      });
      this.setState({
        users,
        isLoading: false,
      });
    };
  
  
    handleSignOut = () => {
      auth
        .signOut()
        .then(() => {
          this.props.navigation.navigate("Login");
        })
        .catch((error) => alert(error.message));
    };
    render(){
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../images/pumpfivebackground.jpeg")}
            style={styles.image}
          >
            <SafeAreaView style={styles.container}>
              <Text style={styles.text}>Account Settings</Text>
  
              <View style={styles.Addresses}>
                {this.state.users.map((res, i) => {
                  console.log(res.email);
  
                  return (
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Text style={styles.boxfontshead}>
                          {res.fname} {res.lname}
                        </Text>
                      </View>
                      <Text style={styles.boxfontsbody}>Email: {res.email}</Text>
                      {/* <Text style={styles.boxfontsbody}>
                        Member Number: {res.key}
                      </Text> */}
                      <Text style={styles.boxfontsbody}>
                        User Phone Number: {res.phone}
                      </Text>
                      <Text style={styles.boxfontsbody}>
                        Driver #: {res.key}
                      </Text>
                    </View>
                  );
                })}
                <TouchableOpacity onPress={() => this.props.navigation.navigate("DriverInfo")}>
                <View
                  style={{
                    flexDirection: "row",
                    //justifyContent: "space-around",
                    top: 40,
                    height: 50,
                    marginBottom: 20,
                  }}
                >
                    <View style={{left: 20, top: 6}}>
                    <Image source={require("../icons/menu.png")}/>
                    </View>
                    <View style={{left: 50}}>
                    <Text style={styles.boxfontshead2}>Driver Information</Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("DriverJobHistory")}>
                <View
                  style={{
                    flexDirection: "row",
                    //justifyContent: "space-around",
                    top: 40,
                    height: 50,
                    marginBottom: 20,
                  }}
                >
                  <View style={{left: 20, top: 6}}>
                    <Image source={require("../icons/tag.png")} />
                  </View>
                  <View style={{left: 50}}>
                    <Text style={styles.boxfontshead2}>Job History</Text>
                  </View>
                </View>
                </TouchableOpacity>
                
  
                <View
                  style={{
                    flexDirection: "row",
                    //justifyContent: "space-around",
                    top: 40,
                    height: 50,
                    marginBottom: 20,
                  }}
                >
                  <View style={{left: 20, top: 6}}>
                    <Image source={require("../icons/bell.png")} />
                  </View>
                  <View style={{left: 50}}>
                    <Text style={styles.boxfontshead2}>Notifications</Text>
                  </View>
                  <View style={{left: 100}}>
                    <Image source={require("../icons/off.png")} />
                  </View>
                </View>
                <View style={styles.loginview}>
                          <Button
                            title="Logout"
                            color="white"
                            onPress={this.handleSignOut}
                          />
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>
        </View>
      );
  
    // return (
    //   <View style={styles.container}>
    //     <ImageBackground
    //       source={require("../images/pumpfivebackground.jpeg")}
    //       style={styles.image}
    //     >
    //       <SafeAreaView style={styles.container}>
    //         <Text style={styles.text}>Account Settings</Text>
    //         <View style={styles.Addresses}>
    //           <View
    //             style={{
    //               flexDirection: "row",
    //               justifyContent: "space-around",
    //               left: 5,
    //             }}
    //           >
    //             <Text style={styles.boxfontshead}>John Smith</Text>
    //             <View style={styles.loginview}>
    //               <Button
    //                 title="Logout"
    //                 color="white"
    //                 onPress={this.handleSignOut}
    //               />
    //             </View>
    //           </View>
    //           <Text style={styles.boxfontsbody}>{auth.currentUser?.email}</Text>
    //           {/* <Text style={styles.boxfontsbody}>Member Number: 773123456789</Text> */}
    //           <Text style={styles.boxfontsbody}>
    //             User Phone Number: 414-***-****
    //           </Text>
  
    //           {/* <View
    //             style={{
    //               flexDirection: "row",
    //               justifyContent: "space-around",
    //               left: "1%",
    //               top: "10%",
    //             }}
    //           >
    //             <View>
    //               <Image source={require("../icons/menu.png")} />
    //             </View>
    //             <View>
    //               <Text style={styles.boxfontshead2}>Addresses</Text>
    //             </View>
    //             <View>
    //               <TouchableOpacity
    //                 onPress={() => navigation.navigate("DriverAddresses")}
    //               >
    //                 <Image source={require("../icons/arrow.png")} />
    //               </TouchableOpacity>
    //             </View>
    //           </View> */}
  
    //           <View
    //             style={{
    //               flexDirection: "row",
    //               justifyContent: "space-around",
    //               left: "1%",
    //               top: "25%",
    //             }}
    //           >
    //             <View>
    //               <Image source={require("../icons/tag.png")} />
    //             </View>
    //             <View>
    //               <Text style={styles.boxfontshead2}>Driver Information</Text>
    //             </View>
    //             <View>
    //               <TouchableHighlight
    //                 onPress={() => navigation.navigate("DriverInfo")}
    //               >
    //                 <Image source={require("../icons/arrow.png")} />
    //               </TouchableHighlight>
    //             </View>
    //           </View>

    //           <TouchableOpacity onPress={() => this.props.navigation.navigate("DriverJobHistory")}>
    //           <View
    //             style={{
    //               flexDirection: "row",
    //               //justifyContent: "space-around",
    //               top: 40,
    //               height: 50,
    //               marginBottom: 20,
    //             }}
    //           >
    //               <View style={{left: 20, top: "40%"}}>
    //               <Image source={require("../icons/menu.png")}/>
    //               </View>
    //               <View style={{left: 50, top: "40%"}}>
    //               <Text style={styles.boxfontshead2}>Job History</Text>
    //               </View>
    //           </View>
    //           </TouchableOpacity>
  
    //           {/* <View
    //             style={{
    //               flexDirection: "row",
    //               justifyContent: "space-around",
    //               left: "1%",
    //               top: "40%",
    //             }}
    //           >
    //             <View>
    //               <Image source={require("../icons/bag.png")} />
    //             </View>
    //             <View>
    //               <Text style={styles.boxfontshead2}>Job History</Text>
    //             </View>
    //             <View>
    //               <TouchableOpacity
    //                 onPress={() => navigation.navigate("JobHistory")}
    //               >
    //                 <Image source={require("../icons/arrow.png")} />
    //               </TouchableOpacity>
    //             </View>
    //           </View> */}
  
    //           <View
    //             style={{
    //               flexDirection: "row",
    //               justifyContent: "space-around",
    //               left: "1%",
    //               top: "55%",
    //             }}
    //           >
    //             <View>
    //               <Image source={require("../icons/bell.png")} />
    //             </View>
    //             <View>
    //               <Text style={styles.boxfontshead2}>Notifications</Text>
    //             </View>
    //             <View>
    //               <Image source={require("../icons/off.png")} />
    //             </View>
    //           </View>
    //         </View>
  
    //       </SafeAreaView>
    //     </ImageBackground>
    //   </View>
    // );
              }
  }
  const Logoutstyles = StyleSheet.create({
    Logoutstyles: {
      color: "black",
      fontSize: 48,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "right",
      flex: 1,
      top: 30,
      right: 50,
      position: "absolute",
    },
  });
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    UserAccount: {
      flexDirection: "column",
      justifyContent: "space-around",
    },
  
    Addresses: {
      position: "absolute",
      width: "90%",
      height: 620,
      left: "5%",
      top: 120,
      backgroundColor: "#CDCABF",
      borderWidth: 2,
      borderColor: "#000000",
      borderRadius: 10,
    },
  
    text: {
      color: "white",
      fontSize: 44,
      lineHeight: 46,
      fontWeight: "bold",
      textAlign: "center",
      // flex: 1,
      top: "10%",
    },
  
    // Addresses
    addrfontshead: {
      color: "black",
      fontSize: 24,
      lineHeight: 30,
      fontWeight: "bold",
      textAlign: "center",
      top: 20,
      left: 5,
    },
  
    //Your Membership:
    memfontshead: {
      color: "black",
      fontSize: 24,
      lineHeight: 30,
      fontWeight: "bold",
      textAlign: "center",
      top: 40,
      left: 5,
    },
  
    //mem2
    mem2fontsbody: {
      color: "black",
      lineHeight: 30,
      textAlign: "center",
      top: 40,
      right: -15,
    },
  
    //mml
    mmlfontsbody: {
      color: "black",
      lineHeight: 30,
      textAlign: "center",
      top: 60,
      right: -15,
    },
    paybutton: {
      width: "77%",
      height: "7%",
      top: "90%",
      right: "10%",
      backgroundColor: "#DAAC3F",
      position: "absolute",
    },
  
    //lic
    licfontsbody: {
      color: "black",
      lineHeight: 30,
      textAlign: "center",
      top: 50,
      right: -15,
    },
  
    boxfontshead2: {
      color: "black",
      fontSize: 24,
      lineHeight: 30,
      fontWeight: "bold",
      textAlign: "right",
    },
  
    image: {
      flex: 1,
      justifyContent: "center",
    },
  
    services: {
      flexDirection: "column",
      justifyContent: "space-around",
    },
  
    boxfontshead: {
      color: "black",
      fontSize: 24,
      lineHeight: 30,
      fontWeight: "bold",
      textAlign: "left",
      top: 5,
    },
  
    boxfontsbody: {
      color: "black",
      fontSize: 18,
      lineHeight: 30,
      textAlign: "left",
      top: 5,
      left: "5%",
    },
    loginview: {
      justifyContent: "center",
      alignItems: "center",
      width: "50%",
      top: 30,
      height: 40,
      left: "25%",
      borderRadius: 30,
      backgroundColor: "#DAAC3F",
    },
  });
  
  // const buttonstyles = StyleSheet.create({
  //   button: {
  //     width: 100,
  //     height: 40,
  //     bottom: 5,
  //     right: 10,
  //     color: "white",
  //     borderWidth: 1,
  //     backgroundColor: "#DAAC3F",
  //     position: "absolute",
  //   },
  // });
  
  // const Logoutstyles = StyleSheet.create({
  //   Logoutstyles: {
  //     color: "black",
  //     fontSize: 48,
  //     lineHeight: 44,
  //     fontWeight: "bold",
  //     textAlign: "right",
  //     flex: 1,
  //     top: 30,
  //     right: 50,
  //     position: "absolute",
  //   },
  // });
  
  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //   },
  
  //   UserAccount: {
  //     flexDirection: "column",
  //     justifyContent: "space-around",
  //   },
  
  //   Addresses: {
  //     position: "absolute",
  //     width: 350,
  //     height: 620,
  //     left: 21,
  //     top: 120,
  //     backgroundColor: "#CDCABF",
  //     borderWidth: 2,
  //     borderColor: "#000000",
  //     borderRadius: 10,
  //   },
  //   paybutton: {
  //     width: "77%",
  //     height: "7%",
  //     top: "90%",
  //     right: "10%",
  //     backgroundColor: "#DAAC3F",
  //     position: "absolute",
  //   },
  
  //   text: {
  //     color: "white",
  //     fontSize: 48,
  //     lineHeight: 44,
  //     fontWeight: "bold",
  //     textAlign: "center",
  //     flex: 1,
  //     top: 30,
  //   },
  
  //   // Addresses
  //   addrfontshead: {
  //     color: "black",
  //     fontSize: 24,
  //     lineHeight: 30,
  //     fontWeight: "bold",
  //     textAlign: "center",
  //     top: 20,
  //     left: 5,
  //   },
  
  //   //Your Membership:
  //   memfontshead: {
  //     color: "black",
  //     fontSize: 24,
  //     lineHeight: 30,
  //     fontWeight: "bold",
  //     textAlign: "center",
  //     top: 40,
  //     left: 5,
  //   },
  
  //   //mem2
  //   mem2fontsbody: {
  //     color: "black",
  //     lineHeight: 30,
  //     textAlign: "center",
  //     top: 40,
  //     right: -15,
  //   },
  
  //   //mml
  //   mmlfontsbody: {
  //     color: "black",
  //     lineHeight: 30,
  //     textAlign: "center",
  //     top: 60,
  //     right: -15,
  //   },
  
  //   //lic
  //   licfontsbody: {
  //     color: "black",
  //     lineHeight: 30,
  //     textAlign: "center",
  //     top: 50,
  //     right: -15,
  //   },
  
  //   boxfontshead: {
  //     color: "black",
  //     fontSize: 24,
  //     lineHeight: 30,
  //     fontWeight: "bold",
  //     textAlign: "left",
  //     top: 5,
  //     left: 5,
  //   },
  
  //   boxfontsbody: {
  //     color: "black",
  //     fontSize: 18,
  //     lineHeight: 30,
  //     textAlign: "left",
  //     top: 5,
  //     left: 5,
  //   },
  
  //   boxfontshead2: {
  //     color: "black",
  //     fontSize: 24,
  //     lineHeight: 30,
  //     fontWeight: "bold",
  //     textAlign: "center",
  //   },
  
  //   image: {
  //     flex: 1,
  //     justifyContent: "center",
  //   },
  
  //   services: {
  //     flexDirection: "column",
  //     justifyContent: "space-around",
  //   },
  
  //   gasservice: {
  //     position: "absolute",
  //     width: 350,
  //     height: 175,
  //     left: 21,
  //     top: -275,
  //     backgroundColor: "#CDCABF",
  //     borderWidth: 2,
  //     borderColor: "#000000",
  //     borderRadius: 10,
  //   },
  
  //   tireservice: {
  //     position: "absolute",
  //     width: 350,
  //     height: 175,
  //     left: 21,
  //     top: -80,
  //     backgroundColor: "#CDCABF",
  //     borderWidth: 2,
  //     borderColor: "#000000",
  //     borderRadius: 10,
  //   },
  
  //   detailingservice: {
  //     position: "absolute",
  //     width: 350,
  //     height: 175,
  //     left: 21,
  //     top: 115,
  //     backgroundColor: "#CDCABF",
  //     borderWidth: 2,
  //     borderColor: "#000000",
  //     borderRadius: 10,
  //   },
  
  //   boxfontshead: {
  //     color: "black",
  //     fontSize: 24,
  //     lineHeight: 30,
  //     fontWeight: "bold",
  //     textAlign: "left",
  //     top: 5,
  //     left: 5,
  //   },
  
  //   boxfontsbody: {
  //     color: "black",
  //     fontSize: 18,
  //     lineHeight: 30,
  //     textAlign: "left",
  //     top: 5,
  //     left: 5,
  //   },
  //   loginview: {
  //     justifyContent: "center",
  //     alignItems: "center",
  //     borderWidth: 1,
  //     width: 100,
  //     height: 40,
  //     top: 5,
  //     right: 10,
  //     left: 5,
  //     backgroundColor: "#DAAC3F",
  //   },
  // });
  
  //Working on implementation
  
  /* <view>
        rect1: {
            position: 'absolute',
            width: 350,
            height: 243,
            left: 21,
            top: 287,
            backgroundColor: '#CDCABF',
            borderWidth: 2,
            borderColor: '#000000',
            borderRadius: 10,
            },
    </view> */
  