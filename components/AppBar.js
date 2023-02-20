import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";

const AppBar = (props) => {
  const { bool, setBool } = useAuth();

  const navigation = useNavigation();
  const navigateBack = () => {
    setBool(!bool);
    navigation.goBack();
  };
  const shortenHex = (hex) => {
    const shortenedHex = hex.substring(0, 8) + "..." + hex.substring(hex.length - 8);
    return shortenedHex;
  };
  return (
    // <SafeAreaView style={styles.container}>
    <View style={styles.appBarContainer}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={navigateBack}>
          <Image source={require("../assets/ico_back.png")} style={styles.backButton} />
        </TouchableOpacity>
        {props.isGroup ? (
          <Image source={require("../assets/group.png")} style={styles.avatar} />
        ) : (
          <Image source={require("../assets/person.jpg")} style={styles.avatar} />
        )}

        <View style={styles.userInfo}>
          {props.isGroup ? (
            <View>
              <Text style={styles.userName}>{props?.data}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.userName}>{props?.data?.name ? shortenHex(props?.data?.name) : null}</Text>
            </View>
          )}
          {/* <Text style={styles.userName}>{props?.data?.name ? shortenHex(props?.data?.name) : null}</Text> */}
          <Text style={styles.userStatus}>Online</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.iconContainer}>
          <Image source={require("../assets/ico_notification.png")} style={styles.icon} />
          <Image source={require("../assets/ico_search_chat.png")} style={styles.icon} />
          <Image source={require("../assets/ico_info.png")} style={styles.icon} />
          {/* <Image source={require('../assets/ico_info.png')} style={styles.icon} /> */}
        </View>
      </View>
    </View>
    // </SafeAreaView>
  );
};

// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: '#e5e5e5',
//   },
//   appBarContainer: {
//     height: 60,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   leftContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   backButton: {
//     width: 25,
//     height: 25,
//     borderRadius: 13,
//     backgroundColor: 'rgba(31, 129, 225, 0.5)',
//     marginLeft: 10,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginLeft: 10,
//   },
//   userInfo: {
//     flexDirection: 'column',
//     marginLeft: 10,
//   },
//   rightContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   userStatus: {
//     fontSize: 14,
//     color: 'green',
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     marginRight: 10,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     tintColor: 'white',
//     marginRight: 10,
//   },
// };

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  appBarContainer: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: "rgba(31, 129, 225, 0.1)",
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  userInfo: {
    flexDirection: "column",
    marginLeft: 10,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  userName: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Helvetica",
    color: "#464255",
  },
  userStatus: {
    fontSize: 10,
    fontWeight: "400",
    fontFamily: "Helvetica",
    color: "#00A389",
  },
  iconContainer: {
    flexDirection: "row",
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
    // tintColor: 'white',
    marginRight: 10,
  },
};
export default AppBar;
