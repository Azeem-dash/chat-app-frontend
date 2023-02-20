import React from "react";
import { View, StyleSheet } from "react-native";

const WalletConnect = () => {
  return (
    <View style={styles.container}>
      <View style={styles.radialGradient}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  radialGradient: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "transparent",
    backgroundImage: "radial-gradient(#000c2c, #023f69)",
  },
});

export default WalletConnect;
