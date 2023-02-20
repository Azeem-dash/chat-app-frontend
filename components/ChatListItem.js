import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
const ChatListItem = (props) => {
  const { image, name, message, time, counter, coustomStyle } = props;

  return (
    <View style={[{ backgroundColor: coustomStyle ? coustomStyle.backgroundColor : "#fff" }, styles.container]}>
      {counter === -1 ? (
        <Image source={require("../assets/add_more.png")} style={styles.image} />
      ) : counter === -2 ? (
        <Image source={require("../assets/group.png")} style={styles.image} />
      ) : (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.time}>{time}</Text>
        {counter > 0 ? (
          <View style={[styles.counter, { backgroundColor: "#1F81E1" }]}>
            <Text style={styles.counterText}>{counter}</Text>
          </View>
        ) : counter === 0 || counter === -2 ? (
          <Image source={require("../assets/ico_tick.png")} style={{ width: 30, height: 30 }} />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    // backgroundColor: "#fff",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 30,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
  },
  rightContainer: {
    alignItems: "center",
  },
  name: {
    fontWeight: "700",
    fontFamily: "Helvetica",
    fontSize: 16,
    color: "#464255",
  },
  message: {
    flexWrap: "wrap",
    marginTop: 5,
    color: "#464255",
    fontFamily: "Helvetica",
    fontWeight: "700",
    fontSize: 12,
  },
  time: {
    fontSize: 8,
    color: "#A3A3A3",
    fontFamily: "Helvetica",
    fontWeight: "700",
    marginBottom: 15,
  },
  counter: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "700",
    fontFamily: "Helvetica",
  },
});

export default ChatListItem;
