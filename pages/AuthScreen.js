import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, ImageBackground, Button } from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { useWalletConnectContext, useWalletConnect } from "@walletconnect/react-native-dapp";
import { fetchNonce, login } from "../utils/api/auth";
const AuthScreen = () => {
  const navigation = useNavigation();
  const { connector } = useWalletConnectContext();
  const { setWalletAddress, setUserToken } = useAuth();

  useEffect(() => {}, [connector]);

  const connectWallet = async () => {
    try {
      let x = await connector.connect();
      if (connector?._connected) {
        setWalletAddress(connector.session.accounts[0]);

        // fetch nonce
        const nonce = await fetchNonce(connector.session.accounts[0]);
        // sign nonce
        const signature = await connector.signPersonalMessage([
          connector.session.accounts[0],
          `Welcome to Wallet Messenger!\n\nPlease sign this message to verify ownership of the wallet.\n\nUnique Access Token: ${nonce}`,
        ]);

        // send signed nonce
        const { AccessToken, address } = await login(connector.session.accounts[0], signature);

        // login
        setWalletAddress(address);
        setUserToken(AccessToken);
      }
    } catch (error) {}
  };
  return (
    <ImageBackground style={{ flex: 1, backgroundColor: "#010A2B" }} source={require("../assets/background.png")}>
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <CustomButton title="Connect Wallet" onPress={connectWallet} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
    marginBottom: "40%",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
  },
});

export default AuthScreen;
