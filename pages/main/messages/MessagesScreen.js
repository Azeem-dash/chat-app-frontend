import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import { Image, Pressable, SafeAreaView, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import CustomSearchBar from "../../../components/CustomSearchBar";
import LogoBar from "../../../components/LogoBar";
import TabBar from "../../../components/TabBar";
import RBSheet from "react-native-raw-bottom-sheet";
import SendButton from "../../../components/SendButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext";

const MessagesScreen = () => {
  const { userToken, setChats, chats } = useAuth();

  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [toWalletAddress, setToWalletAddress] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const api = axios.create({
    baseURL: "https://chat-api.sonart.tools",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  });

  const handleSendMessage = () => {
    if (toWalletAddress) {
      console.log(
        "chats?.find((chat)=>chat?.name?.toLowerCase() == toWalletAddress?.toLowerCase())",
        chats?.find((chat) => chat?.name?.toLowerCase() == toWalletAddress?.toLowerCase())
      );
      if (!chats?.find((chat) => chat?.name?.toLowerCase() == toWalletAddress?.toLowerCase())) {
        console.log("in");
        let tmp = {
          id: chats?.length,
          image: "https://i.pinimg.com/474x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg",
          name: toWalletAddress ?? null,
          message: "",
          messages: [],
          time: "",
          counter: 0,
        };
        console.log("here");

        setChats([...chats, tmp]);
      }

      const walletAddressVar = toWalletAddress;
      setToWalletAddress("");
      setText("");
      refRBSheet.current.close();
      navigation.navigate("Chat", {
        to: walletAddressVar,
      });
    }
  };

  useEffect(() => {
    if (toWalletAddress) {
      setError("");
    }
  }, [toWalletAddress]);

  return (
    <SafeAreaView style={styles.container}>
      <LogoBar imageSource={require("../../../assets/sonart_logo.png")}></LogoBar>
      <View style={styles.parent}>
        <View style={styles.barContainer}>
          <CustomSearchBar></CustomSearchBar>
          <Pressable onPress={() => refRBSheet.current.open()} style={styles.iconButton}>
            <Image source={require("../../../assets/create-message.png")} style={styles.icon} />
          </Pressable>
        </View>

        <TabBar style={styles.tabBar}></TabBar>
        <RBSheet
          ref={refRBSheet}
          height={300}
          // duration={250}
          animationType={"slide"}
          // openDuration={1000}
          customStyles={{
            container: {
              paddingVertical: 16,
              backgroundColor: "#F6F6F6",
              height: "50%",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            },
          }}
        >
          <View style={styles.titleBg}>
            <Text style={{ flex: 1 }}></Text>
            <Text style={styles.title}>New Chat</Text>
            <Pressable onPress={() => refRBSheet.current.close()} style={{ flex: 1, alignItems: "flex-end" }}>
              <Image source={require("../../../assets/close-icon.png")} style={styles.icon} />
            </Pressable>
          </View>
          <View>
            <View style={styles.subTitleBg}>
              <Text style={styles.subTitle}>Wallet Address</Text>
            </View>
            <View style={{ padding: 10 }}>
              <TextInput
                value={toWalletAddress}
                style={styles.walletInput}
                placeholder="Enter Wallet Address"
                onChangeText={(value) => setToWalletAddress(value)}
              />
              {error ? <Text style={{ color: "red", fontSize: 12 }}>{error}</Text> : null}
            </View>
          </View>
          <Pressable onPress={handleSendMessage} style={styles.chatBoxcontainer}>
            {/* <TextInput
					style={styles.input}

					placeholder="Type here"
					placeholderTextColor="#C4C4C4"
					onChangeText={(value)=>setText(value)}
					value={text}
				/> */}
            <View>
              <Text style={{ color: "white", fontSize: 18 }}>Chat</Text>
            </View>

            {/* <SendButton  sendMessage={handleSendMessage} ></SendButton> */}
          </Pressable>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  parent: {
    flex: 1,
    width: "100%",
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 20,
  },
  barContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  walletInput: { borderWidth: 2, borderColor: "#ececec", borderRadius: 5 },
  text: {
    fontSize: 20,
    color: "#000",
  },
  tabBar: {
    marginTop: 20,
  },
  iconButton: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    marginStart: 5,
  },
  icon: {
    width: 22,
    height: 22,
  },
  titleBg: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: "row",
    maxHeight: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "700" },
  subTitleBg: { backgroundColor: "#ececec", padding: 8 },
  subTitle: { fontSize: 15, fontWeight: "600" },
  chatBoxcontainer: {
    justifyContent: "center",
    backgroundColor: "#1f81e1",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // marginBottom: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    paddingHorizontal: 20,
    fontSize: 16,
  },
});

export default MessagesScreen;
